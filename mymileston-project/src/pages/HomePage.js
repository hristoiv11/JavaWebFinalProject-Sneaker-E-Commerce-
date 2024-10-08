import { useState } from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom';

export default function HomePage(){

    return(

      <div className="center">
        <img className="image" src="https://images-platform.99static.com//zvgtch1g-AfvYKsLleHclChDLYE=/222x209:1707x1694/fit-in/500x500/projects-files/101/10165/1016553/09deac31-4bdc-4bb6-b6f2-e644b4ff0500.png"></img>
      <h1>Welcome! Choose a Sneaker or Brand and find out the information you need.</h1>
      <Link to="/sneakers">
        <button className="butonsa">Go to Sneakers Page</button>
      </Link>
      <img src=""></img>
      <Link to="/brands">
        <button className="butonsa">Go to Brands Page</button>
      </Link>
      </div>
    
    
  );
    
}