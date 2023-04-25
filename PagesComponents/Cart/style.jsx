import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { Check } from "@styled-icons/boxicons-regular/Check";
import { CheckSquare } from "@styled-icons/boxicons-regular/CheckSquare";
import { Truck } from "@styled-icons/boxicons-solid/Truck";
import { Store } from "@styled-icons/fa-solid/Store";
import { ErrorWarning } from "@styled-icons/remix-line/ErrorWarning";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  netbook: "830px",
  tablet: "768px",
  mobile: "576px",
  irico: "414px",
  ipobre: "375px",
  pobre: "330px",
});

export const Warning = styled(ErrorWarning)`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  color: #ce171f;
`;

export const StoreIcon = styled(Store)`
  height: 30px;
  width: 30px;
  min-height: 30px;
  min-width: 30px;
  margin: 0px 10px 0px 5px;
  align-self: center;
`;

export const TruckIcon = styled(Truck)`
  height: 30px;
  width: 30px;
  min-height: 30px;
  min-width: 30px;
  margin: 0px 10px 0px 5px;
  align-self: center;
`;

export const DeleteIcon = styled(CloseOutline)`
  color: #ce171f;
  height: 24px;
  width: 24px;
  margin-right: 0px;
  cursor: pointer;
`;

export const CheckIcon = styled(CheckSquare)`
  color: #ce171f;
  height: 24px;
  width: 24px;
  margin-right: 0px;
  cursor: pointer;
`;

export const CloseIcon = styled(Check)`
  color: #444;
  height: 24px;
  width: 24px;
  margin-right: 0px;
  cursor: pointer;
`;

export const warningIcon = styled(ErrorWarning)`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  color: #ce171f;
`;

export const buscando = styled.div`
  width: 100%;
  height: 65px;
  position: relative;

  margin-bottom: 20px;

  h4 {
    font-size: 13px;
    color: black;
    padding-top: 40px;

    span {
      font-weight: bold;
    }
  }
`;

export const ModalEscolherEndereco = styled.div`
  @supports (backdrop-filter: opacity(1)) {
    &.no-support {
      display: none;
    }
  }
  width: 100%;
  height: 100%;

  backdrop-filter: blur(6px) contrast(0.8) !important;
  @-moz-document url-prefix() {
    background-color: #0000006c;
  }
  position: fixed;

  left: 0;
  top: 0;
  z-index: 99;
  display: none;

  &.ativo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${customMedia.lessThan("tablet")`
    width:100%;
    height:80vh;
    position:fixed;
    margin-top:90px;
    
  `} @media(min-height: 900px) and (max-height: 1024px) {
    height: 100vh;
  }
`;

export const Transparente = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const centroEscolherEndereco = styled.div`
  display: flex;
  width: 500px;
  height: 540px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;
  z-index: 99999;

  button {
    cursor: pointer;
  }

  ${customMedia.lessThan("tablet")`
  margin-top:-100px;
    width:100%;
    height:auto;
    overflow:auto;
    padding-bottom:20px;
    
    ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #f4f4f5;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #ccc;
  }
    
  `}
  .cabecalho {
    display: flex;
    font-weight: 600;
    font-size: 20px;
    width: 100%;
    height: 50px;
    background: var(--default-color);
    color: var(--title-modal-color);
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .blocoGeral {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .SemEndereco {
    display: flex;
    font-size: 20px;
    height: 300px;
    justify-content: center;
    align-items: center;
  }

  .blocoRolagem {
    display: flex;
    flex-direction: column;
    width: 100%;

    padding: 30px 30px;
    overflow: auto;
    height: 300px;

    ::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #f4f4f5;
    }

    /* Handle */

    ::-webkit-scrollbar-thumb {
      background: #ccc;
      transition: 0.3s;
    }

    /* Handle on hover */

    ::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }
  }

  .novoEnderecoEscolhido {
    background: #ccc;
    display: flex;
    align-items: center;
    padding: 20px;
    margin-bottom: 10px;
    cursor: pointer;
    border: 2px solid #505840;
    height: auto;
    width: 100%;
  }

  .containerEndereco {
    background: #77777729;
    display: flex;
    align-items: center;
    padding: 20px;
    margin-bottom: 10px;
    cursor: pointer;
    border: 2px solid transparent;
    height: auto;
    width: 100%;
    :hover {
      border: 2px solid #959694;
    }
  }

  .containerEnderecoDefault {
    width: 100%;
    background: #ccc;
    display: flex;
    align-items: center;
    padding: 20px;
    margin-bottom: 10px;
    height: auto;

    border: 2px solid transparent;
  }

  .containerImage {
    width: 30px;
    margin: 0px 10px;

    ${customMedia.lessThan("ipobre")`
    display:none;
  `}
    svg {
      width: 30px;
    }
  }

  .containerDados {
    display: flex;
    flex-direction: column;
    text-align: start;
    margin-left: 20px;
  }

  .containerBotoes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    ${customMedia.lessThan("tablet")`
       padding:10px 0px 0px 0px;
       
       
  
    flex-direction:column-reverse;
  `}
    .botaoNao {
      width: 200px;
      padding: 10px 50px 10px 50px;
      font-weight: bold;

      cursor: pointer;
      transition: 0.3s;
      font-weight: bold;

      ${customMedia.lessThan("tablet")`
   width:80%;
  `}
    }

    .botaoSim {
      width: 200px;
      padding: 10px 50px 10px 50px;

      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
      border: 0;
      ${customMedia.lessThan("tablet")`
   width:80%;
   `}
    }

    .botaoDesativado {
      cursor: not-allowed;
      width: 200px;
      padding: 10px 50px 10px 50px;

      font-weight: bold;
      border: 0;
      transition: 0.3s;
      ${customMedia.lessThan("tablet")`
   width:80%;
   `}
    }
  }

  .cadastrarEndereco {
    width: 300px;
    margin-top: 10px;
    align-self: center;
    padding: 10px 50px 10px 50px;

    cursor: pointer;
    transition: 0.3s;
    font-weight: 600;

    ${customMedia.lessThan("tablet")`
   width:80%;
   `} @media(max-height: 764px) {
      margin-bottom: 100px;
    }
  }

  .containerBotoesApenasCadastro {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    gap: 15px;

    .botaoNao {
      width: 300px;
      padding: 10px 50px 10px 50px;
      cursor: pointer;
      transition: 0.3s;

      ${customMedia.lessThan("tablet")`
   width:90%;
  `}
      :hover {
      }
    }

    .botaoSim {
      width: 300px;
      padding: 10px 50px 10px 50px;
      cursor: pointer;
      transition: 0.3s;
      border: 0;
      ${customMedia.lessThan("tablet")`
   width:90%;
   `}
    }
  }
`;

export const TitleEndereco = styled.h3`
  font-size: 18px;
  margin: 0px 0px 10px;
  color: #000;
  font-weight: 700;
`;

export const ContainerEndereco = styled.div`
  display: flex;
  align-items: center;
  background: #f4f3f4;
  width: 100%;
  padding: 25px 20px;
  justify-content: space-between;
  box-shadow: rgb(134 133 133 / 16%) 3px 3px 80px,
    rgb(92 91 91 / 23%) 0px 0px 3px;

  ${customMedia.lessThan("tablet")`
      gap:20px;
      text-align:center;
      flex-direction:column;
      justify-content:center;
      
      `}
  .containerEsquerda {
    display: flex;
    align-items: center;
  }

  .containerImage {
    width: 30px;
    margin-right: 20px;

    ${customMedia.lessThan("tablet")`
    
    display:none;
    `}
  }

  .botaoMudarEndereco {
    outline: none;
    border: 0;

    padding: 10px 90px;
    display: flex;
    transition: 0.3s;
    font-weight: 600;

    ${customMedia.lessThan("notebook")`
      padding:10px 50px;
    `}
    ${customMedia.lessThan("tablet")`
      padding:10px 90px;
    `}
  }
`;

export const ModalAtualizarAdicionar = styled.div`
  @supports (backdrop-filter: opacity(1)) {
    &.no-support {
      display: none;
    }
  }
  width: 100%;
  height: 100%;

  backdrop-filter: blur(6px) contrast(0.8) !important;
  @-moz-document url-prefix() {
    background-color: #0000006c;
  }

  position: fixed;

  left: 0;
  top: 0;
  z-index: 99;
  display: none;

  &.ativo {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${customMedia.lessThan("tablet")`
    width:100%;
    height:80vh;
    position:fixed;
    margin-top:90px;
    
  `} @media(min-height: 900px) and (max-height: 1024px) {
    height: 100vh;
  }
`;

export const centroAdicionarEndereco = styled.div`
  display: flex;
  width: 700px;
  height: 520px;
  background: white;
  text-align: center;
  color: black;
  flex-direction: column;
  position: absolute;
  z-index: 99999;

  .location {
    font-weight: bold;
  }

  .loading {
    width: 50px;
  }

  ${customMedia.lessThan("tablet")`
    width:100%;
    height:100%;
    overflow:auto;
    
    ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #c7c7c7;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #6c7a89;
  }
    
  `}
  .cabecalho {
    display: flex;
    font-weight: 600;
    font-size: 20px;
    width: 100%;
    height: 50px;
    background: var(--default-color);
    color: var(--title-modal-color);
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .title {
    width: 100%;
    padding: 40px;
  }

  h3 {
    font-weight: 600;
    align-content: center;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 20px;
  }

  .botaoLocalizacao {
    width: 100%;
    padding: 10px 50px 10px 50px;

    cursor: pointer;
    transition: 0.3s;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      margin-right: 5px;
    }
  }

  .containerDuplo {
    display: flex;
    width: 100%;

    align-items: center;
    gap: 3%;
    ${customMedia.lessThan("tablet")`
    
  
    flex-direction:column;
  `}
  }

  input {
    height: 45px;
    width: 100%;
    padding-left: 10px;
    font-size: 14px;
    margin-bottom: 10px;
    border: none;
    background-color: #f7f7f79e;
    border-bottom: solid 2px var(--input-border-color);
    transition: 0.3s;
    :hover {
      border-bottom: solid 2px var(--input-border-color-hover);
    }
  }

  input::placeholder {
    font-size: 12px;
  }

  .containerBotoes {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    ${customMedia.lessThan("tablet")`
       padding: 40px;
       padding-top:10px;
       margin-bottom:20px;
  
    flex-direction:column-reverse;
  `}
    .botaoNao {
      width: 200px;
      font-weight: bold;
      padding: 10px 50px 10px 50px;
      cursor: pointer;
      transition: 0.3s;

      ${customMedia.lessThan("tablet")`
   width:100%;
  `}
      :hover {
      }
    }

    .botaoSim {
      width: 200px;
      font-weight: bold;
      padding: 12px 50px 12px 50px;
      cursor: pointer;
      transition: 0.3s;
      ${customMedia.lessThan("tablet")`
   width:100%;
   `}
    }
  }
`;

export const produtos = styled.div`
  position: relative;

  .form-control {
    font-size: 12px;
    margin: 10px 0px;
    width: 100%;
    height: 50px;
    background-color: #f1f0f2;
    padding: 5px 10px;
    font-size: 11px;
    color: #7f7f7f;
    display: block;
    border: 0px;
    border-radius: 5px;
    -webkit-box-shadow: 0px 3px 13px 3px rgb(0 0 0 / 10%);
    -moz-box-shadow: 0px 3px 13px 3px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 3px 13px 3px rgb(0 0 0 / 10%);
  }
`;

export const ContainerSemEndPadrao = styled.div`
  display: flex;
  background: #f4f4f5;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
  padding: 20px 30px;
  justify-content: space-between;
  border: solid 2px #ce171f;
  scroll-margin-top: 100px;

  ${customMedia.lessThan("tablet")`
      gap:20px;
      text-align:center;
      flex-direction:column;
      justify-content:center;
      
      `}
  p {
    color: #ce171f;
    text-align: center;
    align-items: center;
    align-content: center;
    margin: 0;
    font-size: 18px;
  }

  .botaoSim {
    width: 200px;
    padding: 10px 50px 10px 50px;
    cursor: pointer;
    transition: 0.3s;
    border: 0;
    text-align: center;
    ${customMedia.lessThan("tablet")`
   width:90%;
   `}
  }
`;

export const imgitem = styled.div`
  width: 160px;

  img {
    width: 100%;
    height: auto;
  }
`;

export const ContainerItemGeral = styled.div`
  display: flex;
  justify-content: space-between;
  ${customMedia.lessThan("notebook")`
        flex-direction:column;
    `}
`;
export const ContainerItemBotoes = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  ${customMedia.lessThan("tablet")`
   margin-bottom:0px;`}
  .text-center {
    ${customMedia.lessThan("notebook")`
      margin-top:20px;
      display:none;
      `}

    ${customMedia.lessThan("tablet")`
    display:flex;
    gap:10px;
    margin:50px 0px  30px 0px;
    justify-content:center;
    align-items:center;
      flex-direction:row;`}

    ${customMedia.lessThan("420px")`  
   height:60px;

    `}
  }

  .limparCarrinho {
    border: 0;
    width: 220px;
    padding: 10px 0;
    margin-right: 10px;
    transition: 0.3s;
    font-weight: 600;
    ${customMedia.lessThan("420px")`  
   height:100%;
   width:100%
    `}
  }

  .continuarComprando {
    border: 0;
    width: 220px;
    padding: 12px 0;
    margin-right: 10px;

    transition: 0.3s;
    font-weight: 550;
    ${customMedia.lessThan("420px")`  
   height:100%;
   width:100%
    `}
  }
`;

export const remersa = styled.div`
  margin: 20px 0px;
  h4 {
    font-size: 14px;
    color: var(--font-color);

    span {
      cursor: pointer;
      text-decoration: underline;
      font-weight: bold;
      transition: 0.3s;
      color: var(--font-color);
      :hover {
        color: var(--default-color-hover);
      }
    }
  }
`;

export const ContainerFrete = styled.div`
  display: flex;
  justify-content: flex-start;

  select {
    display: flex;

    background-color: #f4f3f4;

    border: 0px;

    width: auto;
    padding: 10px 20px;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    transition: 0.3s;

    ${customMedia.lessThan("notebook")`
      min-width:auto;
      max-width:100%;
      
      `}

    ${customMedia.lessThan("tablet")`
      font-size:12px;
     
      
      `}

    ${customMedia.lessThan("ipobre")`
      font-size:10px;
     
      
      `}
    ${customMedia.lessThan("pobre")`
      font-size:10px;
      padding: 10px 10px;
      
      `}
  }

  select option {
    display: flex;

    background-color: #f4f3f4;
    color: black;

    ${customMedia.lessThan("notebook")`
      min-width:auto;
      max-width:100%;
      
      `}

    ${customMedia.lessThan("tablet")`
      font-size:12px;
     
      
      `}
    ${customMedia.lessThan("ipobre")`
      font-size:10px;
     
      
      `}
  }
`;

export const ContainerTotaisGeral = styled.div`
  ${customMedia.lessThan("tablet")`
    margin-bottom:50px;
  `}
  display: flex;
`;

export const quantidade = styled.div`
  width: 80px;
  height: 30px;
  background-color: #0000000f;
  border-radius: 20px;
  text-align: center;
  padding-top: 5px;
  font-size: 14px;
  position: relative;
  right: 10px;
  margin-bottom: 40px;

  span {
    margin-left: 15px;
    margin-right: 15px;
  }

  ${customMedia.lessThan("notebook")`
   width:100%;
   display:flex;
   right:0px;
  `}
`;

export const total = styled.div`
  margin-top: 23px;
  margin-left: 20px;
  margin-bottom: 25px;

  h4 {
    color: #000;
    font-weight: bold;
    ${customMedia.lessThan("tablet")`
   text-align:center;
  `}
  }

  .containerDados {
    box-shadow: rgb(134 133 133 / 16%) 3px 3px 80px,
      rgb(92 91 91 / 23%) 0px 0px 3px;
    background: #f4f3f4;
    padding: 30px 15px;
    padding-bottom: 70px;

    ${customMedia.lessThan("notebook")`

   padding:70px 50px;
  `}
  }

  ${customMedia.lessThan("notebook")`
   width:100% !important;

  `}
  ${customMedia.lessThan("tablet")`
   margin-top: 0px;
  margin-left: 0px;
  margin-bottom: 0px;

  `}
  .produtosPreco {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .cupomNome {
    font-size: 18px;
    width: 310px;

    img {
      max-width: 27px;
      margin-bottom: 7px;
    }

    svg {
      transition: 0.3s;
    }

    ${customMedia.lessThan("desktop")`
	width: 205px;

	`}

    ${customMedia.lessThan("notebook")`
	width: auto;

	`}
  }

  p {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 18px;
    color: #000;
    margin-bottom: 30px;

    span {
      margin-top: 15px;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }

    &.total {
      color: #000;

      span {
        font-size: 26px;
      }
    }
  }

  .descontoBox {
    input {
      width: 100%;
      height: 50px;
      margin-top: 15px;

      border: 0px;
      font-size: 16px;
      color: #707070;
      padding-left: 15px;
      transition: 0.3s;
      border-bottom: solid 1px var(--input-border-color);
      ${customMedia.lessThan("desktop")`
      margin-top:0px;`}
      :hover {
        border-bottom: solid 1px var(--input-border-color-hover);
      }
    }

    button {
      color: #000;
      font-size: 14px;
      background-color: #fff0;
      height: 50px;
      top: -50px;
      right: 10px;
      z-index: 0;
      float: right;
      position: relative;
      border: none;
      margin-right: 10px;
      font-weight: bold;
      transition: 0.3s;

      :hover {
        color: var(--default-color);
      }

      ${customMedia.lessThan("desktop")`
      top: 10px;
      float:left;
      left:0px;
      margin-bottom:50px;
      color:var(--title-color);
      background-color: var(--default-color);
      width:100%;
      font-weight:500;
      font-size:12px;
      
      :hover {
        color:var(--title-color);
        background-color: var(--default-color-hover);
      }

  `}
    }
  }

  .containerChecks {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-left: 10px;
  }

  .checks {
    display: flex;

    align-items: flex-start;
    flex-direction: row;

    justify-content: center;
    text-align: initial;

    ${customMedia.lessThan("desktop")`
    margin-left:0px;
    
  `}
    .containerInput {
      display: flex;
      width: 30px;
      height: 30px;
    }

    input {
      all: unset;
      background-color: white;
      width: 15px;
      height: 15px;
      display: flex;
      justify-content: center;
      align-items: center;

      border: solid 1px black;
      cursor: pointer;
      margin-right: 10px;

      :checked {
        width: 15px;
        height: 15px;

        &:before {
          content: "✔️";
          color: black;
          display: flex;
          font-size: 12px;
        }
      }
    }
  }

  .pagamentoBlocked {
    cursor: not-allowed;
  }
`;

export const vazio = styled.div`
  text-align: center;
  margin-bottom: 400px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  button {
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 300px;
    padding: 10px 50px 10px 50px;
    cursor: pointer;
    transition: 0.3s;
    border: 0;
  }
  a {
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 300px;
    padding: 10px 50px 10px 50px;
    background: var(--default-color);
    color: var(--title-color);
    cursor: pointer;
    transition: 0.3s;
    border: 0;
    font-weight: 550;

    :hover {
      color: var(--title-color);
      background: var(--default-color-hover);
    }
  }
`;

export const LinkTerms = styled.a`
  font-size: 17px;

  a {
    margin-left: 5px;

    &:hover {
      color: var(--default-color);
      text-decoration: underline;
    }

    text-decoration: underline;
  }
`;

export const GeralContainer = styled.div`
  display: flex;
  flex-direction: column;

  .alertUnavailable {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #ce171f;
    font-weight: 700;
    width: 100%;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ce171f;
    scroll-margin-top: 100px;

    .containerIcon {
      display: flex;
      width: 30px;
    }
  }

  h4 {
    margin: 10px 0px;
    font-size: 15px;
    color: #494949;
  }

  .accordianBox {
    width: 100%;
    display: flex;
    flex-direction: column;

    #notAvailable {
      margin-bottom: 0;
      opacity: 1;
    }
  }

  .shipmentBox {
    border-bottom: solid 1px #595959;
    display: flex;
    justify-content: space-between;

    .input {
      width: 20px;
      height: 20px;
      border-radius: 100%;
      background-color: black;
    }

    input[type="radio"] {
      /* Add if not using autoprefixer */
      -webkit-appearance: none;
      appearance: none;
      /* For iOS < 15 to remove gradient background */
      background-color: #fff;
      /* Not removed via appearance */
      margin: 0;
    }

    input[type="radio"] {
      appearance: none;
      background-color: #fff;
      margin: 0;
      font: inherit;
      color: black;
      width: 18px;
      height: 18px;
      min-height: 18px;
      min-width: 18px;
      border: 0.15em solid black;
      border-radius: 50%;
    }

    input[type="radio"] {
      /* ...existing styles */
      display: grid;
      place-content: center;
    }

    input[type="radio"]::before {
      content: "";
      margin-bottom: 0px;
      width: 0.7em;
      height: 0.7em;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em black;
    }

    input[type="radio"]:checked::before {
      transform: scale(1);
      background-color: black;
    }

    .form-control + .form-control {
      margin-top: 1em;
    }

    input {
      align-self: center;
      margin-right: 20px;
      cursor: pointer;
    }

    h2 {
      color: #292728;
      font-size: 14px;
      line-height: 14.5px;
      margin-bottom: 0px;
      padding: 6px 0px 0px 0px;
    }

    p {
      padding: 3px 10px !important;
      margin: 0;
    }

    div {
      display: flex;
      flex-direction: column;
      margin-left: 25px;
    }

    section {
      display: flex;

      align-self: start;
    }

    aside {
      font-weight: bold;
      align-self: center;
    }
  }
`;

export const accordionContainer = styled.div`
  opacity: ${(props) => props.state};
  pointer-events: ${(props) => props.click};

  .accordianBox {
    button {
      border: ${(props) =>
        props.selected
          ? "solid 1px black"
          : "solid 1px transparent"} !important;
    }
  }

  width: 100%;
`;

export const shipmentContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
  flex-direction: column;

  div.shippingWarning {
    display: flex;
    align-items: center;
    margin: 0px;
    padding-bottom: 2px;
    color: #ce171f;
    border-bottom: 2px solid #ce171f;
    scroll-margin-top: 100px;

    p {
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;

      margin: 0px;
      padding: 0px;
    }
  }

  background: #fff;
  gap: 10px;

  .accordion1 {
    display: flex;
    width: 100%;
    flex-direction: row;

    ${customMedia.lessThan("mobile")`
		flex-direction: column;
    `}
    button {
      border: solid transparent 1px;
      display: flex;
      padding: 5px 30px 5px 20px;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      align-self: flex-end;
      font-size: 13px;

      :hover {
        border: solid black 1px;
      }

      ${customMedia.lessThan("notebook")`
  button{
    width: 100%;
  }
  width:100%;
  `}
    }

    .accordion2 {
      display: flex;
      width: 100%;
      flex-direction: column;

      ${customMedia.lessThan("notebook")`
  
    width:100%;
    `}
      button {
        border: solid transparent 1px;
        display: flex;
        padding: 5px 30px 5px 20px;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        font-size: 13px;
        background: #fff;

        :hover {
          border: solid black 1px;
        }
      }
    }

    background: #ffffff;

    ${customMedia.lessThan("notebook")`
    width:100%;
    `}
    ${customMedia.lessThan("notebook")`
    width:100%;
    &.descricao {
      width: 100%;
    }
    `}
    p {
      background: #ffff;
      margin: 0;
      padding: 5px 10px;
      ${customMedia.lessThan("notebook")`
    margin-bottom:0px;
    `}
    }
  }

  .collapse.show {
    width: 100%;
    align-self: flex-end;
    margin-bottom: 0;
    padding: 0px;
    ${customMedia.lessThan("notebook")`
  width: 100%;
  padding:0px;
  margin:0px;
    `}
  }
`;

export const ContainerClearContinue = styled.div`
  .text-center {
    display: none;
    ${customMedia.lessThan("notebook")`
      margin-top:20px;
    display:block;
      `}

    ${customMedia.lessThan("tablet")`
    display:flex;
    gap:10px;
    margin:50px 0px  30px 0px;
    justify-content:center;
    align-items:center;
      flex-direction:row;`}

    ${customMedia.lessThan("420px")`  
   height:60px;

    `}
  }

  .limparCarrinho {
    border: 0;
    width: 220px;
    padding: 10px 0;
    margin-right: 10px;
    transition: 0.3s;
    font-weight: 600;
    ${customMedia.lessThan("420px")`  
   height:100%;
   width:100%
    `}
  }

  .continuarComprando {
    border: 0;
    width: 220px;
    padding: 12px 0;
    margin-right: 10px;

    transition: 0.3s;
    font-weight: 550;
    ${customMedia.lessThan("420px")`  
   height:100%;
   width:100%
    `}
  }
`;

export const ContainerFooter = styled.div`
  display: flex;
  ${customMedia.lessThan("tablet")`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
    `}
  ${customMedia.lessThan("mobile")`
      
    `}
`;
