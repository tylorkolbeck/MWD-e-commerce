import React from 'react'
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './header.styles'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import { useSelector, useDispatch } from 'react-redux'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selector'
import { signOutStart } from '../../redux/user/user.actions'

function Header() {
  const currentUser = useSelector(selectCurrentUser)
  const cartIsShown = useSelector(selectCartHidden)

  const dispatch = useDispatch()

  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/collections'>COLLECTIONS</OptionLink>
        <OptionLink to='/contact'>CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as='div' onClick={() => dispatch(signOutStart())}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to='/signin'>LOGIN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {cartIsShown && <CartDropdown cartIsShown={cartIsShown} />}
    </HeaderContainer>
  )
}

export default Header
