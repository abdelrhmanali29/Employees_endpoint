const Employee = require('./employee.model');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');

exports.employeeService = {
  create() {
    return catchAsync(async (req, res, next) => {
      if (req.body.attendanceTime > req.body.leaveTime) {
        return next(
          new AppError('Attendance time should be less than leave time!', 400)
        );
      }

      const newEmployee = await Employee.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        active: req.body.active,
        phoneNumber: req.body.phoneNumber,
        salary: req.body.salary,
        attendanceTime: req.body.attendanceTime,
        leaveTime: req.body.leaveTime
      });

      res.status(201).json({ status: 'success', data: newEmployee });
    });
  },

  getAll() {
    return catchAsync(async (req, res) => {
      const queryObj = { ...req.query };
      console.log(queryObj);
      const excludedFields = ['page', 'limit', 'sort', 'fields'];
      excludedFields.forEach(el => delete queryObj[el]);

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, mat => `$${mat}`);

      const employees = await Employee.find(JSON.parse(queryStr)).sort({
        startTime: 1
      });

      res.status(200).json({ status: 'success', data: employees });
    });
  },

  delete() {
    return catchAsync(async (req, res, next) => {
      const employee = await Employee.findById(req.params.id);

      if (!employee)
        return next(new AppError('cannot find doc with that id', 404));

      employee.remove();
      res.status(204).send();
    });
  },

  patch() {
    return catchAsync(async (req, res, next) => {
      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

      if (!employee)
        return next(new AppError('cannot find doc with that id', 404));

      res.status(200).json({ status: 'success', data: employee });
    });
  }
};
