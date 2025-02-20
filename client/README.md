# E-Commerce Web Application

A modern e-commerce web application that provides users with a seamless shopping experience while offering administrators powerful tools for product management and order processing. The project is built using React on the frontend and leverages a centralized API service layer (powered by axios) to communicate with the backend.

## Overview

This project includes the following core functionalities:

- **User Authentication:**  
  Users can register, log in, and log out. Authentication state is managed using React Context to share user data (including admin privileges) throughout the application.

- **Product Catalog & Management:**  
  Regular users can browse and view detailed product information. Administrators have access to an admin panel for creating, updating, and deleting products.

- **Shopping Cart & Checkout:**  
  Users can add products to their cart, manage cart items, and proceed to checkout. Payment processing is integrated via a payment intent mechanism.

- **API Communication:**  
  A unified API module abstracts HTTP requests using axios. It includes a built-in retry mechanism for handling transient server errors and robust error handling (e.g., for unauthorized requests).

## Features

- **Authentication:**  
  - User registration (with separate endpoints for admin and standard users).
  - Login and logout functionality.
  
- **Product Operations:**  
  - Retrieve a list of products.
  - View detailed product information.
  - Create, update, and delete products (admin functionality).

- **Cart & Order Management:**  
  - Add to cart, view cart contents, and remove items.
  - Checkout and order processing.
  - Retrieve orders and order details.

- **Payment Processing:**  
  - Create payment intents to securely handle payments.

- **Resilient API Calls:**  
  - Centralized axios-based API requests with automatic retry on server errors (up to 3 attempts).
  - Error handling for unauthorized access and other error scenarios.

## Tech Stack

- **Frontend:** React, React Router, React Context API
- **HTTP Requests:** Axios
- **Authentication:** Session management using credentials (withCredentials)
- **Environment Management:** Environment variables (e.g., `REACT_APP_API_URL`)
- **Routing:** Client-side routing with React Router

## Project Architecture

### API Module

The core API module (`api.js`) is responsible for making HTTP requests. It configures the base URL from environment variables, implements error handling, and retries requests automatically for server errors (HTTP 500+).

**Key Points:**

- **Base URL Configuration:**  
  ```js
  export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  ```
- **Retry Mechanism:**  
  Retries requests up to 3 times for server errors.
- **Error Handling:**  
  - Logs a warning and throws an error for unauthorized (401) responses.
  - Throws detailed error objects on failure.

### API Endpoints

The API functionality is divided into separate modules for clarity:

- **authApi.js:**  
  Manages user registration, login, and logout.
- **cartApi.js:**  
  Handles shopping cart operations (get cart, add to cart, remove from cart).
- **orderApi.js:**  
  Deals with order processing and retrieval.
- **paymentApi.js:**  
  Creates payment intents for processing payments.
- **productApi.js:**  
  Provides product CRUD operations.
- **userApi.js:**  
  Contains additional user-related operations.

### Authentication & Context

Authentication is managed using an `AuthContext` that holds user information and admin status. The context provider wraps the application to make authentication state available across components. Functions like `handleLogin`, `handleLogout`, and `handleRegister` update this state based on API responses.

### Frontend Components & Routing

The React application uses React Router for navigation. Key routes include:

- **Home Page:** `/`
- **Product Detail:** `/product/:id`
- **Cart:** `/cart`
- **Checkout:** `/checkout`
- **Login:** `/login`
- **Register:** `/register`
- **Admin Panel:** `/admin`
- **Payment Status:** `/success` and `/cancel`
- **Static Pages:** `/contact` and `/about`

The application is composed of various UI components such as `Navbar`, `Hero`, `ProductList`, `Footer`, etc., which together create a rich user interface.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or above recommended)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add:
   
   ```env
   REACT_APP_API_URL=http://your-backend-api-url
   ```

4. **Start the Development Server:**

   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

### Building for Production

To create an optimized production build, run:

```bash
npm run build
```
or
```bash
yarn build
```

## Directory Structure

Below is an example of the project structure:

```
├── public/
├── src/
│   ├── api/
│   │   ├── api.js
│   │   ├── authApi.js
│   │   ├── cartApi.js
│   │   ├── orderApi.js
│   │   ├── paymentApi.js
│   │   ├── productApi.js
│   │   └── userApi.js
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── ProductDetail.js
│   │   ├── Cart.js
│   │   └── ...other components
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── About.js
│   │   ├── Footer.js
│   │   └── ...other pages
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## How It Works

1. **API Communication:**  
   All HTTP requests are handled by the central API module (`api.js`), which uses axios. It sets the base URL, includes a retry mechanism for server errors, and manages error responses. Additional modules (like `authApi.js` or `cartApi.js`) build on this functionality to interact with specific endpoints.

2. **User Authentication:**  
   The `AuthContext` manages the user's authentication state. When a user logs in, the context is updated with the user’s details and admin status. This state is used throughout the app to control access to certain routes and features (such as the admin panel).

3. **Routing & Components:**  
   The application routes are defined in `App.js` using React Router. Each route corresponds to a specific page or component, ensuring a modular and maintainable codebase.

4. **Payment Processing:**  
   The payment flow is initiated via the `paymentApi.js` module, which creates a payment intent. This securely handles the transaction process and integrates with the checkout flow.

## Future Enhancements

- Integration with additional payment gateways.
- Enhanced error handling with user-friendly notifications.
- More advanced admin features for order and customer management.
- Performance optimizations and scalability improvements.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes.
4. Push to the branch.
5. Open a pull request with a detailed description of your changes.

## License

*Include license information here if applicable.*

## Contact

For any questions or inquiries, please contact [kennethmburu21@gmail.com].
