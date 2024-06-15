import {
  Col,
  Collapse,
  Container,
  FormControl,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { useListReservationsQuery } from "../../store/apis/reservationApi";
import Loader from "../../components/Loader";
import React, { Suspense, useState } from "react";
import ReservationCharges from "./components/ReservationCharges";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const HomePage = () => {
  const { data: reservations, error, isLoading } = useListReservationsQuery();
  const [open, setOpen] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleRowClick = (uuid: string) => {
    setOpen(open === uuid ? null : uuid);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredReservations = reservations?.filter((reservation) =>
    reservation.reservation_uuid
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Row className="mb-5">
        <Col>
          <h1>Plusgrade</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <InputGroup style={{ maxWidth: "300px" }}>
            <FormControl
              placeholder="Filter by Reservation UUID"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Col>
      </Row>

      {isLoading && <Loader />}
      {error && <p>Error loading reservations.</p>}
      {filteredReservations && (
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                  zIndex: 1,
                }}
              >
                <th></th>
                <th>Reservation UUID</th>
                <th>Number of Active Purchases</th>
                <th>Sum of Active Charges</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((reservation) => (
                <React.Fragment key={reservation.reservation_uuid}>
                  <tr
                    onClick={() => handleRowClick(reservation.reservation_uuid)}
                  >
                    <td>
                      {open === reservation.reservation_uuid ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}
                    </td>
                    <td>{reservation.reservation_uuid}</td>
                    <td>{reservation.numberOfActiveCharges}</td>
                    <td>{reservation.sumOfActiveCharges}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ padding: 0 }}>
                      <Collapse in={open === reservation.reservation_uuid}>
                        <div>
                          <ReservationCharges
                            productCharges={reservation.reservationCharges}
                          />
                        </div>
                      </Collapse>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default HomePage;
