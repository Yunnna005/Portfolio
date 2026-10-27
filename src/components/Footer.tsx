export default function Footer() {
  return (
    <footer className="footer theme-navy">
      <p className="footer-name" aria-hidden="true">
        Anna Kovalenko
      </p>
      <p className="footer-note">&copy; {new Date().getFullYear()} Anna Kovalenko</p>
    </footer>
  );
}
