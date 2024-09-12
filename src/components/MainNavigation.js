import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import './MainNavigation.css'
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

  function hideMenu() {
    const checkbox = document.getElementById('check')
    checkbox.checked = false
  }

  if (!accessToken || accessToken === null || accessToken === 'null') {
    return (
      <nav className='main-nav'>
        <Link to='/login' className='login-button'>
          LogIn
        </Link>
      </nav>
    )
  }

  if (role === 'USER') {
    return (
      <nav className='main-nav'>
        <input type='checkbox' id='check' />
        <span className='menu'>
          <Link
            to='/add-new'
            className='add-button'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={hideMenu}
          >
            +
            <img
              src={isHovered ? grillOpened : grillClosed}
              alt='add-new'
              className='add-new'
            />
          </Link>
          <Link to='/profile' onClick={hideMenu}>
            Profile
          </Link>
          <Link
            to='/'
            className='logout-btn'
            onClick={() => {
              logOut()
              hideMenu()
            }}
          >
            ↪
          </Link>
        </span>
        <label htmlFor='check' className='open-menu'>
          ☰
        </label>
        <label htmlFor='check' className='close-menu'>
          ✕
        </label>
      </nav>
    )
  }
}
export default MainNavigation
