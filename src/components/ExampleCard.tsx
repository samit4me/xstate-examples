import styled from "@emotion/styled";

export default styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #ebeae8;
  padding: 20px;
  width: 100%;
  margin-top: 40px;

  > div {
      min-width: 50%;
      padding: 0 20px;
  }
`;
