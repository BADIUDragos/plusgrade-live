import { Collapse, Container, Table } from "react-bootstrap";
import { useListReservationsQuery } from "../../store/apis/reservationApi";
import Loader from "../../components/Loader";
import React, { Suspense, useState } from "react";
import ReservationDetails from "./components/ReservationDetails";

const HomePage = () => {
  const { data: reservations, error, isLoading } = useListReservationsQuery();
  const [open, setOpen] = useState<string | null>(null);

  const handleRowClick = (uuid: string) => {
    setOpen(open === uuid ? null : uuid);
  };

  return (
    <Container>
      <h1>Plusgrade</h1>
      {isLoading && <Loader />}
      {error && <p>Error loading reservations.</p>}
      {reservations && (
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}>
                <th>Reservation UUID</th>
                <th>Number of Active Purchases</th>
                <th>Sum of Active Charges</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <React.Fragment key={reservation.reservation_uuid}>
                  <tr onClick={() => handleRowClick(reservation.reservation_uuid)}>
                    <td>{reservation.reservation_uuid}</td>
                    <td>{reservation.numberOfActiveCharges}</td>
                    <td>{reservation.sumOfActiveCharges}</td>
                  </tr>
                  <Collapse in={open === reservation.reservation_uuid}>
                    <tr>
                      <td colSpan={3}>
                        {open === reservation.reservation_uuid && (
                          <Suspense fallback={<Loader />}>
                            <ReservationDetails reservationUuid={reservation.reservation_uuid} />
                          </Suspense>
                        )}
                      </td>
                    </tr>
                  </Collapse>
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
