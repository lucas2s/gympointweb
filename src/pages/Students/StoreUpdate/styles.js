import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
`;

export const Content = styled.div`
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  div {
    display: flex;
  }
`;

export const BtnVoltar = styled.button`
  width: 112px;
  height: 36px;
  padding-left: 40px;
  color: #fff;
  background: #cccccc;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  border: 0;
  margin-right: 15px;
`;

export const BtnSalvar = styled.button`
  width: 112px;
  height: 36px;
  padding-left: 40px;
  color: #fff;
  background: #ee4d64;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  border: 0;
`;

export const ContentForm = styled.div`
  background: #fff;
  border-radius: 4px;
  width: 100%;
  max-width: 900px;
  padding: 20px;

  p {
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #444444;
  }

  form {
    input {
      width: 100%;
      margin: 15px 0px;
      background: #ffffff;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;
      height: 45px;
      padding-left: 5px;
      ::placeholder {
        font-size: 14px;
        line-height: 16px;
        color: #999999;
      }
    }

    .myContainer {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: row;

      div {
        flex: 1;
      }
    }

    .myDatePicker {
      width: 100%;
      padding-right: 100px;
    }

    .myheight {
      margin-left: 15px;
    }
  }
`;
