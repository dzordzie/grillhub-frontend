import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Meal from '../components/Meal'
import BestBar from '../components/BestBar'
import ApiService from '../service/ApiService'

function MealPage() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const apiService = new ApiService('/meal')

    const fetchMealData = async () => {
      try {
        const mealData = await apiService.get(`/${id}`)
        setMeal(mealData)
      } catch (error) {
        setError(error)
        console.error('Loading meal error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMealData()
  }, [id, error])

  return (
    <>
      {loading ? (
        <h2 className='message'>Loading meal...</h2>
      ) : error ? (
        <h2 className='message'>{error}</h2>
      ) : meal ? (
        <Meal meal={meal} />
      ) : (
        <h2 className='message'>Nothing is here :(</h2>
      )}
      <BestBar />
    </>
  )
}
export default MealPage
