import { useEffect, useState } from 'react'
import Post from '../components/Post'
import BestBar from '../components/BestBar'

function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    function fetchPosts() {
      setLoading(true)
      /* const token = localStorage.getItem('token') */

      fetch('http://localhost:8080/', {
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
          setPosts(json)
        })
        .catch((error) => {
          setError(error)
          console.error('Loading posts error:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    fetchPosts()
  }, [])

  return (
    <>
      <div className='content'>
        {loading ? (
          <h2>Loading posts...</h2>
        ) : error ? (
          <h2>Error: {error.message}</h2>
        ) : posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <h2>Nothing cooked yet :(</h2>
        )}
      </div>
      <BestBar />
    </>
  )
}
export default HomePage
