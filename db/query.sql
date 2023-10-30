SELECT e.id AS 
employee_id, 
e.first_name, 
e.last_name, 
r.title,
d.department_name, 
r.salary, 
e.manager_id
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
ORDER BY e.last_name;