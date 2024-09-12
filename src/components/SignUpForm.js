import './LogInForm.css'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import ApiService from '../service/ApiService'
import eyeShow from '../assets/eye-show.svg'
import eyeHide from '../assets/eye-hide.svg'
import userIcon from '../assets/user.svg'
import emailIcon from '../assets/email.svg'

function SignUpForm() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [terms, setTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [messageForUser, setMessageForUser] = useState('')
  const formRef = useRef(null)
  const navigate = useNavigate()

  function handleUser(input) {
    const { name, value } = input.target

    setUser({
      ...user,
      [name]: value,
    })
  }

  function handleTerms(input) {
    setTerms(input.target.checked)
  }

  function resetStates() {
    setUser({
      username: '',
      email: '',
      password: '',
    })
    setTerms(false)
  }

  function isFormEmpty() {
    return user.username === '' || user.email === '' || user.password === ''
  }

  const apiService = new ApiService('/auth')

  async function handleSubmit(event) {
    event.preventDefault()
    const isFormValid = formRef.current.checkValidity()
    if (isFormValid && !isFormEmpty() && terms) {
      try {
        const response = await apiService.post('/registration', user)
        if (response.error) {
          setMessageForUser(response.error)
        } else {
          setMessageForUser(response.message)
          formRef.current.reset()
          resetStates()
          navigate('/login')
        }
      } catch (error) {
        console.error('Error during registration:', error)
        setMessageForUser('Error during registration')
      }
    } else if (isFormEmpty()) {
      setMessageForUser('Please fill the form!')
    } else if (!terms) {
      setMessageForUser('Please agree to terms of use')
    }
  }

  return (
    <div className='form-container'>
      <form ref={formRef} onSubmit={handleSubmit} className='user-form'>
        <h2>Join the GrillHub</h2>
        <div className='input-div'>
          <input
            className='input-box'
            id='username'
            type='text'
            name='username'
            pattern='[A-Za-z0-9]{3,16}'
            onChange={handleUser}
            value={user.username}
            placeholder='Username'
          />
          <img src={userIcon} alt='username' className='input-image' />
          <span className='validation-message'>
            Username must be 3 - 16 characters long
          </span>
        </div>
        <div className='input-div'>
          <input
            className='input-box'
            id='email'
            type='email'
            name='email'
            pattern='[a-z0-9][a-z0-9\.\-]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?'
            onChange={handleUser}
            value={user.email}
            placeholder='e-mail'
          />
          <img src={emailIcon} alt='email' className='input-image' />
          <span className='validation-message'>
            Please enter a valid email address.
          </span>
        </div>
        <div className='input-div'>
          <input
            className='input-box'
            id='password'
            type={showPassword ? 'text' : 'password'}
            name='password'
            pattern='(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*-\.].*[!@#$%^&*-\.])(?!.*\s).{8,16}'
            onChange={handleUser}
            value={user.password}
            placeholder='Password'
          />
          <img
            src={showPassword ? eyeHide : eyeShow}
            alt='show'
            className='input-image password'
            onClick={() => setShowPassword((show) => !show)}
          />
          <span className='validation-message'>
            Password must contain 2x number
            <br />
            2x uppercase letter, 2x special character
            <br />
            and must be 8 -16 characters long
          </span>
        </div>
        <label className='terms' htmlFor='terms'>
          Please accept the terms of use.*
          <input
            className='checkbox'
            id='terms'
            type='checkbox'
            name='terms'
            onChange={handleTerms}
            value={terms}
          />
        </label>
        <span className='submit-message signup'>{messageForUser}</span>
        <button className='submit-btn' type='submit'>
          Fire It Up!
        </button>
      </form>
    </div>
  )
}
export default SignUpForm
