# PantryPal
https://github.com/michaelliuuu/PantryPal/assets/102439915/80662412-6b6f-4a8c-92ca-5481610e57d1

## Overview
 PantryPal is a simple web-based application that generates personalized recipes from available ingredients, reducing food waste and streamlining meal planning time.

 ## Features
- Input for ingredients, as well as allergies
- Outputs a recipe that contains the ingredients and accomodates for the allergies given
- Ability to shuffle the inputs to generate new recipes
- Copy the recipe with a click of a button
- Light and dark mode

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js

## Installation
1. Clone the repository
   ```sh
   git clone https://github.com/michaelliuuu/PantryPal.git
   cd ai-chatbot
   ```
2. Get a free API Key at [https://ai.google.dev/gemini-api/docs/api-key](https://ai.google.dev/gemini-api/docs/api-key)
3. Install dependencies
   ```sh
   npm install
   ```
4. Create a .env file in the chatbot-backend folder and add your API key:
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
5. Start the backend server
   ```sh
   cd pp-backend
   node server.js
   ```

## License
This project is licensed under the MIT License.
