import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 20px auto;
`;

export const Content = styled.div`
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  input {
    width: 237px;
    height: 36px;
    background: #ffffff;
    border: 1px solid #dddddd;
    box-sizing: border-box;
    border-radius: 4px;
    padding-left: 40px;
    ::placeholder {
      font-size: 14px;
      line-height: 16px;
      color: #999999;
    }
  }

  button {
    width: 142px;
    height: 36px;
    padding-left: 40px;
    color: #fff;
    background: #ee4d64;
    border-radius: 4px;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    border: 0;
    margin-right: 15px;
  }
`;

export const ContentTable = styled.div`
  background: #fff;
  border-radius: 4px;
  width: 100%;
  max-width: 1200px;
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

  span {
    flex: 1;
    border-bottom: 1px solid #eeeeee;
  }
`;

export const TdName = styled.div`
  width: 100%;
  max-width: 499px;
  text-align: left;
`;

export const TdEmail = styled.div`
  width: 100%;
  max-width: 380px;
  text-align: left;
`;

export const TdAge = styled.div`
  width: 100%;
  max-width: 50px;

  p {
    text-align: center;
  }
`;

export const TdEdit = styled.div`
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

export const TdDelete = styled.div`
  button {
    font-size: 15px;
    line-height: 18px;
    text-align: right;
    color: #de3b3b;
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
    font-size: 10px;
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
