import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LogInPage from './pages/LogInPage'
import ProfilePage from './pages/ProfilePage'
import MealPage from './pages/MealPage'
import RubPage from './pages/RubPage'
import UserPage from './pages/UserPage'
import { SearchProvider } from './providers/SearchProvider'
import NewMealPage from './pages/NewMealPage'

function App() {
  return (
    <SearchProvider>
      <div className='grid-container'>
        <Header />
        <main className='sub-grid-container'>
          <Routes>
            <Route path='*' element={<NotFoundPage />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/registration' element={<RegisterPage />} />
            <Route path='/login' element={<LogInPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/add-new' element={<NewMealPage />} />
            <Route path='/meal/:id' element={<MealPage />} />
            <Route path='/rub/:id' element={<RubPage />} />
            <Route path='/user/:id' element={<UserPage />} />
          </Routes>
        </main>
      </div>
    </SearchProvider>
  )
}
export default App
