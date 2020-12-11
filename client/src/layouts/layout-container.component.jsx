import React from 'react'
import Header from '../components/header/header.component'
import { Layout } from './layout-container.styles'

export default function LayoutContainer({ children }) {
  return (
    <Layout>
      <Header />
      {children}
    </Layout>
  )
}
