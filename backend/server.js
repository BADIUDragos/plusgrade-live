const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs-extra');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.get('/reservations', async (req, res, next) => {
  try {
    const productAssignments = await fs.readJson(path.join(__dirname, 'product_assignment.json'));
    const productCharges = await fs.readJson(path.join(__dirname, 'product_charges.json'));

    const reservationDetails = {};

    productAssignments.forEach((assignment) => {
      const reservation_uuid = assignment.reservation_uuid;

      if (!reservationDetails[reservation_uuid]) {
        reservationDetails[reservation_uuid] = {
          reservation_uuid,
          numberOfActiveCharges: 0,
          sumOfActiveCharges: 0,
          reservationCharges: [],
        };
      }

      const productCharge = productCharges.find(
        (charge) => charge.special_product_assignment_id === assignment.id
      );

      const detailedProduct = {
        special_product_assignment_id: assignment.id,
        name: assignment.name,
        active: productCharge ? productCharge.active : null,
        amount: productCharge ? Math.round((productCharge.amount + Number.EPSILON) * 100) / 100 : null,
      };

      reservationDetails[reservation_uuid].reservationCharges.push(detailedProduct);

      if (productCharge && productCharge.active) {
        reservationDetails[reservation_uuid].numberOfActiveCharges += 1;
        reservationDetails[reservation_uuid].sumOfActiveCharges += productCharge.amount || 0;
      }
    });

    for (const reservation of Object.values(reservationDetails)) {
      reservation.sumOfActiveCharges = Math.round((reservation.sumOfActiveCharges + Number.EPSILON) * 100) / 100;
    }

    const reservationDetailsArray = Object.values(reservationDetails);

    res.status(200).json(reservationDetailsArray);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read JSON files' });
  }
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
