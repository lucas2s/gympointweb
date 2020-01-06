import styled from 'styled-components';

export const Container = styled.div`
  height: 64px;
  background: #fff;
  border: 1px solid #dddddd;
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  nav {
    display: flex;
  }

  img {
    padding: 0px 20px;
    margin-right: 20px;
    border-right: 1px solid #dddddd;
    width: 155px;
    height: 24px;
  }

  ul {
    display: flex;
    align-items: center;

    li {
      margin-right: 20px;

      a {
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        line-height: 18px;
        color: #999999;
      }

      a:hover {
        color: #ee4d64;
      }

      a.chosen {
        color: #444444;
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 20px;

    strong {
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #666666;
    }

    button {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      text-align: right;
      color: #de3b3b;
      border: 0;
      background: #fff;
      padding: 0;
    }
  }
`;
