import { Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LogInPage from './pages/LogInPage'

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/registration' element={<RegisterPage />}></Route>
				<Route path='/login' element={<LogInPage />}></Route>
			</Routes>
		</div>
	)
}
export default App
