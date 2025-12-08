import styled from "styled-components";

export const CardLeader = styled.div`
  width: calc(100vw * 0.6 / 4);
  max-width: 250px;
  height: auto;
  padding: 1rem;
  box-sizing: border-box;
  text-align: center;
  margin: 0 0.5rem 2rem 0.5rem;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 12px 26px rgba(99, 102, 241, 0.12);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
  }

  @media (max-width: 900px) {
    width: 45vw;
    margin: 1rem auto;
  }

  @media (max-width: 480px) {
    width: 90vw;
    margin: 1rem auto;
  }
`;

export const NameTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #272727;
  margin-top: 1rem;
`;

export const NameSubitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #444444;
  margin-top: 0.25rem;
  line-height: 1.3;
`;
