import './LogInForm.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import ApiService from '../service/ApiService'
import eyeShow from '../assets/eye-show.svg'
import eyeHide from '../assets/eye-hide.svg'
import userIcon from '../assets/user.svg'

function LogInForm() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [messageForUser, setMessageForUser] = useState('')
  const navigate = useNavigate()
  const formRef = useRef(null)

  function handleUser(input) {
    const { name, value } = input.target

    setUser({
      ...user,
      [name]: value,
    })
  }

  function resetStates() {
    setUser({
      username: '',
      password: '',
    })
  }

  const apiService = new ApiService('/auth')

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await apiService.post('/login', user)

      const { accessToken, refreshToken } = response

      apiService.setAccessToken(accessToken)
      apiService.setRefreshToken(refreshToken)

      const role = JSON.parse(atob(accessToken.split('.')[1])).role
      localStorage.setItem('role', role)

      formRef.current.reset()
      resetStates()
      navigate('/')
    } catch (error) {
      console.error('Error during login:', error)
      setMessageForUser('Username or password is incorrect!')
    }
  }

  return (
    <div className='form-container'>
      <form ref={formRef} onSubmit={handleSubmit} className='user-form'>
        <h2>It's Grill Time</h2>
        <div className='input-div'>
          <input
            className='input-box'
            id='username'
            type='username'
            required
            name='username'
            onChange={handleUser}
            value={user.username}
            placeholder='Username'
          />
          <img src={userIcon} alt='username' className='input-image' />
        </div>
        <div className='input-div'>
          <input
            className='input-box'
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            id='password'
            required
            name='password'
            onChange={handleUser}
            value={user.password}
          />
          <img
            src={showPassword ? eyeHide : eyeShow}
            alt='show'
            className='input-image password'
            onClick={() => setShowPassword((show) => !show)}
          />
        </div>
        <span className='submit-message login'>{messageForUser}</span>
        <button className='submit-btn' type='submit'>
          Let's Go!
        </button>

        <Link to='/registration' className='sign-up-link'>
          Do you want to grill with us?
        </Link>
      </form>
    </div>
  )
}
export default LogInForm
