# Pokedex App

A simple Pokedex application built with React.js and Tailwindcss.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Pokedex is a React application that allows users to explore information about Pokemon. This app is integrated with Pokemon API to fetch pokemons and their statistics. It includes features such as searching for a specific Pokemon by ID or name, applying type filters, and viewing detailed information about each Pokemon.

## Project Structure

This project follows a standard React.js project structure:

```
Pokedex/
|-- public/
|-- src/
| |-- components/
| | |-- Cards.jsx
| | |-- Pokemon.jsx
| | |-- Pokemons.jsx
| |-- App.js
| |-- context/
| | |-- AppContext.js
| |-- index.js
|-- .gitignore
|-- package.json
|-- README.md
|-- tailwind.config.js
```

- **public:** Contains the public assets, HTML file, and other static files.
- **src:** Contains the source code.
  - **components:** Contains React components.
  - **App.js:** Main application component.
  - **context:** Contains AppContext.js ie. Context provider for managing global state.
  - **index.js:** Entry point of the application.

## Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/HETARTH7/Pokedex.git
   ```

2. Navigate to the project directory:

```
cd Pokedex
```

3. Install dependencies

```
npm install
```

### Usage

1.  Start the development server:

```
npm start
```

The app will be available at http://localhost:3000.

2. Open the app in your web browser.

# Features

```
-Search for Pokemon by ID or name.
-Apply type filters to narrow down the list of Pokemon.
-View detailed information about each Pokemon.
-Responsive design for various screen sizes.
-Toggle light/dark mode
```
