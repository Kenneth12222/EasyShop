# E-Commerce Backend API

A Flask-based backend application that serves as the API for an e-commerce platform. This backend handles user authentication, product management, shopping cart operations, order processing, and payment integration using Stripe.

## Features

- **User Authentication:**  
  - Registration for both customers and administrators.
  - Secure login and logout endpoints.
  
- **Product Management:**  
  - Public endpoints for viewing products.
  - Admin-only endpoints for creating, updating, and deleting products.
  
- **Shopping Cart:**  
  - Endpoints to add, view, update, and remove products from a user's cart.
  
- **Order Processing:**  
  - Checkout endpoint to place orders.
  - Endpoints to retrieve user orders and order details.
  
- **Payment Integration:**  
  - Stripe Payment Intent and Checkout Session endpoints for secure payment processing.
  
- **File Uploads:**  
  - Supports image uploads for products with secure file handling.
  
- **Cross-Origin Requests:**  
  - Configured CORS to enable interactions from your client-side application.

## Prerequisites

- Python 3.7+
- [pip](https://pip.pypa.io/)
- Virtual environment tool (e.g., [venv](https://docs.python.org/3/library/venv.html))

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Kenneth12222/EasyShop.git
   cd EasyShop
   ```

2. **Set Up a Virtual Environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate or . venv/bin/activate    # On Windows, use: venv\Scripts\activate on Linux . venv/bin/activate or source venv/bin/activate
   ```

3. **Install Dependencies:**

   Ensure you have a `requirements.txt` file that includes packages such as Flask, Flask_SQLAlchemy, stripe, python-dotenv, and others.

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables:**

   Create a `.env` file in the root directory of the project with the following (example) content:

   ```dotenv
   FLASK_SECRET_KEY=your_flask_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISH_KEY=your_stripe_publishable_key
   ```

   **Important:** Make sure the `.env` file is added to your `.gitignore` so that it is not pushed to GitHub.

5. **Database Setup:**

   The application uses SQLite. The database file (`database.db`) will be created automatically in the project directory when you run the application for the first time.

## Running the Application

To start the Flask development server, run:

```bash
python app.py
```

The server will run in debug mode at [http://127.0.0.1:5000/](http://127.0.0.1:5000/).

## API Endpoints Overview

### User Authentication

- **Register (User):**  
  `POST /register`  
  _Request JSON:_  
  ```json
  { "username": "example", "email": "user@example.com", "password": "yourpassword" }
  ```

- **Register (Admin):**  
  `POST /register-admin`  
  _Request JSON:_  
  ```json
  { "username": "admin", "email": "admin@example.com", "password": "yourpassword" }
  ```

- **Login:**  
  `POST /login`  
  _Request JSON:_  
  ```json
  { "username": "example", "password": "yourpassword" }
  ```

- **Logout:**  
  `GET /logout` or `POST /logout`

### Product Management

- **Get All Products:**  
  `GET /products`

- **Get a Single Product:**  
  `GET /products/<product_id>`

- **Create Product (Admin only):**  
  `POST /products`  
  _Requires form-data with fields for name, price, description, stock, and an optional image file._

- **Update Product (Admin only):**  
  `PUT /products/<product_id>`

- **Delete Product (Admin only):**  
  `DELETE /products/<product_id>`

### Shopping Cart

- **Get Cart Items:**  
  `GET /cart`

- **Add to Cart:**  
  `POST /cart`  
  _Request JSON:_  
  ```json
  { "product_id": <id>, "quantity": <number> }
  ```

- **Remove from Cart:**  
  `DELETE /cart/<product_id>`

### Orders

- **Checkout (Place Order):**  
  `POST /checkout`

- **Get User Orders:**  
  `GET /orders`

- **Get Specific Order:**  
  `GET /orders/<order_id>`

### Payment Integration

- **Create Payment Intent:**  
  `POST /create-payment-intent`

- **Create Checkout Session:**  
  `POST /create-checkout-session`

## Additional Information

- **File Uploads:**  
  Uploaded product images are stored in an `uploads` directory. Ensure that your application has proper write permissions to create and manage files in this directory.

- **Security:**  
  All sensitive keys (such as the `FLASK_SECRET_KEY` and Stripe keys) are loaded from environment variables. Do not hardcode these values in your source code.

- **CORS:**  
  Cross-origin resource sharing is enabled to allow requests from your client-side application. Adjust the CORS configuration as needed for your deployment environment.

## Contributing

Contributions to this project are welcome. Please open an issue or submit a pull request if you have improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please open an issue on GitHub or contact [kennethmburu21@gmail.com].
