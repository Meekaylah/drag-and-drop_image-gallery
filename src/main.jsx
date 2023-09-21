import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DragDrop from './components/DragDrop.jsx';
import Login from './components/Login.jsx';

const data = [
  {
    title: 'Not Eaten', 
    items: 
    [
      {
        id: 'brunch',
        url: "/brunch.jpg"
      },
      {
        id: 'lunch',
        url: "/lunch.jpg"
      },
      {
        id: 'midday snack',
        url: "/midday_snack.jpg"
      },
      {
        id: 'dinner',
        url: "/dinner.jpg"
      },
      {
        id: 'supper',
        url: "/supper.jpg"
      },
      {
        id: 'dessert',
        url: "/dessert.jpg"
      },
      {
        id: 'midnight snack',
        url: "/midnight_snack.jpg"
      },
    ]
  },
  {
    title: 'Eaten', 
    items:
    [
      {
        id: 'breakfast',
        url: "/breakfast.jpg"
      },
    ]
  }
]

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/DragDrop" element={<DragDrop data={data} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

