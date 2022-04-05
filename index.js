const inquirer = require('inquirer');
const db = require('./db/connection');
const table = require('console.table');

const init = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'
            ]
        },

        
    ])

}
init();

// functions to show tables of information
    // function for displaying all departments
    // function for displaying all roles
    // function for displaying all employees
        

//functions to change tables
    // function for adding department
        // What is the name of the department?
    // function for adding a role
        // What is the name of the role
        // What is the salary of the role
    // function for adding an employee
        // What is the employee's first name?
        // What is the employee's last name?
        // What is the employee's roll? (list)
        // Who is the employee's manager?
    // function for updating an employee role
        // Which employee's role do you want to update? (list)
        //Which role do you want to assign the selected employee? (list)
