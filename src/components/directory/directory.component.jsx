import React, { useState } from 'react'
import './directory.styles.scss'
import MenuItem from '../menu-item/menu-item.component'

// DUMMY DATA
import { sections } from '../../utils/dummyData'

export default function Directory() {
  const [state, setState] = useState({
    sections: sections
  })
  return (
    <div className='directory-menu'>
      {state.sections.map(({ title, imageUrl, id, size }) => (
        <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
      ))}
    </div>
  )
}
