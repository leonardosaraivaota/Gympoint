import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  min-height: 100%;
  /*background: linear-gradient(-90deg, #7859c1, #ab59c1);*/
  background: linear-gradient(-90deg, #ee4d64, #ee4d80);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  margin: 40px auto;
  min-height: 448px;
  width: 100%;
  max-width: 360px;
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  padding-bottom: 30px;

  img {
    margin-top: 50px;
  }

  h3 {
    height: 35px;
    top: calc(50% - 35px / 2 + 32.2px);
    font-style: normal;
    font-size: 30px;
    line-height: 35px;
    color: #ee4d64;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    align-items: center;
    justify-content: center;

    small {
      align-self: flex-start;
      margin-left: 30px;
      color: #000000;
      font-style: normal;
      font-size: 14px;
      font-weight: bold;
      line-height: 14px;
    }

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      width: 300px;
      padding: 10px;
      color: #fff;
      margin: 5 auto 20px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #fb6f91;
      font-size: 12px;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      width: 300px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }

    a {
      color: #ee4d64;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
