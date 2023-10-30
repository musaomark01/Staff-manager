-- Insert a new department
INSERT INTO department (department_name)
VALUES ('');

INSERT INTO role (department_id, title, salary)
VALUES (1, '', 1);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (1, '', '', NULL);
