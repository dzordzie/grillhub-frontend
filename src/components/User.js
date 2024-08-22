import { Link } from 'react-router-dom'
import './User.css'

function User({ user }) {
  const { username, meals, rubs } = user

  const mealList = meals.map((meal) => (
    <Link to={`/meal/${meal.id}`} key={meal.id} className='meal-link'>
      <h1 className='meal-name-list'>{meal.name}</h1>
    </Link>
  ))

  const rubList = rubs.map((rub) => (
    <Link to={`/rub/${rub.id}`} key={rub.id} className='meal-link'>
      <h1 className='meal-name-list'>{rub.name}</h1>
    </Link>
  ))

  return (
    <div className='content'>
      <article className='meal'>
        <h1 className='meal-name'>{username}</h1>
        <h2 className='user-heading'>Try something from {username}:</h2>
        <section className='user-section'>
          <div className='rubs'>
            <h2>Rubs:</h2>
            <ul className='list'>{rubList}</ul>
          </div>
          <div className='meals'>
            <h2>Meals:</h2>
            <ul className='list'>{mealList}</ul>
          </div>
        </section>
      </article>
    </div>
  )
}
export default User
