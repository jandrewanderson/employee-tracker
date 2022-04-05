const inquirer = require('inquirer');
const db = require('./db/connection');
const table = require('console.table');

//// = TODO:

// function that starts the command line prompt and will help navigate to the next prompt
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

        
    ]).then((response) => {
        if (response.options === 'view all departments') {
            //// call function to show department table
        }else if (response.options === 'view all roles'){
            //// call function to show role table
        }else if (response.options === 'view all employees'){
            //// call function to show employee table
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
            console.log('Sorry this is an invalid response. Try again!');
        }
    })

}


// functions to show tables of information
    // function for displaying all departments
    // function for displaying all roles
    // function for displaying all employees
        

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
            //// function to add the department to the department table
            console.log(response.department);
        });
    }
    const addRole = () => {
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
        ]).then((response) => {
            //// function to add the role to the roles table
            console.log(response.roleName);
            //// function to add the salary to the roles table
            console.log(response.roleSalary);
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
                type: "input", ////change to list later
                name: "employeeRole",
                message: "What is the employee's role?" ////change this to pull from the role table
            },
            {
                type: "input", ////change to list later
                name: "employeeManager",
                message: "Who is the employee's manager?" ////change this to pull from the employee table
            },
            
        ]).then((response) => {
            //// function to add the employee first name to the employee table
            console.log(response.employeeFirst);
            //// function to add the employee last name to the employee table
            console.log(response.employeeLast);
            //// function to add the employee role to the employee table
            console.log(response.employeeRole);
            //// function to add the employee's manager to the employee table
            console.log(response.employeeManager);
        });
    }
    // function for updating an employee role
    const updateEmpRole = () => {
        inquirer.prompt([
            {
                type: "input", ////change to list later
                name: "whichEmployee",
                message: "Which employee's role do you want to update?" ////change this to pull from the role table
            },
            {
                type: "input", ////change to list later
                name: "whichRole",
                message: "Which role do you want to assign the selected employee??" ////change this to pull from the role table
            },
            
        ]).then((response) => {
            //// function to select the employee that will be updated
            console.log(response.whichEmployee);
            //// function to update the employee's role in the employee table
            console.log(response.whichRole);
        });
    }


init();





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