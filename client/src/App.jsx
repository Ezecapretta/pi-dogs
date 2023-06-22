import {Routes, Route, useLocation} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import NavBar from './components/NavBar/NavBar'
import Home from './components/HomePage/HomePage'
import Form from './components/FormPage/FormPage'
import Detail from './components/DetailPage/DetailPage'

function App() {
  const {pathname} = useLocation();
  return (
    <>
      {pathname !== '/' && <NavBar/>}
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/form' element={<Form/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
      </Routes>
    </>
  )
}

export default App
