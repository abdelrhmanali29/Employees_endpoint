const express = require('express');
const employeeContorller = require('./employee.controller');
const router = express.Router();

router
  .route('/')
  .post(employeeContorller.postEmployee)
  .get(employeeContorller.getEmplyees);

router
  .route('/:id')
  .delete(employeeContorller.deleteEmployee)
  .patch(employeeContorller.patchEmployee);

module.exports = router;
