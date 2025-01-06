# ReactGram

ReactGram is a "clone" of Instagram built using React, Node.js, Express, and MongoDB.

## Features

- User authentication
- Photo uploads
- Photo feed
- Likes and comments
- User profiles
- Follow and unfollow users

## Technology Stack

- **Frontend:** React, CSS, HTML
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Merus23/ReactGram.git
    cd ReactGram
    ```
2. Install the dependencies:
    ```bash
    npm install
    cd backend
    npm install
    ```

### Running the Application

1. Start the MongoDB server.
2. In the backend directory, create a `.env` file and add your MongoDB URI and other environment variables:
    ```
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```
3. Start the backend server:
    ```bash
    cd backend
    npm start
    ```
4. Start the frontend server:
    ```bash
    cd ..
    npm start
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Inspired by Instagram
- Thanks to the contributors of the libraries and tools used in this project

Feel free to customize this draft further to better suit your project's specifics.
