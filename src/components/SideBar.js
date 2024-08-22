import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './SideBar.css'
import Footer from './Footer'
import beef from '../assets/beef-dark.svg'
import chicken from '../assets/chicken-dark.svg'
import pork from '../assets/pork-dark.svg'
import fish from '../assets/fish-dark.svg'
import lamb from '../assets/lamb-dark.svg'
import seafood from '../assets/seafood-dark.svg'
import grill from '../assets/grill-only-dark.svg'

function SideBar({ setActiveCategory, activeCategory, setFiltered, allPosts }) {
  useEffect(() => {
    if (activeCategory === '') {
      setFiltered(allPosts)
      return
    }
    const filtered = allPosts.filter((post) =>
      post.meatType.includes(activeCategory)
    )
    setFiltered(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])

  return (
    <aside className='sidebar'>
      <h2 className='side-heading'>CATEGORIES</h2>
      <nav className='side-navigation'>
        <ul className='filter-items'>
          <li>
            <Link className='category' onClick={() => setActiveCategory('')}>
              <p>ALL</p>
              <img src={grill} alt='all' />
            </Link>
          </li>
          <li>
            <Link
              className={
                activeCategory === 'BEEF' ? 'category active' : 'category'
              }
              onClick={() => setActiveCategory('BEEF')}
            >
              <p>BEEF</p>
              <img src={beef} alt='beef' />
            </Link>
          </li>
          <li>
            <Link
              className={
                activeCategory === 'PORK' ? 'category active' : 'category'
              }
              onClick={() => setActiveCategory('PORK')}
            >
              <p>PORK</p>
              <img src={pork} alt='pork' />
            </Link>
          </li>
          <li>
            <Link
              className={
                activeCategory === 'CHICKEN' ? 'category active' : 'category'
              }
              onClick={() => setActiveCategory('CHICKEN')}
            >
              <p>CHICKEN</p>
              <img src={chicken} alt='chicken' />
            </Link>
          </li>
          <li>
            <Link
              className={
                activeCategory === 'LAMB' ? 'category active' : 'category'
              }
              onClick={() => setActiveCategory('LAMB')}
            >
              <p>LAMB</p>
              <img src={lamb} alt='lamb' />
            </Link>
          </li>
          <li>
            <Link
              className={
                activeCategory === 'FISH' ? 'category active' : 'category'
              }
              onClick={() => setActiveCategory('FISH')}
            >
              <p>FISH</p>
              <img src={fish} alt='fish' />
            </Link>
          </li>
          <li>
            <Link
              className={
                activeCategory === 'SEAFOOD' ? 'category active' : 'category'
              }
              onClick={() => setActiveCategory('SEAFOOD')}
            >
              <p>SEAFOOD</p>
              <img src={seafood} alt='seafood' />
            </Link>
          </li>
        </ul>
      </nav>
      <Footer />
    </aside>
  )
}
export default SideBar
