import styled from "styled-components";
import filter_icon from '../../assets/filter_icon.svg';

export const SearchContainer = styled.div`
  width: 1034px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  @media (max-width: 768px){
    width: 90%;
    height: 34px;
  }
`;

export const FilterIcon = styled.div`
  background-image: url(${filter_icon});
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const SearchWrapper = styled.div`
  width: 974px;
  height: 52px;
  background-color: #d9d9d9;
  border-radius: 20px 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px){
    width: 90%;
    height: 100%;
  }
`;

export const SearchTitle = styled.div`
  width: 73px;
  height: 29px;
  font-size: 24px;
  color: #000;
  font-weight: 400;
  line-height: 29px;
  margin: 12px 33px 13px 21px;
  @media (max-width: 768px){
    font-size: 20px;
  }
`;

export const DataContainer = styled.div`
  width: 1050px;
  height: 100vh;
  margin: 100px auto 0 auto;
  @media (max-width: 768px){
    width: 100%;
    height: auto;
  }
`;

export const CheckAllContainer = styled.div`
  width: 176px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CheckAllTitle = styled.div`
  width: 133px;
  height: 24px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  color: #000;
`;
