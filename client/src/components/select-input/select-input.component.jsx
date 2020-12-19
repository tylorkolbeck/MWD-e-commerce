import React from 'react'
import { Select, SelectLabel, SelectInputGroup } from './select-input.styles'

function SelectInput({ handleChange, label, children, ...otherProps }) {
  return (
    <SelectInputGroup>
      {label && (
        <SelectLabel
          className={`${otherProps?.value ? 'shrink' : ''} form-input-label`}
        >
          {label}
        </SelectLabel>
      )}
      <Select onChange={handleChange} {...otherProps} tabIndex={0}>
        {children}
      </Select>
    </SelectInputGroup>
  )
}

export default SelectInput
