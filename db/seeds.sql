INSERT INTO department (department_name)
VALUES ('Sales');

INSERT INTO role (department_id, title, salary)
VALUES (1, 'Sales Person', 50000.00);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (1, 'John', 'Doe', NULL);