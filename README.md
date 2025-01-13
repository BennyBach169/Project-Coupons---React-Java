# Benny Bach Coupons Project
A full-stack application that allows users to view, purchase, and manage coupons from different companies. Built with Java (Spring Boot) on the backend and React on the frontend.

## Tech Stack
- **Frontend**: React, Redux, Material UI, CSS, TypeScript
- **Backend**: Java, Spring Boot, Spring Security, JPA, Hibernate
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **Deployment**: Docker, Render

## Features
- User login and registration (Admin, Company, Customer).
- Company users can create, update, and delete coupons.
- Customers can browse and purchase coupons.
- JWT-based authentication and session management.
- CRUD operations for coupons, customers, and companies.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/BennyBach169/Project-Coupons---React-Java.git
   ```

2. **Navigate to the backend directory** and install dependencies:
   ```bash
   cd benny_bach_coupons_full_stack/benny_bach_coupons_project_backend
   ```

   - Ensure you have **Java 11** (or later) installed.
   - Set up your database and configure the `application.properties` file with your credentials.

3. **Navigate to the frontend directory** and install dependencies:
   ```bash
   cd benny_bach_coupons_full_stack/project_coupons_front_end_benny_bach
   ```

   - Make sure **Node.js** and **npm** are installed.
   - Run the following command to install the frontend dependencies:
     ```bash
     npm install
     ```

4. **Run the backend**:
   - Use Maven to run the Spring Boot application:
     ```bash
     mvn spring-boot:run
     ```

5. **Run the frontend**:
   - Start the React application:
     ```bash
     npm start
     ```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8080`.


## Usage
- Go to the React application URL (`http://localhost:3000`) in your browser.
- Register as a customer, company, or admin.
- Companies can create new coupons by logging in to their account.
- Customers can browse and purchase coupons.

## Environment Variables
- `SPRING_DATASOURCE_URL`: URL to your MySQL database.
- `SPRING_DATASOURCE_USERNAME`: Database username.
- `SPRING_DATASOURCE_PASSWORD`: Database password.

## Deployment
- The project is deployed on **Render** using Docker.
- You can view the live application at https://coupons-project-latest.onrender.com.

## Acknowledgments
- Thanks to the creators of React and Spring Boot for the amazing frameworks!
- Inspiration from various open-source coupon management systems.






