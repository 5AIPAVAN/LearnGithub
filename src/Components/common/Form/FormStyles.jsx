import styled from "styled-components";

// normal input style
export const InputWrapper = styled.div`
  width: 100%;
  input {
    --moz-appearance: textfield;
    border-radius: 12px;
    padding: 18px 0px 18px 20px;
    box-sizing: border-box;
    height: 20px;
    outline: none;
    width: 100%;
    caret-color: ${(props) => (props.showCaret ? "" : "transparent")};
    cursor: ${(props) => (props.showCaret ? "text" : "pointer")};
    border: ${(props) =>
      props.isError ? "1px solid #E95454" : "1px solid #e4eaef"};
    &:focus {
      box-shadow: none;
      border: ${(props) =>
        props.isError ? "1px solid #E95454" : "1px solid #0F1623"};
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &::placeholder {
      font-weight: 400;
      font-size: 16px;
      color: #6a768a;
    }
  }
  .invalid-feedback {
    display: block;
    font-weight: 500;
    font-size: 12px;
    color: #e95454;
  }
`;

export const SelectInputWrapper = styled.div`
  cursor: pointer;
  position: relative;
  width: ${(props) => props.width};
  .invalid-feedback {
    display: block;
    font-weight: 500;
    font-size: 12px;
    color: #e95454;
  }
`;

export const DropdownWrapper =
  styled.div <
  {} >
  `
  display: flex;
  flex-direction: column;
`;

export const SelectWrapper = styled.div`
  padding: 4px 8px 4px 16px;
  gap: 4px;
  width: 100%;
  height: 48px;
  background: #ffffff;
  box-sizing: border-box;

  border: 1px solid
    ${(props) =>
      props.isError ? "#E95454" : props.showOptions ? "#0F1623" : "E4EAEF"};
  border-radius: 12px;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: ${(props) => (props.initial ? "#6A768A" : "#0F1623")};
  font-weight: 400;
`;

export const OptionWrapper =
  styled.div <
  {} >
  `
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #e4eaef;
  box-shadow: 0px 0px 20px rgb(232 235 242 / 25%);
  border-radius: 4px;
  position: absolute;
  max-height: 20vh;
  /* top: -50%; */
  width: 100%;
  overflow: auto;
  margin-top: 8px;
  z-index: 2;
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 12px 24px;
  font-weight: 400;
  font-size: 16px;
  color: #0f1623;
  &:hover {
    background-color: #e4eaef;
    cursor: pointer;
  }
`;

export const DropdownImageWrapper = styled.div`
  margin-right: 20px;
`;

export const FormLabel = styled.label`
  margin-bottom: 0.5rem;
  display: inline-block;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 500)};
`;

export const FormError = styled.small`
  display: block;
  font-weight: 500;
  font-size: 12px;
  color: #e95454;
  margin-top: 0.25rem;
`;

export const FormGroup = styled.div``;
