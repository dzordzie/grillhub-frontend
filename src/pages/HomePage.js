import { useEffect, useState } from 'react'
import Post from '../components/Post'
import BestBar from '../components/BestBar'
import SideBar from '../components/SideBar'
import { useSearch } from '../providers/SearchProvider'
import ApiService from '../service/ApiService'

function HomePage() {
  const [allPosts, setAllPosts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { searchQuery } = useSearch()

  useEffect(() => {
    setLoading(true)
    const apiService = new ApiService()

    const fetchPosts = async () => {
      try {
        const posts = await apiService.get('/')
        setAllPosts(posts)
        setFiltered(posts)
      } catch (error) {
        setError(error)
        console.error('Loading posts error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    let results = allPosts

    if (activeCategory) {
      results = results.filter((post) => post.meatType === activeCategory)
    }

    if (searchQuery) {
      results = results.filter((post) =>
        post.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFiltered(results)
  }, [allPosts, activeCategory, searchQuery])

  return (
    <>
      <SideBar
        allPosts={allPosts}
        setFiltered={setFiltered}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className='content'>
        {loading ? (
          <h2 className='message'>Loading posts...</h2>
        ) : error ? (
          <h2 className='message'>Error: {error.message}</h2>
        ) : filtered.length > 0 ? (
          filtered.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <h2 className='message'>Nothing cooked yet :(</h2>
        )}
      </div>
      <BestBar />
    </>
  )
}
export default HomePage
