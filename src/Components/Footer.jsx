import React from 'react'

export default function Footer() {
  // Footer.js
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            Welcome to PakFood. We're dedicated to providing you the very best of recipes, with an emphasis on quality.Founded in 2020, FoodSite has come a long way from its beginnings. We hope you enjoy our recipes as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
          </p>
          
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#recipes">Recipes</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            Email: info@pakfood.com
          </p>
          <p>
            Phone: +923129371302
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} FoodSite | All Rights Reserved
      </div>
    </footer>
  );
}
