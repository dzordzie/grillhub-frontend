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
import { useState } from 'react'

function Meal({ meal }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    name,
    description,
    imageBase64,
    meat: { typeOfCut, weightInGrams, internalTemp, ambientTemp, meatType },
    rub: { ...rubData },
    createdByUser,
    createdAt,
  } = meal

  const rubSpices = rubData.spices.map((spice) => (
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
    background: `url(${backgroundImage}) right 1rem bottom 0.35rem no-repeat`,
    backgroundSize: '30vh auto',
  }

  const imageSrc = imageBase64 || picture

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className='content'>
      <div className='meal-wrapper'>
        <article className='meal' style={pageStyles}>
          <h1 className='meal-name meal-heading'>{name}</h1>
          <section className='meal-info'>
            <div className='meal-picture-container'>
              <img
                src={imageSrc}
                alt='YUM'
                className='meal-picture'
                onClick={openModal}
              />
            </div>
            <p className='meal-description'>{description}</p>
          </section>
          <section className='meal-details'>
            <div className='meat'>
              <h2>Meat</h2>
              <ul className='ingredients'>
                <li>
                  {weightInGrams}g of {typeOfCut}
                </li>
                <li>{internalTemp}°C internal temperature</li>
                <li>{ambientTemp}°C cooking temperature</li>
              </ul>
            </div>
            <div className='rub'>
              <h2>Rub</h2>
              <ul className='ingredients'>
                {rubSpices}
                <p className='rub-owner'>
                  This is <Link to={`/rub/${rubData.id}`}>{rubData.name}</Link>{' '}
                  by{' '}
                  <Link to={`/user/${rubData.createdByUser.id}`}>
                    {rubData.createdByUser.username}
                  </Link>
                </p>
              </ul>
            </div>
          </section>
          <footer className='meal-footer'>
            <p>
              category: <Link>{meatType}</Link>
            </p>
            <p className='created-by'>
              by{' '}
              <Link to={`/user/${createdByUser.id}`}>
                {createdByUser.username}
              </Link>
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

      {isModalOpen && (
        <div className='modal' onClick={closeModal}>
          <div className='modal-content'>
            <img src={imageSrc} alt='Maximum YUM' className='modal-image' />
          </div>
        </div>
      )}
    </div>
  )
}
export default Meal
