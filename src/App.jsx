import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GalleryItem from './pages/GalleryItem';
import SubscriptionSurveyRoute from './components/SubscriptionSurveyRoute';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/gallery/:itemId" element={<GalleryItem />} />
    <Route path="/Subscription-Survey" element={<SubscriptionSurveyRoute />} />
  </Routes>
);

export default App;
