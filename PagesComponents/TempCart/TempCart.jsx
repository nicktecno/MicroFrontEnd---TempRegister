import React, { useState, useEffect, useRef } from "react";

import { useRouter } from "next/router";

import { Container, Row, Col, Accordion } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import notification from "../../services/notification";
import currencyFormat from "../../services/currencyFormat";

import ProductBoxAnonymous from "../../components/ProductBoxAnonymous";
import GoCheckout from "../../components/GoCheckout";

import * as S from "./style";
import "bootstrap/dist/css/bootstrap.min.css";

function TempCart({
  routeTranslations,
  apiUnlogged,
  cartLength,
  setCartLength,
  localizado,
  setModal,
  mktName,
}) {
  const history = useRouter();

  const [cart, setCart] = useState([]);
  const [endereco, setEndereco] = useState(null);
  const [carTotal, setCartTotal] = useState(0);
  const [shipping, setShipping] = useState([]);
  const [shipmentChoice, setshipmentChoice] = useState({});
  const [shipmentPrice, setShipmentPrice] = useState(false);

  const refScrollAddress = useRef(null);
  const refScrollShip = useRef([]);

  function verifyShippingSeller(shippingsFunc, seller) {
    const shipFilter = shippingsFunc.filter(
      (ship) => parseInt(Object.entries(ship)[0][0]) === parseInt(seller)
    );

    if (shipFilter.length > 0) {
      return shipFilter;
    } else {
      return [];
    }
  }

  function productCartAnonymous(produto, tipo, quantidade = 0, sellerId) {
    // Pegamos todos os produtos em sessionStorage

    let objArray = sessionStorage.getItem("cart")
      ? sessionStorage.getItem("cart")
      : [];

    // atualizar quantiadde do item no carrinho
    if (tipo === "update") {
      objArray = JSON.parse(objArray);
      objArray.forEach((loja) => {
        // eslint-disable-next-line array-callback-return

        Object.values(loja).map((p, i) => {
          // eslint-disable-next-line array-callback-return
          p.map((pq, iq) => {
            if (
              pq.product === produto &&
              pq.seller_info.seller_id === sellerId
            ) {
              pq.quantity = quantidade;
            }
          });
        });
      });
    }

    if (tipo === "delete") {
      objArray = JSON.parse(objArray);
      objArray.map((loja) => {
        // eslint-disable-next-line array-callback-return
        Object.values(loja).map((p, i) => {
          // eslint-disable-next-line array-callback-return

          p.map((pq, iq) => {
            if (
              pq.product === produto &&
              pq.seller_info.seller_id === sellerId
            ) {
              p.splice(iq, 1);
            }
          });
        });
      });

      let count = 0;
      objArray.forEach((loja) => {
        if (Object.values(loja)[0].length <= 0) {
          objArray.splice(count, 1);
        }
        ++count;
      });
    }

    sessionStorage.setItem("cart", JSON.stringify(objArray));
  }

  // remover item de carrinho
  const removeItem = async (produto, seller) => {
    productCartAnonymous(produto, "delete", 0, seller);
    notification("Item removido com sucesso.", "success");
    if (JSON.parse(sessionStorage.getItem("cart")).length === 0) {
      setCartLength(0);
      history.push("/empty");
    }
    getCart();
  };

  // atualizando quantidade
  const handleQtd = async (produto, qtd, seller) => {
    productCartAnonymous(produto, "update", qtd, seller);
    notification(`Quantidade do produto alterada`, "success");
    getCart();
  };

  const handleClear = async () => {
    notification(`Seu carrinho foi limpo`, "success");
    sessionStorage.removeItem("cart");
    setCartLength(0);
    getCart();
  };

  async function getShipment(cart, location) {
    const carriers = [];
    const ship = cart.map(async (deliver, index) => {
      const shipmentBySeller = [];
      const sellerId = [];

      const shipmentInfo = Object.values(deliver)[0].map((item) => {
        shipmentBySeller.push({
          product: +item.product,
          offer: +item.seller_info.offer,
          quantity: +item.quantity ? +item.quantity : 1,
        });

        sellerId[0] = +item.seller_info.seller_id;
      });

      try {
        const postData = {
          items: shipmentBySeller,
          seller_id: sellerId[0],
          zipcode: location.zipcode
            ? location.zipcode
            : location.postcode
            ? location.postcode
            : location.postalcode,
        };

        const { data: response } = await apiUnlogged.post(
          "/shipping/calculate",
          postData,
          {
            headers: { Accept: "application/json" },
          }
        );

        carriers.push({
          [sellerId[0]]: response.map((shipping, index) => {
            return { ...shipping, index };
          }),
        });

        if (carriers.length > 0 && carriers.length === cart.length) {
          setShipping(
            carriers.sort((a, b) => {
              return Object.keys(a) - Object.keys(b);
            })
          );

          setShipmentPrice(
            carriers.map(
              (i) => (shipmentPrice.Object.keys(i)[0] = Object.keys(i)[0])
            )
          );
        }
      } catch (err) {
        console.log(err.message);
      } finally {
      }
    });
  }

  function getCart() {
    if (sessionStorage.getItem("cart")) {
      if (
        localStorage.getItem(`${mktName}_location`) !== null &&
        localStorage.getItem(`${mktName}_location`) !== undefined
      ) {
        setEndereco(JSON.parse(localStorage.getItem(`${mktName}_location`)));
      } else {
        setEndereco(null);
      }

      setCart(
        JSON.parse(sessionStorage.getItem("cart")).sort((a, b) => {
          return (
            Object.values(a)[0][0].seller_info.seller_id -
            Object.values(b)[0][0].seller_info.seller_id
          );
        })
      );

      let countItensCart = sessionStorage.getItem("cart")
        ? JSON.parse(sessionStorage.getItem("cart"))
        : [];

      let count = 0;
      let valorTotal = 0;
      // eslint-disable-next-line array-callback-return
      countItensCart.map((item) => {
        // eslint-disable-next-line array-callback-return
        Object.values(item).map((p, i) => {
          // eslint-disable-next-line array-callback-return
          p.map((pq, iq) => {
            count = count + pq.quantity;
            valorTotal = valorTotal + pq.valor * pq.quantity;
          });
        });
      });

      setCartLength(count);
      setCartTotal(valorTotal);

      //  pegarFilho();
    } else {
      // history.push("/empty");
    }
  }

  useEffect(() => {
    getCart();
  }, [localizado]);

  useEffect(() => {
    const sessionCart = "" || sessionStorage.getItem("cart");
    const sessionLocation =
      JSON.parse(localStorage.getItem(`${mktName}_location`)) || "";

    if (cart && sessionLocation !== "") {
      getShipment(
        cart,
        JSON.parse(localStorage.getItem(`${mktName}_location`))
      );
    } else {
      setShipping([]);
    }
  }, [cart]);

  const saveShipping = (carrier, seller) => {
    const selectedCarrier = Object.entries(seller)[0];

    setShipmentPrice({
      ...shipmentPrice,
      [selectedCarrier[0]]: selectedCarrier[1].filter((i) => {
        return i.index === carrier;
      }),
    });
  };

  return (
    <>
      <S.buscando>
        <Container>
          <Row>
            <Col>
              <span>
                <h4>
                  {cartLength > 0 && (
                    <>
                      {" "}
                      Carrinho de compras
                      <span>
                        {parseInt(cartLength) > 1
                          ? `(${parseInt(cartLength)}) itens`
                          : `(${parseInt(cartLength)}) item`}
                      </span>
                    </>
                  )}
                </h4>
              </span>
            </Col>
          </Row>
        </Container>
      </S.buscando>
      {cart.length > 0 ? (
        <>
          <S.produtos>
            <Container className="containerBootstrap">
              {endereco !== null ? (
                <S.ContainerEndereco>
                  <S.TitleEndereco>Endereço de Entrega</S.TitleEndereco>
                  {endereco.street} - {endereco.neighborhood} - {endereco.city}-
                  {endereco.zipcode
                    ? endereco.zipcode
                    : endereco.postcode
                    ? endereco.postcode
                    : endereco.postalcode}
                </S.ContainerEndereco>
              ) : (
                <S.ContainerEndereco
                  ref={refScrollAddress}
                  className="error"
                  onClick={() => setModal(true)}
                >
                  Clique aqui para calcularmos o seu frete
                </S.ContainerEndereco>
              )}

              <hr />

              <S.ContainerItemGeral>
                <S.ContainerItemBotoes>
                  {cart.length > 0 &&
                    cart.map((lojista, index) => (
                      <div key={index}>
                        <Row>
                          <Col>
                            <S.remersa>
                              <h4>
                                Vendido e entregue por{" "}
                                <span
                                  onClick={() =>
                                    history.push(
                                      `/seller/${
                                        Object.values(lojista)[0][0].seller_info
                                          .store_url
                                      }`
                                    )
                                  }
                                >
                                  {Object.keys(lojista)[0]}
                                </span>
                              </h4>
                            </S.remersa>
                          </Col>
                        </Row>

                        {lojista &&
                          Object.values(lojista).map(
                            (product, productIndex) => (
                              <div key={productIndex}>
                                {product.map((p, pIndex) => (
                                  <div key={pIndex}>
                                    {p && p.quantity && (
                                      <ProductBoxAnonymous
                                        removeItem={removeItem}
                                        handleQtd={handleQtd}
                                        produto={p}
                                        sellerId={
                                          +product[0].seller_info?.seller_id
                                        }
                                      />
                                    )}
                                  </div>
                                ))}{" "}
                                {!shipping[index] ? (
                                  <>
                                    {localizado && (
                                      <S.GeralContainer>
                                        <S.shipmentContainer>
                                          <span
                                            className="alertUnavailable"
                                            ref={(ref) =>
                                              (refScrollShip.current[index] =
                                                ref)
                                            }
                                          >
                                            <div className="Icon">
                                              <S.Warning />
                                            </div>
                                            Desculpa, esse lojista não faz
                                            entregas neste CEP. Tente outra
                                            loja.
                                          </span>
                                          <Accordion className="accordion1">
                                            <S.accordionContainer state={0.5}>
                                              <div className="accordianBox">
                                                <Accordion.Toggle eventKey="0">
                                                  <S.TruckIcon />

                                                  <p id="notAvailable">
                                                    INDISPONÍVEL
                                                  </p>
                                                  <span className="pull-right">
                                                    Receba em casa
                                                  </span>
                                                </Accordion.Toggle>
                                              </div>
                                            </S.accordionContainer>

                                            <S.accordionContainer state={0.5}>
                                              <div className="accordianBox">
                                                <Accordion.Toggle eventKey="2">
                                                  <S.StoreIcon />

                                                  <p id="notAvailable">
                                                    INDISPONÍVEL
                                                  </p>

                                                  <span className="pull-right">
                                                    Retirar na loja
                                                  </span>
                                                </Accordion.Toggle>
                                              </div>
                                            </S.accordionContainer>
                                          </Accordion>
                                        </S.shipmentContainer>
                                      </S.GeralContainer>
                                    )}
                                  </>
                                ) : (
                                  <S.GeralContainer>
                                    {shipping.length > 0 &&
                                      verifyShippingSeller(
                                        shipping,
                                        +product[0].seller_info?.seller_id
                                      )[0][+product[0].seller_info?.seller_id]
                                        .length === 0 && (
                                        <span
                                          className="alertUnavailable"
                                          ref={(ref) =>
                                            (refScrollShip.current[index] = ref)
                                          }
                                        >
                                          <div className="Icon">
                                            <S.Warning />
                                          </div>
                                          Desculpa, esse lojista não faz
                                          entregas neste CEP. Tente outra loja.
                                        </span>
                                      )}
                                    <S.shipmentContainer>
                                      {shipping.length > 0 &&
                                        verifyShippingSeller(
                                          shipping,
                                          +product[0].seller_info?.seller_id
                                        )[0][+product[0].seller_info?.seller_id]
                                          .length !== 0 &&
                                        shipmentPrice[
                                          Object.keys(shipping[index])[0]
                                        ] == undefined && (
                                          <div
                                            className="shippingWarning"
                                            ref={(ref) =>
                                              (refScrollShip.current[index] =
                                                ref)
                                            }
                                          >
                                            <p>
                                              <S.Warning />
                                              Selecione um frete
                                            </p>
                                          </div>
                                        )}

                                      <Accordion className="accordion1">
                                        <S.accordionContainer
                                          state={
                                            Object.entries(
                                              shipping[index]
                                            )[0][1]?.filter(
                                              (shipp) =>
                                                shipp.code !==
                                                "withdraw-in-store"
                                            ).length >= 1
                                              ? 1
                                              : 0.5
                                          }
                                          click={
                                            Object.entries(
                                              shipping[index]
                                            )[0][1]?.filter(
                                              (shipp) =>
                                                shipp.code !==
                                                "withdraw-in-store"
                                            ).length >= 1
                                              ? "initial"
                                              : "not-allowed"
                                          }
                                          selected={
                                            shipmentPrice[
                                              Object.keys(shipping[index])[0]
                                            ] !== undefined &&
                                            shipmentPrice[
                                              Object.keys(shipping[index])[0]
                                            ][0].code !== "withdraw-in-store"
                                              ? true
                                              : false
                                          }
                                        >
                                          <div className="accordianBox">
                                            <Accordion.Toggle eventKey="0">
                                              <S.TruckIcon />
                                              {Object.entries(
                                                shipping[index]
                                              )[0][1]?.filter(
                                                (shipp) =>
                                                  shipp.code !==
                                                  "withdraw-in-store"
                                              ).length < 1 && (
                                                <p id="notAvailable">
                                                  INDISPONÍVEL
                                                </p>
                                              )}
                                              <span className="pull-right">
                                                Receba em casa
                                              </span>
                                            </Accordion.Toggle>

                                            {+Object.entries(
                                              shipping[index]
                                            )[0][0] ===
                                              +product[0].seller_info
                                                ?.seller_id && (
                                              <div className="ContainerItem descricao">
                                                <Accordion.Collapse eventKey="0">
                                                  <>
                                                    <h4>
                                                      Escolher uma
                                                      transportadora
                                                    </h4>

                                                    {Object.entries(
                                                      shipping[index]
                                                    )[0][1]
                                                      ?.filter(
                                                        (shipp) =>
                                                          shipp.code !==
                                                          "withdraw-in-store"
                                                      )
                                                      .map((frete, i) => {
                                                        return (
                                                          <div
                                                            className="shipmentBox"
                                                            key={i}
                                                          >
                                                            <section>
                                                              <input
                                                                type="radio"
                                                                checked={
                                                                  shipmentChoice[
                                                                    index
                                                                  ] ===
                                                                  frete.index
                                                                    ? true
                                                                    : false
                                                                }
                                                                onClick={() => {
                                                                  setshipmentChoice(
                                                                    {
                                                                      ...shipmentChoice,

                                                                      [index]:
                                                                        frete.index,
                                                                    }
                                                                  );

                                                                  saveShipping(
                                                                    frete.index,
                                                                    shipping[
                                                                      index
                                                                    ]
                                                                  );
                                                                }}
                                                              />
                                                              <div>
                                                                <h2>
                                                                  {
                                                                    frete.carrier
                                                                  }
                                                                </h2>
                                                                <p>
                                                                  {
                                                                    frete.delivery_time
                                                                  }{" "}
                                                                  dias
                                                                </p>
                                                              </div>
                                                            </section>
                                                            {frete.price > 0 ? (
                                                              <aside>
                                                                +R$
                                                                {frete.price
                                                                  .toFixed(2)
                                                                  .replace(
                                                                    ".",
                                                                    ","
                                                                  )}
                                                              </aside>
                                                            ) : (
                                                              <aside>
                                                                <>
                                                                  FRETE GRÁTIS
                                                                </>
                                                              </aside>
                                                            )}
                                                          </div>
                                                        );
                                                      })}
                                                  </>
                                                </Accordion.Collapse>
                                              </div>
                                            )}
                                          </div>
                                        </S.accordionContainer>

                                        <S.accordionContainer
                                          state={
                                            Object.entries(
                                              shipping[index]
                                            )[0][1]?.filter(
                                              (shipp) =>
                                                shipp.code ===
                                                "withdraw-in-store"
                                            ).length >= 1
                                              ? 1
                                              : 0.5
                                          }
                                          click={
                                            Object.entries(
                                              shipping[index]
                                            )[0][1]?.filter(
                                              (shipp) =>
                                                shipp.code ===
                                                "withdraw-in-store"
                                            ).length >= 1
                                              ? "initial"
                                              : "not-allowed"
                                          }
                                          selected={
                                            shipmentPrice[
                                              Object.keys(shipping[index])[0]
                                            ] !== undefined &&
                                            shipmentPrice[
                                              Object.keys(shipping[index])[0]
                                            ][0].code === "withdraw-in-store"
                                              ? true
                                              : false
                                          }
                                        >
                                          <div className="accordianBox">
                                            <Accordion.Toggle eventKey="2">
                                              <S.StoreIcon />
                                              {Object.entries(
                                                shipping[index]
                                              )[0][1]?.filter(
                                                (shipp) =>
                                                  shipp.code ===
                                                  "withdraw-in-store"
                                              ).length < 1 && (
                                                <p id="notAvailable">
                                                  INDISPONÍVEL
                                                </p>
                                              )}
                                              <span className="pull-right">
                                                Retirar na loja
                                              </span>
                                            </Accordion.Toggle>

                                            {+Object.entries(
                                              shipping[index]
                                            )[0][0] ===
                                              +product[0].seller_info
                                                ?.seller_id && (
                                              <div className="ContainerItem2">
                                                <Accordion.Collapse eventKey="2">
                                                  <>
                                                    <h4>Buscar na loja</h4>

                                                    {Object.entries(
                                                      shipping[index]
                                                    )[0][1]
                                                      ?.filter(
                                                        (shipp) =>
                                                          shipp.code ===
                                                          "withdraw-in-store"
                                                      )
                                                      .map((frete, i) => {
                                                        return (
                                                          <div
                                                            className="shipmentBox"
                                                            key={i}
                                                          >
                                                            <section>
                                                              <input
                                                                type="radio"
                                                                checked={
                                                                  shipmentChoice[
                                                                    index
                                                                  ] ===
                                                                  frete.index
                                                                    ? true
                                                                    : false
                                                                }
                                                                onClick={() => {
                                                                  setshipmentChoice(
                                                                    {
                                                                      ...shipmentChoice,

                                                                      [index]:
                                                                        frete.index,
                                                                    }
                                                                  );

                                                                  saveShipping(
                                                                    frete.index,
                                                                    shipping[
                                                                      index
                                                                    ]
                                                                  );
                                                                }}
                                                              />
                                                              <div>
                                                                <h2>
                                                                  {
                                                                    frete.carrier
                                                                  }
                                                                </h2>
                                                                <p>
                                                                  {
                                                                    frete.delivery_time
                                                                  }{" "}
                                                                  dias
                                                                </p>
                                                              </div>
                                                            </section>
                                                            {frete.price > 0 ? (
                                                              <aside>
                                                                +R$
                                                                {frete.price
                                                                  .toFixed(2)
                                                                  .replace(
                                                                    ".",
                                                                    ","
                                                                  )}
                                                              </aside>
                                                            ) : (
                                                              <aside>
                                                                <>
                                                                  FRETE GRÁTIS
                                                                </>
                                                              </aside>
                                                            )}
                                                          </div>
                                                        );
                                                      })}
                                                  </>
                                                </Accordion.Collapse>
                                              </div>
                                            )}
                                          </div>
                                        </S.accordionContainer>
                                      </Accordion>
                                    </S.shipmentContainer>
                                  </S.GeralContainer>
                                )}
                              </div>
                            )
                          )}
                      </div>
                    ))}

                  {cart.length > 0 && (
                    <div className="text-center">
                      <button
                        onClick={handleClear}
                        className="limparCarrinho negativeButton"
                      >
                        LIMPAR CARRINHO
                      </button>
                      <button
                        onClick={() => history.push("/search")}
                        className="continuarComprando positiveButton"
                      >
                        CONTINUAR COMPRANDO
                      </button>
                    </div>
                  )}
                </S.ContainerItemBotoes>

                <S.ContainerTotaisGeral>
                  <S.total>
                    <h4>Estimativa de preços:</h4>
                    <div className="containerDados">
                      <p>
                        Produtos <span>{currencyFormat(carTotal)}</span>
                      </p>
                      <p>
                        Frete
                        <span>
                          {!isNaN(
                            Object.values(shipmentPrice)?.reduce((a, b) => {
                              return a + b[0]?.price;
                            }, 0)
                          )
                            ? currencyFormat(
                                Object.values(shipmentPrice)?.reduce((a, b) => {
                                  return a + b[0]?.price;
                                }, 0)
                              )
                            : currencyFormat(0)}
                        </span>
                      </p>
                      <p>
                        Sub Total{" "}
                        <span>
                          {isNaN(
                            Object.values(shipmentPrice)?.reduce((a, b) => {
                              return a + b[0]?.price;
                            }, 0)
                          )
                            ? currencyFormat(carTotal)
                            : currencyFormat(
                                carTotal +
                                  Object.values(shipmentPrice)?.reduce(
                                    (a, b) => {
                                      return a + b[0]?.price;
                                    },
                                    0
                                  )
                              )}
                        </span>
                      </p>
                    </div>
                    <GoCheckout
                      desabilitado={
                        Object.values(shipmentPrice).length === 0 ||
                        cart.length !== Object.values(shipmentPrice).length ||
                        !localizado
                      }
                      reason={
                        localizado
                          ? Object.values(shipmentPrice) === false
                            ? Object.values(shipmentPrice).length === 0
                              ? cart.length !==
                                Object.values(shipmentPrice).length
                                ? "none"
                                : "ship"
                              : "ship"
                            : "ship"
                          : "address"
                      }
                      refScrollAddress={refScrollAddress}
                      refScrollShip={refScrollShip}
                      modo="anonimo"
                    />
                  </S.total>
                </S.ContainerTotaisGeral>
                {cart.length > 0 && (
                  <S.ContainerClearContinue>
                    <div className="text-center">
                      <hr />
                      <br />

                      <button
                        onClick={handleClear}
                        className="limparCarrinho negativeButton"
                      >
                        LIMPAR CARRINHO
                      </button>
                      <button
                        onClick={() => history.push("/search")}
                        className="continuarComprando positiveButton"
                      >
                        CONTINUAR COMPRANDO
                      </button>
                    </div>
                  </S.ContainerClearContinue>
                )}
              </S.ContainerItemGeral>
            </Container>
            <S.ContainerFooter></S.ContainerFooter>
          </S.produtos>
        </>
      ) : (
        <S.vazio>
          <></>
        </S.vazio>
      )}
      <ToastContainer />
    </>
  );
}

export default TempCart;
