# Chamak Arot Project - System Architecture Documentation

## 1. Introduction

The architecture of the Chamak Arot project is designed to support a robust, scalable, and efficient B2B platform that facilitates procurement and distribution of products between wholesalers and retailers. The architecture comprises both hardware and software components, ensuring seamless interaction and performance optimization.

## 2. Architecture Overview

The system architecture for Chamak Arot can be divided into the following main components:

- **Frontend**: ReactJS application
- **Mobile App**: Android and iOS (Flutter)
- **Backend**: NestJS application
- **Database**: PostgreSQL
- **File Storage**: AWS S3
- **Hosting**: AWS Lightsail
- **CI/CD**: GitHub Actions
- **Reverse Proxy**: Nginx

## 3. Component Descriptions

### 3.1 Frontend and Mobile App

- **Framework**: ReactJS and Flutter
- **Functionality**:
  - User interface for different user roles (Super Admin, Warehouse Admin, etc.)
  - Product browsing, order placement, inventory management, reporting, and user account management.
- **Interaction**: Communicates with the backend via REST APIs.

### 3.2 Backend

- **Framework**: NestJS
- **Functionality**:
  - API server handling business logic
  - User authentication and authorization
  - Product and order management
  - Inventory control
  - Route optimization
  - Data analysis and reporting
- **Interaction**:
  - Receives requests from the frontend
  - Communicates with PostgreSQL database for data storage and retrieval
  - Utilizes AWS S3 for file storage.

### 3.3 Database

- **System**: PostgreSQL
- **Functionality**:
  - Persistent data storage
  - Stores information of users, products, orders, inventory, and more.
- **Configuration**:
  - **Host**: AWS Lightsail
  - **Port**: Default PostgreSQL port
  - **User permissions**: Configured for secure access by the backend server.

### 3.4 File Storage

- **Service**: AWS S3
- **Functionality**:
  - Secure and scalable storage for product images, documents, and other files.
  - Provides high availability and low latency access to stored files.

### 3.5 Hosting

- **Service**: AWS Lightsail
- **Environment**:
  - **Development Server**:
    - RAM: 1 GB
    - vCPUs: 2
    - Storage: 40 GB SSD
    - OS: Ubuntu
  - **Production Server**:
    - RAM: 1 GB
    - vCPUs: 2
    - Storage: 40 GB SSD
    - OS: Ubuntu
- **Functionality**:
  - Host backend server
  - Host front-end static files served via Nginx.

### 3.6 CI/CD

- **Service**: GitHub Actions
- **Functionality**:
  - Automates build, test, and deployment processes.
  - Ensures continuous integration and deployment for both development and production environments.
- **Workflow**:
  - **Build**: Compiling code and installing dependencies.
  - **Deploy**: Deploying successful builds to the server.

### 3.7 Reverse Proxy

- **Service**: Nginx
- **Functionality**:
  - Serves frontend static files.
  - Proxies API requests to the backend server.
  - Ensures secure communication via SSL/TLS.

## 4. Diagrams

### 4.1 System Architecture Diagram

![System Architecture Diagram](images/sdd.gif)

This project uses GitHub Actions for CI/CD, automating build, and deployment processes to ensure continuous integration and deployment. Nginx is configured as a reverse proxy, directing traffic to the NestJS backend API and serving the ReactJS frontend, ensuring secure SSL/TLS communication. PostgreSQL is set up on the server for database management, with a database created via the PostgreSQL CLI and user permissions configured for secure access. The backend application specifies PostgreSQL connection details, enabling seamless communication and data storage. This setup optimizes deployment efficiency, security, and data management for the application.

## 5. Existing Architecture

The current setup involves:

- A development and production environment hosted on AWS Lightsail, both configured with the same specifications for consistency.
- PostgreSQL configured on the server for database management.
- Nginx is configured to serve the frontend and backend, ensuring secure and efficient routing of requests.

## 6. Summary of Each Component

- **ReactJS Frontend**: User interfaces for all roles and functionalities.
- **NestJS Backend**: Business logic, API endpoints, and integration with other components.
- **PostgreSQL Database**: Storage for all application data.
- **AWS S3**: Reliable and scalable file storage.
- **AWS Lightsail**: Hosting environment for development and production.
- **GitHub Actions**: CI/CD pipeline for automated build, test, and deployment.
- **Nginx**: Reverse proxy to manage incoming traffic and secure communication.

## 7. Conclusion

The system architecture for the Chamak Arot project ensures a robust, scalable, and secure environment for B2B procurement and distribution. By leveraging modern frameworks, cloud services, and automated workflows, the platform enhances the efficiency and collaboration between wholesalers and retailers, supporting seamless supply chain operations.
