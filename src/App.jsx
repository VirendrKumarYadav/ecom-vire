
import router from "./router/Router"
import { Provider } from 'react-redux'
import './App.css'
import { RouterProvider } from "react-router-dom"
import { store } from "./redux/store"
import { Container, CircularProgress } from '@mui/material';
import React, { Suspense } from 'react';

function App() {

  return (
    <div className="container">
      {/* <Container maxWidth="lg"> */}
      <Suspense fallback={<CircularProgress />}>


        {/* <Footer /> */}
      </Suspense>
      {/* </Container> */}
    </div>
  )
}

export default App
