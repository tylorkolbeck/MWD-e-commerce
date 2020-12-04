import React from 'react'
import './directory.styles.scss'
import MenuItem from '../menu-item/menu-item.component'
import { useSelector } from 'react-redux'
import { selectDirectorySection } from '../../redux/directory/directory.selector'

export default function Directory() {
  const directory = useSelector(selectDirectorySection)

  return (
    <div className='directory-menu'>
      {directory.map(({ id, ...sectionProps }) => (
        <MenuItem key={id} {...sectionProps} />
      ))}
    </div>
  )
}
