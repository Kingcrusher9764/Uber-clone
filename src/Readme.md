# Endpoints

## `/users/register` Endpoint

### Description
It is used to register a user 

### Method
`POST`

### Request body
- `fullname` (object, required):
    - `firstname` (string, required): User first name
    - `lastname` (string, optional): User last name
- `email` (string, required): User email
- `password` (string, required): User password

### Response Example
- `token` (string): JWT Token
- `user` (object):
    - `fullname` (object):
        - `firstname` (string): User first name
        - `lastname` (string): User last name
    - `email` (string): User email

## `/users/login` Endpoint

### Description
It is used to login the user 

### Method
`POST`

### Request body
- `email` (string, required): User email
- `password` (string, required): User password

### Response Example
- `token` (string): JWT Token
- `user` (object):
    - `fullname` (object):
        - `firstname` (string): User first name
        - `lastname` (string): User last name
    - `email` (string): User email
