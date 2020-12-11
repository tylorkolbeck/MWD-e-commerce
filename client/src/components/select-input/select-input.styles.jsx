import styled from 'styled-components'

export const SelectInputGroup = styled.div`
  position: relative;
`

export const Select = styled.select`
  color: grey;
  border: 0px;
  outline: 0;
  border-bottom: 1px solid grey;
  padding: 10px 10px 10px 5px;
  font-family: inherit;
  font-size: 18px;
  margin: 25px 0;
  width: 100%;
  &:focus {
    background: #eeeeee;
  }
`

export const SelectLabel = styled.label`
  position: absolute;
  top: 0;
  bottom: 0;
  font-size: 12px;
`
