import { Link } from 'react-router-dom'
import './Post.css'
import './Meal.css'
import './Rub.css'

function Rub({ rub }) {
  const {
    name,
    createdByUser: { id, username },
    spices,
    meals,
  } = rub

  const spiceList = spices.map((spice) => (
    <li key={spice.name}>
      {spice.weightInGrams}g {spice.name}
    </li>
  ))

  const mealList = meals.map((meal) => (
    <Link to={`/meal/${meal.id}`} key={meal.id} className='meal-link'>
      <h1 className='meal-name-list in_rub'>{meal.name}</h1>
    </Link>
  ))

  return (
    <div className='content'>
      <article className='meal'>
        <h1 className='meal-name'>{name}</h1>
        <h2 className='rub-owner'>
          Owner:
          <Link to={`/user/${id}`}> {username}</Link>
        </h2>
        <section className='rub-info'>
          <div className='rub'>
            <ul>{spiceList}</ul>
          </div>
          <div className='recipes'>
            <h2 className='meals-heading'>You can find in this meals:</h2>
            <ul className='meal-list'>{mealList}</ul>
          </div>
        </section>
      </article>
    </div>
  )
}
export default Rub
