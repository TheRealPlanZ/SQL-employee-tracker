USE employeesDB;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Barry', 'Allen', 1, 1),
       ('Oliver', 'Queen', 2, 1),
       ('Bruce', 'Wayne', 3, 2),
       ('Clark', 'Kent', 4, 2),
       ('Diana', 'Prince', 5, 3),
       ('Selina', 'Kyle', 5, 3),
       ('Hal', 'Jordan', 6, 4),
       ('Dick', 'Grayson', 7, 4);


INSERT INTO departments (name)
VALUES ('Sales'), ('Engineering'), ('Finace'), ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 200000, 2),
       ('Software Engineer', 180000, 2),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 135000, 4),
       ('Lawyer', 120000, 4);