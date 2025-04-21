import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GalleryItem from './pages/GalleryItem';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/gallery/:itemId" element={<GalleryItem />} />
  </Routes>
);

export default App;
