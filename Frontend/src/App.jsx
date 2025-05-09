import { useState } from 'react'
//import bookLogo from './assets/books.png'
import  Products from "./components/Products.jsx"
import React from "react";
//import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
//import Navigation from './components/Navigations'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <section>
      <h1></h1>
      <div className='App'>
        {/* <Products /> */}
      </div>
      
      </section>

      {/* <Navagation token={token} setToken={setToken} /> */}

      <Routes>
      <Route path="/" element={<Products token={token} />} />
        {/* <Route path="/:id" element={<SingleProduct token={token} />} /> */}
        <Route path="/Login" element={<Login token={token} />} />
        <Route path="/Register" element={<Register token={token} />} />
        {/* <Route path="/Account" element={<Account token={token} />} /> */}
      </Routes>
    </>
  )
}

export default App;

