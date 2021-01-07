import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { EditIconButton, HomeIconButton, SettingsIconButton, UserIconButton } from '../buttons/IconButtons'

export default function Navigation() {
  return (
    <NavigationStyled>
      <NavLink to="/" exact><HomeIconButton onClick={() => { }} size={'md'} /></NavLink>
      <NavLink to="/settings"><SettingsIconButton onClick={() => { }} size={'md'} /></NavLink>
      <NavLink to="/edit-overview"><EditIconButton onClick={() => { }} size={'md'} /></NavLink>
      <NavLink to="/user-settings"><UserIconButton onClick={() => { }} size={'md'} /></NavLink>
    </NavigationStyled>
  )
}

const NavigationStyled = styled.nav`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  svg {
    fill: var(--color-secondary);
    opacity: 0.3;
  }

  a.active svg {
    opacity: 1;
  }
`