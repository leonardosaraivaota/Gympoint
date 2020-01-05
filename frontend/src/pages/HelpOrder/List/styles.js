import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;

  max-width: 900px;
  flex-direction: column;
  margin: 100px auto;

  span {
    font-size: 19px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;

    button {
      background: #ee4d64;
      color: #eee;
      width: 140px;
      height: 50px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      font-weight: bold;
    }
  }

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
`;
