import { GoogleGenerativeAI } from "@google/generative-ai";

// Global variables
const submitB = document.getElementById("submitButton");
const returnB = document.getElementById("returnButton");
const contactLink = document.getElementById("contact");
const homeLink = document.getElementById("home");
const copyB = document.getElementById("copyButton");
const shuffleB = document.getElementById("shuffleButton");
const frontPage = document.getElementById("frontPage");
const recipePage = document.getElementById("recipePage");
const ingredient = document.getElementsByName("ingredientTB").values;
const allergy = document.getElementsByName("allergyTB").values;
const content = document.getElementById("content");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const header = document.getElementById("header");

// AI global variables
const API_KEY = "APIKEY";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
const prompt1 = "Create a basic recipe with the given ingredients (it assumes you have basic seasoning), without adding extra ingredients that are not listed: ";
const prompt2 = ", and here are the food allergies that cannot be part of the recipe: "
const prompt3 = "With this given list of ingredients, create a new indepth recipe that is different from the previous one?";

// Generates a recipe based off text in textbox
async function generateRecipe(promptOne, promptTwo) {
    content.innerText = "Loading...";

    let userPrompt = promptOne + ingredient + promptTwo + allergy;
    let result = await model.generateContent(prompt);
    let response = await result.response;
    let aiResponse = response.text();

    // console.log(aiResponse);
    content.innerText = aiResponse;
}

// Copies recipe and shows popup
function copyText() {
    navigator.clipboard.writeText(content.innerText).then(() => {
        const popup = document.getElementById("popup");
        // Show the popup
        popup.style.visibility = 'visible';
        popup.style.opacity = 1;

        // Hide the popup after 2 seconds
        setTimeout(() => {
            popup.style.opacity = 0;
            popup.style.visibility = 'hidden';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Goes to recipe page and generates a recipe from the input in text box
submitB.addEventListener("click", function(event) {
    event.preventDefault();
    if (recipePage.style.display === "none") {
        recipePage.style.display = "block";
    }
    frontPage.style.display = "none";
    contactPage.style.display = "none";
    header.style.display = "none";
    // generateRecipe(prompt1);
});

// Goes back to front page so user can change ingredients
returnB.addEventListener("click", function(event) {
    event.preventDefault();
    if (frontPage.style.display === "none") {
        frontPage.style.display = "block";
    }
    recipePage.style.display = "none";
    contactPage.style.display = "none";
    header.style.display = "block";
});

// Gives a new recipe based on the ingredients given
shuffleB.addEventListener("click", function(event) {
    generateRecipe(prompt3);
});

// Button that copies recipe
copyB.addEventListener("click", function(event) {
    copyText();
});

// Goes to contact page
contactLink.addEventListener("click", function(event) {
    event.preventDefault();
    if (contactPage.style.display === "none") {
        contactPage.style.display = "block";
    }
    recipePage.style.display = "none";
    frontPage.style.display = "none";
});

// Goes back to front page
homeLink.addEventListener("click", function(event) {
    event.preventDefault();
    if (frontPage.style.display === "none") {
        frontPage.style.display = "block";
    }
    recipePage.style.display = "none";
    contactPage.style.display = "none";
});

// Light mode
sun.addEventListener("click", function(event) {
    event.preventDefault();
    document.body.classList.remove("dark-mode");
    document.body.classList.toggle("light-mode");
    sun.style.display = "none";
    moon.style.display = "block";
});

// Dark mode
moon.addEventListener("click", function(event) {
    event.preventDefault();
    document.body.classList.remove("light-mode");
    document.body.classList.toggle("dark-mode");
    moon.style.display = "none";
    sun.style.display = "block";
});
