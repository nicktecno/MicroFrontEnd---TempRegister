import styled from "styled-components";
import { generateMedia } from "styled-media-query";

import { Search } from "@styled-icons/boxicons-regular/Search";
import { PencilSquare } from "@styled-icons/bootstrap/PencilSquare";

import { HouseDoor } from "@styled-icons/bootstrap/HouseDoor";
import { Briefcase } from "@styled-icons/bootstrap/Briefcase";
import { PlusSquare } from "@styled-icons/bootstrap/PlusSquare";
import { Trash } from "@styled-icons/bootstrap/Trash";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
});

export const closeButton = styled.span`
  font-size: 25px;
  display: flex;
  color: var(--title-color);
  font-weight: 700;
  position: absolute;
  top: 13px;
  right: 25px;
  cursor: pointer;
  transition: 0.3s;

  ${customMedia.lessThan("400px")`
        top: -2px;
        right:0px;
        padding:0 10px;
        position:relative;
    `}

  :hover {
    // color: #778162;
  }
`;

export const ContainerModal = styled.div`
  position: fixed;

  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 999;
  width: 100vh;
  height: 40vh;
  box-shadow: 5px 13px 15px -1px rgba(0, 0, 0, 0.42);

  ${customMedia.lessThan("notebook")`
        width: 95%;
    `}
`;

export const modal = styled.div`
  position: fixed;
  overflow: auto;

  background-color: #ffffff;
  z-index: 999;
  width: 100%;
  height: 100%;

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
`;

export const ContainerLoading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  img {
    width: 50px;
  }
`;

export const content = styled.div`
  overflow: auto;
  display: flex;
  margin-top: 75px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.register {
    margin-top: 0px;
  }

  /* width */

  text-align: center;

  &.registro {
    width: 90%;
  }

  .localizacaoAtual {
    margin-top: 30px;
  }

  ${customMedia.lessThan("tablet")`
  margin-top: 25px;
  `}
`;

export const contentLogged = styled.div`
  overflow: auto;
  display: flex;
  margin-top: 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* width */

  text-align: center;

  &.registro {
    width: 90%;
  }

  .localizacaoAtual {
    margin-top: 30px;
  }
`;

export const title = styled.div`
  width: 100%;
  position: relative;
  color: var(--title-color);
  background: var(--default-color);
  font-size: 1.125rem;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  text-align: center;

  .title {
    font-weight: bold;
    font-size: 16px;
  }

  ${customMedia.lessThan("tablet")`
        margin-bottom: 0px;
    `}
`;

export const procurar = styled.div`
  align-items: center;
  display: flex;

  justify-content: center;
  align-items: center;

  .containerInput {
    display: flex;
    background-color: #f7f7f7;
    align-items: center;
    justify-content: center;
    width: 240px;
    border-bottom: solid 2px var(--input-border-color);
    :hover {
      border-bottom: solid 2px var(--input-border-color-hover);
    }
  }
  form {
    display: flex;

    align-items: center;
    justify-content: center;
    width: 100%;

    ${customMedia.lessThan("notebook")`
   
          flex-direction:column;
          
    `}
  }

  button {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 305px;
    margin-left: 20px;
    height: 50px;
    border: none;
    text-transform: capitalize;
    opacity: 1;
    transition: 0.3s;
    ${customMedia.lessThan("notebook")`
    width:100%;
    margin-left: 0px;
      margin-top:20px;
    `}
  }

  input {
    height: 50px;
    padding: 0 10px 0 40px;
    width: 80%;
    background-color: #f7f7f7;
    border: none;
  }
`;

export const resultado = styled.div`
  padding: 15px 50px;
  text-align: initial;
  border: solid 1px #00000029;
  padding-top: 10px;
  position: relative;
  width: 90%;
  align-items: center;
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: 420;
    color: #000;
  }
  :hover {
    border: solid 1px var(--default-color);
    svg {
      color: var(--default-color-hover);
    }
  }

  button {
    border: none;
    background-color: #0000;
  }
`;

export const favorito = styled.div`
  display: flex;
  width: 90%;
  margin-top: 10px;
  padding: 0px 10px 0px 50px;
  text-align: initial;
  align-items: center;
  border: solid 1px #00000029;
  padding-top: 10px;

  position: relative;

  &.ativado {
    background-color: #f4f4f5;
  }

  cursor: pointer;
  ${customMedia.lessThan("456px")`
        flex-direction:column !important;
    `}

  .containerEnderecos {
    width: 100%;
    display: flex !important;
    justify-content: space-between;
    flex-direction: row !important;
    margin-bottom: 1rem;

    ${customMedia.lessThan("456px")`
        flex-direction:column !important;
    `}
  }
  .PenLixo {
    display: flex !important;
    flex-direction: row !important;
    align-self: flex-end;
    align-items: center;
    justify-content: center;
    padding-bottom: 16px;
    svg:hover {
      color: var(--default-color-hover);
    }
  }

  span {
    font-size: 10px;
  }
  :hover {
    border: solid 1px var(--default-color);
  }
`;

export const button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  button {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    width: 305px;
    height: 50px;
    font-weight: 500;
    background-color: var(--default-color);
    color: var(--title-color);
    border: none;
    margin-top: 40px;
    margin-bottom: 20px;

    opacity: 1;
    transition: 0.3s;
    z-index: 999;

    svg {
      margin-right: 5px;
      color: var(--title-color);
      width: 20px;
    }

    ${customMedia.lessThan("notebook")`
            width: 240px;
    `}
  }
  button:hover {
    background-color: var(--default-color-hover);
  }
`;

export const cadastroFav = styled.div`
  img {
    width: 60px;
  }
  &.registro {
    width: 95%;
  }
  .localizacaoAtual {
    display: flex;
    height: auto;
    padding: 10px;
    width: 100%;

    justify-content: center;
    align-items: center;
    svg {
      margin-right: 5px;

      width: 20px;
    }
  }

  button {
    width: 200px;
    font-weight: 600;
    border: none;
    margin: 40px 15px 20px 0px;
    opacity: 1;
    transition: 0.3s;

    ${customMedia.lessThan("tablet")`
            margin-top: 20px;
    `}
  }
  .backButton {
    padding: 9px 40px;
  }
  .forwardButton {
    padding: 11px 40px;
  }

  input,
  select,
  option {
    width: 50%;
    height: 50px;
    padding: 0 20px;
    background-color: #f7f7f7;
    margin: 7px 0;

    ${customMedia.lessThan("tablet")`
            width: 100%;
    `}
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #f7f7f7 url("/images/icon-errow-down.png") 97% center no-repeat !important;
    border: solid 1px var(--default-color);
    :hover {
      border: solid 1px var(--default-color-hover);
    }
  }

  input {
    border: solid 2px transparent;
    border-bottom: solid 2px var(--input-border-color);
    background-color: #f9f9f994;
    :hover {
      border-bottom: solid 2px var(--input-border-color-hover);
    }
  }

  .tipoEndereco {
    width: 67%;
    margin-right: 3%;
    ${customMedia.lessThan("tablet")`
            width: 100%;
            margin-right:0px;
    `}
  }

  .nome {
    margin-right: 3%;
    width: 60%;
    ${customMedia.lessThan("tablet")`
            width: 100%;
            margin-right:0px;
    `};
  }

  .cep {
    width: 30%;

    ${customMedia.lessThan("tablet")`
            width: 100%;
            margin-right:0px;
    `}
  }
  .endereco {
    width: 100%;
    margin-right: 20px;
    ${customMedia.lessThan("tablet")`
            width: 100%;
            margin-right:0px;
    `}
  }
  .telefone {
    width: 37%;
    ${customMedia.lessThan("tablet")`
            width: 100%;
            margin-right:0px;
    `}
  }
  .numero {
    width: 20%;
    margin-right: 3%;
    ${customMedia.lessThan("tablet")`
            width: 100%;
            margin-right:0px;
    `}
  }
  .bairro {
    width: 37%;
    margin-right: 3%;
    ${customMedia.lessThan("tablet")`
            width: 100%;
            margin-right:0px;
    `}
  }
  .cidade {
    width: 37%;
    ${customMedia.lessThan("tablet")`
            width: 100%;
            margin-right:0px;
    `}
  }
  .estado {
    width: 30%;
    margin-right: 3%;
    ${customMedia.lessThan("tablet")`
            width: 100%;
            margin-right:0px;
    `}
  }
  .complemento {
    width: 67%;
    ${customMedia.lessThan("tablet")`
            width: 100%;
            margin-right:0px;
    `}
  }
`;

export const btFav = styled.div`
  margin-top: 20px;
  button {
    width: 150px;
    height: 40px;
    background-color: #f7f7f7;

    border: none;
    margin-top: 10px;
    margin-right: 15px;
    color: black;
    position: relative;
    :hover {
      color: #777e6a;
      border: solid 1px #777e6a;
    }
    :hover .house {
      color: #777e6a;
    }
    .house {
      top: 8px;
    }
  }
`;

export const BuscaIcon = styled(Search)`
  color: #292929;
  height: 25px;
  width: 25px;
  margin-right: 0px;

  cursor: pointer;

  :hover {
    color: #777e6a;
  }
`;

export const pen = styled(PencilSquare)`
  color: #292929;
  height: 25px;
  width: 25px;
  margin-right: 10px;

  :hover {
    color: #777e6a;
  }
`;

export const lixo = styled(Trash)`
  color: #292929;
  height: 25px;
  width: 25px;
  margin-right: 0px;

  cursor: pointer;
  :hover {
    color: #777e6a;
  }
`;

export const adicionar = styled(PlusSquare)`
  height: 25px;
  width: 25px;
  margin-right: 0px;
  position: absolute;
  top: 9px;
  right: 20px;
`;

export const house = styled(HouseDoor)`
  color: #292929;
  height: 25px;
  width: 25px;
  margin-right: 0px;
  position: absolute;
  top: 15px;
  left: 10px;
`;

export const trabalho = styled(Briefcase)`
  color: #292929;
  height: 25px;
  width: 25px;
  margin-right: 0px;
  position: absolute;
  top: 15px;
  left: 10px;
`;
