import React from 'react'
import './directory.styles.scss'
import MenuItem from '../menu-item/menu-item.component'

// DUMMY DATA
import { sections } from '../../utils/dummyData'

export default function Directory() {
  return (
    <div className='directory-menu'>
      {sections.map(({ id, ...sectionProps }) => (
        <MenuItem key={id} {...sectionProps} />
      ))}
    </div>
  )
}
