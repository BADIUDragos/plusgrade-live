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

    const reservationDetails = productAssignments.reduce((details, assignment) => {
      const reservation_uuid = assignment.reservation_uuid;

      if (!details[reservation_uuid]) {
        details[reservation_uuid] = {
          reservation_uuid,
          numberOfActiveCharges: 0,
          sumOfActiveCharges: 0,
        };
      }

      const assignedProductIds = productAssignments
        .filter((a) => a.reservation_uuid === reservation_uuid)
        .map((product) => product.id);

      const activeCharges = productCharges.filter(
        (charge) => assignedProductIds.includes(charge.special_product_assignment_id) && charge.active
      );

      details[reservation_uuid].numberOfActiveCharges += activeCharges.length;
      details[reservation_uuid].sumOfActiveCharges += activeCharges.reduce((sum, charge) => {
        if (typeof charge.amount === 'number') {
          return sum + charge.amount;
        }
        return sum;
      }, 0);

      return details;
    }, {});

    const reservationDetailsArray = Object.values(reservationDetails);

    res.status(200).json(reservationDetailsArray);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read JSON files' });
  }
});

app.get('/productCharges/:uuid', async (req, res, next) => {
  const { uuid: reservation_uuid } = req.params;

  if (!reservation_uuid) {
    return res.status(400).json({ error: 'reservation_uuid is required' });
  }

  try {
    const productAssignments = await fs.readJson(path.join(__dirname, 'product_assignment.json'));
    const productCharges = await fs.readJson(path.join(__dirname, 'product_charges.json'));

    const assignedProducts = productAssignments.filter(
      (assignment) => assignment.reservation_uuid === reservation_uuid
    );

    if (assignedProducts.length === 0) {
      return res.status(404).json({ error: 'No products found for the given reservation UUID' });
    }

    const assignedProductIds = assignedProducts.map((product) => product.id);

    const charges = productCharges.filter(
      (charge) => assignedProductIds.includes(charge.special_product_assignment_id)
    );

    const chargesArray = Object.values(charges);

    res.status(200).json(chargesArray);

    res.status(200).json({ charges });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read JSON files' });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
