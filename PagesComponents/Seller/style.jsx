import styled from "styled-components";
import { generateMedia } from "styled-media-query";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
});

export const ContainerProdutos = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const produtos = styled.div`
  position: relative;
  width: 95%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  flex-direction: column;
  padding-bottom: 70px;

  ${customMedia.lessThan("tablet")`
      margin-bottom:120px;
    `}

  button {
    width: 100px;
    align-self: center;
    padding: 10px;
    border: 0px;
    font-weight: 600;
    transition: 0.3s;
  }
`;

export const vendidopor = styled.div`
  margin-bottom: 100px;
  ${customMedia.lessThan("tablet")`
      margin-bottom:200px;
    `}
  .containerTopo {
    display: flex;
    position: relative;
  }

  .containerBanner {
    width: 100%;
    height: 170px;
    background: url("/images/sellerbanner.jpg");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .coberturaVerde {
    position: absolute;
    width: 100%;
    background: #fcee2126;
    height: 170px;
  }
  .logoLojista {
    position: absolute;
    width: 90%;
    left: 10%;
    display: flex;
    bottom: -35%;
    ${customMedia.lessThan("tablet")`
        flex-direction:column;
        left:50%;
        transform: translate(-50%);
        width:auto;
        justify-content:center;
        align-items:center;
        bottom: -85%;
    `}

    .containerImage {
      width: 125px;
      height: 125px;
      display: flex;
      background: white;
      align-items: center;
      bottom: -35%;
      border: 1px solid black;

      ${customMedia.lessThan("tablet")`
      margin-bottom:40px;
      
      `}
    }

    img {
      display: flex;
      justify-content: center;
      width: 100%;
      align-items: center;
    }

    svg {
      display: flex;
      justify-content: center;
      width: 100%;
      color: #292728;
      align-items: center;
    }
  }
`;

export const DadosSeller = styled.div`
  display: flex;
  width: 100%;
  height: 50px;

  margin-top: 80px;

  ${customMedia.lessThan("tablet")`
    justify-content:center;
    margin-top:0px;
    `}

  .containerDados {
    display: flex;

    width: 100%;
    justify-content: space-between;

    ${customMedia.lessThan("tablet")`
    flex-direction:column;
      justify-content:center;
      
    `}
  }

  .dadosEsquerda {
    display: flex;
    margin-left: 20px;
    flex-direction: column;

    ${customMedia.lessThan("tablet")`
    text-align:center;
    margin-left:0px;
    margin-bottom:10px;
    `}
  }

  .dadosDireita {
    display: flex;
    gap: 20px;
    margin-right: 5%;

    a {
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      svg {
        color: #292728;
        transition: 0.3s;
        width: 30px;

        :hover {
          // color: #7e8a67;
        }
      }
    }
  }

  h2 {
    font-size: 16px;
    color: #292728;
    font-weight: bold;
  }
  h3 {
    font-size: 16px;
    color: #292728;
  }
`;
