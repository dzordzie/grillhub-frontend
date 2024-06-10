import { Link } from 'react-router-dom'
import './SideBar.css'
import Footer from './Footer'
import beef from '../assets/beef-dark.svg'
import chicken from '../assets/chicken-dark.svg'
import pork from '../assets/pork-dark.svg'
import fish from '../assets/fish-dark.svg'
import lamb from '../assets/lamb-dark.svg'
import seafood from '../assets/seafood-dark.svg'
import rub from '../assets/rub-dark.svg'

function SideBar() {
  return (
    <aside className='sidebar'>
      <h2 className='side-heading'>CATEGORIES</h2>
      <nav className='side-navigation'>
        <ul className='filter-items'>
          <li>
            <Link className='category'>
              <p>BEEF</p>
              <img src={beef} alt='beef' />
            </Link>
          </li>
          <li>
            <Link className='category'>
              <p>PORK</p>
              <img src={pork} alt='pork' />
            </Link>
          </li>
          <li>
            <Link className='category'>
              <p>CHICKEN</p>
              <img src={chicken} alt='chicken' />
            </Link>
          </li>
          <li>
            <Link className='category'>
              <p>LAMB</p>
              <img src={lamb} alt='lamb' />
            </Link>
          </li>
          <li>
            <Link className='category'>
              <p>FISH</p>
              <img src={fish} alt='fish' />
            </Link>
          </li>
          <li>
            <Link className='category'>
              <p>SEAFOOD</p>
              <img src={seafood} alt='seafood' />
            </Link>
          </li>
          <li>
            <Link className='category'>
              <p>RUBS</p>
              <img src={rub} alt='rub' />
            </Link>
          </li>
        </ul>
      </nav>
      <Footer />
    </aside>
  )
}
export default SideBar
