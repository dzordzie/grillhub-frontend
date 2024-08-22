import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import SearchBar from './SearchBar'
import MainNavigation from './MainNavigation'

function Header() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <header className='header'>
      <Link to='/' className='home-link'>
        <h1>GrillHub</h1>
      </Link>
      {isHomePage && <SearchBar />}
      <MainNavigation />
    </header>
  )
}
export default Header
