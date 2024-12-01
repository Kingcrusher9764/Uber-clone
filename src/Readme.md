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


## `/users/profile` Endpoint

### Description
It is used to get the current user data

### Method
`GET`

### Authentication
- Requires jwt token in the header i.e, `Authorization: Bearer <jwt-token>` or cookie

### Response Example
- `user` (object):
    - `fullname` (object):
        - `firstname` (string): User first name
        - `lastname` (string): User last name
    - `email` (string): User email


## `/users/logout` Endpoint

### Description
It is used to logout the current user and blacklist the token

### Method
`POST`

### Authentication
- Requires jwt token in the header i.e, `Authorization: Bearer <jwt-token>` or cookie

