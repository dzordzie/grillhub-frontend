import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import SearchBar from './SearchBar'
import MainNavigation from './MainNavigation'
import logo from '../assets/bbq-grill_icon.png'

function Header() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <header className='header'>
      <Link to='/' className='home-link'>
        <h1 className='logo-name'>GrillHub</h1>
        <img className='logo-picture' src={logo} alt='home' />
      </Link>
      {isHomePage && <SearchBar />}
      <MainNavigation />
    </header>
  )
}
export default Header
