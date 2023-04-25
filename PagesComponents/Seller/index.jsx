import { useLang } from "../../Context/LangContext";

import api from "../../services/api";
import SellerComponent from "./Seller";

const Seller = ({ data }) => {
  const { routeTranslations } = useLang();

  const mktName = process.env.NEXT_PUBLIC_REACT_APP_NAME;
  const appImagesUrl = process.env.NEXT_PUBLIC_REACT_APP_IMAGES_URL;
  return (
    <SellerComponent
      mktName={mktName}
      api={api}
      ssrData={data}
      appImagesUrl={appImagesUrl}
      routeTranslations={routeTranslations}
    />
  );
};

export default Seller;
