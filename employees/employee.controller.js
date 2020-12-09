const { employeeService } = require('./employee.service');

exports.postEmployee = employeeService.create();
exports.getEmplyees = employeeService.getAll();
exports.deleteEmployee = employeeService.delete();
exports.patchEmployee = employeeService.patch();
