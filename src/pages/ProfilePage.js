import { useEffect, useState } from 'react'
import BestBar from '../components/BestBar'
import ApiService from '../service/ApiService'

function ProfilePage() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const apiService = new ApiService()

    const fetchProfileData = async () => {
      try {
        const profileData = await apiService.get('/profile')
        setProfile(profileData)
      } catch (error) {
        setError(error)
        console.error('Loading profile error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProfileData()
  }, [])

  return (
    <>
      {loading ? (
        <h2 className='message'>Loading profile...</h2>
      ) : error ? (
        <h2 className='message'>{error}</h2>
      ) : profile ? (
        <div className='content'>
          <h2>{profile.email}</h2>
          <h2>{profile.userPosts.username}</h2>
        </div>
      ) : (
        <h2 className='message'>Nothing is here :(</h2>
      )}
      <BestBar />
    </>
  )
}
export default ProfilePage
