import SellerPage from "../../PagesComponents/Seller";
import apiUnlogged from "../../services/apiUnlogged";

export default function Seller({ data }) {
  return (
    <>
      <meta
        name="kdt:page"
        content={`${process.env.NEXT_PUBLIC_REACT_APP_DESCRIPTION} - Lojista`}
      />
      <title>{`${process.env.NEXT_PUBLIC_REACT_APP_TITLE} - Lojista`}</title>
      <SellerPage data={data} />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { name } = ctx.params;
  const response = await apiUnlogged.get(`/seller/store/${name[0]}?page=1`);
  return {
    props: {
      data: response.data,
    },
  };
}
