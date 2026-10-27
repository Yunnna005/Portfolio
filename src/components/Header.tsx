import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { number: "01", label: "Experience", href: "#experience" },
  { number: "02", label: "Projects", href: "#projects" },
  { number: "03", label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Escape closes the mobile menu
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="header">
      <nav className="nav">
        <a className="name" href="#about">
          Anna Kovalenko
        </a>

        <div className="nav-actions">
          {/* Navigation links */}
          <div id="nav-links" className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                <span className="nav-number">{link.number}</span>
                {link.label}
              </a>
            ))}
          </div>

          <ThemeToggle />

          {/* Hamburger menu icon for mobile */}
          <button
            type="button"
            className={`menu-icon ${isMenuOpen ? 'open' : ''}`}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            aria-controls="nav-links"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
