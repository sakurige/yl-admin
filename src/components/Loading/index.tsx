import styled from "styled-components";
import { createPortal } from "react-dom";

const Mask = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  font-size: 1.25rem;
  align-items: center;
  background-color: #cccccc50;
`;
const Loading = () => {
  return createPortal(
    <Mask>Loading</Mask>,
    document.querySelector("#root") as HTMLElement,
  );
};
export default Loading;
