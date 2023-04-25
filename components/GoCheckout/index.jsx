import React from "react";

// componentes boostrap

import notification from "../../services/notification";

// Css do componente
import * as S from "./style";
import { useRouter } from "next/router";

function GoCheckout({
  modo,
  desabilitado,
  refScrollAddress,
  refScrollShip,
  reason,
}) {
  const history = useRouter();
  return (
    <>
      <S.WhiteLabel />
      <S.box>
        {modo && modo === "anonimo" ? (
          <S.bt
            className="anonymous"
            onClick={
              desabilitado
                ? () => {
                    if (reason === "ship") {
                      refScrollShip.current[0].scrollIntoView({
                        behavior: "smooth",
                      });
                      notification(
                        `Verifique se você selecionou os fretes`,
                        "error",
                        4000
                      );
                    } else if ((reason = "address")) {
                      refScrollAddress.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                      notification(
                        `Verifique o endereço para calcularmos o frete`,
                        "error",
                        4000
                      );
                    } else {
                      notification(
                        `Verifique o endereço e a seleção o frete`,
                        "error",
                        4000
                      );
                    }
                  }
                : () => history.push("/tempregister")
            }
          >
            <h3>COMPRAR</h3>
          </S.bt>
        ) : (
          <S.bt
            onClick={
              desabilitado
                ? () => {
                    if (reason === "ship") {
                      refScrollShip.current[0].scrollIntoView({
                        behavior: "smooth",
                      });
                      notification(
                        `Verifique se você selecionou os fretes`,
                        "error",
                        4000
                      );
                    } else if ((reason = "address")) {
                      refScrollAddress.current.scrollIntoView({
                        behavior: "smooth",
                      });
                      notification(
                        `Verifique se você tem um endereço padrão de entrega`,
                        "error",
                        4000
                      );
                    } else {
                      notification(
                        `Verifique se você tem um endereço padrão e selecionou o frete`,
                        "error",
                        4000
                      );
                    }
                  }
                : () => history.push("/checkout/payment")
            }
          >
            <h3>FINALIZAR PAGAMENTO</h3>
          </S.bt>
        )}
      </S.box>
    </>
  );
}

export default GoCheckout;
