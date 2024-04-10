import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SideBar from './components/SideBar'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LogInPage from './pages/LogInPage'
import ProfilePage from './pages/ProfilePage'
import MealPage from './pages/MealPage'

function App() {
  return (
    <div className='grid-container'>
      <Header />
      <SideBar />
      <main className='sub-grid-container'>
        <Routes>
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/registration' element={<RegisterPage />} />
          <Route path='/login' element={<LogInPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/meal/:id' element={<MealPage />} />
        </Routes>
      </main>
    </div>
  )
}
export default App
