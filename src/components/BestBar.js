import { Link } from 'react-router-dom'
import profilePicture from '../assets/profile-picture.png'
import flame from '../assets/flame-color.svg'
import './BestBar.css'

function BestBar() {
  return (
    <aside className='best-bar'>
      <div className='best-bar-wrapper'>
        <h2 className='best-heading'>BEST PITMASTERS</h2>
        <ul className='best-members'>
          <li className='best-member'>
            <Link>
              <img className='profile-picture' src={profilePicture} alt='' />
              <div className='member-info'>
                <h4>Sir-Grill-A-Lot</h4>
                <p>
                  <img className='flame' src={flame} />
                  2,879
                </p>
              </div>
            </Link>
          </li>
          <li className='best-member'>
            <Link>
              <img className='profile-picture' src={profilePicture} alt='' />
              <div className='member-info'>
                <h4>lenkaGrilenka</h4>
                <p>
                  <img className='flame' src={flame} />
                  1,234
                </p>
              </div>
            </Link>
          </li>
          <li className='best-member'>
            <Link>
              <img className='profile-picture' src={profilePicture} alt='' />
              <div className='member-info'>
                <h4>juraj123</h4>
                <p>
                  <img className='flame' src={flame} />
                  976
                </p>
              </div>
            </Link>
          </li>
          <li className='best-member'>
            <Link>
              <img className='profile-picture' src={profilePicture} alt='' />
              <div className='member-info'>
                <h4>frantisek321</h4>
                <p>
                  <img className='flame' src={flame} />
                  823
                </p>
              </div>
            </Link>
          </li>
          <li className='best-member'>
            <Link>
              <img className='profile-picture' src={profilePicture} alt='' />
              <div className='member-info'>
                <h4>filipe78</h4>
                <p>
                  <img className='flame' src={flame} />
                  573
                </p>
              </div>
            </Link>
          </li>
        </ul>
        <button className='show-btn'>SHOW MORE</button>
      </div>
    </aside>
  )
}
export default BestBar
