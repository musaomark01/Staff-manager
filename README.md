# Staff-manager

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Description
I made this application to allow non-developers to easily view and interact with information stored in databases. This application allow users to add departments, roles, employees, view department, roles, and employee data, as well as update roles.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Technology Used](#Technology)
- [Questions](#questions)

## Installation
-Node.js (version 18.18.0.) MySQL (version 8.0) -Npm install Inquirer (version 8.2.4), dotenv (version 16.3.1), express (version 4.18.2), mysql2 (version 3.6.2)

## Usage
Clone this repository.
Install all the required packages as listed above.
Change the database in MySQL to 'employees' using the command: USE employees;
Create a .env file and add the following information:
DB_NAME='employees'
DB_PASSWORD='your_mysql_password'
DB_USER='your_mysql_user'
Make sure to replace 'your_mysql_password' and 'your_mysql_user' with your MySQL login credentials.
Run node index.js in the command line from the directory where the index file is located.
Select your desired operation from the available options: add departments, roles, and employees, view department data, view role data, view employee data, or update roles.
After completing an operation (viewing, adding, or updating), the application will return you to the main menu, allowing you to select your next action.


[Walk through video](https://drive.google.com/file/d/1EAo75U_vmBxWXDTeDzLDdmlNZgFPzkRu/view)
## License 
This project is licensed under [MIT License](License)

## Contributing
Thank you for your interest in this project! I am not actively seeking external contributions at this time. Feel free to fork the repository and work on your own improvements, but I may not accept pull requests.

## Technology Used
-Node.js (version 18.18.0.)
-MySQL (version 8.0)
### npm packages
-Inquirer (version 8.2.4),
-dotenv (version 16.3.1), 
-express (version 4.18.2), 
-mysql2 (version 3.6.2)

## Questions
GitHub: [musaomark01](https://github.com/musaomark01 )
For any additional questions, please feel free to contact me at musaomark01@gmail.com.
