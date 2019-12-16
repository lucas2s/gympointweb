import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerSignIn = styled.div`
  height: 448px;
  width: 360px;
  display: flex;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  flex-direction: column;
  align-items: center;
  padding: 0px 30px;

  p {
    font-weight: bold;
    padding-bottom: 8px;
  }

  input {
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    box-sizing: border-box;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  button {
    height: 45px;
    background: #EE4D64;
    border-radius: 4px;
    font-size: 16px;
    color: #FFFFFF;
    border: 0px;
  }
`;

export const Form = styled.form`
  padding-top: 30px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

export const Logo = styled.img`
  height: 100px;
  width: 153px;
  margin-top: 50px;
`;

export const Input = styled.input`
  height: 45px;
  background: #FFFFFF;
  border: 1px solid #DDDDDD;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 20px;
`;

