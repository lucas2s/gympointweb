import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 700px;
  margin: 20px auto;
`;

export const Content = styled.div`
  max-width: 700px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ContentTable = styled.div`
  background: #fff;
  border-radius: 4px;
  width: 100%;
  max-width: 700px;
  padding: 15px;
`;

export const Table = styled.div`
  width: 100%;
  display: table;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;

  & + div {
    border-bottom: 1px solid #eeeeee;
  }

  :last-child {
    border-bottom: 0;
  }

  strong {
    font-size: 16px;
    line-height: 19px;
    color: #444444;
  }

  p {
    font-size: 16px;
    line-height: 20px;
    color: #666666;
  }
`;

export const TdAluno = styled.div`
  width: 100%;
  max-width: 500px;
  display: table;
`;

export const TdResp = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  button {
    font-size: 15px;
    line-height: 18px;
    text-align: right;
    color: #4d85ee;
    border: 0;
    background: #fff;
    padding: 0;
    margin-right: 15px;
  }
`;

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
    box-shadow: 4px 4px 4px #888;

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

export const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
`;

export const ModalContent = styled.div`
  width: 450px;
  padding: 30px;
  background: #fff;
  background: #fff;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;

    strong {
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #444444;
      margin-bottom: 5px;
    }

    p {
      font-size: 16px;
      line-height: 26px;
      color: #666666;
      margin-bottom: 10px;
    }

    textarea {
      width: 390px;
      height: 130px;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;
      margin-bottom: 10px;
      padding: 5px;
      resize: none;

      ::placeholder {
        font-size: 14px;
        line-height: 16px;
        color: #999999;
      }
    }

    button {
      align-items: center;
      height: 45px;
      color: #fff;
      background: #ee4d64;
      border-radius: 4px;
      font-weight: bold;
      font-size: 14px;
      border: 0;
      margin-bottom: 5px;

      &:hover {
        background: ${darken(0.08, '#ee4d64')};
      }
    }

    .closeModal {
      background: #999;
      &:hover {
        background: ${darken(0.08, '#999')};
      }
    }

    span {
      color: #f64c75;
      display: flex;
      margin-bottom: 20px;
      font-weight: bold;
    }
  }
`;
