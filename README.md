# Business Management API

## Table of Contents

- [About](#about)
- [Setup](#setup)
- [Routes](#routes)
  - [User Routes](#user-routes)
  - [Business Routes](#business-routes)
  - [Service Routes](#service-routes)
  - [Meeting Routes](#meeting-routes)
- [Authentication & Authorization](#authentication--authorization)
- [Error Handling](#error-handling)

## About <a name = "about"></a>

This project is a server-side application for managing a small business. The application allows the business owner to manage their products, schedule appointments, and handle user authentication and authorization.

## Setup <a name = "setup"></a>

1. Clone the repository from GitHub:
    ```
    git clone https://github.com/chayaRoten/nodejs_project.git
    ```
2. Install the dependencies:
    ```
    npm install
    ```
3. Create a `.env` file and add the required environment variables:
    ```
    DB_CONNECTION=<your_database_connection_string>
    TOKEN_KEY=secret
    PORT=3000
    ```

4. Run the application:
    ```
    npm start
    ```

Server Base URI:  **http://localhost:3000**

## Routes <a name = "routes"></a>

### User Routes

#### Sign Up
```http
POST /users/signup

``` 
Response: JWT Token 

| Parameter             | Description                  |
| :----------------     | :-------------------------   |
| `name`            | User's username              |
| `password`            | User's password              |
| `email`                | User's email      |

#### Sign In  

```http
POST /user/login
```  
Response: JWT Token

| Parameter             | Description                  |
| :----------------     | :-------------------------   |
| `name`            | User's username              |
| `password`            | User's password              |
| `email`                | User's email      |

### Business Routes
#### Create Business

```http
POST /business
``` 
Response: Business Object

| Parameter             | Description                  |
| :----------------     | :-------------------------   |
| `name`                | Business name                |
| `ownerId`             | Owner's user ID              |

#### Update Business

```http
PUT /business
``` 
Response: Business Object

| Parameter             | Description                  |
| :----------------     | :-------------------------   |
| `id`                  | Business ID                  |
| `name`                | Updated business name        |
| `address`                | Updated business address        |
| `services`                | Updated business services        |

#### Get Business

```http
GET /business
``` 
Response: Business Object


### Service Routes
#### Create Service

```http
POST /service
``` 
Response: Service Object

| Parameter             | Description                  |
| :----------------     | :-------------------------   |
| `name`                | Service name                 |
| `cost`             | Service cost              |


#### Update Service

```http
PUT /service/:name
``` 
Response: Service Object

| Parameter             | Description                  |
| :----------------     | :-------------------------   |
| `id`                  | Service ID                   |
| `cost`             | Service cost              |

#### Get Services

```http
GET /services
``` 
Response: Services Object


#### Get Service

```http
GET /service/:id
``` 
Response: Service Object

| Parameter             | Description                  |
| :----------------     | :-------------------------   |
| `id`                  | Service ID                   |

#### Delete Service

```http
DELETE /service/:name
``` 
Response: Success message

| Parameter             | Description                  |
| :----------------     | :-------------------------   |
| `name`                  | Service name                   |

### Meeting Routes
#### Create Meeting

```http
POST /meeting
``` 
Response: Meeting Object

| Parameter             | Description                  |
| :----------------     | :-------------------------   |
| `startTime`           | Meeting start time           |
| `duration`            | Meeting duration (minutes)   |
| `details`             | Meeting details              |
| `serviceId`           | Associated service ID        |

#### Update Meeting

```http
PUT /meeting/:id
``` 
Response: Meeting Object

| Parameter             | Description                  |
| :----------------     | :-------------------------   |
| `id`                  | Meeting ID                   |
| `startTime`           | Updated meeting start time   |
| `duration`            | Updated meeting duration     |
| `details`             | Updated meeting details      |

#### Get Meeting

```http
GET /meeting/:id
``` 
Response: Meeting Object

| Parameter             | Description                  |
| :----------------     | :-------------------------   |
| `id`                  | Meeting ID                   |

#### Delete Meeting

```http
DELETE /meeting/:id
``` 
Response: Success message

| Parameter             | Description                  |
| :----------------     | :-------------------------   |
| `id`                  | Meeting ID                   |

## Authentication & Authorization <a name = "authentication--authorization"></a>

All routes except user signup and signin require a valid JWT token. Use the token in the `Authorization` header for authenticated requests.

Example of Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

Some routes are restricted to admin users only. Ensure proper role checks in the middleware.

## Error Handling <a name = "error-handling"></a>

All errors are caught and returned in a structured format.

- Unauthorized access returns a `401` status code.
- Conflicts such as overlapping meetings return a `400` status code.

## Environment Variables <a name = "environment-variables"></a>

Create a `.env` file in the root directory and add the following environment variables:

```
DB_CONNECTION=<your_database_connection_string>
JWT_SECRET=<your_jwt_secret>
```

Example:
```
DB_CONNECTION=mongodb://localhost:27017/mydatabase
JWT_SECRET=your_secret_key
```

## Linting <a name = "linting"></a>

To maintain code quality, this project uses ESLint. You can run the linter using:

```
npm run lint
```

## Swagger Documentation <a name = "swagger-documentation"></a>

API documentation is available via Swagger. After running the server, navigate to:

```
http://localhost:3000/api-docs
```

## Running Tests <a name = "running-tests"></a>

This project includes unit tests. To run the tests, use the following command:

```
npm test
```

## Contributing <a name = "contributing"></a>

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes appropriate tests.

## License <a name = "license"></a>

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact <a name = "contact"></a>

For any questions or support, please contact:

- **Name:** Chaya Roten
- **Email:** ch49ro@gmail.com

## Acknowledgements <a name = "acknowledgements"></a>


---

By following the instructions in this README, you should be able to set up and run the Business Management API project. If you encounter any issues or have any questions, please feel free to reach out.
```

תעדכן את החלקים הרלוונטיים כמו שם, אימייל, וכתובת ריפו של GitHub בהתאם לפרויקט שלך. אם יש לך שאלות נוספות, אני כאן לעזור!
