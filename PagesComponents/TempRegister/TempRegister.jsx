import React, { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import InputMask from "react-input-mask";
import { Container, Row, Col } from "react-bootstrap";
import Axios from "axios";

import notification from "../../services/notification";

import Loading from "../../components/Loading";

import * as S from "./style";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const formEl = useRef();
  const history = useRouter();

  const [validated, setValidated] = useState(false);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [ie, setIe] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mask, setMask] = useState("");
  const [cep, setCEP] = useState(localizacao.zipcode);
  const [rua, setRua] = useState(localizacao.address);
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState(localizacao.city);
  const [estado, setEstado] = useState(localizacao.state);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmasenha, setConfirmaSenha] = useState("");
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
    } finally {
    }
  }

  async function handleCadastro(e) {
    setLoading(true);
    e.preventDefault();
    setSubmit(true);
    // eslint-disable-next-line no-unused-vars
    const form = formEl.current;

    getEmailValid(email);

    if (senha.trim() && confirmasenha.trim()) {
      if (senha !== confirmasenha) {
        notification("A senha e confirmação não estão iguais.", "error");
        setLoading(false);
        return false;
      }
    } else {
      notification("Por favor preencha as senhas.", "error");
      setLoading(false);
      return false;
    }

    if (
      nome === "" ||
      sobrenome === "" ||
      cpf === "" ||
      telefone === "" ||
      cep === "" ||
      rua === "" ||
      numero === "" ||
      cidade === "" ||
      estado === "" ||
      email === "" ||
      senha === "" ||
      confirmasenha === "" ||
      aceito2 === false
    ) {
      notification("Verifique se todos os campos estão preenchidos", "error");
      setLoading(false);
      return false;
    }

    const dataCadastro = {
      first_name: nome,
      last_name: sobrenome,
      email: email,
      vat_number: cpf.replace("-", "").split(".").join("").replace("/", ""),
      ie_number: ie,
      password: senha,
      password_confirmation: confirmasenha,
      anonymous: false,
      phone:
        "+55" +
        telefone
          .replace("(", "")
          .replace(")", "")
          .replace("-", "")
          .replace(" ", ""),
    };

    if (aceito2) {
      try {
        const { data: response } = await api.post(
          "/customer/register",
          dataCadastro
        );

        localStorage.removeItem(`${mktName}_username`);

        if (response.message === "Sua conta foi criada com sucesso") {
          //loginUser();
          // notification("Cadastro realizado com sucesso", "success");

          handleLogin();
          setLoading(false);
        } else {
          notification(
            response.message
              .replace("first name", "nome")
              .replace("last name", "sobrenome"),
            "error"
          );
          setLoading(false);
        }
      } catch (err) {
        notification("Erro ao realizar cadastro", "error");
        setLoading(false);
        console.error(err);
      } finally {
      }
    } else {
      setLoading(false);
      notification(
        "Para prosseguir, aceite os termos de uso e nossa política de privacidade.",
        "error"
      );
    }

    setValidated(true);
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
        // notification("Produto adicionado no carrinho", "success");
        //  history.push("/carrinho");
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
    // setRua(localizacao.address);
    setCidade(localizacao.city);
    setRua(localizacao.address);
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
                      <form
                        noValidate
                        validated={validated.toString()}
                        ref={formEl}
                      >
                        <Row className="rowPack">
                          <Col>
                            <label
                              className={nome && "ativo"}
                              style={{
                                border:
                                  submit &&
                                  nome.length === 0 &&
                                  "2px solid #ce171f",
                              }}
                            >
                              <span>Nome</span>
                              <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                              />
                            </label>
                          </Col>
                          <Col>
                            <label
                              className={sobrenome && "ativo"}
                              style={{
                                border:
                                  submit &&
                                  sobrenome.length === 0 &&
                                  "2px solid #ce171f",
                              }}
                            >
                              <span>Sobrenome</span>
                              <input
                                type="text"
                                value={sobrenome}
                                onChange={(e) => setSobrenome(e.target.value)}
                                required
                              />
                            </label>
                          </Col>
                        </Row>

                        <label
                          className={cpf && "ativo"}
                          style={{
                            border:
                              submit && cpf.length === 0 && "2px solid #ce171f",
                          }}
                        >
                          <span>CPF/CNPJ</span>
                          <InputMask
                            mask={mask}
                            placeholder="Digite seu CPF/CNPJ (Apenas Números)"
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
                              }
                            }}
                          />
                        </label>
                        {activeIE === true ? (
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
                        ) : (
                          ""
                        )}
                        <label
                          className={telefone && "ativo"}
                          style={{
                            border:
                              submit &&
                              telefone.length === 0 &&
                              "2px solid #ce171f",
                          }}
                        >
                          <span>Telefone</span>
                          <InputMask
                            mask="(99) 99999-9999"
                            type="text"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                          />
                        </label>

                        <label
                          className={cep && "ativo"}
                          style={{
                            border:
                              submit && cep.length === 0 && "2px solid #ce171f",
                          }}
                        >
                          <span>CEP</span>
                          <InputMask
                            type="text"
                            mask="99999-999"
                            value={cep}
                            onBlur={getCep}
                            // eslint-disable-next-line no-sequences
                            onChange={(e) => (
                              setCEP(e.target.value), handleCep
                            )}
                          />
                        </label>

                        <label
                          className={rua && "ativo"}
                          style={{
                            border:
                              submit && rua.length === 0 && "2px solid #ce171f",
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
                          </Col>
                        </Row>
                        <label
                          className={email && "ativo"}
                          style={{
                            border:
                              submit &&
                              email.length === 0 &&
                              "2px solid #ce171f",
                          }}
                        >
                          <span>E-mail</span>
                          <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </label>
                        <Row className="rowPack">
                          <Col xs={6} className="colPack">
                            <label
                              className={senha && "ativo"}
                              style={{
                                border:
                                  submit &&
                                  senha.length === 0 &&
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
                                onChange={(e) => setSenha(e.target.value)}
                                required
                              />
                            </label>
                          </Col>
                          <Col xs={6} className="colPack">
                            <label
                              className={confirmasenha && "ativo"}
                              style={{
                                border:
                                  submit &&
                                  confirmasenha.length === 0 &&
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
                                onChange={(e) =>
                                  setConfirmaSenha(e.target.value)
                                }
                                required
                              />
                            </label>
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
                                onClick={() =>
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
                                onClick={() =>
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
