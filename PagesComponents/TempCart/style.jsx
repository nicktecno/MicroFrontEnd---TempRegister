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
  tablet: "768px",
  mobile: "576px",
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

export const buscando = styled.div`
  width: 100%;
  height: 65px;
  position: relative;

  margin-bottom: 10px;

  h4 {
    font-size: 13px;
    color: #292728;
    padding-top: 40px;

    span {
      font-weight: bold;
    }
  }

  ${customMedia.lessThan("tablet")`
        width: 100%;
        height: 47px;
        position: relative;

        h4{
            color: #292728;
            padding-top: 16px;
            padding-left: 0px;
        }
        `}
`;

export const TitleEndereco = styled.h3`
  font-size: 18px;
  margin: 0px 0px 10px;
  color: #292728;

  font-weight: 700;
`;

export const produtos = styled.div`
  position: relative;

  .form-control {
    font-size: 12px;
    margin: 10px 0px;
    width: 100%;
    height: 50px;
    background-color: #f4f4f5;
    padding: 5px 10px;
    font-size: 11px;
    color: #595959;
    display: block;
    border: 0px;
    border-radius: 5px;
    -webkit-box-shadow: 0px 3px 13px 3px rgb(0 0 0 / 10%);
    -moz-box-shadow: 0px 3px 13px 3px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 3px 13px 3px rgb(0 0 0 / 10%);
  }

  .default-button {
    background-color: #ffffff;
    font-size: 10px;
    border: 0px;
    border-radius: 5px;
    display: block;
    width: 100%;
    white-space: nowrap;
    text-align: left;
    padding: 3px 5px;
    margin-bottom: 10px;
  }

  .img-delete {
    width: 40px;
    height: auto;
  }
  ${customMedia.lessThan("tablet")`
        position: relative;
    
        margin-bottom: 120px;

        .direita{
            margin-left: 20px;
        }
        .img-delete{
            width: initial;
        }
    `}
`;

export const ContainerEndereco = styled.div`
  display: flex;
  flex-direction: column;
  background: #f4f4f5;
  padding: 20px;
  box-shadow: rgb(134 133 133 / 16%) 3px 3px 80px,
    rgb(92 91 91 / 23%) 0px 0px 3px;
  &.error {
    width: 100%;
    align-items: center;
    justify-content: center;
    border: 2px solid #ce171f;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    scroll-margin-top: 100px;
  }
`;
export const imgitem = styled.div`
  width: 160px;
  height: 320;

  img {
    width: 100%;
    height: auto;
  }
  ${customMedia.lessThan("tablet")`
        width: 140px;
        height: auto;
    `}
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

  .text-center {
    ${customMedia.lessThan("notebook")`
      margin-top:20px;
      display:none;
      `}
  }

  .limparCarrinho {
    font-weight: bold;
    border: 0;
    width: 220px;
    padding: 10px 0;
    margin-right: 10px;
    transition: 0.3s;
    ${customMedia.lessThan("tablet")` 
    width:100%;
`}
    ${customMedia.lessThan("414px")` 
    height: 56px;
`}
  }
  .continuarComprando {
    font-weight: bold;
    border: 0;
    width: 220px;
    padding: 10px 0;
    margin-right: 10px;
    height: 42px;
    transition: 0.3s;
    background-color: var(--bt-positive-color) !important;
    transition: 0.3s;

    :hover {
      background-color: var(--bt-positive-color-hover) !important;
    }
    ${customMedia.lessThan("tablet")` 
      width:100%;
    `}
    ${customMedia.lessThan("414px")` 
    height: 56px;
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

export const descritem = styled.div`
  margin-left: 20px;
  padding-top: 5px;

  h3 {
    font-size: 15px;
    font-weight: bold;
  }
  h4 {
    font-size: 12px;
    color: #595959;
  }
  p {
    font-size: 18px;
    color: #ce171f;
  }
  .preco {
    margin: 3px 0;
  }
  span {
    font-size: 12px;
    color: #595959;
    font-weight: 600;
  }
  .circulo {
    margin: initial;
    margin-top: 5px;
  }
  .circulo img {
    margin-right: 5px;
  }
  .circulo span {
    position: relative;
    bottom: 3px;
  }
  ${customMedia.lessThan("tablet")`
        margin-left: 20px;
        padding-top: 5px;
        
        h3{
            font-size: 15px;
            font-weight: bold;
        }
        h4{
            font-size: 12px;
            color: #595959;
        }
        p{
            font-size: 18px;
            color: #CE171F;
        }
        .preco{
            margin: 3px 0;
        }
        span{
            font-size: 12px;
            color: #595959;
            font-weight: 600;
        }
        .circulo{
            margin: initial;
            margin-top: 5px;            
        }
        .circulo img{
            margin-right: 5px;
        }
        .circulo span{
            position: relative;
            bottom: 3px;
        }
    `}
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
  background-color: #292728;
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
  ${customMedia.lessThan("tablet")`
        width: 80px;
        height: 30px;
        background-color: #292728;
        border-radius: 20px;
        text-align: center;
        padding-top: 5px;
        font-size: 14px;
        position: relative;
        right: 10px;
        margin-bottom: 40px;

        span{
            margin-left: 15px;
            margin-right: 15px;
        }
        
    `}
`;

export const total = styled.div`
  margin-top: 23px;
  margin-left: 20px;
  margin-bottom: 25px;
  h4 {
    color: #292728;
    font-weight: bold;
    text-align: center;
    ${customMedia.lessThan("tablet")`
   text-align:center;
  `}
  }

  .containerDados {
    background: #f4f4f5;
    padding: 30px 10px;
    padding-bottom: 10px;
    box-shadow: rgb(134 133 133 / 16%) 3px 3px 80px,
      rgb(92 91 91 / 23%) 0px 0px 3px;
    ${customMedia.lessThan("notebook")`

   padding:30px 10px;
  `}
  }
  ${customMedia.lessThan("notebook")`
   width:100% !important;
   margin-left: 0px;

  `}

  ${customMedia.lessThan("tablet")`
   margin-top: 0px;
  margin-left: 0px;
  margin-bottom: 0px;

  `}
  

 

  p {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 18px;
    color: #292728;

    span {
      margin-top: 15px;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
    }

    &.total {
      color: #292728;
      span {
        font-size: 26px;
      }
    }
  }
`;

export const vazio = styled.div`
  text-align: center;
  margin-bottom: 50px;
  font-weight: 700;

  h4 {
    color: #595959;
    font-size: 15px;
  }
  span {
    color: #ce171f;
    font-weight: bold;
  }
  ${customMedia.lessThan("tablet")`
        h4{
            font-size: 12px;
        }
    `}
`;

export const GeralContainer = styled.div`
  flex-direction: column;
  display: flex;
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
      cursor: pointer;
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
  background: #fff;
  gap: 10px;

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
      background: #fff;
      color: #292728;
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

export const ContainerFooter = styled.div`
  display: flex;
  ${customMedia.lessThan("tablet")`
  display: flex;
  flex-direction: column;
  margin-bottom: -20px;
    `}
  ${customMedia.lessThan("mobile")`
      
    `}
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
    font-weight: bold;
    border: 0;
    width: 220px;
    padding: 10px 0;
    margin-right: 10px;
    transition: 0.3s;
    ${customMedia.lessThan("tablet")` 
    width:100%;
`}
    ${customMedia.lessThan("414px")` 
    height: 56px;
`}
  }
  .continuarComprando {
    font-weight: bold;
    border: 0;
    width: 220px;
    padding: 10px 0;
    margin-right: 10px;
    height: 42px;
    transition: 0.3s;
    background-color: var(--bt-positive-color) !important;
    ${customMedia.lessThan("tablet")` 
      width:100%;
    `}
    ${customMedia.lessThan("414px")` 
    height: 56px;
  `}
  }
`;
