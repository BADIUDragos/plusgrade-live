import { Table } from "react-bootstrap";
import { ProductCharge } from "../../../store/interfaces/productChargeInterfaces";

const ReservationDetails = ({ productCharges }: { productCharges: ProductCharge[] }) => {
  if (!productCharges) {
    return <p>No charges available.</p>;
  }

  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Special Product Assignment ID</th>
          <th>Status</th>
          <th>Charge</th>
        </tr>
      </thead>
      <tbody>
        {productCharges.map((charge: ProductCharge) => (
          <tr
            key={charge.special_product_assignment_id}
            style={{
              backgroundColor: charge.active === true
                ? "#d4edda"
                : charge.active === false
                ? "#f8d7da"
                : "inherit"
            }}
          >
            <td>{charge.special_product_assignment_id}</td>
            <td>{charge.active ? "active" : charge.active === false ? "cancelled" : ""}</td>
            <td>{charge.amount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReservationDetails;
