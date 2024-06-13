import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Container } from "react-bootstrap";

const Layout: React.FC = () => {

  return (
    <Container fluid className="p-0 d-flex flex-column min-vh-100">
      <Header className="mb-5" />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <hr />
    </Container>
  );
};

export default Layout;
