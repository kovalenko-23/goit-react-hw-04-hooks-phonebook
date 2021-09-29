import styled from "@emotion/styled";

export const Form = styled.form`
  display: inline-flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
`;

export const Label = styled.label`
  display: inline-flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: ${(props) => (props.bottom ? "20px" : "8px")};
`;

export const Input = styled.input`
  margin-left: 6px;
`;

export const ButtonAdd = styled.button`
  height: 30px;
  font-weight: bold;
  font-size: 16px;
  background-color: #c1f3d9;
`;
