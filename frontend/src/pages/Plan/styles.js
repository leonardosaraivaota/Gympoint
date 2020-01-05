import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;

  max-width: 900px;
  flex-direction: column;
  margin: 100px auto;

  div {
    width: 100%;
    display: flex;

    h1 {
      flex: 1;
      font-style: normal;
      font-size: 24px;
      line-height: 28px;
      text-align: left;
      color: #444444;
    }
    button {
      background: #ee4d64;
      border: 0;
      border-radius: 4px;
      color: #eee;
      width: 142px;
      height: 36px;
      line-height: 16px;
      font-style: normal;
      color: #ffffff;
      margin-left: 20px;
      transition: background 0.2s;
      /*font-family: Verdana, Geneva, Tahoma, sans-serif;*/
      font-weight: bold;
      font-size: 24px;

      &:hover {
        background: ${darken(0.15, '#ee4d64')};
      }
    }
  }

  form {
    background: #ffffff;
    margin: 30px auto;
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    padding: 15px;

    span {
      font-style: normal;
      font-size: 14px;
      font-weight: bold;
      line-height: 16px;
      color: #444444;
      margin: 20px 0 5px 5px;
      /*display: flex;
      justify-content: space-between;
      */
    }

    input {
      width: 100%;
      max-width: 870px;
      height: 45px;
      padding: 10px;
      background: #ffffff;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      border-radius: 4px;
      margin: 0 auto;
    }

    div {
      display: flex;
      flex-direction: column;
      margin: 15px auto;
    }

    > section {
      display: flex;
      flex-direction: row;

      div {
        display: flex;
        flex-direction: column;
        margin: 5px 0;

        span {
          margin-left: 15px;
        }

        input {
          width: 100%;
          max-width: 270px;
          margin: 0 auto;

          &:read-only {
            background: #999999;
            color: #ffffff;
          }
        }
      }
    }

    /*
    table {
      margin-top: 50px;
      align-self: center;

      tr {
        text-align: center;

        th {
          font-weight: bold;
          font-size: 19px;
        }

        td {
          text-align: center;
          font-size: 17px;
        }
      }
    }
    */
  }
`;
