import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Rub from '../components/Rub'
import BestBar from '../components/BestBar'
import ApiService from '../service/ApiService'

function RubPage() {
  const { id } = useParams()
  const [rub, setRub] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const apiService = new ApiService('/rub')

    const fetchRubData = async () => {
      try {
        const rubData = await apiService.get(`/${id}`)
        setRub(rubData)
      } catch (error) {
        setError(error)
        console.error('Loading rub error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRubData()
  }, [id, error])

  return (
    <>
      {loading ? (
        <h2 className='message'>Loading rub...</h2>
      ) : error ? (
        <h2 className='message'>{error}</h2>
      ) : rub ? (
        <Rub rub={rub} />
      ) : (
        <h2 className='message'>Nothing is here :(</h2>
      )}
      <BestBar />
    </>
  )
}
export default RubPage
