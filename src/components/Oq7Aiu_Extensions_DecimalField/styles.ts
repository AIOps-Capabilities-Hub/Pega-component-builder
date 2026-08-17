import styled, { css } from "styled-components";

const StyledWrapper = styled.div<{
  $backgroundColor?: string;
  $fontColor?: string;
}>`
  width: 100%;

  ${({ $backgroundColor, $fontColor }) =>
    ($backgroundColor || $fontColor) &&
    css`
      input,
      [role="spinbutton"] {
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

export default StyledWrapper;
