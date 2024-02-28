# Internships Management Platform

This Internships Management Platform is designed to facilitate the management of internship programs, connecting students with potential employers. It supports functionalities such as user authentication, internship postings, application management, and progress tracking.

## Technologies Used

This project is built with the following technologies:

- ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white) - Evented I/O for the backend.
- ![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white) - Web application framework for Node.js.
- ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white) - Relational database used to store user and internship data.
- ![JWT](https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) - Used for securely transmitting information between parties as a JSON object.
- ![Joi](https://img.shields.io/badge/-Joi-FF69B4?style=flat-square&logoColor=white) - Object schema validation.
- ![bcrypt](https://img.shields.io/badge/-bcrypt-003A70?style=flat-square&logoColor=white) - A library to help you hash passwords.
- ![Helmet](https://img.shields.io/badge/-Helmet-840010?style=flat-square&logoColor=white) - Helps secure Express apps by setting various HTTP headers.
- ![Morgan](https://img.shields.io/badge/-Morgan-76D04B?style=flat-square&logoColor=white) - HTTP request logger middleware for node.js.
- ![Cors](https://img.shields.io/badge/-Cors-CC1F29?style=flat-square&logoColor=white) - Package for providing a Connect/Express middleware that can be used to enable CORS.

## Additional Tools and Packages

- ![Swagger](https://img.shields.io/badge/-Swagger-85EA2D?style=flat-square&logo=swagger&logoColor=black) - API documentation tool for designing, building, and documenting APIs.
- ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white) - Static code analysis tool for identifying problematic patterns in JavaScript code.


## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the latest version of Node.js and npm installed on your machine. You can check your current version with the following commands:

```bash
node --version
npm --version
```
## Installation
Clone the repository:
```bash
git clone https://github.com/samer-mansouri/internships-management-platform.git
```
Navigate to the project directory :
```bash
cd e-learning-platform
```
Install the project dependencies:
```bash
npm install
```
Create a .env file in the root directory of your project and add the necessary environment variables:
```bash
API_PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=internships_management
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```
Start the development server:
```bash
npm run dev
```

### Usage
After starting the server, you can begin using the Internships Management Platform by accessing  http://localhost:5000 in your web browser or through tools like Postman for API interaction.

### License
This project is licensed under the ISC License - see the LICENSE.md file for details.