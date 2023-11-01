SELECT e.id AS employee_id, 
       e.first_name, 
       e.last_name, 
       r.title,
       d.department_name, 
       r.salary, 
       /*Manager's first and last name equal 'N/A' if NULL 
       Concatenated manager's name*/
       CONCAT(COALESCE(m.first_name, 'N/A'), ' ', COALESCE(m.last_name, 'N/A')) AS manager_name
       /*employee = e
       ole = r
       department = d*/
FROM employee e
LEFT JOIN role r ON e.role_id = r.id 
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id
/*Order by last name ascending order*/
ORDER BY e.last_name;