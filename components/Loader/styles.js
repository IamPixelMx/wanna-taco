import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/core';

const paddingHeight = `var(--space-large) + var(--space-x-large)`;

const flip = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
`;

const fullScreenLoaderStyled = ({ isFullScreen }) =>
  isFullScreen &&
  css`
    height: calc(100vh - (2 * ${paddingHeight}));
  `;

const customHeightStyled = ({ customHeight }) =>
  customHeight &&
  css`
    height: calc(${customHeight} - (2 * var(--space-large)));
  `;

export const LoaderStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 5rem;
  max-width: 100vw;
  width: 100%;
  padding: var(--space-large) 0;
  ${fullScreenLoaderStyled}
  ${customHeightStyled}
`;

export const LoaderIconsStyled = styled.div`
  position: relative;
  transform-style: preserve-3d;
  animation-duration: 1500ms;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-name: ${flip};
  animation-timing-function: ease-in-out;
`;

export const IconStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  backface-visibility: hidden;
  &:first-of-type {
    z-index: 2;
    transform: translate(-50%, -50%) rotateY(0deg);
  }
  &:last-of-type {
    transform: translate(-50%, -50%) rotateY(180deg);
  }
`;
