const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Plaese tell us your first name!']
    },
    lastName: {
      type: String,
      required: [true, 'Plaese tell us your last name!']
    },
    active: {
      type: Boolean
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide your phone number']
    },
    salary: {
      type: Number,
      required: [true, 'Please provide your attendance time']
    },
    attendanceTime: {
      type: String,
      required: [true, 'Please provide your attendance time']
    },
    leaveTime: {
      type: String,
      required: [true, 'Please provide your leave time']
    }
  },
  {
    toJSON: { virtuals: true }
  }
);

employeeSchema.virtual('netAvailableTime').get(function () {
  const startBreak = 43200,
    endBreak = 46800,
    breakTime = 3600;

  let attendance =
    (Number(this.attendanceTime[0]) * 10 + Number(this.attendanceTime[1])) *
      60 *
      60 +
    Number(this.attendanceTime[3] * 60) +
    Number(this.attendanceTime[4]);
  let leave =
    (Number(this.leaveTime[0]) * 10 + Number(this.leaveTime[1])) * 60 * 60 +
    Number(this.leaveTime[3] * 60) +
    Number(this.leaveTime[4]);

  console.log(attendance);
  console.log(leave);

  if (attendance >= startBreak && attendance <= endBreak) {
    attendance = endBreak;
  }

  if (leave >= startBreak && leave <= endBreak) {
    leave = startBreak;
  }

  if (leave <= startBreak || attendance >= endBreak) {
    return leave - attendance;
  }

  console.log(attendance);
  console.log(leave);
  return leave - attendance - breakTime;
});

employeeSchema.virtual('efficiency').get(function () {
  const x = 18000;
  let eff = (x * 100) / this.netAvailableTime / 100;
  eff = eff + '%';
  return eff;
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
