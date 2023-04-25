import "react-toastify/dist/ReactToastify.min.css";

import { useLang } from "../../Context/LangContext";
import { useCart } from "../../Context/CartLengthContext";
import { useLocation } from "../../Context/Location";

import apiUnlogged from "../../services/apiUnlogged";
import TempCartComponent from "./TempCart";

const TempCart = () => {
  const { routeTranslations } = useLang();

  const { setCartLength, cartLength } = useCart();
  const { setModal, localizado } = useLocation();

  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;

  return (
    <>
      <meta
        name="kdt:page"
        content={`${process.env.NEXT_PUBLIC_REACT_APP_DESCRIPTION} - Carrinho Temporário`}
      />
      <title>{`${process.env.NEXT_PUBLIC_REACT_APP_TITLE} - Carrinho Temporário`}</title>
      <TempCartComponent
        mktName={mktName}
        apiUnlogged={apiUnlogged}
        routeTranslations={routeTranslations}
        cartLength={cartLength}
        setCartLength={setCartLength}
        localizado={localizado}
        setModal={setModal}
      />
    </>
  );
};

export default TempCart;
