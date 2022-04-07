INSERT INTO departments (name)
VALUES
    ('Finance'),
    ('Customer Service'),
    ('Accounting'),
    ('Marketing');

INSERT INTO roles (title, salary, deparment_id)
VALUES
    ('Finance Lead', 130000, 1),
    ('Finance Specialist', 100000, 1),
    ('Customer Service Lead', 85000, 2),
    ('Customer Service Representative', 50000, 2),
    ('Lead Accountant', 125000, 3),
    ('Accountant', 90000, 3),
    ('Marketing Director', 145000, 4),
    ('Marketing Specialist', 75000, 4);
   

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Scott', 1, null),
    ('Dwight', 'Schrute', 2, 1),
    ('Kelly', 'Kapoor', 3, null),
    ('Erin', 'Hannon', 4, 3),
    ('Oscar', 'Martinez', 5, null),
    ('Angela', 'Martin', 6, 5),
    ('Pam', 'Beasley', 7, null),
    ('Ryan', 'Howard', 8, 7);
