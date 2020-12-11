import React from 'react'
import { HeaderContainer, OptionsContainer, OptionLink } from './header.styles'

import { useSelector, useDispatch } from 'react-redux'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import SiteLogo from '../site-logo/site-logo.component'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selector'
import { signOutStart } from '../../redux/user/user.actions'
import { siteMetaData } from '../../redux/__site-meta-data/site.selectors'

function Header() {
  const currentUser = useSelector(selectCurrentUser)
  const cartIsShown = useSelector(selectCartHidden)
  const { siteName } = useSelector(siteMetaData)

  const dispatch = useDispatch()

  return (
    <HeaderContainer>
      <SiteLogo siteName={siteName} />
      <OptionsContainer>
        <OptionLink to='/shop'>SHOP</OptionLink>
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
