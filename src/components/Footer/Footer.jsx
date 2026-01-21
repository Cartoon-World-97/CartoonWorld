import React from 'react'
import './Footer.css';
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (
    <>
  <footer className="footer">
    <div className="footer-content">
      <div className="row">
        <div className="col-lg-3 footer-section">
          <h5>Company</h5>
          <ul >
            <li><NavLink to="#">About Us</NavLink></li>
            <li><NavLink to="#">Careers</NavLink></li>
            <li><NavLink to="#">Press</NavLink></li>
            <li><NavLink to="#">Investors</NavLink></li>
          </ul>
        </div>
        <div className="col-lg-3 footer-section">
          <h5>Support</h5>
          <ul>
            <li><NavLink to="#">Help Center</NavLink></li>
            <li><NavLink to="#">Contact Us</NavLink></li>
            <li><NavLink to="#">Live Chat</NavLink></li>
            <li><NavLink to="#">System Status</NavLink></li>
          </ul>
        </div>
        <div className="col-lg-3 footer-section">
          <h5>Legal</h5>
          <ul>
            <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
            <li><NavLink to="#">Terms of Service</NavLink></li>
            <li><NavLink to="#">Cookie Policy</NavLink></li>
            <li><NavLink to="#">DMCA</NavLink></li>
          </ul>
        </div>
        <div className="col-lg-3 footer-section">
          <h5>Connect</h5>
          <ul>
            <li><NavLink to="#"><i className="fab fa-facebook-f"></i> Facebook</NavLink></li>
            <li><NavLink to="#"><i className="fab fa-twitter"></i> Twitter</NavLink></li>
            <li><NavLink to="#"><i className="fab fa-instagram"></i> Instagram</NavLink></li>
            <li><NavLink to="#"><i className="fab fa-youtube"></i> YouTube</NavLink></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Cartoon World. All rights reserved. | Designed with JioHoster inspiration</p>
      </div>
    </div>
  </footer>
    </>
  )
}

export default Footer
