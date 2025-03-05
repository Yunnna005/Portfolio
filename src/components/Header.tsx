import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="name">Anna Kovalenko</div>
        
        {/* Hamburger menu icon for mobile */}
        <div 
          className={`menu-icon ${isMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        {/* Navigation links */}
        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <a href="#about" onClick={toggleMenu}>About</a>
          <a href="#experience" onClick={toggleMenu}>Experience</a>
          <a href="#education" onClick={toggleMenu}>Education</a>
          <a href="#projects" onClick={toggleMenu}>Projects</a>
          <a href="#contact" onClick={toggleMenu}>Contact</a>
        </div>
      </nav>
    </header>
  );
}