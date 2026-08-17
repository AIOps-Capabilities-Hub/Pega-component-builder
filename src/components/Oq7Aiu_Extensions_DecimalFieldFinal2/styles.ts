import styled, { css } from "styled-components";

interface StyledProps {
  $backgroundColor?: string;
  $fontColor?: string;
  $readOnly?: boolean;
}

const StyledOq7AiuExtensionsDecimalFieldFinal2Wrapper = styled.div<StyledProps>`
  margin: 0;
  width: 100%;

  ${({ $readOnly, $backgroundColor, $fontColor }) =>
    $readOnly &&
    css`
      input,
      textarea,
      [role="spinbutton"] {
        ${$backgroundColor
          ? `background-color: ${$backgroundColor} !important;`
          : ""}
        ${$fontColor ? `color: ${$fontColor} !important;` : ""}
        ${$fontColor
          ? `-webkit-text-fill-color: ${$fontColor} !important;`
          : ""}
        ${$fontColor ? `caret-color: ${$fontColor} !important;` : ""}
      }

      input::placeholder,
      textarea::placeholder {
        ${$fontColor ? `color: ${$fontColor} !important;` : ""}
        opacity: 0.75;
      }

      input[readonly],
      input:read-only {
        ${$backgroundColor
          ? `background-color: ${$backgroundColor} !important;`
          : ""}
        ${$fontColor ? `color: ${$fontColor} !important;` : ""}
        ${$fontColor
          ? `-webkit-text-fill-color: ${$fontColor} !important;`
          : ""}
      }
    `}
`;

export default StyledOq7AiuExtensionsDecimalFieldFinal2Wrapper;
