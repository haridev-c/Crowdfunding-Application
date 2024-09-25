# Crowdfunding Application

## Project Overview

This Crowdfunding Application is designed to help users create and manage crowdfunding campaigns. Users can create projects, set funding goals, and track the progress of their campaigns. The application includes both frontend and backend components.

## Features

- User registration and authentication
- Project creation and management
- Funding goal tracking
- User-friendly interface

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Backend Setup

1. Clone the repository:

```sh
git clone https://github.com/haridev-c/Crowdfunding-Application
cd crowdfunding-app/backend
```

2. Install dependencies:

```sh
npm install
```

3. Configure environment variables:
   Create a `.env` file in the `backend` directory and add the following:

```env
CONN_STRING=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

4. Start the backend server:

```sh
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:

```sh
cd ../client
```

2. Install dependencies:

```sh
npm install
```

3. Start the frontend server:

```sh
npm run dev
```

## Running the Application

1. Ensure MongoDB is running.
2. Start the backend server:

```sh
cd backend
npm run dev
```

3. Start the frontend server:

```sh
cd ../frontend
npm run dev
```

The application should now be running, and you can access it at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
