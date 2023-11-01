const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
/*Import dotenv for .env file  */
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

/*Import user, password, and database form .env file  */
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
/*If connected to the database start the app else throw an err*/
db.connect( () => { startApp(); });

function startApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: ['View Departments','View Roles','View Employees','Add Department','Add Role','Add Employee','Update Employee Role','Exit',
        ],
      },
    ])
    /*For for each case has a unique function when the function is executed go back to the start question */
    .then((answers) => {
      switch (answers.start) {
        case 'View Departments':
          viewDepartments();
          break;
        case 'View Roles':
          viewRoles();
          break;
        case 'View Employees':
          viewEmployees();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Exiting');
          process.exit(0);
      }
    });
}
// fetching data from department table hen display the data and goes back to the main questions
function viewDepartments() {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) { console.error(err);
    } else {
      console.log('List of Departments');
      results.forEach((department) => {
        console.log(department.department_name);
      });
    }
    startApp();
  });
}
// fetching data from role table with the department after they join then display the data and goes back to the main questions
function viewRoles() {
  const query = `SELECT r.*, d.department_name FROM role r
    LEFT JOIN department d ON r.department_id = d.id; `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.log('List of Roles');
      results.forEach((role) => {
        console.log(`Department ${role.department_name}, Role ${role.title}, Salary ${role.salary}`);
      });
    }
    startApp();
  });
}
// fetching data from employee table with the role after they join then display the data and goes back to the main questions
function viewEmployees() {
  const query = `SELECT e.id AS employee_id, e.first_name, e.last_name, r.title,d.department_name, r.salary, 
  CONCAT(COALESCE(m.first_name, 'N/A'), ' ', COALESCE(m.last_name, 'N/A')) AS manager_name
  FROM employee e
  LEFT JOIN role r ON e.role_id = r.id
  LEFT JOIN department d ON r.department_id = d.id
  LEFT JOIN employee m ON e.manager_id = m.id ORDER BY e.last_name;`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.log('List of Employees');
      results.forEach((employee) => {
        console.log(`ID ${employee.employee_id}, Name ${employee.first_name} ${employee.last_name}, Role ${employee.title}, Department ${employee.department_name}, Salary: ${employee.salary}, Manager Name ${employee.manager_name}`);
      });
    }
    startApp();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'newDepartment',
        message: 'What is the name of the department you want to add?',
      },
    ])
    .then((departmentAnswers) => {
      const newDepartment = departmentAnswers.newDepartment;
      // Add the new department from the user input to the department table
      db.query('INSERT INTO department (department_name) VALUES (?)', [newDepartment], (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${newDepartment} department has been added`);
        }
        startApp();
      });
    });
}
function addRole() {
db.query('SELECT id, department_name FROM department', (err, results) => {
  if (err) {
    console.error(err);
    startApp();
  } else {
     // Made choices for the user to select the department for the new role
    const departmentChoices = results.map((department) => ({
      name: department.department_name,
      value: department.id,
    }));

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'newRole',
          message: 'What is the name of the role you want to add?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What would be the role salary?',
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'To what department would you like to add this role to?',
          choices: departmentChoices,
        },
      ])
      .then((roleAnswers) => {
        const { newRole, salary, department_id } = roleAnswers;
        // Insert the new role into the role table
        db.query(
          'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
          [newRole, salary, department_id],
          (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`${newRole} role has been added`);
            }
            startApp();
          }
        );
      });
  }
});
}

function addEmployee() {
  db.query('SELECT id, first_name, last_name FROM employee', (err, employeeResults) => {
    if (err) {
      console.error(err);
      startApp();
    } else {
      // Made choices for the user to select the manager for the new employee
      const employeeChoices = employeeResults.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
      // Made choices for the user to select the role for the new employee
      db.query('SELECT id, title FROM role', (err, roleResults) => {
        if (err) {
          console.error(err);
          startApp();
        } else {
          const roleChoices = roleResults.map((role) => ({
            name: role.title,
            value: role.id,
          }));

          inquirer
            .prompt([
              {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?",
              },
              {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?",
              },
              {
                type: 'list',
                name: 'role_id',
                message: "what will be this employee's role?",
                choices: roleChoices,
              },
              // Made it some the user can choose to add a manager from the employees or none  
              {
                type: 'list',
                name: 'manager_id',
                message: "who is this employee manager (if applicable):",
                choices: [...employeeChoices, { name: 'None', value: null }],
              },
            ])
            .then((employeeAnswers) => {
              const { firstName, lastName, role_id, manager_id } = employeeAnswers;
              // convert role id into a integer 
              const roleIdAsInt = parseInt(role_id);
              if (isNaN(roleIdAsInt)) {
                console.error(err);
                startApp();
              } else {
                 // Insert the new employee into the employee table
                db.query(
                  'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
                  [firstName, lastName, roleIdAsInt, manager_id],
                  (err) => {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log(`${firstName} ${lastName} has been added as an employee`);
                    }
                    startApp();
                  }
                );
              }
            });
        }
      });
    }
  });
}

function updateEmployeeRole() {
  db.query('SELECT id, first_name, last_name FROM employee', (err, employeeResults) => {
    if (err) {
      console.error(err);
      startApp();
    } else {
       // Made choices for the user to select the employee to update
      const employeeChoices = employeeResults.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));
      // Fetching role id and role title from roles table
      db.query('SELECT id, title FROM role', (err, roleResults) => {
        if (err) {
          console.error(err);
          startApp();
        } else {
          const roleChoices = roleResults.map((role) => ({
            name: role.title,
            value: role.id,
          }));

          inquirer
            .prompt([
              {
                type: 'list',
                name: 'employee_id',
                message: 'Who you want to update?',
                choices: employeeChoices,
              },
              {
                type: 'list',
                name: 'new_role_id',
                message: 'To what role you want to update them to?',
                choices: roleChoices,
              },
            ])
            .then((updateAnswers) => {
              const { employee_id, new_role_id } = updateAnswers;
              // Update the employee's role in the employee table
              db.query(
                'UPDATE employee SET role_id = ? WHERE id = ?',
                [new_role_id, employee_id],
                (err) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log('Employee role updated successfully');
                  }
                  startApp();
                }
              );
            });
        }
      });
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});