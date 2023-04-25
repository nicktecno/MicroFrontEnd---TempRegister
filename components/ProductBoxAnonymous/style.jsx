import styled from "styled-components";

import { generateMedia } from "styled-media-query";
import { TrashFill } from "@styled-icons/bootstrap/TrashFill";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  netbook: "830px",
  tablet: "767px",
  mobile: "576px",
  irico: "414px",
  ipobre: "375px",
  pobre: "330px",
});

export const DeleteIcon = styled(TrashFill)`
  color: #292728;
  height: 35px;
  width: 35px;
  margin-right: 0px;
  margin-left: 30px;
  cursor: pointer;
  transition: 0.3s;

  ${customMedia.lessThan("tablet")`
  margin-left:0px;
  `}

  ${customMedia.lessThan("465px")`
  width:45px;
  height:45px;
  margin-left:20px;
  
  `}


${customMedia.lessThan("ipobre")`
margin-left:0px;

`}

${customMedia.lessThan("pobre")`
height: 35px;
  width: 35px;

`}

  :hover {
    color: var(--default-color-hover);
  }
`;

export const Container = styled.div`
  display: flex;
  background: #f4f4f5;
  padding: 30px;
  align-items: center;

  ${customMedia.lessThan("tablet")`
  
  justify-content:center;
  `}
`;
export const ContainerImagem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;

  ${customMedia.lessThan("465px")`
  margin-bottom:20px;
  
  `}

  ${customMedia.lessThan("pobre")`
margin-right:0px;

`}
`;

export const ProdutoImg = styled.p`
  cursor: pointer;
  background-color: #fff;
  padding: 10px;
  width: 100px;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: cover;
    width: 100%;
    max-width: 100%;
    height: auto;
    max-height: 260px;
  }
`;

export const CaixaProduto = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  -webkit-box-shadow: rgb(231 231 231) 1px 2px 16px;
  box-shadow: rgb(231 231 231) 1px 2px 16px;

  img {
    width: 100%;
    height: auto;
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
  }
  h4 {
    font-size: 14px;
    color: #595959;
  }

  ul {
    padding: 0px;
    list-style: none;
    margin: 5px 0px;

    li {
      margin: 6px 0px;
      font-size: 12px;
    }
  }
`;

export const DadosProduto = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;

  .NomeModelo {
    display: flex;
    flex-direction: column;
    width: 150px;
    div {
      font-size: 12px;
      font-weight: 500;
    }
  }
  .Cor {
    display: flex;
  }
  .circleCart {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    border: 1px solid #cfcfcf;
    margin: 0 5px;

    &.Branco {
      background-color: #fff;
    }

    &.Prata {
      background-color: #bec2cb;
    }

    &.Preto {
      background-color: #000;
    }

    &.left {
      float: left;
      margin-right: 5px;
    }
  }
`;

export const quantidade = styled.div`
  width: 100%;
  max-width: 150px;
  border-radius: 20px;
  text-align: center;
  font-size: 16px;
  position: relative;
  display: flex;
  margin: 0px 20px 0px 0px;

  align-items: center;
  justify-content: center;

  ${customMedia.lessThan("tablet")`
    display:none;
  `}

  .containerQuantidade {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .containerNumeros {
    display: flex;
    gap: 5px;
  }

  .adicao {
    border: 0px;

    width: 30px;
    font-weight: bold;
    transition: 0.3s;
    :hover {
      background: var(--default-color);
    }
  }
  .subtracao {
    width: 30px;
    font-weight: bold;
    transition: 0.3s;
    border: 0px;
    :hover {
      background: var(--default-color);
    }
  }

  .qtd {
    width: 30px;
    font-size: 18px;
    font-weight: 700;
  }

  div {
    margin: 0px;
    padding: 5px;
    cursor: pointer;
  }

  span {
    margin-left: 15px;
    margin-right: 15px;
  }

  ${customMedia.lessThan("tablet")`
      margin-bottom: 20px;
  `}
`;

export const ProdutoValor = styled.div`
  display: flex;
  margin-right: 20px;
  align-items: center;
  flex-direction: column;
  color: #292728;
  font-size: 18px;
  font-weight: 700;
  gap: 10px;
  width: 150px;

  ${customMedia.lessThan("tablet")`
  display:none;
  `}

  span {
    font-weight: bold;
    color: #595959;
    font-size: 12px;
  }
  p {
    font-weight: bold;
  }
`;

export const ContainerMobileAtivo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
export const quantidadeMobile = styled.div`
  display: none;

  ${customMedia.lessThan("tablet")`
    display:flex;
    width: 100%;
  max-width: 150px;
  border-radius: 20px;
  text-align: center;
  font-size: 16px;
  position: relative;
  display: flex;
  margin: 0px;
  margin-left:10px;

  align-items: center;
  justify-content: center;

  

  .containerQuantidade {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .containerNumeros {
    display: flex;
    gap: 5px;
  }

  .adicao {

    width: 30px;
    font-weight: bold;
    transition: 0.3s;
    :hover {
			background: var(--default-color);
    }
  }
  .subtracao {

    width: 30px;
    font-weight: bold;
    transition: 0.3s;

    :hover {
			background: var(--default-color);
    }
  }

  .qtd {
    font-size: 18px;
    font-weight: 700;
  }

  div {
    margin: 0px;
    padding: 5px;
    cursor: pointer;
  }

  span {
    margin-left: 15px;
    margin-right: 15px;
  }



  `}

  ${customMedia.lessThan("465px")`
  margin-left:20px;
  .adicao {
    display:flex;
    justify-content:center;
    align-items:center;
  
    width: 40px;
    height:40px;
    font-size:20px;
    font-weight: bold;
    transition: 0.3s;
    :hover {
      // background: #b9cb96;
    }
  }
  .subtracao {
    display:flex;
    justify-content:center;
    align-items:center;
   
    width: 40px;
    height:40px;
    font-size:20px;
    font-weight: bold;
    transition: 0.3s;

    :hover {
      // background: #b9cb96;
    }
  }

  .qtd {
    display:flex;
    align-items:center;
    font-size: 20px;
    font-weight: 700;
  }
  `}

${customMedia.lessThan("ipobre")`
margin-left:0px;

`}

${customMedia.lessThan("pobre")`
.adicao {
    display:flex;
    justify-content:center;
    align-items:center;

    width: 30px;
    height:30px;
    font-size:16px;
    font-weight: bold;
    transition: 0.3s;
    :hover {
      // background: #b9cb96;
    }
  }
  .subtracao {
    display:flex;
    justify-content:center;
    align-items:center;
  
    width: 30px;
    height:30px;
    font-size:16px;
    font-weight: bold;
    transition: 0.3s;

    :hover {
      // background: #b9cb96;
    }
  }

  
`}
`;

export const ContainerDadosImagem = styled.div`
  display: flex;

  ${customMedia.lessThan("465px")`
  flex-direction:column;
  
  `}
`;

export const ContainerDadosMobile = styled.div`
  display: flex;

  ${customMedia.lessThan("tablet")`
  flex-direction:column;
  
  `}
  ${customMedia.lessThan("pobre")`
  margin-left:10px;
  
  `}
`;

export const ProdutoValorMobile = styled.div`
  display: none;

  ${customMedia.lessThan("tablet")`
    
  display: flex;
  margin-top:10px;
  margin-right: 20px;
  align-items: center;
  color: #292728;
  font-size: 18px;
  font-weight: 700;
  gap: 10px;


  span {
    font-weight: bold;
    color: #292728;
    font-size: 18px;
  }
  p{
    margin: 0px;
  }
  `}

  ${customMedia.lessThan("pobre")`
margin-right:0px;
`}
`;
