import "react-toastify/dist/ReactToastify.min.css";

import { useContext } from "react";

import { useLang } from "../../Context/LangContext";
import { useCart } from "../../Context/CartLengthContext";
import { useLocation } from "../../Context/Location";
import { Context } from "../../Context/AuthContext";

import api from "../../services/api";
import msLocation from "../../services/msLocation";

import TempRegisterComponent from "./TempRegister";

const TempRegister = () => {
  const { routeTranslations } = useLang();

  const { localizacao } = useLocation();
  const { validaLogin } = useContext(Context);

  const { setCartLength } = useCart();

  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;
  const googleApiKey = process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <>
      <meta
        name="kdt:page"
        content={`${process.env.NEXT_PUBLIC_REACT_APP_DESCRIPTION} - Registro Temporário`}
      />
      <title>{`${process.env.NEXT_PUBLIC_REACT_APP_TITLE} - Registro Temporário`}</title>
      <TempRegisterComponent
        mktName={mktName}
        api={api}
        msLocation={msLocation}
        routeTranslations={routeTranslations}
        setCartLength={setCartLength}
        localizacao={localizacao}
        validaLogin={validaLogin}
        googleApiKey={googleApiKey}
      />
    </>
  );
};

export default TempRegister;
