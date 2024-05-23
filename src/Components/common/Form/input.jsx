import React, { KeyboardEvent, forwardRef } from "react";
import { InputWrapper, FormError, FormLabel, FormGroup } from "./FormStyles";

const Input = forwardRef(
  (
    {
      title,
      placeholder,
      type,
      value,
      error,
      onChange,
      onFocus,
      maxLength,
      onKeyDown,
      isNonMarginBottom,
      autoFocus = false,
      autoComplete = "on",
      name,
      onBlur,
      atStart = true,
      atEnd = false,
      required = false,
      onWheel,
      tabIndex,
      onClick,
      showCaret = true,
      label = "",
      readOnly = false,
    },
    ref
  ) => {
    return (
      <InputWrapper isError={error ? true : false} showCaret={showCaret}>
        <FormGroup
          className={isNonMarginBottom ? "" : "mb-3"}
          // controlId="formBasicEmail"
          style={{ width: "100%" }}
        >
          {atStart && title && (
            <FormLabel className="formLabel">{title}</FormLabel>
          )}
          <input
            ref={ref}
            required={required}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            maxLength={maxLength}
            autoComplete={autoComplete}
            onBlur={onBlur}
            tabIndex={tabIndex}
            onClick={onClick}
            readOnly={readOnly}
            onKeyDown={
              type === "number"
                ? (event) => {
                    if (
                      event.keyCode === 38 ||
                      event.keyCode === 40 ||
                      event.keyCode === 189
                    ) {
                      event.preventDefault();
                    }
                  }
                : onKeyDown
            }
            onFocus={onFocus}
            autoFocus={autoFocus}
            name={name || "text"}
            onWheel={type === "number" ? (e) => e.target.blur() : onWheel}
            id="sm-input"
          />
          {atEnd && title && <FormLabel>{title}</FormLabel>}
          {error && <FormError className="invalid-feedback">{error}</FormError>}
        </FormGroup>
      </InputWrapper>
    );
  }
);

Input.displayName = "Input";
export default Input;
