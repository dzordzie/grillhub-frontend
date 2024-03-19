import { Link } from 'react-router-dom'
import './Post.css'
import picture from '../assets/beef.jpeg'
import flameColor from '../assets/flame-color.svg'
import flameGrey from '../assets/flame-half.svg'
import beefImg from '../assets/beef-semilight.svg'
import fishImg from '../assets/fish-semilight.svg'
import porkImg from '../assets/pork-semilight.svg'
import chickenImg from '../assets/chicken-semilight.svg'
import lambImg from '../assets/lamb-semilight.svg'
import shrimpImg from '../assets/seafood-semilight.svg'

function Post({ post }) {
  const {
    name,
    description,
    meatDTO: { meatType },
    createdByUser: { username },
    createdAt,
  } = post

  const meatTypeToImage = {
    BEEF: beefImg,
    CHICKEN: chickenImg,
    PORK: porkImg,
    FISH: fishImg,
    LAMB: lambImg,
    SEAFOOD: shrimpImg,
  }

  const backgroundImage = meatTypeToImage[meatType] || beefImg

  const postStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'auto 45%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem bottom 0.2rem',
  }

  return (
    <div className='post-wrapper'>
      <article className='post' style={postStyles}>
        <h1 className='meal-name'>{name}</h1>
        <div className='meal-info'>
          <img src={picture} alt='beef' className='meal-picture' />
          <p className='meal-description'>{description.slice(0, 350)}...</p>
          <footer className='post-footer'>
            <p>
              category: <Link>{meatType}</Link>
            </p>
            <p className='created-by'>
              by <Link>{username}</Link>
            </p>
            <div className='meal-ratings'>
              <img src={flameColor} alt='' />
              <img src={flameColor} alt='' />
              <img src={flameColor} alt='' />
              <img src={flameColor} alt='' />
              <img src={flameGrey} alt='' />
            </div>
            <p className='created-at'>{createdAt}</p>
          </footer>
        </div>
      </article>
    </div>
  )
}
export default Post
