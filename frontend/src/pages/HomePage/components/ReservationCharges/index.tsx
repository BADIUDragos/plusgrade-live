import { Table } from "react-bootstrap";
import { Status, StatusColors } from "./constants/statusColors";
import { ReservationCharge } from "../../../../store/interfaces/reservationChargeInterfaces";

const ReservationCharges = ({
  productCharges,
}: {
  productCharges: ReservationCharge[];
}) => {
  if (!productCharges) {
    return <p>No charges available.</p>;
  }

  const getStatus = (active: boolean | undefined): Status => {
    if (active === true) {
      return Status.Active;
    } else if (active === false) {
      return Status.Cancelled;
    } else {
      return Status.Default;
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Status</th>
          <th>Charge</th>
        </tr>
      </thead>
      <tbody>
        {productCharges.map((charge: ReservationCharge) => (
          <tr
            key={charge.special_product_assignment_id}
            style={{
              backgroundColor: StatusColors[getStatus(charge.active)],
            }}
          >
            <td>{charge.name}</td>
            <td>
              {charge.active
                ? "active"
                : charge.active === false
                ? "cancelled"
                : ""}
            </td>
            <td>{charge.amount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReservationCharges;
