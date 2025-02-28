
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SigninPage from './pages/signin'
import SendMoneyPage from './pages/SendMoney'
import Dashboard from './pages/dashboard'
import Layout from './pages/layout'
import SignupPage from './pages/signup'

function App() {
  return<div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<SigninPage/>}/>
          <Route path='/signin' element={<SigninPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/send' element={<SendMoneyPage/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          </Route>
      </Routes>
    </BrowserRouter>

   
  </div>
}

export default App
