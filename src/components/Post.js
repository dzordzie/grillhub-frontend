import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
    id,
    name,
    description,
    imageBase64,
    meatType,
    createdByUser: { id: userId, username },
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
    background: `url(${backgroundImage}) right 1rem bottom 0.2rem no-repeat`,
    backgroundSize: 'auto clamp(18%, 22vw, 45%)',
  }

  const imageSrc = imageBase64 || picture

  return (
    <motion.div className='post-wrapper'>
      <article className='post' style={postStyles}>
        <Link to={`/meal/${id}`} className='meal-link'>
          <h1 className='meal-name post-name'>{name}</h1>
        </Link>
        <div className='meal-summary'>
          <div className='post-picture-container'>
            <img src={imageSrc} alt='YUM' className='post-picture' />
          </div>
          <p className='post-description'>{description.slice(0, 350)}...</p>
          <footer className='post-footer'>
            <p>
              category: <Link>{meatType}</Link>
            </p>
            <p className='created-by'>
              by <Link to={`/user/${userId}`}>{username}</Link>
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
    </motion.div>
  )
}
export default Post
