# Skin Care Store Project  

## Backend Documentation:
## Postman - https://documenter.getpostman.com/view/28292545/2sA3BuVog9
## Backend Folder Structure:
```plaintext
/backend
│
├── /configs
│   ├── config.js           # Configuration settings
│   ├── contentConfig.js    # Configuration for content
│   └── morganConfig.js     # Configuration for Morgan logging
│
├── /handlers
│   ├── /cart
│   │   ├── add2cart.js             # Handler for adding products to cart
│   │   ├── deleteAllCart.js        # Handler for deleting all cart items
│   │   ├── deleteOneFromCart.js    # Handler for deleting one item from cart
│   │   └── getCartProducts.js      # Handler for getting cart products
│   │
│   ├── /order
│   │   ├── createOrder.js    # Handler for creating orders
│   │   └── getOrders.js      # Handler for getting orders
│   │
│   ├── /product
│   │   ├── createProduct.js   # Handler for creating products
│   │   ├── deleteProduct.js   # Handler for deleting products
│   │   ├── editProduct.js     # Handler for editing products
│   │   ├── getAllProducts.js  # Handler for getting all products
│   │   ├── getProduct.js      # Handler for getting a single product
│   │   └── likeProduct.js     # Handler for liking products
│   │
│   └── /user
│       ├── deleteUser.js     # Handler for deleting users
│       ├── editUser.js       # Handler for editing users
│       ├── getAllUsers.js    # Handler for getting all users
│       ├── getUser.js        # Handler for getting a single user
│       ├── login.js          # Handler for user login
│       └── signup.js         # Handler for user signup
│
├── /initial-data
│   ├── initial-data.js         # Initial data setup
│   ├── initial-dataOrders.js   # Initial data for orders
│   ├── initial-dataProducts.js # Initial data for products
│   └── initial-dataUsers.js    # Initial data for users
│
├── /logs                        # Logs directory
│
├── /middleware
│   ├── guard.js                # Middleware for guarding routes
│   └── logMiddleware.js        # Middleware for logging
│
├── /models
│   ├── /shared
│   │   └── AddToCart.js       # Shared model for cart operations
│   ├── Order.js                # Model for orders
│   ├── Product.js              # Model for products
│   └── User.js                 # Model for users
│
├── /public
│   ├── keyFrames.css           # CSS for keyframe animations
│   └── page404.html            # HTML for 404 page
│
├── /routes
│   ├── cartRoutes.js           # Routes for cart operations
│   ├── ordersRoutes.js         # Routes for order operations
│   ├── productRoutes.js        # Routes for product operations
│   └── userRoutes.js           # Routes for user operations
│
├── /validation
│   ├── productJoi.js           # Joi schema for product validation
│   └── userJoi.js              # Joi schema for user validation
│
├── .env                        # Environment variables
├── index.js                    # Entry point of the application
└── prod.env                    # Production environment variables
```

## Technologies and Libraries:

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express:** A minimal and flexible Node.js web application framework.
- **Mongoose:** An elegant MongoDB object modeling tool designed to work in an asynchronous environment.
- **bcrypt:** A library for hashing passwords.
- **chalk:** A library for styling terminal strings with ANSI escape codes.
- **cors:** A middleware for enabling Cross-Origin Resource Sharing in the Express.js framework.
- **dotenv:** A zero-dependency module that loads environment variables from a .env file.
- **joi:** A powerful schema description language and data validator for JavaScript objects.
- **jsonwebtoken:** A library to generate and verify JSON Web Tokens (JWT).
- **moment:** A library for parsing, validating, manipulating, and formatting dates.
- **morgan:** A HTTP request logger middleware for Node.js.

##
##

## Frontend Documentation 

## Frontend Folder Structure:
```plaintext
/frontend
│
├── /public
│   ├── favicon.ico.png
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
└── /src
    ├── /auth
    │   ├── Account.js
    │   ├── auth.style.js
    │   ├── Login.js
    │   └── Signup.js
    │
    ├── /components
    │   ├── /cart
    │   │   ├── Cart.js
    │   │   ├── Cart.style.js
    │   │   └── CartList.js
    │   │
    │   ├── /footer
    │   │   ├── Footer.css
    │   │   └── Footer.js
    │   │
    │   ├── /loader
    │   │   ├── Loader.css
    │   │   └── Loader.js
    │   │
    │   ├── /navbar
    │   │   ├── Navbar.js
    │   │   ├── Navbar.style.js
    │   │   ├── SecondNavbar.js
    │   │   └── SecondNavbar.style.js
    │   │
    │   ├── /popUpLogin
    │   │   ├── PopUpLogin.css
    │   │   └── PopUpLogin.js
    │   │
    │   ├── /productComponent
    │   │   ├── ProductComponent.js
    │   │   ├── ProductComponent.style.js
    │   │   └── ProductStructureValid.js
    │   │
    │   ├── /searchBar
    │   │   ├── SearchBar.js
    │   │   └── SearchBar.style.js
    │   │
    │   ├── /slider
    │   │   ├── Slider.css
    │   │   └── Slider.js
    │   │
    │   └── /snackbar
    │       ├── Snackbar.css
    │       └── Snackbar.js
    │
    ├── /css
    │   ├── App.css
    │   ├── grid.css
    │   ├── Main.style.js
    │   ├── ResultNotFound.css
    │   └── ScrollBar.css
    │
    ├── /pages
    │   ├── /about
    │   │   ├── About.css
    │   │   ├── About.js
    │   │   └── AboutMediaQ.css
    │   │
    │   ├── /addOrEditProduct
    │   │   ├── AddOrEdit.style.js
    │   │   └── AddOrEditProduct.js
    │   │
    │   ├── /checkout
    │   │   ├── /address
    │   │   │   ├── Address.js
    │   │   │   └── Address.style.js
    │   │   │
    │   │   ├── /orderSummary
    │   │   │   ├── OrderSum.js
    │   │   │   └── OrderSum.style.js
    │   │   │
    │   │   ├── /payment
    │   │   │   └── Payment.js
    │   │   │
    │   │   └── /review
    │   │       ├── Review.js
    │   │       ├── Review.style.js
    │   │       └── Review.styleMediaQ.js
    │   │
    │   ├── CustomerMenagment.css
    │   ├── CustomerMenagment.js
    │   ├── FavProduct.css
    │   ├── FavProduct.js
    │   ├── Home.css
    │   ├── Home.js
    │   ├── Order.js
    │   ├── Order.style.js
    │   ├── Product.css
    │   ├── Product.js
    │   └── ProductMangement.js
    │
    ├── /utils
    │   ├── constants.js
    │   ├── FormValidation.js
    │   ├── ResultNotFound.js
    │   └── utils.js
    │
    ├── App.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    ├── Router.js
    ├── setupTests.js
    └── package.json
```


## Technologies and Libraries:

- **React**: A JavaScript library for building user interfaces.
- **React DOM**: Entry point to the DOM and server renderer for React.
- **React Router DOM**: Routing library for React applications.
- **Material-UI**: A popular React UI framework that implements Google's Material Design.
- **@mui/icons-material**: Material-UI icons for React components.
- **@mui/material**: Material-UI components for React applications.
- **@mui/x-data-grid**: Material-UI data grid component for React.
- **Emotion**: A library for styling React components with CSS-in-JS.
- **@emotion/react**: Styling library for React components.
- **@emotion/styled**: Library for styled components with Emotion.

Security and Authentication:
- **bcrypt**: A library for hashing passwords.
- **jwt-decode**: Library for decoding JSON Web Tokens (JWT).
- **moment**: Library for date and time manipulation.
- **path-to-regexp**: Library for parsing and generating path patterns in JavaScript.

