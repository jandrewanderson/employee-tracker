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

//// = TODO:

//// make init a function that displays style console.log

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
                console.log('Departments Table');
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
                console.log('Roles Table');
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
                console.log('Employees Table');
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
    const addRole = () => {
        // const searchDep = db.query('SELECT * FROM departments');
        // const depArray = searchDep[0].map(({ id, name }) => ({value: id, name: name}));
        // console.log(depArray);
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'input', //// change to list later
                name: 'roleDepartment',
                message: 'Which department does this role belong to?'
                //// change this to pull from the employee table
            },
        ]).then((response) => {
            //// function to add the role to the roles table
            console.log(response.roleName); //// remove this when function is added
            //// function to add the salary to the roles table
            console.log(response.roleSalary); //// remove this when function is added
            //// function to select which department this role belongs to and update the department table
            console.log(response.roleDepartment); //// remove this when function is added
            // console.log statement
            const lowercaseRes = response.roleName.toLowerCase();
            console.log(`You have successfully added ${lowercaseRes} to the role table`)
            // return to the start
            firstPrompt();
        });
    }
    // function for adding an employee
    const addEmployee = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "employeeFirst",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "employeeLast",
                message: "What is the employee's last name?"
            },
            {
                type: "input", //// change to list later
                name: "employeeRole",
                message: "What is the employee's role?" 
                //// change this to pull from the role table
            },
            {
                type: "input", ////change to list later
                name: "employeeManager",
                message: "Who is the employee's manager?" 
                //// change this to pull from the employee table
            }, 
        ]).then((response) => {
            //// function to add the employee first name to the employee table
            console.log(response.employeeFirst); //// remove this when function is added
            //// function to add the employee last name to the employee table
            console.log(response.employeeLast); //// remove this when function is added
            //// function to add the employee role to the employee table
            console.log(response.employeeRole); //// remove this when function is added
            //// function to add the employee's manager to the employee table
            console.log(response.employeeManager); //// remove this when function is added
            // console.log statement
            console.log(`You have successfully added ${response.employeeFirst} ${response.employeeLast} to the employee table`)
            // return to the start
            firstPrompt();
        });
    }
    // function for updating an employee role
    const updateEmpRole = () => {
        inquirer.prompt([
            {
                type: "input", //// change to list later
                name: "whichEmployee",
                message: "Which employee's role do you want to update?" 
                ////change this to pull from the role table
            },
            {
                type: "input", //// change to list later
                name: "whichRole",
                message: "Which role do you want to assign the selected employee??" 
                //// change this to pull from the role table
            },
        ]).then((response) => {
            //// function to select the employee that will be updated
            console.log(response.whichEmployee); //// remove this when function is added
            //// function to update the employee's role in the employee table
            console.log(response.whichRole); //// remove this when function is added
            // console.log statement
            console.log(`You have successfully updated ${response.whichEmployee}'s role`)
            // return to the start
            firstPrompt();
        });
    }


// function to end prompt line
const endPrompt = () => {
    console.log('You have ended the program!');
}

firstPrompt();


// MAYBE ADD THIS IN LATER?
    // const confirmDepartment = (response) => {
    //     inquirer.prompt([
    //         {
    //             type: 'confirm',
    //             name: 'areYouSure',
    //             message: 'Are you sure?',
    //         }
    //     ]).then((response1) => {
    //         if(response1.areYouSure){
    //             // function to add the department (response.department) from the last question to the table.
    //             console.log(response.department);
    //         }
    //     });
    // }
    // function for adding a role