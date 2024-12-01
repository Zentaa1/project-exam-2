# StayNest - Vacation Venue Booking Platform

StayNest is a platform for discovering, booking, and managing vacation venues. Users can explore popular venues, view detailed information, and make bookings. Additionally, they can manage their profile settings and view upcoming bookings.

## Features

- **Popular Venues**: View top-rated venues with essential information like location, price, and amenities.
- **Venue Booking**: Users can create, update, or delete bookings with specific dates and guest counts.
- **User Profile Management**: Update your bio, avatar, and venue manager status.
- **Authentication**: Secure login and token-based session management.
- **Responsive UI**: A clean and intuitive user interface designed for both mobile and desktop devices.

## Technologies Used

- **React**: Frontend UI framework.
- **TypeScript**: For type safety and better development experience.
- **Axios**: For making HTTP requests to the backend API.
- **Tailwind CSS**: For utility-first CSS styling.
- **React Router**: For handling routing and navigation in the app.

## Setup

### Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/staynest.git
   cd staynest

2. **Install the required dependencies**
  npm install
  Or if you're using yarn:
  yarn install

3. **Environment variables**
  Create a .env file in the root directory and add the following variable:
  VITE_API_KEY=<your_api_key>

4. **Running the Project**
  To start the development server, run:
  npm run dev
  Or, if using yarn:
  yarn dev