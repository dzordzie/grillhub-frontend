import { Link } from 'react-router-dom'
import './Meal.css'
import picture from '../assets/beef.jpeg'
import flameColor from '../assets/flame-color.svg'
import flameGrey from '../assets/flame-half.svg'
import beefImg from '../assets/beef-semilight.svg'
import fishImg from '../assets/fish-semilight.svg'
import porkImg from '../assets/pork-semilight.svg'
import chickenImg from '../assets/chicken-semilight.svg'
import lambImg from '../assets/lamb-semilight.svg'
import shrimpImg from '../assets/seafood-semilight.svg'

function Meal({ meal }) {
  const {
    name,
    description,
    meat: { typeOfCut, weightInGrams, internalTemp, ambientTemp, meatType },
    rub,
    createdByUser,
    createdAt,
  } = meal

  const rubSpices = rub.spices?.map((spice) => (
    <li key={spice.name}>
      {spice.weightInGrams}g {spice.name}
    </li>
  ))

  const meatTypeToImage = {
    BEEF: beefImg,
    CHICKEN: chickenImg,
    PORK: porkImg,
    FISH: fishImg,
    LAMB: lambImg,
    SEAFOOD: shrimpImg,
  }

  const backgroundImage = meatTypeToImage[meatType] || beefImg

  const pageStyles = {
    background: `url(${backgroundImage}) right 7vw bottom no-repeat fixed`,
    backgroundSize: 'auto 10vw',
  }

  return (
    <div className='content' style={pageStyles}>
      <div className='meal-wrapper'>
        <article className='meal'>
          <h1 className='meal-name'>{name}</h1>
          <section className='meal-info'>
            <img src={picture} alt='beef' className='meal-picture' />
            <p className='meal-description'>{description}</p>
          </section>
          <section className='meal-details'>
            <div className='meat'>
              <h2>Meat</h2>
              <ul className='meat-info'>
                <li>
                  {weightInGrams}g of {typeOfCut}
                </li>
                <li>{internalTemp}°C internal temperature</li>
                <li>{ambientTemp}°C cooking temperature</li>
              </ul>
            </div>
            <div className='rub'>
              <h2>Rub</h2>
              <ul className='rub-info'>
                {rubSpices}
                <p className='rub-name'>
                  This is <Link>{rub.name}</Link> by{' '}
                  <Link>{rub.createdByUser.username}</Link>
                </p>
              </ul>
            </div>
          </section>
          <footer className='meal-footer'>
            <p>
              category: <Link>{meatType}</Link>
            </p>
            <p className='created-by'>
              by <Link>{createdByUser.username}</Link>
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
        </article>
      </div>
    </div>
  )
}
export default Meal
