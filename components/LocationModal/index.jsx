import React, { useEffect, useState } from "react";
import * as S from "./style";

import { useLocation } from "../../Context/Location";
import axios from "axios";
import notification from "../../services/notification";
import ReactInputMask from "react-input-mask";
import api from "../../services/api";
import msLocation from "../../services/msLocation";

import { Marker } from "@styled-icons/foundation/Marker";
import { useCart } from "../../Context/CartLengthContext";
import Geocode from "react-geocode";

function LocationModal({ logged }) {
  const {
    localizacao,
    setLocalizacao,
    localizado,
    setLocalizado,
    modal,
    setModal,
    removeLocation,
    AtualizarModalPagina,
    setAtualizarModalPagina,
  } = useLocation();

  const [cep, setCep] = useState("");
  const [show, setShow] = useState(false);
  const [atualizar, setAtualizar] = useState(true);
  const [enderecos, setEnderecos] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);

  //cadastro
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [padrao, setDefault] = useState("true");
  const [telefone, setTelefone] = useState("");
  const [bairro, setBairro] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [complemento, setComplemento] = useState("");
  const [pais, setPais] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCartLength } = useCart();

  async function getPlaces(cep) {
    setLoading(true);

    try {
      const { data: response } = await axios.get(
        `https://viacep.com.br/ws/${cep}/json`
      );

      Geocode.setApiKey(process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY);

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
      setLocalizacao(morphLocation);
      notification(
        "Você agora está geolocalizado para as melhores ofertas.",
        "success"
      );

      localStorage.setItem(
        `${process.env.NEXT_PUBLIC_REACT_APP_NAME}_location`,
        JSON.stringify(morphLocation)
      );

      setTimeout(fechaModal, 2500);
      setLocalizado(true);
      setCep("");
      setLoadingLocation(false);
    } catch (e) {
      notification("Cep Inválido", "error");
    } finally {
      setCep("");
    }
  }

  async function getPlacesCreate() {
    setLoading(true);

    try {
      const { data: response } = await axios.get(
        `https://viacep.com.br/ws/${cep}/json`
      );
      Geocode.setApiKey(process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY);

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
      setCidade(response.localidade);
      setPais("Brasil");
      setEstado(response.uf);
      setBairro(response.bairro);
      setEndereco(response.logradouro);
    } catch (e) {
      notification("Cep Inválido", "error");
    } finally {
      setLoading(false);
    }
  }

  async function deleteAddress(id) {
    await api.delete(`/customer/addresses/${id}`);
    setAtualizarModalPagina(!AtualizarModalPagina);
  }

  async function handleCadastro() {
    const dataEndereco = {
      name: nome,
      postcode: cep.replace("-", ""),
      address: endereco,
      number: numero,
      complement: complemento,
      neighborhood: bairro,
      country: pais,
      state: estado,
      city: cidade,
      phone:
        "+55" +
        telefone
          .replace("(", "")
          .replace(")", "")
          .replace(" ", "")
          .replace("-", ""),
      default_address: padrao === "true" ? true : false,
    };

    try {
      const token = localStorage.getItem(
        process.env.NEXT_PUBLIC_REACT_APP_NAME
      );
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        notification("Sua sessão expirou, faça o login novamente", "error");
        setModal(false);
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
        if (sessionStorage.getItem("new") === "endereco") {
          sessionStorage.setItem(
            "tipo_endereco",
            padrao === "true" ? "true" : "false"
          );
          sessionStorage.removeItem("new");
        }

        if (sessionStorage.getItem("checkout") === "endereco") {
          sessionStorage.setItem(
            "tipo_endereco",
            padrao === "true" ? "true" : "false"
          );
          sessionStorage.removeItem("checkout");
        }
      }
      setAtualizarModalPagina(!AtualizarModalPagina);
      sair();
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  async function handleEditar() {
    const dataEndereco = {
      name: nome,
      postcode: cep,
      address: endereco,
      number: numero,
      complement: complemento,
      neighborhood: bairro,
      country: pais,
      state: estado,
      city: cidade,
      phone: telefone,
      default_address: padrao === "true" ? true : false,
    };

    try {
      const token = localStorage.getItem(
        process.env.NEXT_PUBLIC_REACT_APP_NAME
      );
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        notification("Sua sessão expirou, faça o login novamente", "error");
        setModal(false);
        sessionStorage.setItem("urlantiga", window.location.href);
        setCartLength("0");
        setTimeout(function () {
          window.location.href = "/login";
        }, 3000);
      }

      const { data: response } = await api.put(
        `/customer/addresses/${id}`,
        dataEndereco
      );

      if (response.message === "Your address has been updated successfully.") {
        setAtualizarModalPagina(!AtualizarModalPagina);
        sair();
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  const openshow = () => {
    setAtualizar(false);
    setCep("");
    setNome("");
    setDefault("true");
    setTelefone("");
    setBairro("");
    setEstado("");
    setCidade("");
    setComplemento("");
    setPais("");
    setEndereco("");
    setNumero("");
    setShow((prev) => !prev);
  };

  const openShowUpdate = (localizacao) => {
    setAtualizar(true);
    setId(localizacao.id);
    setCep(localizacao.postalcode);
    setNome(localizacao.name);
    setDefault("true");
    setTelefone(localizacao.phone);
    setBairro(localizacao.neighborhood);
    setEstado(localizacao.state);
    setCidade(localizacao.city);
    setComplemento(localizacao.complement);
    setPais(localizacao.country);
    setEndereco(localizacao.address);
    setNumero(localizacao.number);
    setShow((prev) => !prev);
  };

  const sair = () => {
    setCep("");
    setAtualizarModalPagina(!AtualizarModalPagina);
    setShow((prev) => !prev);
  };

  async function getEnderecos() {
    try {
      const token = localStorage.getItem(
        process.env.NEXT_PUBLIC_REACT_APP_NAME
      );
      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        return;
      }

      const { data: response } = await api.get("/customer/addresses");
      setEnderecos(response.data);
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(
        process.env.NEXT_PUBLIC_REACT_APP_NAME
      );

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        return;
      }

      getEnderecos();
    }
  }, [AtualizarModalPagina]);

  const handleLocation = () => {
    setLoadingLocation(true);
    const url = process.env.NEXT_PUBLIC_REACT_APP_MS_LOCATION;
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const { data: response } = await axios.post(
          `${url}/location/geocoding/search`,
          {
            latitude: JSON.stringify(latitude),
            longitude: JSON.stringify(longitude),
          }
        );

        localStorage.setItem(
          `${process.env.NEXT_PUBLIC_REACT_APP_NAME}_location`,
          JSON.stringify(response)
        );
        setLocalizacao(response);

        notification(
          "Você agora está geolocalizado para as melhores ofertas.",
          "success"
        );
        setLoadingLocation(false);
        setLocalizado(true);
        setTimeout(fechaModal, 2500);
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleCadastrarLocalizacaoAtual = () => {
    setLoading(true);
    const url = process.env.NEXT_PUBLIC_REACT_APP_MS_LOCATION;

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const { data: response } = await axios.post(
        `${url}/location/geocoding/search`,
        {
          latitude: JSON.stringify(latitude),
          longitude: JSON.stringify(longitude),
        }
      );
      setCep(response.postalcode);
      setPais("BR");
      setBairro(response.neighborhood);
      setEstado(response.state);
      setCidade(response.city);
      setEndereco(response.street);
    });
    setLoading(false);
  };

  async function getCep() {
    const url = process.env.NEXT_PUBLIC_REACT_APP_MS_LOCATION;
    const dataCep = {
      postalcode: cep.replace("-", ""),
      country: "BR",
    };

    try {
      const { data: response } = await axios.post(
        `${url}/location/postal-code/search`,
        dataCep
      );

      setCidade(response.city);
      setPais("BR");
      setEstado(response.state);
      setBairro(response.neighborhood);
      setEndereco(response.street);
    } catch (err) {
      getPlacesCreate();
    }
  }

  const removeLocalizacao = () => {
    removeLocation();
    setCep("");
  };

  async function cepCadastradoSubmit(enderecoCode) {
    setLoadingLocation(true);
    removeLocation();

    const url = process.env.NEXT_PUBLIC_REACT_APP_MS_LOCATION;

    const dataCep = {
      postalcode:
        enderecoCode.postcode !== undefined
          ? enderecoCode.postcode.replace("-", "")
          : enderecoCode.zipcode !== undefined
          ? enderecoCode.zipcode.replace("-", "")
          : enderecoCode.postalcode.replace("-", ""),
      country: "BR",
    };

    try {
      const { data: response } = await axios.post(
        `${url}/location/postal-code/search`,
        dataCep
      );

      if (response.postalcode === "") {
        notification(response.message, "error");
        setLocalizado(false);
        return false;
      }

      notification(
        "Você agora está geolocalizado para as melhores ofertas.",
        "success"
      );
      setLocalizacao(response);

      setLocalizado(true);
      setCep("");
      setLoadingLocation(false);
      setTimeout(fechaModal, 2500);
    } catch (err) {
      getPlaces(enderecoCode.replace("-", ""));
    } finally {
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    removeLocation();

    const url = process.env.NEXT_PUBLIC_REACT_APP_MS_LOCATION;
    const dataCep = {
      postalcode: cep.replace("-", ""),
      country: "BR",
    };

    try {
      const { data: response } = await axios.post(
        `${url}/location/postal-code/search`,
        dataCep
      );

      if (response.postalcode === "") {
        notification(response.message, "error");
        setLocalizado(false);
        return false;
      }

      notification(
        "Você agora está geolocalizado para as melhores ofertas.",
        "success"
      );
      localStorage.setItem(
        `${process.env.NEXT_PUBLIC_REACT_APP_NAME}_location`,
        JSON.stringify(response)
      );
      setLocalizacao(response);
      setTimeout(fechaModal, 2500);
      setLocalizado(true);
      setCep("");
    } catch (err) {
      getPlaces(cep);
    } finally {
    }
  }
  function fechaModal() {
    document.body.style.overflow = "auto";
    setModal(modal ? false : true);
  }

  return (
    <>
      {!show && (
        <S.ContainerModal>
          <S.title>
            <div className="title">Onde você quer receber seu pedido?</div>
            <S.closeButton onClick={() => fechaModal()}>x</S.closeButton>
          </S.title>
          <S.modal className="principal">
            <S.content>
              {!logged && (
                <S.procurar>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="containerInput">
                      <S.BuscaIcon onClick={onSubmit} />
                      <ReactInputMask
                        placeholder="00000-000"
                        type="text"
                        mask="99999-999"
                        value={cep}
                        onChange={(event) => {
                          setCep(event.target.value);
                        }}
                      />
                    </div>
                    <button className="positiveButton" onClick={onSubmit}>
                      Buscar Endereço
                    </button>
                  </form>
                </S.procurar>
              )}

              {logged && (
                <>
                  <S.resultado onClick={openshow}>
                    <span>Adicionar novo Endereço</span>

                    <S.adicionar />
                  </S.resultado>
                  {enderecos &&
                    enderecos.length > 0 &&
                    enderecos.map((endereco) => (
                      <S.favorito
                        className={endereco.default && "ativado"}
                        key={endereco.id}
                      >
                        <div
                          onClick={() => cepCadastradoSubmit(endereco)}
                          className="containerEnderecos"
                        >
                          <div>
                            <S.house />
                            {endereco.default ? "Ativado" : "Desativado"}
                            <br />
                            <span>
                              {endereco.address}, {endereco.number}{" "}
                              {endereco.complement &&
                                `, ${endereco.complement}`}
                            </span>
                          </div>
                        </div>
                        <div className="PenLixo">
                          <S.pen onClick={() => openShowUpdate(endereco)} />
                          <S.lixo onClick={() => deleteAddress(endereco.id)} />
                        </div>
                      </S.favorito>
                    ))}
                </>
              )}
              {loadingLocation && (
                <S.ContainerLoading>
                  <img src="/images/loadingIcon.svg" alt="Carregando" />
                </S.ContainerLoading>
              )}
              {localizacao !== undefined && localizacao.city !== "" && (
                <div className="localizacaoAtual">
                  <div>Localização atual</div>
                  <div>{`${
                    localizacao.formatted_address &&
                    localizacao.formatted_address
                  }`}</div>
                </div>
              )}
              <S.button>
                {localizado ? (
                  <button onClick={removeLocalizacao}>
                    <Marker />
                    Remover localização atual
                  </button>
                ) : (
                  <button onClick={handleLocation}>
                    <Marker />
                    Usar localização atual
                  </button>
                )}
              </S.button>
            </S.content>
          </S.modal>
        </S.ContainerModal>
      )}
      {show && (
        <S.ContainerModal>
          <S.title>
            <div className="title">Onde você quer receber seu pedido?</div>
            <S.closeButton onClick={() => fechaModal()}>x</S.closeButton>
          </S.title>
          <S.modal>
            <S.content className="register">
              <S.cadastroFav className="registro">
                {loading && (
                  <img src="/images/loadingIcon.svg" alt="Carregando" />
                )}
                {!loading && (
                  <button
                    className="localizacaoAtual positiveButton"
                    onClick={() => handleCadastrarLocalizacaoAtual()}
                  >
                    <Marker />
                    Usar localização atual
                  </button>
                )}
                <form action="">
                  <select
                    className="tipoEndereco"
                    onChange={(e) => setDefault(e.target.value)}
                  >
                    <option defaultValue value="true">
                      Endereço Ativado
                    </option>
                    <option value="false">Endereço Desativado</option>
                  </select>
                  <ReactInputMask
                    className="cep"
                    placeholder="00000-000"
                    type="text"
                    mask="99999-999"
                    onBlur={() => getCep()}
                    value={cep}
                    onChange={(event) => {
                      setCep(event.target.value);
                    }}
                  />
                  <input
                    maxLength="50"
                    type="text"
                    placeholder="endereço"
                    name="endereco"
                    className="endereco"
                    value={endereco}
                    onChange={(event) => {
                      setEndereco(event.target.value);
                    }}
                  />
                  <input
                    maxLength="15"
                    type="text"
                    className="nome"
                    placeholder="Apelido do endereço (ex: Minha Casa)*"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <ReactInputMask
                    mask="(99) 9999-99999"
                    className="telefone"
                    placeholder="Telefone/Celular*"
                    type="text"
                    value={telefone.replace("+55", "")}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                  <br />
                  <input
                    maxLength="20"
                    type="text"
                    placeholder="número*"
                    name="numero"
                    className="numero"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                  <input
                    maxLength="20"
                    type="text"
                    placeholder="bairro*"
                    name="bairro"
                    className="bairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                  />
                  <input
                    maxLength="20"
                    type="text"
                    placeholder="cidade*"
                    name="cidade"
                    className="cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                  <input
                    maxLength="20"
                    type="text"
                    placeholder="estado*"
                    name="estado"
                    className="estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  />
                  <input
                    maxLength="20"
                    type="text"
                    placeholder="complemento"
                    name="complemento"
                    className="complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                  />
                  <br />
                </form>
                <button className="backButton negativeButton" onClick={sair}>
                  Sair
                </button>
                <button
                  className="forwardButton positiveButton"
                  onClick={atualizar ? handleEditar : handleCadastro}
                >
                  {atualizar ? "Atualizar" : "Salvar"}
                </button>
              </S.cadastroFav>
            </S.content>
          </S.modal>
        </S.ContainerModal>
      )}
    </>
  );
}
export default LocationModal;
