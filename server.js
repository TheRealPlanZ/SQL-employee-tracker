const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1wildcat',
    database: 'employeesDB'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id'+ connection.threadId);
    console.log(`
    ╔═══╗─────╔╗──────────────╔═╗╔═╗
    ║╔══╝─────║║──────────────║║╚╝║║
    ║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
    ║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
    ║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
    ╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
    ───────║║──────╔═╝║─────────────────────╔═╝║
    ───────╚╝──────╚══╝─────────────────────╚══╝`)
    start();
});

function start() {
    inquirer
      .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'Add Employee',
                'Update Employee Role',
                'View Roles',
                'Add Role',
                'View Departments',
                'Add Department',
                'Exit'
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case 'View Employees':
                    viewEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View Roles':
                    viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View Departments':
                    viewDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Exit':
                    connection.end();
                    break;
            }
        }
        )
}

function viewEmployees() {
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the employees first name?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the employees last name?'
            },
            {
                name: 'role',
                type: 'input',
                message: 'What is the employees role ID?'
            },
            {
                name: 'manager',
                type: 'input',
                message: 'What is the employees manager ID?'
            }
        ])
        .then(function (answer) {
            connection.query(
                'INSERT INTO employees SET ?',
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.role,
                    manager_id: answer.manager
                },
                function (err) {
                    if (err) throw err;
                    console.log('Employee added successfully!');
                    start();
                }
            )
        })
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                name: 'employee',
                type: 'input',
                message: 'What is the employees ID?'
            },
            {
                name: 'role',
                type: 'input',
                message: 'What is the employees new role ID?'
            }
        ])
        .then(function (answer) {
            connection.query(
                'UPDATE employees SET role_id = ? WHERE id = ?',
                [
                    answer.role,
                    answer.employee
                ],
                function (err) {
                    if (err) throw err;
                    console.log('Employee role updated successfully!');
                    start();
                }
            )
        })
}

function viewRoles() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function addRole() {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the role?'
            },
            {
                name: 'department',
                type: 'input',
                message: 'What is the department ID of the role?'
            }
        ])
        .then(function (answer) {
            connection.query(
                'INSERT INTO roles SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department
                },
                function (err) {
                    if (err) throw err;
                    console.log('Role added successfully!');
                    start();
                }
            )
        })
}

function viewDepartments() {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: 'What is the name of the department?'
            }
        ])
        .then(function (answer) {
            connection.query(
                'INSERT INTO departments SET ?',
                {
                    name: answer.name
                },
                function (err) {
                    if (err) throw err;
                    console.log('Department added successfully!');
                    start();
                }
            )
        })
}


