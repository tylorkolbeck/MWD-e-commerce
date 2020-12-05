import React from 'react'
import { Link } from 'react-router-dom'

export default function BreadCrumb({ pathsArray }) {
  return (
    <div>
      {pathsArray.map((path, index) => (
        <React.Fragment key={`breadCrumb_link_${path}`}>
          <Link to={`/${path.toLowerCase()}`}>{path}</Link>
          {index < pathsArray.length - 1 && ' > '}
        </React.Fragment>
      ))}
    </div>
  )
}
