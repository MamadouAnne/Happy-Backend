import React from 'react'
import '../styles/pages/landing.css';
import logoImg from '../images/logo1.svg';
import {FiArrowRight} from 'react-icons/fi';
import { Link } from 'react-router-dom'
import { FaPaw } from 'react-icons/fa';


export default function Landing() {
    return (
        <div id="page-landing">
      <div className="content-wrapper">
      
          <img src={logoImg} alt="Happy" />
        
      <main>
        <h1>Bring happiness to your <br/> w<FaPaw size={50}/>rld</h1>
        <p>Find your best friend by searching for animal shelters and help the community by registering a new one </p>
        
      </main>

      <div className="location">
        <strong>Atlanta area</strong>
        <span>Georgia</span>
      </div>

      <Link to="/app" className="enter-app">
        <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
      </Link>
      </div>
    </div>
    )
}
