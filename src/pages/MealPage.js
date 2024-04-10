import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Meal from '../components/Meal'
import BestBar from '../components/BestBar'

function MealPage() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMealData() {
      setLoading(true)
      /* const token = localStorage.getItem('token') */

      try {
        const response = await fetch(`http://localhost:8080/meal/${id}`, {
          headers: {
            /* Authorization: `Bearer ${token}`, */
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          const errorData = await response.json()
          setError(errorData.message)
        } else {
          const mealData = await response.json()
          setMeal(mealData)
        }
      } catch (errorMessage) {
        setError(errorMessage)
        console.error('Loading meal error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMealData()
  }, [id, error])

  return (
    <>
      <div className='content'>
        {loading ? (
          <h2>Loading meal...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : meal ? (
          <Meal meal={meal} />
        ) : (
          <p>Nothing is here :(</p>
        )}
      </div>
      <BestBar />
    </>
  )
}
export default MealPage
