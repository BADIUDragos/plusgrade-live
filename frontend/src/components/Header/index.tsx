import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface IHeader {
  className?: string;
}

const Header: React.FC<IHeader> = ({ className }) => {
  return (
    <header className={className}>
      <Navbar bg="black" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/images/plusgrade_logo.jpeg"
              style={{ width: 100, marginTop: -7 }}
              alt="Plusgrade"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
