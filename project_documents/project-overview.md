# Project Overview

## 1. Introduction

Our project is a B2B (Business-to-Business) application designed to facilitate the procurement and distribution of products between wholesalers and retailers. The platform serves as a marketplace where wholesalers can showcase their products, manage their inventory seamlessly, and retailers can browse the products and order. With a focus on user management, inventory control, and order processing, our application streamlines the supply chain process and enhances collaboration between wholesalers and retailers.

## 2. Key Features

1. **User Management:** The application provides different access levels for users, including Super Admin, Warehouse Admin, Warehouse Associate, Sales Associate, Delivery Associate, Data User, and Customer, each with specific roles and permissions.

2. **Product Management:** Wholesalers can manage their product catalog, including adding new products, updating prices, managing inventory levels, and categorizing products for easy navigation.

3. **Order Management:** Retailers can place orders for products, track order status, and manage order history. Warehouse admins oversee order processing, inventory allocation, and delivery scheduling.

4. **Inventory Control:** Warehouse admins and associates manage warehouse inventory, ensuring accurate stock levels, handling product returns, and optimizing warehouse space.

5. **Reporting:** Data users have access to analytical data for generating reports on sales performance, inventory turnover, customer preferences, and other key metrics. These insights help stakeholders make informed business decisions.

6. **Route Optimization:** Sales and delivery associates utilize route optimization tools to efficiently plan their visits to customer stores, minimizing travel time and optimizing delivery routes.

## 3. Target User

Our target audience includes wholesalers, retailers (store owners), sales associates, delivery associates, warehouse admins, and data analysts involved in the B2B supply chain process. The platform caters to businesses of all sizes, ranging from small local retailers to large wholesalers with multiple warehouses.

## 4. User Access Levels

![User Access Levels](images/overview.gif)

1. **Super Admin:**

   - Description: The Super Admin has the highest level of access and control over the platform. They can manage all features and functionalities, including product and category management, user management, order management, and reporting.

   - Capabilities:
     - Access to all features and modules.
     - Manage products, categories, and pricing.
     - Manage user accounts, roles, and permissions.
     - Generate reports for analysis and decision-making.

2. **Warehouse Admin:**

   - Description: Warehouse Admins are responsible for overseeing specific warehouses within the system. They have authority over warehouse-related operations, including user management, inventory management, order processing, and reporting.

   - Capabilities:
     - Access to warehouse-specific features and data.
     - Manage users assigned to the warehouse.
     - Manage product prices, stocks, and inventory levels.
     - Process orders and manage deliveries within the warehouse.
     - Generate reports related to warehouse operations.

(Continue the pattern for other user access levels...)

## 5. Purpose

Our project's purpose is to digitize and streamline the B2B procurement and distribution process, enhancing efficiency, transparency, and collaboration between wholesalers and retailers. By providing a user-friendly platform with robust features for product management, order processing, and inventory control, we aim to revolutionize the way businesses engage in B2B transactions and optimize their supply chain operations.

## 6. Technology Stack

Our application is built using the NestJS framework for the backend, ReactJS for the frontend, and utilizes a PostgreSQL database for data storage. We leverage AWS (Amazon Web Services) for hosting, S3 for file storage, and implement GitHub CI/CD pipelines to automate deployment.

## 7. Conclusion

Our B2B application represents a modern solution for businesses looking to streamline their procurement and distribution processes. With its comprehensive features, intuitive user interface, and robust technology stack, our platform empowers wholesalers and retailers to efficiently manage their operations, optimize their supply chains, and drive business growth in the digital age.
