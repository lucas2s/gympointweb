import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerSignIn = styled.div`
  height: max-content;
  width: 100%;
  max-width: 360px;
  display: flex;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  flex-direction: column;
  align-items: center;
  padding: 0px 30px;

  form {
    margin-top: 30px;
    width: 300px;
    display: flex;
    flex-direction: column;

    p {
      font-weight: bold;
      padding-bottom: 8px;
    }

    input {
      height: 45px;
      background: #ffffff;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;
      margin-bottom: 20px;
      padding: 2px;

      &::placeholder {
        color: #dddddd;
      }
    }

    span {
      color: #f64c75;
      align-self: flex-start;
      margin-bottom: 20px;
      font-weight: bold;
    }

    button {
      height: 45px;
      background: #ee4d64;
      border-radius: 4px;
      font-size: 16px;
      color: #ffffff;
      border: 0px;
      transition: background 0.2s;
      margin-bottom: 50px;

      &:hover {
        background: ${darken(0.08, '#ee4d64')};
      }
    }
  }
`;

export const Logo = styled.img`
  height: 100px;
  width: 153px;
  margin-top: 50px;
`;
