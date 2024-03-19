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
          <li>
            <Link to='/login' className='best-member'>
              <img className='profile-picture' src={profilePicture} alt='' />
              <div className='member-info'>
                <h4 className='member-name'>Sir-Grill-A-Lot</h4>
                <p className='member-score'>
                  <img className='flame' src={flame} alt='' />
                  2,879
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link className='best-member'>
              <img className='profile-picture' src={profilePicture} alt='' />
              <div className='member-info'>
                <h4 className='member-name'>lenkaGrilenka</h4>
                <p className='member-score'>
                  <img className='flame' src={flame} alt='' />
                  1,234
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link className='best-member'>
              <img className='profile-picture' src={profilePicture} alt='' />
              <div className='member-info'>
                <h4 className='member-name'>juraj123</h4>
                <p className='member-score'>
                  <img className='flame' src={flame} alt='' />
                  976
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link className='best-member'>
              <img className='profile-picture' src={profilePicture} alt='' />
              <div className='member-info'>
                <h4 className='member-name'>frantisek321</h4>
                <p className='member-score'>
                  <img className='flame' src={flame} alt='' />
                  823
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link className='best-member'>
              <img className='profile-picture' src={profilePicture} alt='' />
              <div className='member-info'>
                <h4 className='member-name'>filipe78</h4>
                <p className='member-score'>
                  <img className='flame' src={flame} alt='' />
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
