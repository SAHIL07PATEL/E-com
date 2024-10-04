import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Header/Header'
import Home01 from './Components/Home-01'
import Footer from './Footer/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home01/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
