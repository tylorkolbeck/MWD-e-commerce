import styled, { css } from 'styled-components'

const fadeInFadeOutAnimations = css`
  -webkit-animation: fadein 0.3s linear forwards;
  animation: fadein 0.3s linear forwards;

  &.item-fadeout {
    -webkit-animation: fadeout 0.3s linear forwards;
    animation: fadeout 0.3s linear forwards;
  }

  @-webkit-keyframes fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes fadeout {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

export const DeleteIconContainer = styled.span`
  &:hover {
    cursor: pointer;
    color: red;
  }
`

export const InputContainer = styled.div`
  width: 150px;

  ${fadeInFadeOutAnimations}
  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;

    & + label * {
      pointer-events: none;
    }

    &:focus + label,
    & + label:hover {
      background: white;
      color: black;
      border: 1px solid black;
      cursor: pointer;
    }

    &:focus + label {
      outline: 1px dotted #000;
      outline: -webkit-focus-ring-color auto 5px;
    }
  }

  label {
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-color: black;
    display: inline-block;
  }
`

export const Label = styled.label``
