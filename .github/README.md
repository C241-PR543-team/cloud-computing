# Table of Contents
- [Intro](#intro)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
	- [Authentication](#authentication)
	- [Base URL](#base-url)
	- [Endpoints](#endpoints)
		- [1. Login](#login)
		- [2. Register](#register)
		- [3. Logout](#logout)
- [Contributors](#contributors)
# Intro
This is a repository for storing [Moove](https://github.com/C241-PR543-team)'s back-end RESTful API source code and its documentation.
# Architecture
Coming soon...
# API Documentation
The following is Moove API documentation. This API provides [...] . Below you'll find all the necessary information to integrate and use our API effectively.
## Authentication
To access the Moove API, you need to obtain an API key. Please ask the CC members for the API key.

Include your API key in the header of each API request, unless mentioned:
```
Authorization: YOUR_API_KEY
```
## Base URL

```
TBD
```
## Endpoints
### 1. Login
Endpoint: `/login`

HTTP Method: `POST`

Example Request:
```json
{
	"email": "user@example.com",
	"password": "userpassword",
}
```
Example Responses:

Status Code: 200
```json
{
	"status": "success",
	"message": "Login successful.",
}
```
Status Code: 400
```json
{
	"status": "fail",
	"message": "Invalid email or password.",
}
```
Status code: 500
```json
{
	"status": "error",
	"message": "internal server error",
}
```
### 2. Register
Endpoint: `/register`

HTTP Method: `POST`

Example Request:
```json
{
	"name": "John Doe",
	"phone": "6281234567890",
	"birthday": "2000-01-30",
	"email": "user@example.com",
	"password": "userpassword",
}
```
Example Responses:

Status Code: 200
```json
{
	"status": "success",
	"message": "Register successful.",
}
```
Status Code: 400
```json
{
	"status": "fail",
	"message": "Register failed.",
}
```
Status code: 500
```json
{
	"status": "error",
	"message": "internal server error",
}
```
### 3. Logout
Endpoint: `/register`

HTTP Method: `POST`

Example Request:
```json
{
	"user_id": "4321",
	"session_token": "r4nd0mstr1ng"
}
```
Example Responses:

Status Code: 200
```json
{
	"status": "success",
	"message": "Logout successful.",
}
```
Status Code: 400
```json
{
	"status": "fail",
	"message": "Logout failed.",
}
```
Status code: 500
```json
{
	"status": "error",
	"message": "internal server error",
}
```
# Contributors
Developed by cloud computing members of C241-PR543 Bangkit capstone team.

| Contributor            | Links                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| Muhammad Azhar Fikri   | [GitHub](https://github.com/mazhrf) [LinkedIn](https://www.linkedin.com/in/mazhrf/)                |
| Muhammad Azhim Nugroho | [Github](https://github.com/azhimn) [LinkedIn](https://www.linkedin.com/in/muhammad-azhim-nugroho) |
