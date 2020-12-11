import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'
import { fetchCollectionsStart } from '../../redux/shop/shop.actions'

import Layout from '../../layouts/layout-container.component'

import AdminAddItem from '../../components/admin-add-item/admin-add-item.component'

export default function AdminDashboard() {
  const dispatch = useDispatch()
  const collections = useSelector(selectCollectionsForPreview)
  const [collectionNames, setCollectionNames] = useState([])

  useEffect(() => {
    setCollectionNames(collections.map((collection) => collection.title))
  }, [collections])

  useEffect(() => {
    dispatch(fetchCollectionsStart())
  }, [dispatch])

  return (
    <Layout>
      <div>
        <br></br>
        <br></br>
        <AdminAddItem />

        <div>
          <br></br>
          <br></br>
          <h1>Products</h1>
          <br></br>
          <span>
            <b>Collections:</b>{' '}
          </span>
          {collectionNames.map((c) => (
            <span key={c}> {c} </span>
          ))}
          <br></br>
          <br></br>
          <div>
            {collections &&
              collections.map((collection) => {
                return (
                  <div key={collection.id}>
                    <h2>{collection.title}</h2>
                    <div
                      style={{
                        display: 'flex',
                        borderBottom: '1px solid grey'
                      }}
                    >
                      {collection.items.map((item) => {
                        return (
                          <div
                            key={item.id}
                            style={{
                              margin: '20px',
                              maxWidth: '100px',
                              height: '200px'
                            }}
                          >
                            <img
                              src={item.imageUrl}
                              alt='item'
                              style={{ height: '100px', width: 'auto' }}
                            />
                            <h4>{item.name}</h4>
                            <p>${item.price}</p>
                            <button style={{ marginRight: '10px' }}>
                              Delete
                            </button>
                            <button>Edit</button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </Layout>
  )
}
