import React from 'react'
import { HeaderContainer } from './section-header.styles'

export default function SectionHeader({ text, children }) {
  return (
    <HeaderContainer>
      <h2>{text}</h2>

      {children}
    </HeaderContainer>
  )
}
