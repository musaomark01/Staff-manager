const inquirer = require('inquirer');
const departments = ['sales'];
const roles = ['sales person'];
const employees = [];

function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: [
          'View Departments',
          'View Roles',
          'View Employees',
          'Add Department',
          'Add Role',
          'Add Employee',
          'Update Employee Role',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      switch (answers.start) {
        case 'View Departments':
          console.log('List of Departments:');
          departments.forEach((department) => {
            console.log(department);
          });
          startApp();
          break;

        case 'View Roles':
          console.log('List of Roles:');
          roles.forEach((role) => {
            console.log(role);
          });
          startApp();
          break;

        case 'View Employees':
          console.log('List of Employees:');
          employees.forEach((employee) => {
            console.log(`Name: ${employee.firstName} ${employee.lastName}, Role: ${employee.role}`);
          });
          startApp();
          break;

        case 'Add Department':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'NewDepartment',
                message: 'Enter the name of the department:',
              },
            ])
            .then((departmentAnswers) => {
              const newDepartment = departmentAnswers.NewDepartment;
              departments.push(newDepartment);
              console.log(`${newDepartment} department has been added`);
              startApp();
            });
          break;

        case 'Add Role':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'NewRole',
                message: 'Enter the name of the role:',
              },
            ])
            .then((roleAnswers) => {
              const newRole = roleAnswers.NewRole;
              inquirer
                .prompt([
                  {
                    type: 'list',
                    name: 'Department',
                    message: 'Select the department for this role:',
                    choices: departments,
                  },
                ])
                .then((departmentAnswer) => {
                  const department = departmentAnswer.Department;
                  roles.push({ role: newRole, department: department });
                  console.log(`${newRole} role has been added to the ${department} department`);
                  startApp();
                });
            });
          break;

        case 'Add Employee':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'firstName',
                message: "Enter the employee's first name:",
              },
              {
                type: 'input',
                name: 'lastName',
                message: "Enter the employee's last name:",
              },
              {
                type: 'list',
                name: 'role',
                message: "Select the employee's role:",
                choices: roles, // Use roles directly here
              },
            ])
            .then((employeeAnswers) => {
              employees.push(employeeAnswers);
              console.log(
                `${employeeAnswers.firstName} ${employeeAnswers.lastName} has been added as an employee with the role ${employeeAnswers.role}`
              );
              startApp();
            });
          break;

        case 'Update Employee Role':
          // Handle the "Update Employee Role" option
          startApp();
          break;

        case 'Exit':
          console.log('Exiting the application.');
          break;

        default:
          console.log('Invalid option');
          startApp();
      }
    });
}

startApp();
