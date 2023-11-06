
# SocialSync - Your Personal Event Calendar
![](./README_P3.jpeg)

Welcome to SocialSync, a full-stack social media application optimized for web view first. SocialSync allows users to create profiles, access multiple types of calendars (public, friends, and personal), and discover events in their area. With SocialSync, you can easily manage and interact with events through a user-friendly interface.

## Features

- **User Profiles:** Create and customize your user profile with personal information and preferences.
- **Calendars:** Access three types of calendars: Public, Friends, and Personal, each with it's own set of events.
- **Event Discovery:** Explore and discover various events in your local area or beyond.
- **Event Management:** Create, edit, and delete events with full CRUD capabilities directly from your calendar. Full CRUD exists on the backend across the event and user schemas.
- **Social Features:** Connect with friends, and populate your calendar with their events for easy event tracking and interaction.

## Technologies

- **MongoDB:** A NoSQL database for storing user data, calendars, and events.
- **Express.js:** A web application framework for building robust APIs.
- **React:** A JavaScript library for building a dynamic and interactive user interface.
- **Node.js:** A server-side runtime environment for executing JavaScript.
- **Web View Optimization:** The application is designed with a web view-first approach for a seamless user experience.

## Installation Guide

1. Download the project from GitHub:
   - Navigate to the project via the URL.
   - In the GitHub code tab, click on the green "Code" button located on the right of the screen.
   - Copy the HTTP or SSH or GitHub CLI URL.
   - In your local terminal, type the following commands:
     git clone {the URL you just copied}
    Example:
    ```
    git clone https://github.com/theL-A-W/Project3.git
    ```
   - Press Enter.
   - Navigate to the appropriate directory:
    ```
    cd Project3/SocialSync
    ```
   - Install dependencies in package.json using the following command:
    ```
    npm install
    ```
    Or, if you encounter errors:
    ```
    sudo npm install
    ```
    (Remember, no quotations!)

2. Run the application in your local server:
    ```
    npm run dev
    ```
    Or, if you encounter errors:
    ```
    sudo npm run dev
    ```

3. Copy the local host URL and paste it in the browser address bar. Example: `http://localhost:5173/`

## Cool Features and Successes

- Full planning, including collaborative wireframes, CHD (Component Hierarchy Diagram), and Trello board.
- Wireframes were used to drive functionality discussions.
- CHD was used to visually facilitate pseudo code and design assumptions.
- Successful implementation of a search bar that displays cocktails in nicely styled cards.
- Use of Trello for collaboration and task assignment.
- useContext used extensively for state management.
- Query-free navigation with useStates/useContext instead of param-based routes.
- onClick anonymous functions to build functionality into button clicks.
- Search results mapping.

## Challenges

- Overcomplicating straightforward tasks.

## What We'd Do Differently Next Time

## Contributors

- Anthony Lynch
- Simeal Woldu
- Lindsay Walker

## Reflections

## Acknowledgments

<!-- - <a href="https://www.thecocktaildb.com/api.php">Cocktails API</a> -->

## Programming Languages/Technologies

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
.JSON