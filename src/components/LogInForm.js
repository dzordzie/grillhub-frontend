import './LogInForm.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import userService from '../services/UserService'

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
  /* ⇩⇩⇩⇩⇩ THIS WILL BE CONVERTED TO SERVICE ⇩⇩⇩⇩⇩ */
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await userService.login(user)
      const token = response.token
      const role = JSON.parse(atob(token.split('.')[1])).role
      formRef.current.reset()
      resetStates()
      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
      navigate('/')
    } catch (error) {
      console.error('Error during login:', error)
      setMessageForUser('Sorry something went wrong. Please try again later.')
    }
  }

  return (
    <div className='form-container'>
      <form ref={formRef} onSubmit={handleSubmit} className='user-form'>
        <h2>It's Grill Time</h2>
        <div>
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
        </div>
        <div>
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
        </div>
        <label className='label' htmlFor='showpswd'>
          Show Password
          <input
            className='showpswd'
            id='showpswd'
            type='checkbox'
            name='showpswd'
            onChange={() => setShowPassword((show) => !show)}
            checked={showPassword}
          />
        </label>
        <span className='submit-message'>{messageForUser}</span>
        <button className='submit-btn' type='submit'>
          Let's Go!'
        </button>

        <Link to='/registration' className='sign-up-link'>
          Do you want to grill with us?
        </Link>
      </form>
    </div>
  )
}
export default LogInForm
