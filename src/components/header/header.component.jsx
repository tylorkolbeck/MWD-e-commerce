import React from 'react'
import './header.styles.scss'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase.utils'
import { useSelector } from 'react-redux'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropDown from '../cart-dropdown/cart-dropdown.component'

function Header() {
  const { currentUser } = useSelector((state) => state.user)
  const cart = useSelector((state) => state.cart)

  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/contact'>
          CONTACT
        </Link>
        {currentUser ? (
          <div className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className='option' to='/signin'>
            LOGIN
          </Link>
        )}
        <CartIcon />
      </div>
      {cart.cartIsShown && <CartDropDown />}
    </div>
  )
}

export default Header
