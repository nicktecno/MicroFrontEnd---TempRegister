import React, { useEffect, useState } from "react";
import Link from "next/link";

// componentes boostrap

import CurrencyFormat from "../../services/currencyFormat";
// Css do componente
import * as S from "./style";
import { useLocation } from "../../Context/Location";

const ProductHorizontalBox = ({ produto, removeItem, handleQtd }) => {
  const [atributos, setAtributos] = useState([]);
  const { localizacao } = useLocation();

  useEffect(() => {
    const filterAttributes = produto.product.attributes
      .map((atributo) => {
        if (atributo.configurable === true) {
          return atributo;
        } else {
          return;
        }
      })
      .filter((filtrado) => filtrado !== undefined);
    setAtributos(filterAttributes);
  }, []);

  return (
    <S.CaixaProduto>
      <S.Container>
        <S.ContainerDadosMobile>
          <S.ContainerDadosImagem>
            <S.ContainerImagem>
              <S.ProdutoImg>
                <Link
                  href={`/sellerproduct/${produto.additional.seller_info.seller_id}/${produto.product.url_key}`}
                  passhref="true"
                >
                  <img
                    alt="Imagem do Produto"
                    src={produto.product.base_image.small_image_url}
                  />
                </Link>
              </S.ProdutoImg>
            </S.ContainerImagem>
            <S.DadosProduto>
              <div className="NomeModelo">
                <h3>{produto.product.name}</h3>
                {atributos.length > 0 && (
                  <ul>
                    {/* {atributos.map((atributo, atributoIndex) => (
                      <li key={atributoIndex}>
                        {atributo.label.charAt(0).toUpperCase() +
                          atributo.label.substr(1)}
                        :{" "}
                        {atributo?.value?.charAt(0).toUpperCase() +
                          atributo?.value?.substr(1)}
                      </li>
                    ))} */}
                  </ul>
                )}
              </div>
            </S.DadosProduto>
          </S.ContainerDadosImagem>
          <S.ProdutoValorMobile>
            <span>Total:</span>{" "}
            {CurrencyFormat(produto.price * produto.quantity)}
          </S.ProdutoValorMobile>
        </S.ContainerDadosMobile>

        <S.quantidade>
          <div className="containerQuantidade">
            <label>Quantidade</label>
            <div className="containerNumeros">
              <div
                className="subtracao positiveButton"
                onClick={() => {
                  handleQtd(
                    produto.id,
                    produto.quantity <= 1 ? 1 : produto.quantity - 1
                  );
                }}
              >
                -
              </div>
              <div className="qtd">{produto.quantity}</div>{" "}
              <div
                className="adicao positiveButton"
                onClick={() => {
                  handleQtd(produto.id, produto.quantity + 1);
                }}
              >
                +
              </div>
            </div>
          </div>
        </S.quantidade>

        <S.ProdutoValor>
          <span>Unidade:</span> {CurrencyFormat(produto.price)}
          <br className="visible-xs" /> <span>Total:</span>{" "}
          {CurrencyFormat(produto.price * produto.quantity)}
        </S.ProdutoValor>
        <S.ContainerMobileAtivo>
          <S.DeleteIcon onClick={() => removeItem(produto)} />
          <S.quantidadeMobile>
            <div className="containerQuantidade">
              <div className="containerNumeros">
                <div
                  className="subtracao positiveButton"
                  onClick={() => {
                    handleQtd(
                      produto.id,
                      quantidade <= 1 ? 1 : produto.quantity - 1
                    );
                  }}
                >
                  -
                </div>
                <div className="qtd">{produto.quantity}</div>{" "}
                <div
                  className="adicao positiveButton"
                  onClick={() => {
                    handleQtd(produto.id, produto.quantity + 1);
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
  );
};

export default ProductHorizontalBox;
