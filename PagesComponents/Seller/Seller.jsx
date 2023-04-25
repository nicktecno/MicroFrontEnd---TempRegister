import React, { useState } from "react";

import * as S from "./style";

import { User } from "@styled-icons/boxicons-regular/User";
import Loading from "../../components/Loading";

import { useRouter } from "next/router";

import ProductListApiGql from "../../components/ProductListApiGql";

function Seller({ api, ssrData, routeTranslations, mktName, appImagesUrl }) {
  const [seller, setSeller] = useState(ssrData.data);
  const [hits, setHits] = useState(ssrData.data.products.data);
  const [page, setPage] = useState(1);
  const history = useRouter();

  async function verMais() {
    try {
      const response = await api.get(
        `/seller/store/${history.query.name}?page=${page + 1}`
      );
      setSeller(response.data.data);
      setPage(page + 1);
      const hitsNovo = response.data.data.products.data;
      const concatHits = hits.concat(hitsNovo);

      setHits(concatHits);
    } catch {}
  }

  return (
    <>
      {hits.length > 0 ? (
        <>
          <S.vendidopor>
            <div className="containerTopo">
              <div className="containerBanner" />
              <div className="coberturaVerde" />
              <div className="logoLojista">
                <div className="containerImage">
                  {seller.logo ? (
                    <img src={seller.logo} alt="Seller logo" />
                  ) : (
                    <User />
                  )}
                </div>
                <S.DadosSeller>
                  <div className="containerDados">
                    <div className="dadosEsquerda">
                      <h2>{seller.name}</h2>
                      <h3>
                        Aberto das {seller.open} às {seller.close}
                      </h3>
                    </div>
                  </div>
                </S.DadosSeller>
              </div>
            </div>
          </S.vendidopor>

          {hits.length > 0 && (
            <S.ContainerProdutos>
              <S.produtos>
                <ProductListApiGql
                  hits={hits}
                  page="seller"
                  mktName={mktName}
                  appImagesUrl={appImagesUrl}
                />
                {page !== seller.products.last_page && (
                  <button className="positiveButton" onClick={verMais}>
                    VER MAIS
                  </button>
                )}
              </S.produtos>
            </S.ContainerProdutos>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Seller;
