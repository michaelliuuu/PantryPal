import { GoogleGenerativeAI } from "@google/generative-ai";

// Global variables
const submitB = document.getElementById("submitButton");
const returnB = document.getElementById("returnButton");
const copyB = document.getElementById("copyButton");
const shuffleB = document.getElementById("shuffleButton");
const frontPage = document.getElementById("frontPage");
const recipePage = document.getElementById("recipePage");
const text = document.getElementsByName("ingredientTB").values;
const content = document.getElementById("content");

// AI global variables
const API_KEY = "APIKEY";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
const prompt1 = "Write an indepth recipe with the given ingredients (it assumes you have basic seasoning), without adding ingredients that you don't have: ";
const prompt2 = "With this given list of ingredients, create a new indepth recipe that is different from the previous one?";

// Generates a recipe based off text in textbox
async function generateRecipe(prompt) {
    content.innerText = "Loading...";

    let userPrompt = prompt + text;
    let result = await model.generateContent(prompt);
    let response = await result.response;
    let aiResponse = response.text();

    // console.log(aiResponse);
    content.innerText = aiResponse;
}

// Copies text and shows popup
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

    generateRecipe(prompt1);
});

// Goes back to front page so user can change ingredients
returnB.addEventListener("click", function(event) {
    event.preventDefault();
    if (frontPage.style.display === "none") {
        frontPage.style.display = "block";
    }
    recipePage.style.display = "none";
});

// Gives a new recipe based on the ingredients given
shuffleB.addEventListener("click", function(event) {
    generateRecipe(prompt2);
});

// Button that copies recipe
copyB.addEventListener("click", function(event) {
    copyText();
});


