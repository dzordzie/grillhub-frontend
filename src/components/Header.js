import { Link } from 'react-router-dom'
import './Header.css'
import SearchBar from './SearchBar'
import MainNavigation from './MainNavigation'

function Header() {
  return (
    <header className='header'>
      <Link to='/' className='home-link'>
        <h1>GrillHub</h1>
      </Link>
      <SearchBar />
      <MainNavigation />
    </header>
  )
}
export default Header
