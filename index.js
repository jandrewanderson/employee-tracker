const inquirer = require('inquirer');
const table = require('console.table');
const mysql = require('mysql2');
// creating the connection to the mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'employee_tracker'
    },
    console.log('You are connected to the employee_tracker database.')
);

// function that displays style console.log and starts the questions
function init() {
    console.log('\n');
    console.log('||=================================||');
    console.log('||    EMPLOYEE TRACKER DATABASE    ||');
    console.log('||=================================||');
    console.log('\n');
    firstPrompt();
}

// function that starts the command line prompt and will help navigate to the next prompt
const firstPrompt = () => { 
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit'
            ]
        },
    ]).then((response) => {
        if (response.options === 'view all departments') {
            // function to show department table
            disDepartments();
        }else if (response.options === 'view all roles'){
            // function to show role table
            disRoles();
        }else if (response.options === 'view all employees'){
            // function to show employee table
            disEmployees();
        }else if (response.options === 'add a department'){
            // function to add a department
            addDepartment();
        }else if (response.options === 'add a role'){
            // function to add a role
            addRole();
        }else if (response.options === 'add an employee'){
            // function to add an employee
            addEmployee();
        }else if (response.options === 'update an employee role'){
            // function to update an employee role
            updateEmpRole();
        }else {
            endPrompt();
        }
    })
}

// functions to show tables of information

    // function for displaying all departments
    const disDepartments = () => {
        // function to display the departments table
        db.query('SELECT * FROM departments', function(err, results){
            try {
                console.log('\n');
                console.log('|=================|')
                console.log('|Departments Table|');
                console.log('|=================|')
                console.log('\n');
                console.table(results);
            } catch {
                console.log(err);
            }
            // return to the start
            firstPrompt();
        });
    }

    // function for displaying all roles
    const disRoles = () => {
        // function to display the roles table
        db.query('SELECT * FROM roles', function(err, results){
            try {
                console.log('\n');
                console.log('|===========|')
                console.log('|Roles Table|');
                console.log('|===========|')
                console.log('\n');
                console.table(results);
            } catch {
                console.log(err);
            }
            // return to the start
            firstPrompt();
        });
    }

    // function for displaying all employees
    const disEmployees = () => {
        // function to display the employee table
        db.query('SELECT * FROM employees', function(err, results){
            try {
                console.log('\n');
                console.log('|===============|')
                console.log('|Employees Table|');
                console.log('|===============|')
                console.log('\n');
                console.table(results);
            } catch {
                console.log(err);
            }
            // return to the start
            firstPrompt();
        });
    } 



//functions to change tables
    // function for adding department
    const addDepartment = () => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?'
            }
        ]).then((response) => {
            // function to add the department to the department table
            const query = 'INSERT INTO departments (name) VALUES (?)'
            db.query(query, response.department, (err, results) => {
                try{
                    const lowercaseRes = response.department.toLowerCase();
                    console.log(`You have successfully added ${lowercaseRes} to your department table`)
                }catch {
                    console.log(err);
                }
                // return to the start
                firstPrompt();
            })
        });
    }

    // function to add role
    const addRole = async () => {
        const result = await inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "What is the name of the role?",
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the salary of the role?"
            }
        ]);
        const getDep = 'SELECT * FROM departments'
        const getResults = await db.promise().query(getDep);
        const departments = getResults[0].map(({ id, name }) => ({value: id, name: name}));

        const whichDep = await inquirer.prompt([
            {
                type: 'list',
                name: 'roleDepartment',
                message: "Which department does this role belong to?",
                choices: departments
            }
        ])
        const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
        db.query(query, [result.roleName, result.roleSalary, whichDep.roleDepartment], (err, results) => {
            try{
                // const lowercaseRes = result.title.toLowerCase();
                console.log(`You have successfully added ${result.roleName} to your role table`)
            } catch {
                console.log(err);
            }
            // return to the start
            firstPrompt();
        })    
    }

    // function for adding an employee
    async function addEmployee() {
        const askEmp = await inquirer.prompt([
            {
                type: "input",
                name: "employeeFirst",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "employeeLast",
                message: "What is the employee's last name?",
            }
        ])
        const getRoles = await db.promise().query('SELECT * FROM roles');
        const roles = getRoles[0].map(({ id, title }) => ({ value: id, name: title }));
        const askRole = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeRole',
                message: "What is the employee's role?",
                choices: roles
            }
        ])
        const getEmployees = await db.promise().query('SELECT * FROM employees');
        const employees = getEmployees[0].map(({ first_name, last_name, manager_id }) => ({ value: manager_id, name: `${first_name} ${last_name}` }));
        employees.push({value: null, name: 'None'});
        const getManager = await inquirer.prompt([
            {
                type: 'list',
                name: 'employeeManager',
                message: "Who is the employee's manager?",
                choices: employees
            }
        ])
        const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        db.query(query, [askEmp.employeeFirst, askEmp.employeeLast, askRole.roles, getManager.employeeManager], (err, results) => {
            try {
                console.log(`Successfully added ${askEmp.employeeFirst} ${askEmp.employeeLast} to the employee table.`);
            }catch {
                console.log(err);
            }
            // return to the start
            firstPrompt();
        })
    }

    // function for updating an employee role
    async function updateEmpRole() {
        const getEmployees = await db.promise().query('SELECT * FROM employees');
        const employees = getEmployees[0].map(({ id, first_name, last_name }) => ({ value: id, name: `${first_name} ${last_name}` }));
        const getRoles = await db.promise().query('SELECT * FROM roles');
        const roles = getRoles[0].map(({ id, title }) => ({ value: id, name: title }));
        const updEmp = await inquirer.prompt([
            {
                type: 'list',
                name: 'whichEmployee',
                message: "Which employee's role do you want to update?",
                choices: employees
            },
            {
                type: 'list',
                name: 'whichRole',
                message: "Which role do you want to assign the selected employee?",
                choices: roles
            },
        ])
        const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
        db.query(query, [updEmp.role, updEmp.employee], (err, results) => {
            try {
                console.log(`You have successfully updated ${updEmp.whichEmployee}'s role`);
            }catch{
                console.log(err);
            }
            // return to the start
            firstPrompt();
        })
    }



// function to end prompt line
const endPrompt = () => {
    console.log('You have ended the program!');
}



init();