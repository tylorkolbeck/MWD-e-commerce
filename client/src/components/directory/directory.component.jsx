import React from 'react'
import MenuItem from '../menu-item/menu-item.component'
import { useSelector } from 'react-redux'
import { selectDirectorySection } from '../../redux/directory/directory.selector'

import { DirectoryMenuContainer } from './directory.styles'

export default function Directory() {
  const directory = useSelector(selectDirectorySection)

  return (
    <DirectoryMenuContainer>
      {directory.map(({ id, ...sectionProps }) => (
        <MenuItem key={id} {...sectionProps} />
      ))}
    </DirectoryMenuContainer>
  )
}
