import styled from "styled-components";
import { MainTitle } from "../Main/styles";

export const StyledMainTitle = styled(MainTitle)`
  margin-top: 50px;
`;

export const LeaderShipContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-around;
  margin-top: 5%;
  gap: 5%;

  @media (max-width: 768px) {
    display: block;
    gap: 0;
  }
`;
