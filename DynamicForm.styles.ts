/* eslint-disable @typescript-eslint/no-explicit-any */
// import { styled } from '@mui/system';
import styled from "styled-components";
import { getErrorStyle } from "../../global.styles";

export const StyledSectionContainer = styled('div')`
  margin-bottom: 2rem;
`;

export const StyledSectionTitle = styled('div')`
  font-size: 1.5rem;
`;

export const StyledSectionDescription = styled('div')`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyledFormFieldContainer = styled('div')`
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
`;

export const StyledRadioContainer = styled('div')`
  display: block;
  line-height: 2rem;
`;

export const StyledFormFiledWrapper = styled('div') <{ columnCount: number }>`
  box-sizing: border-box;
  width: ${({ columnCount }) => `${(columnCount / 12) * 100}%`};
  padding-right: 1rem;
  padding-bottom: 1rem;

  & > div {
    max-width: 100%;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }
`;

export const StyledMomentPickerWrapper = styled('div')`
  & > div > div > div {
    max-width: 100%;
  }
`;


export const StyledTooltipContainer = styled('div')`
  position: relative; 
  margin-left: 0.5rem;
  top: -0.25rem;
`;


export const StyledDropdownV2Wrapper = styled('div')`
  position: relative;

  & > div:first-child > div:first-child {
    width: auto;

    & > label {
      white-space: normal;
    }
  }

  & > div:first-child > div:nth-child(2) button p {
    padding-top: 19px;
  }
`;

export const StyledDateContainer = styled('div') <{ hasError?: boolean }>`
  & > div > div > div > div > div:nth-child(2) {
    ${({ hasError }) => hasError && getErrorStyle()}
  }
`;
