import React, { useState } from "react";
import Link from "next/link";
// componentes boostrap
import { Col, Row } from "react-bootstrap";

import CurrencyFormat from "../../services/currencyFormat";
// Css do componente
import * as S from "./style";

// gql
import { useQuery } from "@apollo/client";

import { GET_PRODUCT } from "./Querys";

const ProductBoxAnonymous = ({ produto, removeItem, handleQtd, sellerId }) => {
  const [quantidade, setQuantidade] = useState(produto.quantity);

  function showAttrValue(products_attrs, attr) {
    let attr_values = "";
    products_attrs.map((attrs, index) => {
      if (attrs.attribute[0].code == attr) {
        attr_values = attrs.text_value;
      }
    });

    return attr_values;
  }

  const {
    data: productData,
    // eslint-disable-next-line no-unused-vars
    error: productError,
    // eslint-disable-next-line no-unused-vars
    loading: productLoading,
  } = useQuery(GET_PRODUCT, {
    variables: {
      id: parseInt(produto.product),
    },
  });

  return (
    <>
      {productLoading ? (
        <Row>
          <Col>
            <S.CaixaProduto>Carregando Produto</S.CaixaProduto>
          </Col>
        </Row>
      ) : (
        <>
          {productData && (
            <S.CaixaProduto>
              <S.Container>
                <S.ContainerDadosMobile>
                  <S.ContainerDadosImagem>
                    <S.ContainerImagem>
                      <S.ProdutoImg>
                        <Link
                          href={`/sellerproduct/${sellerId}/${produto.product_url}`}
                        >
                          {
                            <img
                              alt="RicardoEletro"
                              src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGES_URL}/${productData.product.images[0].path}`}
                            />
                          }
                        </Link>
                      </S.ProdutoImg>
                    </S.ContainerImagem>
                    <S.DadosProduto>
                      <div className="NomeModelo">
                        <>
                          <h3>
                            {showAttrValue(
                              productData.product.attributes,
                              "name"
                            )}
                          </h3>
                          {typeof (produto.atributos !== "object") &&
                            produto.atributos.length > 0 && (
                              <>
                                {produto.atributos
                                  .slice(0, 3)
                                  .map((atributo, index) => (
                                    <div key={index}>
                                      {atributo.attribute[0].admin_name
                                        .charAt(0)
                                        .toUpperCase() +
                                        atributo.attribute[0].admin_name.substr(
                                          1
                                        )}
                                      :{" "}
                                      {atributo.value !== undefined &&
                                      atributo.value
                                        ? atributo.value
                                            .charAt(0)
                                            .toUpperCase() +
                                          atributo.value.substr(1)
                                        : "Padrão"}
                                    </div>
                                  ))}
                              </>
                            )}
                        </>
                      </div>
                    </S.DadosProduto>
                  </S.ContainerDadosImagem>

                  <S.ProdutoValorMobile>
                    <span>Total:</span>{" "}
                    <p>{CurrencyFormat(produto.valor * produto.quantity)}</p>
                  </S.ProdutoValorMobile>
                </S.ContainerDadosMobile>

                <S.quantidade>
                  <div className="containerQuantidade">
                    <label>Quantidade</label>
                    <div className="containerNumeros">
                      <button
                        className="subtracao positiveButton"
                        onClick={() => {
                          handleQtd(
                            produto.product,
                            quantidade <= 1 ? 1 : quantidade - 1,
                            sellerId
                          );
                          setQuantidade(quantidade <= 1 ? 1 : quantidade - 1);
                        }}
                      >
                        -
                      </button>
                      <div className="qtd">{quantidade}</div>{" "}
                      <button
                        className="adicao positiveButton"
                        onClick={() => {
                          handleQtd(produto.product, quantidade + 1, sellerId);
                          setQuantidade(quantidade + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </S.quantidade>

                <S.ProdutoValor>
                  <span>Unidade:</span>
                  <p>{CurrencyFormat(produto.valor)}</p>{" "}
                  <br className="visible-xs" /> <span>Total:</span>{" "}
                  <p> {CurrencyFormat(produto.valor * produto.quantity)}</p>
                </S.ProdutoValor>

                <S.ContainerMobileAtivo>
                  <S.DeleteIcon
                    onClick={() => removeItem(produto.product, sellerId)}
                  />
                  <S.quantidadeMobile>
                    <div className="containerQuantidade">
                      <div className="containerNumeros">
                        <div
                          className="subtracao positiveButton"
                          onClick={() => {
                            handleQtd(
                              produto.product,
                              quantidade <= 1 ? 1 : quantidade - 1,
                              sellerId
                            );
                            setQuantidade(quantidade <= 1 ? 1 : quantidade - 1);
                          }}
                        >
                          -
                        </div>
                        <div className="qtd">{quantidade}</div>{" "}
                        <div
                          className="adicao positiveButton"
                          onClick={() => {
                            handleQtd(
                              produto.product,
                              quantidade + 1,
                              sellerId
                            );
                            setQuantidade(quantidade + 1);
                          }}
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </S.quantidadeMobile>
                </S.ContainerMobileAtivo>
              </S.Container>
            </S.CaixaProduto>
          )}
        </>
      )}
    </>
  );
};

export default ProductBoxAnonymous;
