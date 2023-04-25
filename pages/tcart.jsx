import LocationModal from "../components/LocationModal";
import { useLocation } from "../Context/Location";
import TempCart from "../PagesComponents/TempCart";

export default function TempCartPage() {
  const { modal } = useLocation();
  return (
    <>
      {modal && <LocationModal />}
      <TempCart />;
    </>
  );
}
