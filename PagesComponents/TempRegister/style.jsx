import styled from "styled-components";
import { generateMedia } from "styled-media-query";
import { EyeSlash } from "@styled-icons/bootstrap/EyeSlash";
import { Eye } from "@styled-icons/bootstrap/Eye";

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

export const EyeIcon = styled(EyeSlash)`
  height: 18px;
  width: 18px;
  color: black;
  cursor: pointer;

  :hover {
    color: var(--default-color);
  }
`;

export const EyeIconOpen = styled(Eye)`
  height: 18px;
  width: 18px;
  color: black;
  cursor: pointer;
  :hover {
    color: var(--default-color);
  }
`;

export const buscando = styled.div`
  width: 100%;
  height: 65px;
  position: relative;

  margin-bottom: 40px;

  h4 {
    font-size: 13px;
    color: black;
    padding-top: 40px;

    span {
      font-weight: bold;
    }

    a {
      color: #000;
      transition: 0.3s;

      :hover {
        color: #000;
      }
    }
  }
`;

export const processo = styled.div`
  text-align: center;
`;
export const proceder = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  p {
    margin: 10px 50px;
    opacity: 0.5;
    font-size: 12px;
  }
  .ativo {
    opacity: 1;
  }
`;

export const ErrorMessage = styled.div`
  color: #ce171f;
  margin-top: 2px;
  margin-bottom: 15px;
`;

export const form = styled.div`
  margin-top: 30px;
  p {
    margin-top: 25px;
  }
  form {
    ${customMedia.lessThan("mobile")`
    padding:0px 20px;
    
    `}

    label {
      width: 100%;
      display: block;
      font-size: 14px;

      position: relative;
      span {
        margin-left: 10px;
        margin-top: 8px;
        position: absolute;
        transition: 0.2s ease-out;
      }

      svg {
        position: absolute;
        right: 0;
        top: 10px;
      }

      &:hover,
      &.ativo {
        span {
          margin-left: 0;
          margin-top: -15px;
          font-size: 11px;
          color: #aaa;
          transition: 0.2s ease-out;
        }
      }
    }

    input {
      border: none;
      border-bottom: solid 1px var(--input-border-color);
      width: 100%;
      outline: none !important;
      padding: 10px;
      :hover {
        border-bottom: solid 1px var(--input-border-color-hover);
      }
    }
  }

  .rowPack {
    ${customMedia.lessThan("mobile")`
    display:flex;
    flex-direction:column;
    `}
  }

  .colPack {
    ${customMedia.lessThan("mobile")`
    width:100% !important;
    max-width:100% !important;
    
    `}
  }
`;

export const bts = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
  ${customMedia.lessThan("tablet")`
    margin-bottom: 200px;
  `}

  ${customMedia.lessThan("mobile")`
    width:100%;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    
  `}

  a {
    ${customMedia.lessThan("mobile")`
    width:100%;
    `}
  }
`;
export const voltar = styled.div`
  width: 250px;
  height: 50px;
  padding-top: 15px;

  font-weight: 600;
  font-size: 14px;
  text-align: center;
  margin-right: 20px;
  transition: 0.3s;
  cursor: pointer;

  ${customMedia.lessThan("mobile")`
    margin-right:0px;
    width:100%;
    
  `}
`;
export const seguinte = styled.div`
  width: 250px;
  height: 50px;
  font-weight: 600;
  padding-top: 15px;

  font-size: 14px;
  text-align: center;
  margin-left: 20px;
  cursor: pointer;
  background-color: var(--bt-purchase-color) !important;
  color: var(--bt-purchase-text-color) !important;
  :hover {
    background-color: var(--bt-purchase-color-hover) !important;
    color: var(--bt-purchase-text-color-hover) !important;
  }
  ${customMedia.lessThan("mobile")`
  width:100%;
    margin-left:0px;
    margin-top:10px;
    
  `}

  &.disabled {
  }
`;
export const termos = styled.div`
  font-size: 12px;
  color: #000;
  display: flex;
  align-items: center;
  vertical-align: center;
  padding: 1px 1px 4px 1px;
  max-width: 320px;
  margin: 10px 0px;
  input {
    all: unset;
    border: 1px solid black !important;
    width: 1px !important;
    height: 1px !important;
    display: flex;
    cursor: pointer;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    :checked {
      background-color: #fff;

      &:before {
        content: "✔️";
        color: black;
        display: flex;
        font-size: 12px;
      }
    }
  }

  a {
    margin-left: 5px;
  }

  span {
    color: #ce171f;
    font-weight: bold;
  }
`;

export const CaixaValidacao = styled.div`
  background-color: #f4f4f5;

  display: block;
  margin: 15px auto;
  padding: 15px;
  margin-bottom: 280px;
  max-width: 500px;
  text-align: center;
  box-shadow: rgb(134 133 133 / 16%) 3px 3px 80px,
    rgb(92 91 91 / 23%) 0px 0px 3px;
  input {
    margin-top: 10px;
    width: 100%;
    border: 0px;
    margin: 10px 0px 20px 0px;
    background-color: unset;
    border-bottom: solid 2px var(--input-border-color);
    transition: 0.3s;
    :hover {
      border-bottom: solid 2px var(--input-border-color-hover);
    }
  }
`;

export const BtAvancar = styled.div`
  cursor: pointer;
  padding: 9px 20px;
  font-weight: 500;
  display: block;
  margin: 5px auto;
  max-width: 230px;
  transition: 0.3s;
  background-color: var(--bt-purchase-color);
  color: var(--bt-purchase-text-color) !important;

  :hover {
    background-color: var(--bt-purchase-color-hover);
    color: var(--bt-purchase-text-color-hover) !important;
  }
`;

export const CaixaForm = styled.div`
  margin-top: 10px;
`;
