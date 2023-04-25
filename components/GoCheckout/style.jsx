import { generateMedia } from "styled-media-query";

import styled from "styled-components";

const customMedia = generateMedia({
  desktop: "1200px",
  notebook: "991px",
  tablet: "768px",
  mobile: "576px",
});

export const WhiteLabel = styled.div`
  display: none;
  ${customMedia.lessThan("notebook")`  
   
  z-index: 98;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 62px;
  background-color: #fff;
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  `}
  ${customMedia.lessThan("tablet")`
    bottom:45px;
`}
`;

export const box = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 30px;

  ${customMedia.lessThan("notebook")`
      position:fixed;
      bottom:32px;
      z-index:99;
      width:200px;
      left: 50%;
      margin-bottom:0px;
      transform: translate(-50%, -50%);
      `}

  ${customMedia.lessThan("tablet")`
    bottom:63px;
  `}
`;
export const bt = styled.div`
  cursor: pointer;
  width: 100%;
  height: 60px;
  background-color: var(--bt-purchase-color);
  color: var(--bt-purchase-text-color) !important;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;

  ${customMedia.lessThan("notebook")`
    height: 45px;
  `}

  &.blocked {
  }

  h3 {
    font-weight: bold;
    font-size: 14px;

    text-align: center;
    margin-bottom: 0px;
  }

  :hover {
    background-color: var(--bt-purchase-color-hover);
    color: var(--bt-purchase-text-color-hover) !important;
  }
`;
