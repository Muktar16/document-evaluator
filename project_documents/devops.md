# DevOps

## CI/CD with GitHub Actions

This project utilizes GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD) for both development and production environments. GitHub Actions automates the build, test, and deployment processes, ensuring that code changes are continuously integrated and deployed to the server.

- **CI/CD Workflow:**
  - **Build:** The codebase is compiled, and dependencies are installed.
  - **Test:** Automated tests are run to ensure code quality and functionality.
  - **Deploy:** Successful builds are deployed to the server.

## Nginx Configuration

Nginx is configured on the server and used to serve both the backend API and the web frontend. It acts as a reverse proxy, directing incoming traffic to the appropriate services based on the request URL.

- **Backend API:**

  - Nginx proxies requests to the NestJS backend server running on a specific port.
  - Ensures secure communication using SSL/TLS.

- **Web Frontend:**
  - Serves static files for the web application.
  - Proxies API requests to the backend server.

## Database Configuration

To set up PostgreSQL for communication with the backend of our application, we installed PostgreSQL on the server and configured it to serve as the database management system for storing application data.

1. **Create Database:** Use the PostgreSQL command-line interface to create a new database for your application.

2. **Configure User Permissions:** Create a new user with appropriate permissions to access the database. Set a strong password for the user.

3. **Connection Configuration:** In the backend application configuration, specify the PostgreSQL database connection details, including the host, port, username, password, and database name.

## System Diagram

![Diagram](images/sdd.gif)
