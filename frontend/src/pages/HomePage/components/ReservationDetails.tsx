import { Table } from "react-bootstrap";
import { useGetProductChargesByUUIDQuery } from "../../../store/apis/productChargesApi";
import { ProductCharge } from "../../../store/interfaces/productChargeInterfaces";

const ReservationDetails = ({
  reservationUuid,
}: {
  reservationUuid: string;
}) => {
  const {
    data: charges,
    error,
    isLoading,
  } = useGetProductChargesByUUIDQuery(reservationUuid);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading charges.</p>;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Special Product Assignment ID</th>
          <th>Status</th>
          <th>Charge</th>
        </tr>
      </thead>
      <tbody>
        {charges &&
          charges.map((charge: ProductCharge) => (
            <tr
              key={charge.special_product_assignment_id}
              style={{
                backgroundColor:
                  charge.active === true
                    ? "#d4edda"
                    : charge.active === false
                    ? "#f8d7da"
                    : "inherit",
              }}
            >
              <td>{charge.special_product_assignment_id}</td>
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

export default ReservationDetails;
