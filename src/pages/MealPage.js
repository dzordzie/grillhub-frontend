import { useEffect, useState } from 'react'
import Post from '../components/Post'
import BestBar from '../components/BestBar'

function MealPage() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    function fetchMeals() {
      setLoading(true)
      /* const token = localStorage.getItem('token') */

      fetch('http://localhost:8080/meals', {
        headers: {
          /* Authorization: `Bearer ${token}`, */
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          return response.json()
        })
        .then((json) => {
          setMeals(json)
        })
        .catch((error) => {
          setError(error)
          console.error('Loading meals error:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    fetchMeals()
  }, [])

  return (
    <>
      <div className='content'>
        {loading ? (
          <h2>Loading meals...</h2>
        ) : error ? (
          <h2>Error: {error.message}</h2>
        ) : meals.length > 0 ? (
          meals.map((meal) => <Post key={meal.id} post={meal} />)
        ) : (
          <h2>Nothing cooked yet :(</h2>
        )}
      </div>
      <BestBar />
    </>
  )
}
export default MealPage
