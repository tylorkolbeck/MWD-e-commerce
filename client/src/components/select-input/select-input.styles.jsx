import styled, { css } from 'styled-components'

const subColor = 'grey'
const mainColor = 'black'

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`

export const SelectInputGroup = styled.div`
  position: relative;
`

export const Select = styled.select`
  color: grey;
  border: 0px;
  display: block;
  outline: 0;
  border-bottom: 1px solid grey;
  padding: 10px 10px 10px 0px;
  font-family: inherit;
  font-size: 16px;
  margin: 20px 0px;
  width: 100%;
  &:focus {
    background: #eeeeee;
    outline: none;
  }

  &:focus ~ label {
    ${shrinkLabelStyles}
  }
`

export const SelectLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 0px;
  top: -10px;
  transition: 300ms ease all;
  opacity: 0;

  &.shrink {
    opacity: 1;
    ${shrinkLabelStyles}
  }
`
