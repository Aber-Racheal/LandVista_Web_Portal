LandVista Project


LandVista is a web application designed to simplify the understanding of flood risks. By combining advanced weather data with detailed land maps, LandVista provides insights to help users assess the flood risk of properties, with a specific focus on Nairobi. The application features an interactive map with flood risk indicators and a responsive user interface.



This is the current progress of the web application though not yet deployed. Work in progress!


This is the Landing page
![alt text](<Screenshot from 2024-09-13 07-51-40.png>)


This is the Map page where a user can make a location search and get flood risk information.
![alt text](<Screenshot from 2024-09-13 07-49-58.png>)


Features

Interactive Map: Visualize flood risk on a map using Google Maps with markers and risk circles.
Responsive Design: Adaptable interface for both desktop and mobile views.
Search Functionality: Search for specific wards and update the map view accordingly.
Information Panel: Displays key data about land area, rainfall, and disclaimers.
Action Buttons: Options for feedback, download, and sharing, with adaptive UI for different screen sizes.


Tech Stack


Next.js: Framework for React applications, used for server-side rendering and static site generation.
React: JavaScript library for building user interfaces.
Tailwind CSS: Utility-first CSS framework for rapid UI development.
Google Maps API: Provides map rendering and geolocation services.
Lucide Icons: Provides a set of icons for various actions and features.


Getting Started


To run this project locally, follow these steps:

Prerequisites


Node.js (version 14 or later)
Yarn or npm
Setup
Clone the repository:


git clone https://github.com/Aber-Racheal/LandVista_Web_Portal.git
cd LandVista_Web_Portal
Install dependencies:


yarn install
# or
npm install
Set up environment variables:

Create a .env.local file in the root directory and add your Google Maps API key:

plaintext

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
Run the development server:


yarn dev
# or
npm run dev
The application should now be running at http://localhost:3000.



Available Scripts

yarn dev or npm run dev: Starts the development server.
yarn build or npm run build: Builds the application for production.
yarn start or npm start: Starts the production server after building.
yarn lint or npm run lint: Runs linting checks on the codebase.
Directory Structure
/pages: Contains the Next.js pages (e.g., LandingPage, MapPage).
/components: Contains reusable React components.
/public: Static assets like images.
/styles: Tailwind CSS configurations and other styling.


Contributing


We welcome contributions to improve the LandVista project. Please follow these guidelines:

Fork the repository and create a feature branch.
Make your changes and ensure they are well-tested.
Submit a pull request with a clear description of the changes and the motivation behind them.


Contact


For questions or support, please contact rachealaberr@gmail.com.