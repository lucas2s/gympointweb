import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-top: 10px;
  align-items: center;
  button {
    border: none;
    background: #ee4d64;
    border-radius: 5px;
    font-size: 14px;
    padding: 5px 10px;
    color: #fff;
    box-shadow: 4px 4px 4px #bbb;
    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
      box-shadow: none;
    }
    &:active {
      box-shadow: none;
    }
  }
  span {
    font-size: 10px;
    padding: 0 10px;
    color: #666666;
  }
`;
