import { Link, NavLink, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import ApiService from '../service/ApiService'
import grillOpened from '../assets/grill-opened.svg'
import grillClosed from '../assets/grill-closed.svg'

const apiService = new ApiService('/auth')

function MainNavigation() {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const accessToken = apiService.getAccessToken()

  const role = localStorage.getItem('role')

  async function logOut() {
    const refreshToken = apiService.getRefreshToken()
    try {
      await apiService.post('/logout', { refreshToken })
      apiService.removeTokens()
      localStorage.removeItem('role')
      navigate('/', { replace: true })
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  if (!accessToken || accessToken === null || accessToken === 'null') {
    return (
      <nav className='main-nav'>
        <NavLink to='/login' className='login-button'>
          LogIn
        </NavLink>
      </nav>
    )
  }

  if (role === 'USER') {
    return (
      <nav className='main-nav'>
        <Link
          to='/add-new'
          className='add-button'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          +
          <img
            src={isHovered ? grillOpened : grillClosed}
            alt='add-new'
            className='add-new'
          />
        </Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/' onClick={logOut}>
          ✕
        </Link>
      </nav>
    )
  }
}
export default MainNavigation
