import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import User from '../components/User'
import BestBar from '../components/BestBar'
import ApiService from '../service/ApiService'

function UserPage() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const apiService = new ApiService('/user')

    const fetchUserData = async () => {
      try {
        const userData = await apiService.get(`/${id}`)
        setUser(userData)
      } catch (error) {
        setError(error)
        console.error('Loading meal error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [id, error])

  return (
    <>
      {loading ? (
        <h2 className='message'>Loading user...</h2>
      ) : error ? (
        <h2 className='message'>{error}</h2>
      ) : user ? (
        <User user={user} />
      ) : (
        <h2 className='message'>Nothing is here :(</h2>
      )}
      <BestBar />
    </>
  )
}
export default UserPage
