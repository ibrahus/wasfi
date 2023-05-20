import './App.css';

import React from 'react';
import Home from "./pages/Home";
import Service from "./pages/Service";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product" element={<Service />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;


