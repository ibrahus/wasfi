import logo from './logo.svg';
import { Button } from 'antd';
import './App.css';

import React, { useState } from 'react';
import Home from "./pages/Home";
import Service from "./pages/Service";


const getImage = (img) => {
  return "data:image/jpeg;base64,"

}






function App() {
  const [promot, setPromot] = useState('')

  const [imageData, setImageData] = useState(null);




  return (
    

    // <Home />
    <Service />
  );
}

export default App;


