// Global variables
const submitB = document.getElementById("submitButton");
const returnB = document.getElementById("returnButton");
const contactLink = document.getElementById("contact");
const homeLink = document.getElementById("home");
const copyB = document.getElementById("copyButton");
const shuffleB = document.getElementById("shuffleButton");
const frontPage = document.getElementById("frontPage");
const recipePage = document.getElementById("recipePage");
const content = document.getElementById("content");
const sun = document.getElementById("sun");
const moon = document.getElementById("moon");
const header = document.getElementById("header");

// AI script prompts
const prompt1 = "Create a basic recipe with the given ingredients (it assumes you have basic seasoning), without adding extra ingredients that are not listed: ";
const prompt2 = ", and here are the food allergies that cannot be part of the recipe, if any are listed: "
const prompt3 = "With this given list of ingredients, create a new basic recipe that is different from the previous one? When giving the recipe, make it concise (without any filler words)";
let userPrompt = "";

const BACKEND_URL = "https://ai-chatbot-tgcl.onrender.com"  // Add your own backend server
const API_URL = `${BACKEND_URL}/chat`;

// Saves ingredient and allergies in text area when moving to recipe.html
if (window.location.pathname.includes("recipe.html")) {
    const savedIngredient = localStorage.getItem("ingredient") || "";
    const savedAllergy = localStorage.getItem("allergy") || "";

    if (savedIngredient || savedAllergy) {
        userPrompt = prompt1 + savedIngredient + prompt2 + savedAllergy;
        generateRecipeWithPrompt(userPrompt);
    }
}

// Generate a bot response from Gemini
async function generateRecipeWithPrompt(userPrompt) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userPrompt })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        content.innerText = data.response;
    } catch (error) {
        console.log(error);
        content.innerText = "Error fetching response. Please try again!";
    }
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


// Generates a recipe from the input in text box
if (submitB) {
    submitB.addEventListener("click", function(event) {
        event.preventDefault();
        const ingredient = document.getElementById("ingredientTB")?.value || "";
        const allergy = document.getElementById("allergyTB")?.value || "";
        localStorage.setItem("ingredient", ingredient);
        localStorage.setItem("allergy", allergy);
        window.location.href = "/pp-frontend/recipe.html";
    });
}

// Gives a new recipe based on the ingredients given
if (shuffleB) {
    shuffleB.addEventListener("click", function(event) {
        event.preventDefault();
        content.innerText = "Generating recipePage...";
        generateRecipeWithPrompt(userPrompt);
    });
}

// Button that copies recipe
if (copyB) {
    copyB.addEventListener("click", function(event) {
        copyText();
    });
}


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
