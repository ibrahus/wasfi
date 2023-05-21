import './App.css';

import React from 'react';
import Home from "./pages/Home";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product" element={<Service />} />
          <Route exact path="contact" element={<Contact />} />
          <Route exact path="team" element={<Team />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;


