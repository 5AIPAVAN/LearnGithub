import styled from "styled-components";

export const FooterWrapper = styled.div`
  display: flex;
  padding: 24px;
  gap: 20px;
  background-color: #f2f1ed;
  p {
    margin: 0;
    padding: 0;
  }
  .heading {
    font-size: 16px;
    font-weight: 600;
  }
  ul {
    padding: 0;
    li {
      list-style: none;
    }
  }
  div {
    &:first-child {
      width: 40%;
    }
    width: 20%;
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
    div {
      &:first-child {
        width: 100%;
      }
      width: 100%;
    }
  }
`;
