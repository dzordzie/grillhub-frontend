import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SideBar from './components/SideBar'
// import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LogInPage from './pages/LogInPage'
import ProfilePage from './pages/ProfilePage'
import MealPage from './pages/MealPage'
import BestBar from './components/BestBar'

function App() {
  return (
    <div className='grid-container'>
      <Header />
      <main className='sub-grid-container'>
        <Routes>
          <Route path='/' element={<MealPage />} />
          <Route path='/registration' element={<RegisterPage />} />
          <Route path='/login' element={<LogInPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
        <BestBar />
      </main>
      <SideBar />
    </div>
  )
}
export default App
