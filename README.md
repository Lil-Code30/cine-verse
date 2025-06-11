# Movie Watchlist Application

This is a simple and intuitive web application built with React and styled with Tailwind CSS, allowing users to search for movies, add them to a personal watchlist, and remove them as desired. The movie data is fetched from The Movie Database (TMDB) API.

## Features

- **Movie Search:** Easily search for movies by title using the integrated TMDB API.
- **Add to Watchlist:** Add any movie from the search results to your personalized watchlist.
- **Remove from Watchlist:** Remove movies from your watchlist with a single click.
- **Responsive Design:** Enjoy a seamless experience across various devices thanks to Tailwind CSS's utility-first approach.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
- **TMDB API:** Provides a vast database of movies, TV shows, and cast/crew information.
- **LocalStorage:** Used to persist the movie watchlist in the browser, ensuring your list is saved between sessions.

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites

- Node.js and npm (or yarn) installed on your machine.

### Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/Lil-Code30/cine-verse.git
   cd cine-verse
   ```

2. **Install dependencies:**

   ```
   npm install
   # or
   yarn install
   ```

### API Key Configuration

To use the TMDB API, you need to obtain an API key and configure it in your environment variables.

1. **Get a TMDB API Key:**

   - Go to [The Movie Database (TMDB) website](https://developer.themoviedb.org/docs/getting-started).
   - Sign up for an account if you don't have one.
   - Navigate to your account settings and find the API section to request an API key.

2. **Create a `.env` file:**

   - In the root directory of your project, create a new file named `.env`.

3. **Add your API key to `.env`:**

   - Open the `.env` file and add the following line, replacing `YOUR_TMDB_API_KEY_HERE` with the actual API key you obtained from TMDB:

   ```
   VITE_API_KEY=YOUR_TMDB_API_KEY_HERE
   ```

   - _Note:_ `VITE_API_KEY` is used because this project likely uses Vite for bundling, which requires environment variables to be prefixed with `VITE_`.

### Running the Application

After configuring your API key, you can run the application:

```
npm run dev
# or
yarn dev
```

This will start the development server, and you can view the application in your browser, typically at `http://localhost:5173/`.

## Project Structure (Example)

```
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── MovieCard.jsx
│   ├── pages/
│   │   ├── Index.jsx
│   │   └── Watchlist.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── styles.css
├── index.html
├── package.json
├── tailwind.config.js
└── README.md
```

## Contributing

Feel free to fork the repository, make improvements, and submit pull requests.
