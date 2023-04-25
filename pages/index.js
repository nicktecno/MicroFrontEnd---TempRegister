import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const history = useRouter();
  useEffect(() => {
    history.push("/seller/anv2-aquecedores");
  }, []);

  return <></>;
}
