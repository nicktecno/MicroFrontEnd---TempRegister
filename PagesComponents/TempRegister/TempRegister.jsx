import "bootstrap/dist/css/bootstrap.min.css";
import * as S from "./style";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import InputMask from "react-input-mask";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";

import notification from "../../services/notification";

import Loading from "../../components/Loading";

function TempRegister({
  mktName,
  api,
  msLocation,
  routeTranslations,
  setCartLength,
  localizacao,
  validaLogin,
  googleApiKey,
}) {
  const history = useRouter();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [birth, setBirth] = useState("");
  const [cpf, setCpf] = useState("");
  const [ie, setIe] = useState("");
  const [telefone, setTelefone] = useState(undefined);
  const [mask, setMask] = useState("");
  const [cep, setCEP] = useState(localizacao.postalcode);
  const [rua, setRua] = useState(localizacao.street);
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState(localizacao.city);
  const [estado, setEstado] = useState(localizacao.state);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmasenha, setConfirmaSenha] = useState("");
  const [error, setError] = useState(false);
  const [show1, setShow1] = useState("password");
  const [show2, setShow2] = useState("password");
  const [loading, setLoading] = useState(false);
  const [aceito1, setAceito1] = useState(false);
  const [aceito2, setAceito2] = useState(false);

  const [activeIE, setActiveIE] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [bairro, setBairro] = useState(localizacao.neighborhood);

  const [passwordOculto, setPasswordOculto] = useState(false);
  const [passwordOcultoConfirmar, setPasswordOcultoConfirmar] = useState(false);

  const [validar, setValidar] = useState(true);

  function getEmailValid(email) {
    var pattern = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );

    if (!pattern.test(email)) {
      notification("Email inválido", "error");
      return false;
    }

    return true;
  }

  async function getUser() {
    try {
      const token = localStorage.getItem(mktName);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        notification("Sua sessão expirou, faça o login novamente", "error");
        sessionStorage.setItem("urlantiga", window.location.href);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      }

      const { data: response } = await api.get("/customer/get");
      localStorage.setItem(`${mktName}_userId`, response.id);
      localStorage.setItem(`${mktName}_username`, response.name);
    } catch (err) {
      setLoading(false);
      console.error(err);
    } finally {
    }
  }

  async function handleLogin() {
    const dataLogin = {
      email: email,
      password: senha,
    };

    try {
      const { data: response } = await api.post("/customer/login", dataLogin);

      if (
        response.message === "Logged in successfully." ||
        response.message === "Conectado com sucesso."
      ) {
        localStorage.setItem(mktName, response.token);
        validaLogin();

        getUser();

        handleCadastroEndereco();
      } else {
        notification(response.message, "error");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    } finally {
    }
  }

  async function handleCadastro() {
    setLoading(true);
    setSubmit(true);

    const birthEdited = birth.split("/");

    const dataCadastro = {
      first_name: nome,
      last_name: sobrenome,
      email: email,
      vat_number: cpf.replace("-", "").split(".").join("").replace("/", ""),
      ie_number: ie,
      date_of_birth: `${birthEdited[2]}-${birthEdited[1]}-${birthEdited[0]}`,
      password: senha,
      password_confirmation: confirmasenha,
      anonymous: false,
      phone:
        telefone !== undefined
          ? "+55" +
            telefone
              .replace("(", "")
              .replace(")", "")
              .replace("-", "")
              .replace(" ", "")
          : undefined,
    };

    if (aceito1 && aceito2) {
      await api
        .post("/customer/register", dataCadastro)
        .then(function (response) {
          localStorage.removeItem(
            `${process.env.NEXT_PUBLIC_REACT_APP_NAME}_username`
          );

          if (
            response !== undefined &&
            response.data.message === "Sua conta foi criada com sucesso"
          ) {
            const WishListProduct =
              JSON.parse(sessionStorage.getItem("productInfo")) || false;
            if (!WishListProduct) {
              notification("Cadastro realizado com sucesso", "success");
            }

            handleLogin();
          }
        })
        .catch(function (error) {
          setError(error.response.data.errors);
          setLoading(false);
        });
    } else {
      notification(
        "Para prosseguir, aceite os termos de uso e nossa política de privacidade.",
        "error"
      );
      setLoading(false);
    }
  }
  async function getPlacesCreate() {
    setLoading(true);

    try {
      const { data: response } = await Axios.get(
        `https://viacep.com.br/ws/${cep}/json`
      );
      Geocode.setApiKey(googleApiKey);

      Geocode.setLanguage("pt-br");

      Geocode.setRegion("br");
      const GeoCodeComplete = await Geocode.fromAddress(
        `${response.logradouro}, ${response.bairro}, ${response.complemento}, ${response.localidade}, ${response.uf}`
      ).then(
        (response) => {
          return response;
        },
        (error) => {
          console.error(error);
        }
      );

      const morphLocation = {
        postalcode: response.cep.replace("-", ""),
        neighborhood: response.bairro,
        city: response.localidade,
        state: response.uf,
        street: response.logradouro,
        country: "Brasil",
        formatted_address: `${response.logradouro}, ${response.bairro}, ${response.localidade}, ${response.cep}, ${response.uf}`,
        coordinates: [
          {
            lat: String(GeoCodeComplete.results[0].geometry.location.lat),
            lng: String(GeoCodeComplete.results[0].geometry.location.lng),
          },
        ],
      };

      await msLocation.post(`location/auto-complete`, morphLocation);

      setRua(response.logradouro);
      setCidade(response.localidade);
      setEstado(response.uf);
      setBairro(response.bairro);
    } catch (e) {
      notification("Cep Inválido", "error");
    } finally {
      setLoading(false);
    }
  }

  async function getCep() {
    if (cep === undefined) {
      setCEP("");
      notification("Digite o cep novamente", "error");
    } else {
      const dataCep = {
        zipcode: cep.replace("-", ""),
      };
      try {
        const { data: response } = await msLocation.post(
          "/location/cep/search",
          dataCep
        );

        if (response.message === "CEP inválido ou ausente") {
          notification(response.message, "error");
          return false;
        }
        setRua(response.address);
        setCidade(response.city);
        setEstado(response.state);
        setBairro(response.neighborhood);
      } catch (err) {
        getPlacesCreate();
        console.error(err);
      } finally {
      }
    }
  }

  function handleCep() {
    const timeoutId = setTimeout(() => (cep !== "" ? getCep(cep) : ""), 1000);
    return () => clearTimeout(timeoutId);
  }

  async function handleCadastroEndereco() {
    const dataEndereco = {
      name: "Endereço Principal",
      postcode: cep.replace("-", ""),
      address: rua,
      number: numero,
      complement: complemento,
      neighborhood: bairro,
      country: "BR",
      state: estado,
      city: cidade,
      phone:
        "+55" +
        telefone
          .replace("(", "")
          .replace(")", "")
          .replace(" ", "")
          .replace("-", ""),
      default_address: true,
    };

    try {
      const token = localStorage.getItem(mktName);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        notification("Sua sessão expirou, faça o login novamente", "error");
        sessionStorage.setItem("urlantiga", window.location.href);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      }

      const { data: response } = await api.post(
        "/customer/addresses/create",
        dataEndereco
      );

      if (response.message === "Your address has been created successfully.") {
        //history.push("/profile/addresses");

        handleAddItensCart();
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  async function handleAddItensCart() {
    try {
      const token = localStorage.getItem(mktName);
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        notification("Sua sessão expirou, faça o login novamente", "error");
        sessionStorage.setItem("urlantiga", window.location.href);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      }

      let carrinhoAnonimo = JSON.parse(sessionStorage.getItem("cart"));

      carrinhoAnonimo.map((lojista) =>
        Object.values(lojista).map((product) =>
          product.map((p) =>
            addItem([
              {
                product: p.product,
                quantity: p.quantity,
                seller_info: {
                  seller_id: p.seller_info.seller_id,
                  offer: p.seller_info.offer,
                  store: p.seller_info.store,
                },
              },
            ])
          )
        )
      );
    } catch (err) {
      setLoading(false);
      console.error(err);
    } finally {
      sessionStorage.removeItem("cart");
      history.push("/cart");
    }
  }

  async function addItem(item) {
    try {
      const response = await api.post("/customer/checkout/cart/add", item);

      if (response.data.message === "Products added to cart successfully.") {
      }
    } catch {}
  }

  async function handleCPF() {
    try {
      const response = await api.post("/validate-document", {
        document: cpf,
      });
      if (response.data.message === "Documento não encontrado") {
        setValidar(false);
      } else {
        sessionStorage.setItem("cliente", cpf);
        sessionStorage.setItem("credirect", "1");

        notification(
          "Você já comprou conosco anteriormente, para agilizarmos sua compra efetue seu login",
          "success"
        );
        history.push("/login");
      }
    } catch {}
  }

  useEffect(() => {
    setCEP(
      localizacao.zipcode === undefined
        ? localizacao.postcode !== undefined
          ? localizacao.postcode
          : localizacao.postalcode
        : localizacao.zipcode
    );

    setCidade(localizacao.city);
    setRua(localizacao.street);
    setEstado(localizacao.state);
    setBairro(localizacao.neighborhood);
  }, [localizacao]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <S.buscando>
            <Container>
              <Row>
                <Col>
                  <span>
                    <h4>
                      <a href="tcart">Carrinho de compras</a> &gt;{" "}
                      <span>Checkout</span>
                    </h4>
                  </span>
                </Col>
              </Row>
            </Container>
          </S.buscando>

          {validar ? (
            <Container>
              <Row>
                <Col>
                  <S.CaixaValidacao>
                    Para prosseguir preencha o seu CPF/CNPJ abaixo.
                    <S.CaixaForm>
                      <InputMask
                        mask={mask}
                        placeholder="Digite seu CPF/CNPJ (Apenas Números)"
                        alwaysShowMask
                        type="text"
                        value={cpf}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            handleCPF();
                          }

                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                          if (cpf.length <= 11 && event.key !== "Enter") {
                            setMask("999.999.999-99");
                          }
                          if (cpf.length >= 11 && event.key !== "Enter") {
                            setMask("99.999.999/9999-99");
                          }
                        }}
                        onBlur={(e) => {
                          if (cpf.length === 0) {
                            setMask("");
                          }
                        }}
                        onChange={(e) => {
                          {
                            const targetEdited = e.target.value
                              .replace(".", "")
                              .replace(".", "")
                              .replace("-", "")
                              .replace("/", "")
                              .replace("_", "")
                              .replace("_", "")
                              .replace("_", "")
                              .replace("_", "")
                              .replace("_", "")
                              .replace("_", "")
                              .replace("_", "")
                              .replace("_", "")
                              .replace("_", "")
                              .replace("_", "")
                              .replace("_", "")
                              .replace("_", "")
                              .replace("_", "")
                              .replace("_", "");

                            setCpf(targetEdited);

                            if (targetEdited.length <= 11) {
                              setIe("");
                              setActiveIE(false);
                            }
                            if (targetEdited.length > 11) {
                              setActiveIE(true);
                            }
                          }
                        }}
                      />

                      {activeIE === true ? (
                        <>
                          <label> Sua inscrição estadual </label>

                          <InputMask
                            id="ie"
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            step="1"
                            placeholder="Digite sua Incrição Estadual (Apenas Números)"
                            value={ie}
                            onChange={(e) => {
                              setIe(e.target.value);
                            }}
                          />
                        </>
                      ) : (
                        ""
                      )}
                      <S.BtAvancar
                        className="positiveButton"
                        onClick={handleCPF}
                      >
                        AVANÇAR
                      </S.BtAvancar>
                    </S.CaixaForm>
                  </S.CaixaValidacao>
                </Col>
              </Row>
            </Container>
          ) : (
            <>
              <S.processo>
                <Container>
                  <Row>
                    {/* <Col>
                  <img alt="weBrasil" src={processo} />
                  <S.proceder>
                    <p className="ativo">Endereço</p>
                    <p>Pagamento</p>
                    <p>Resumo</p>
                  </S.proceder>
                </Col> */}
                  </Row>
                </Container>
              </S.processo>

              <S.form>
                <Container>
                  <Row>
                    <Col>
                      <form>
                        <Row className="rowPack">
                          <Col>
                            <label
                              className={nome && "ativo"}
                              style={{
                                border:
                                  submit && nome.length === 0
                                    ? "2px solid #ce171f"
                                    : error !== false &&
                                      error !== undefined &&
                                      error.first_name !== undefined &&
                                      "2px solid #ce171f",
                              }}
                            >
                              <span>Nome</span>
                              <input
                                type="text"
                                value={nome}
                                onChange={(e) => {
                                  setNome(e.target.value);
                                  if (
                                    error !== false &&
                                    error !== undefined &&
                                    error.first_name !== undefined
                                  ) {
                                    setError((current) => {
                                      const { first_name, ...rest } = current;

                                      return rest;
                                    });
                                  }
                                }}
                                required
                              />
                            </label>
                            <S.ErrorMessage>
                              {error !== false &&
                                error !== undefined &&
                                error.first_name !== undefined &&
                                error.first_name[0]}
                            </S.ErrorMessage>
                          </Col>
                          <Col>
                            <label
                              className={sobrenome && "ativo"}
                              style={{
                                border:
                                  submit && sobrenome.length === 0
                                    ? "2px solid #ce171f"
                                    : error !== false &&
                                      error !== undefined &&
                                      error.last_name !== undefined &&
                                      "2px solid #ce171f",
                              }}
                            >
                              <span>Sobrenome</span>
                              <input
                                type="text"
                                value={sobrenome}
                                onChange={(e) => {
                                  setSobrenome(e.target.value);
                                  if (error.last_name !== undefined) {
                                    setError((current) => {
                                      const { last_name, ...rest } = current;

                                      return rest;
                                    });
                                  }
                                }}
                                required
                              />
                            </label>
                            <S.ErrorMessage>
                              {error !== false &&
                                error !== undefined &&
                                error.last_name !== undefined &&
                                error.last_name[0]}
                            </S.ErrorMessage>
                          </Col>
                        </Row>

                        <label
                          className={cpf && "ativo"}
                          style={{
                            border:
                              submit && cpf.length === 0
                                ? "2px solid #ce171f"
                                : error !== false &&
                                  error !== undefined &&
                                  error.vat_number !== undefined &&
                                  "2px solid #ce171f",
                          }}
                        >
                          <span>CPF/CNPJ</span>
                          <InputMask
                            mask={mask}
                            alwaysShowMask
                            type="text"
                            value={cpf}
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                              if (cpf.length <= 11) {
                                setMask("999.999.999-99");
                              }
                              if (cpf.length >= 11) {
                                setMask("99.999.999/9999-99");
                              }
                            }}
                            onBlur={(e) => {
                              if (cpf.length === 0) {
                                setMask("");
                              }
                            }}
                            onChange={(e) => {
                              {
                                const targetEdited = e.target.value
                                  .replace(".", "")
                                  .replace(".", "")
                                  .replace("-", "")
                                  .replace("/", "")
                                  .replace("_", "")
                                  .replace("_", "")
                                  .replace("_", "")
                                  .replace("_", "")
                                  .replace("_", "")
                                  .replace("_", "")
                                  .replace("_", "")
                                  .replace("_", "")
                                  .replace("_", "")
                                  .replace("_", "")
                                  .replace("_", "")
                                  .replace("_", "")
                                  .replace("_", "")
                                  .replace("_", "");

                                setCpf(targetEdited);

                                if (targetEdited.length <= 11) {
                                  setIe("");
                                  setActiveIE(false);
                                }
                                if (targetEdited.length > 11) {
                                  setActiveIE(true);
                                }
                                if (
                                  error !== false &&
                                  error !== undefined &&
                                  error.vat_number !== undefined
                                ) {
                                  setError((current) => {
                                    const { vat_number, ...rest } = current;

                                    return rest;
                                  });
                                }
                                if (
                                  error !== false &&
                                  error !== undefined &&
                                  error.vat_number !== undefined
                                ) {
                                  if (
                                    error !== false &&
                                    error !== undefined &&
                                    error.vat_number !== undefined
                                  ) {
                                    setError((current) => {
                                      const { vat_number, ...rest } = current;

                                      return rest;
                                    });
                                  }
                                }
                              }
                            }}
                          />
                        </label>
                        <S.ErrorMessage>
                          {error !== false &&
                            error !== undefined &&
                            error.vat_number !== undefined &&
                            error.vat_number[0]}
                        </S.ErrorMessage>
                        {activeIE === true ? (
                          <>
                            <label className={ie && "ativo"}>
                              <span>Sua inscrição estadual</span>

                              <InputMask
                                id="ie"
                                onKeyPress={(event) => {
                                  if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                  }
                                }}
                                step="1"
                                className="selectCategory"
                                placeholder="Digite sua Incrição Estadual (Apenas Números)"
                                value={ie}
                                onChange={(e) => {
                                  setIe(e.target.value);
                                }}
                              />
                            </label>
                            <S.ErrorMessage />
                          </>
                        ) : (
                          ""
                        )}
                        <label
                          className={birth && "ativo"}
                          style={{
                            border:
                              submit && birth.length === 0
                                ? "2px solid #ce171f"
                                : error !== false &&
                                  error !== undefined &&
                                  error.date_of_birth !== undefined &&
                                  "2px solid #ce171f",
                          }}
                        >
                          <span>Data de nascimento</span>
                          <InputMask
                            mask="99/99/9999"
                            type="text"
                            value={birth}
                            onChange={(e) => {
                              setBirth(e.target.value);
                              if (
                                error !== false &&
                                error !== undefined &&
                                error.date_of_birth !== undefined
                              ) {
                                setError((current) => {
                                  const { date_of_birth, ...rest } = current;

                                  return rest;
                                });
                              }
                            }}
                          />
                        </label>
                        <S.ErrorMessage>
                          {error !== false &&
                            error !== undefined &&
                            error.date_of_birth !== undefined &&
                            error.date_of_birth[0]}
                        </S.ErrorMessage>
                        <label
                          className={telefone && "ativo"}
                          style={{
                            border:
                              telefone !== undefined
                                ? submit && telefone.length === 0
                                  ? "2px solid #ce171f"
                                  : error !== false &&
                                    error !== undefined &&
                                    error.phone !== undefined &&
                                    "2px solid #ce171f"
                                : submit && "2px solid #ce171f",
                          }}
                        >
                          <span>Telefone</span>

                          <InputMask
                            mask="(99) 99999-9999"
                            type="text"
                            value={telefone}
                            onChange={(e) => {
                              if (
                                error !== false &&
                                error !== undefined &&
                                error.phone !== undefined
                              ) {
                                setError((current) => {
                                  const { phone, ...rest } = current;

                                  return rest;
                                });
                              }
                              setTelefone(e.target.value);
                            }}
                          />
                        </label>
                        <S.ErrorMessage>
                          {error !== false &&
                            error !== undefined &&
                            error.phone !== undefined &&
                            error.phone[0]}
                        </S.ErrorMessage>

                        <label
                          className={cep && "ativo"}
                          style={{
                            border:
                              cep !== undefined
                                ? cep !== null && submit
                                  ? "2px solid #ce171f"
                                  : submit &&
                                    cep.length === 0 &&
                                    "2px solid #ce171f"
                                : submit && "2px solid #ce171f",
                          }}
                        >
                          {console.log(cep)}
                          <span>CEP</span>
                          <InputMask
                            type="text"
                            mask="99999-999"
                            value={cep}
                            onBlur={getCep}
                            onChange={(e) => (
                              setCEP(e.target.value), handleCep
                            )}
                          />
                        </label>
                        <S.ErrorMessage />

                        <label
                          className={rua && "ativo"}
                          style={{
                            border:
                              rua !== undefined
                                ? submit &&
                                  rua?.length === 0 &&
                                  "2px solid #ce171f"
                                : submit && "2px solid #ce171f",
                          }}
                        >
                          <span>Rua</span>
                          <input
                            type="text"
                            value={rua}
                            onChange={(e) => setRua(e.target.value)}
                            required
                          />
                        </label>
                        <S.ErrorMessage />

                        <Row className="rowPack">
                          <Col xs={6} className="colPack">
                            <label
                              className={numero && "ativo"}
                              style={{
                                border:
                                  submit &&
                                  numero.length === 0 &&
                                  "2px solid #ce171f",
                              }}
                            >
                              <span>Número</span>
                              <input
                                type="text"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
                                required
                              />
                            </label>
                            <S.ErrorMessage />
                          </Col>
                          <Col xs={6} className="colPack">
                            <label className={complemento && "ativo"}>
                              <span>Complemento</span>
                              <input
                                type="text"
                                value={complemento}
                                onChange={(e) => setComplemento(e.target.value)}
                              />
                            </label>
                            <S.ErrorMessage />
                          </Col>
                          <Col xs={6} md={4} className="colPack">
                            <label
                              className={bairro && "ativo"}
                              style={{
                                border:
                                  submit &&
                                  bairro.length === 0 &&
                                  "2px solid #ce171f",
                              }}
                            >
                              <span>Bairro</span>
                              <input
                                type="text"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                                required
                              />
                            </label>
                            <S.ErrorMessage />
                          </Col>
                          <Col xs={6} md={4} className="colPack">
                            <label
                              className={cidade && "ativo"}
                              style={{
                                border:
                                  submit &&
                                  cidade.length === 0 &&
                                  "2px solid #ce171f",
                              }}
                            >
                              <span>Cidade</span>
                              <input
                                type="text"
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value)}
                                required
                              />
                            </label>
                            <S.ErrorMessage />
                          </Col>
                          <Col xs={6} md={4} className="colPack">
                            <label
                              className={estado && "ativo"}
                              style={{
                                border:
                                  submit &&
                                  estado.length === 0 &&
                                  "2px solid #ce171f",
                              }}
                            >
                              <span>Estado</span>
                              <input
                                type="text"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                required
                              />
                            </label>
                            <S.ErrorMessage />
                          </Col>
                        </Row>
                        <label
                          className={email && "ativo"}
                          style={{
                            border:
                              submit &&
                              email !== undefined &&
                              email.length === 0
                                ? "2px solid #ce171f"
                                : error !== false &&
                                  error !== undefined &&
                                  error.email !== undefined &&
                                  "2px solid #ce171f",
                          }}
                        >
                          <span>E-mail</span>
                          <input
                            type="text"
                            value={email}
                            onBlur={() => getEmailValid(email)}
                            onChange={(e) => {
                              if (
                                error !== false &&
                                error !== undefined &&
                                error.email !== undefined
                              ) {
                                setError((current) => {
                                  const { email, ...rest } = current;

                                  return rest;
                                });
                              }
                              setEmail(e.target.value);
                            }}
                            required
                          />
                        </label>
                        <S.ErrorMessage>
                          {error !== false &&
                            error !== undefined &&
                            error.email !== undefined &&
                            error.email[0]}
                        </S.ErrorMessage>
                        <Row className="rowPack">
                          <Col xs={6} className="colPack">
                            <label
                              className={senha && "ativo"}
                              style={{
                                border:
                                  submit &&
                                  senha !== undefined &&
                                  senha.length === 0
                                    ? "2px solid #ce171f"
                                    : error !== false &&
                                      error !== undefined &&
                                      error.password !== undefined &&
                                      "2px solid #ce171f",
                              }}
                            >
                              <span>Senha</span>
                              {passwordOculto ? (
                                <S.EyeIconOpen
                                  onClick={() => {
                                    setShow1("password");
                                    setPasswordOculto(false);
                                  }}
                                />
                              ) : (
                                <S.EyeIcon
                                  onClick={() => {
                                    setShow1("text");
                                    setPasswordOculto(true);
                                  }}
                                />
                              )}
                              <input
                                type={show1}
                                value={senha}
                                onChange={(e) => {
                                  if (
                                    error !== false &&
                                    error !== undefined &&
                                    error.password !== undefined
                                  ) {
                                    setError((current) => {
                                      const { password, ...rest } = current;

                                      return rest;
                                    });
                                  }
                                  setSenha(e.target.value);
                                }}
                                required
                              />
                            </label>
                            <S.ErrorMessage>
                              {error !== false &&
                                error !== undefined &&
                                error.password !== undefined &&
                                error.password[0]}
                            </S.ErrorMessage>
                          </Col>
                          <Col xs={6} className="colPack">
                            <label
                              className={confirmasenha && "ativo"}
                              style={{
                                border:
                                  submit &&
                                  confirmasenha !== undefined &&
                                  confirmasenha.length === 0
                                    ? "2px solid #ce171f"
                                    : error !== false &&
                                      error !== undefined &&
                                      error.password !== undefined &&
                                      "2px solid #ce171f",
                              }}
                            >
                              <span>Confirmação de senha</span>
                              {passwordOcultoConfirmar ? (
                                <S.EyeIconOpen
                                  onClick={() => {
                                    setShow2("password");
                                    setPasswordOcultoConfirmar(false);
                                  }}
                                />
                              ) : (
                                <S.EyeIcon
                                  onClick={() => {
                                    setShow2("text");
                                    setPasswordOcultoConfirmar(true);
                                  }}
                                />
                              )}

                              <input
                                type={show2}
                                value={confirmasenha}
                                onChange={(e) => {
                                  if (
                                    error !== false &&
                                    error !== undefined &&
                                    error.password !== undefined
                                  ) {
                                    setError((current) => {
                                      const { password, ...rest } = current;

                                      return rest;
                                    });
                                  }
                                  setConfirmaSenha(e.target.value);
                                }}
                                required
                              />
                            </label>
                            <S.ErrorMessage>
                              {error !== false &&
                                error !== undefined &&
                                error.password !== undefined &&
                                error.password[0]}
                            </S.ErrorMessage>
                          </Col>
                        </Row>

                        <Row className="rowPack">
                          <Col>
                            <S.termos
                              style={{
                                paddingTop: "5px",
                                border:
                                  submit &&
                                  aceito1 === false &&
                                  "2px solid #ce171f",
                              }}
                            >
                              <input
                                className="check-termos"
                                type="checkbox"
                                checked={aceito1}
                                onChange={() =>
                                  setAceito1(aceito1 ? false : true)
                                }
                              />
                              Eu aceito os{" "}
                              <span>
                                <Link href="content/termos-de-uso">
                                  Termos de Uso
                                </Link>
                              </span>
                            </S.termos>
                            <S.termos
                              style={{
                                paddingTop: "5px",
                                border:
                                  submit &&
                                  aceito2 === false &&
                                  "2px solid #ce171f",
                              }}
                            >
                              <input
                                className="check-termos"
                                type="checkbox"
                                checked={aceito2}
                                onChange={() =>
                                  setAceito2(aceito2 ? false : true)
                                }
                              />
                              Eu aceito as{" "}
                              <span>
                                <Link href="/content/politica-de-privacidade">
                                  Políticas de Privacidade
                                </Link>
                              </span>
                            </S.termos>
                          </Col>
                        </Row>
                      </form>
                    </Col>
                  </Row>
                </Container>
              </S.form>

              <Container>
                <Row>
                  <Col>
                    <S.bts>
                      <Link href="/tcart" passhref="true">
                        <S.voltar className="negativeButton">VOLTAR</S.voltar>
                      </Link>
                      {nome !== "" &&
                      sobrenome !== "" &&
                      birth !== "" &&
                      cpf !== "" &&
                      telefone !== "" &&
                      cep !== "" &&
                      rua !== "" &&
                      numero !== "" &&
                      cidade !== "" &&
                      estado !== "" &&
                      email !== "" &&
                      senha !== "" &&
                      confirmasenha !== "" &&
                      aceito1 !== false &&
                      aceito2 !== false ? (
                        <S.seguinte
                          className="positiveButton"
                          onClick={handleCadastro}
                        >
                          AVANÇAR
                        </S.seguinte>
                      ) : (
                        <S.seguinte
                          className="disabled positiveButton"
                          onClick={() => {
                            setSubmit(true);
                            notification(
                              "Preencha todos os campos incluindo aceitar as Políticas de Privacidade",
                              "error"
                            );
                          }}
                        >
                          AVANÇAR
                        </S.seguinte>
                      )}
                    </S.bts>
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
}

export default TempRegister;
