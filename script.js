/* =========================================================
   DIETFY — BY COOKFRO
   SCRIPT.JS

   SYSTEM:
   Supabase authentication
   ↓
   User profile
   ↓
   Recipe database
   ↓
   Personal filtering
   ↓
   Random meal generation
========================================================= */


/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL = "https://qrhkyowmkhlnadcdrysa.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_XCAE5surplSbMKzjgQw9OQ_04g1sSjX";

const { createClient } = supabase;

const db = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


/* =========================================================
   PAGE ELEMENTS
========================================================= */

const loginPage = document.getElementById("loginPage");
const otpPage = document.getElementById("otpPage");
const setupPage = document.getElementById("setupPage");
const appPage = document.getElementById("appPage");
const profilePage = document.getElementById("profilePage");


/* =========================================================
   AUTH ELEMENTS
========================================================= */

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("emailInput");
const loginMessage = document.getElementById("loginMessage");

const otpForm = document.getElementById("otpForm");
const otpInput = document.getElementById("otpInput");
const otpMessage = document.getElementById("otpMessage");

const backToLogin = document.getElementById("backToLogin");


/* =========================================================
   SETUP ELEMENTS
========================================================= */

const nameInput = document.getElementById("nameInput");
const dobInput = document.getElementById("dobInput");
const heightInput = document.getElementById("heightInput");
const weightInput = document.getElementById("weightInput");
const avoidInput = document.getElementById("avoidInput");

const finishSetup = document.getElementById("finishSetup");
const setupMessage = document.getElementById("setupMessage");

const setupSteps = document.querySelectorAll(".setup-step");
const nextStepButtons = document.querySelectorAll(".next-step");


/* =========================================================
   HOME ELEMENTS
========================================================= */

const profileButton = document.getElementById("profileButton");
const profileInitial = document.getElementById("profileInitial");

const homeName = document.getElementById("homeName");

const todayButton = document.getElementById("todayButton");
const tomorrowButton = document.getElementById("tomorrowButton");

const selectedDayLabel = document.getElementById("selectedDayLabel");
const selectedDate = document.getElementById("selectedDate");


/* =========================================================
   MEAL ELEMENTS
========================================================= */

const breakfastName =
    document.getElementById("breakfastName");

const breakfastDescription =
    document.getElementById("breakfastDescription");

const lunchName =
    document.getElementById("lunchName");

const lunchDescription =
    document.getElementById("lunchDescription");

const snackName =
    document.getElementById("snackName");

const snackDescription =
    document.getElementById("snackDescription");

const dinnerName =
    document.getElementById("dinnerName");

const dinnerDescription =
    document.getElementById("dinnerDescription");


/* =========================================================
   PROFILE ELEMENTS
========================================================= */

const backHomeButton =
    document.getElementById("backHomeButton");

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const profileDob =
    document.getElementById("profileDob");

const profileHeight =
    document.getElementById("profileHeight");

const profileWeight =
    document.getElementById("profileWeight");

const profileActivity =
    document.getElementById("profileActivity");

const profileDiet =
    document.getElementById("profileDiet");

const profileAvoid =
    document.getElementById("profileAvoid");

const profileGoal =
    document.getElementById("profileGoal");

const editProfileButton =
    document.getElementById("editProfileButton");

const logoutButton =
    document.getElementById("logoutButton");


/* =========================================================
   VARIABLES
========================================================= */

let currentEmail = "";

let currentUser = null;

let currentProfile = null;

let currentDay = "today";


let currentSetupStep = 1;


/* =========================================================
   DIETFY RECIPE DATABASE — 100 RECIPES
========================================================= */

const recipes = [

    /* =======================
       BREAKFAST
    ======================= */

    {
        name: "Masala Dosa",
        description: "Crispy dosa served with a flavorful potato and onion masala.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["rice", "urad dal", "potato", "onion"]
    },

    {
        name: "Idli with Sambar",
        description: "Soft steamed idlis served with warm vegetable sambar.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["rice", "urad dal", "lentils", "vegetables"]
    },

    {
        name: "Vegetable Upma",
        description: "Soft semolina cooked with vegetables and mild spices.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["semolina", "carrot", "peas", "onion"]
    },

    {
        name: "Poha",
        description: "Flattened rice cooked with onions, peas, peanuts and gentle spices.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["poha", "onion", "peas", "peanuts"]
    },

    {
        name: "Aloo Paratha",
        description: "Whole wheat flatbread filled with seasoned mashed potatoes.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["wheat", "potato", "onion", "spices"]
    },

    {
        name: "Vegetable Sandwich",
        description: "Whole wheat bread filled with fresh vegetables and a light spread.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["bread", "tomato", "cucumber", "carrot"]
    },

    {
        name: "Oats Porridge",
        description: "Warm oats cooked with milk and topped with fresh fruit.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["oats", "milk", "banana", "apple"]
    },

    {
        name: "Banana Pancakes",
        description: "Soft pancakes made with banana and oats.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["banana", "oats", "milk", "egg"]
    },

    {
        name: "Vegetable Uttapam",
        description: "Thick dosa topped with colorful vegetables and herbs.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["rice", "urad dal", "tomato", "onion"]
    },

    {
        name: "Appam with Vegetable Stew",
        description: "Soft lacy appam served with creamy coconut vegetable stew.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["rice", "coconut milk", "carrot", "potato"]
    },

    {
        name: "Egg Bhurji Toast",
        description: "Scrambled eggs with onions and tomatoes served with toast.",
        meal: "breakfast",
        diet: "eggetarian",
        ingredients: ["egg", "onion", "tomato", "bread"]
    },

    {
        name: "Vegetable Puttu",
        description: "Steamed rice flour puttu served with lightly seasoned vegetables.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["rice flour", "coconut", "carrot", "beans"]
    },

    {
        name: "Ragi Dosa",
        description: "Crispy dosa prepared with nutritious ragi flour.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["ragi", "rice", "urad dal"]
    },

    {
        name: "Chapati with Vegetable Curry",
        description: "Soft whole wheat chapati served with a mixed vegetable curry.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["wheat", "carrot", "peas", "potato"]
    },

    {
        name: "Fruit Yogurt Bowl",
        description: "Creamy yogurt topped with banana, apple and seasonal fruit.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["yogurt", "banana", "apple", "berries"]
    },

    {
        name: "French Toast",
        description: "Golden bread slices cooked with egg and milk.",
        meal: "breakfast",
        diet: "eggetarian",
        ingredients: ["bread", "egg", "milk"]
    },

    {
        name: "Vegetable Omelette",
        description: "Fluffy omelette packed with onions, tomatoes and peppers.",
        meal: "breakfast",
        diet: "eggetarian",
        ingredients: ["egg", "onion", "tomato", "bell pepper"]
    },

    {
        name: "Methi Paratha",
        description: "Whole wheat flatbread flavored with fresh fenugreek leaves.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["wheat", "methi", "yogurt", "spices"]
    },

    {
        name: "Chana Chaat",
        description: "Boiled chickpeas mixed with fresh vegetables and lemon.",
        meal: "breakfast",
        diet: "vegan",
        ingredients: ["chickpeas", "tomato", "onion", "lemon"]
    },

    {
        name: "Peanut Banana Toast",
        description: "Whole grain toast topped with peanut butter and banana slices.",
        meal: "breakfast",
        diet: "vegetarian",
        ingredients: ["bread", "peanut butter", "banana"]
    },


    /* =======================
       LUNCH
    ======================= */

    {
        name: "Chicken Biryani",
        description: "Fragrant basmati rice cooked with spiced chicken and aromatic herbs.",
        meal: "lunch",
        diet: "non-veg",
        ingredients: ["chicken", "rice", "onion", "spices"]
    },

    {
        name: "Vegetable Biryani",
        description: "Aromatic basmati rice cooked with mixed vegetables and spices.",
        meal: "lunch",
        diet: "vegetarian",
        ingredients: ["rice", "carrot", "peas", "beans"]
    },

    {
        name: "Dal Rice",
        description: "Comforting lentils served with steamed rice and vegetables.",
        meal: "lunch",
        diet: "vegetarian",
        ingredients: ["rice", "dal", "tomato", "vegetables"]
    },

    {
        name: "Chicken Curry with Rice",
        description: "Tender chicken cooked in a flavorful curry served with rice.",
        meal: "lunch",
        diet: "non-veg",
        ingredients: ["chicken", "rice", "onion", "tomato"]
    },

    {
        name: "Rajma Rice",
        description: "Kidney bean curry served with steamed rice.",
        meal: "lunch",
        diet: "vegetarian",
        ingredients: ["rajma", "rice", "tomato", "onion"]
    },

    {
        name: "Chole Rice",
        description: "Spiced chickpea curry paired with fluffy rice.",
        meal: "lunch",
        diet: "vegan",
        ingredients: ["chickpeas", "rice", "tomato", "onion"]
    },

    {
        name: "Vegetable Fried Rice",
        description: "Rice tossed with colorful vegetables and light seasoning.",
        meal: "lunch",
        diet: "vegetarian",
        ingredients: ["rice", "carrot", "peas", "beans"]
    },

    {
        name: "Paneer Rice Bowl",
        description: "Rice served with lightly spiced paneer and fresh vegetables.",
        meal: "lunch",
        diet: "vegetarian",
        ingredients: ["rice", "paneer", "carrot", "peas"]
    },

    {
        name: "Fish Curry Rice",
        description: "Fish cooked in a flavorful curry served with steamed rice.",
        meal: "lunch",
        diet: "non-veg",
        ingredients: ["fish", "rice", "coconut", "tomato"]
    },

    {
        name: "Vegetable Pulao",
        description: "Fragrant rice cooked with mixed vegetables and whole spices.",
        meal: "lunch",
        diet: "vegetarian",
        ingredients: ["rice", "carrot", "peas", "beans"]
    },

    {
        name: "Sambar Rice",
        description: "Steamed rice combined with lentil-based vegetable sambar.",
        meal: "lunch",
        diet: "vegetarian",
        ingredients: ["rice", "lentils", "carrot", "drumstick"]
    },

    {
        name: "Curd Rice",
        description: "Soft rice mixed with cooling yogurt and mild seasoning.",
        meal: "lunch",
        diet: "vegetarian",
        ingredients: ["rice", "yogurt", "ginger", "curry leaves"]
    },

    {
        name: "Palak Paneer with Roti",
        description: "Paneer cooked in a smooth spinach gravy served with roti.",
        meal: "lunch",
        diet: "vegetarian",
        ingredients: ["spinach", "paneer", "wheat", "tomato"]
    },

    {
        name: "Chicken Wrap",
        description: "Soft flatbread filled with seasoned chicken and fresh vegetables.",
        meal: "lunch",
        diet: "non-veg",
        ingredients: ["chicken", "roti", "lettuce", "tomato"]
    },

    {
        name: "Vegetable Korma with Rice",
        description: "Mixed vegetables cooked in a mild creamy coconut gravy.",
        meal: "lunch",
        diet: "vegetarian",
        ingredients: ["carrot", "peas", "coconut milk", "rice"]
    },

    {
        name: "Moong Dal Khichdi",
        description: "Soft rice and moong dal cooked together with gentle spices.",
        meal: "lunch",
        diet: "vegetarian",
        ingredients: ["rice", "moong dal", "carrot", "peas"]
    },

    {
        name: "Egg Rice Bowl",
        description: "Steamed rice topped with seasoned scrambled eggs and vegetables.",
        meal: "lunch",
        diet: "eggetarian",
        ingredients: ["rice", "egg", "carrot", "peas"]
    },

    {
        name: "Chicken Pulao",
        description: "Fragrant rice cooked with tender chicken and mild spices.",
        meal: "lunch",
        diet: "non-veg",
        ingredients: ["chicken", "rice", "onion", "spices"]
    },

    {
        name: "Masala Rajma Roti",
        description: "Spiced kidney beans served with soft whole wheat roti.",
        meal: "lunch",
        diet: "vegetarian",
        ingredients: ["rajma", "wheat", "tomato", "onion"]
    },

    {
        name: "Vegetable Noodles",
        description: "Noodles tossed with crunchy vegetables and mild seasoning.",
        meal: "lunch",
        diet: "vegetarian",
        ingredients: ["noodles", "carrot", "cabbage", "bell pepper"]
    },


    /* =======================
       SNACKS
    ======================= */

    {
        name: "Mango Smoothie",
        description: "A refreshing mango drink blended until smooth.",
        meal: "snack",
        diet: "vegetarian",
        ingredients: ["mango", "milk"]
    },

    {
        name: "Banana Smoothie",
        description: "Creamy banana smoothie blended with milk.",
        meal: "snack",
        diet: "vegetarian",
        ingredients: ["banana", "milk"]
    },

    {
        name: "Fruit Salad",
        description: "Fresh seasonal fruits combined into a colorful snack.",
        meal: "snack",
        diet: "vegan",
        ingredients: ["apple", "banana", "orange", "grapes"]
    },

    {
        name: "Roasted Chickpeas",
        description: "Crunchy roasted chickpeas seasoned with mild spices.",
        meal: "snack",
        diet: "vegan",
        ingredients: ["chickpeas", "spices"]
    },

    {
        name: "Peanut Chaat",
        description: "Boiled peanuts mixed with onion, tomato and lemon.",
        meal: "snack",
        diet: "vegan",
        ingredients: ["peanuts", "onion", "tomato", "lemon"]
    },

    {
        name: "Corn Chaat",
        description: "Sweet corn mixed with vegetables, herbs and lemon.",
        meal: "snack",
        diet: "vegan",
        ingredients: ["corn", "tomato", "onion", "lemon"]
    },

    {
        name: "Yogurt Fruit Bowl",
        description: "Creamy yogurt topped with fresh seasonal fruit.",
        meal: "snack",
        diet: "vegetarian",
        ingredients: ["yogurt", "apple", "banana", "berries"]
    },

    {
        name: "Vegetable Sandwich",
        description: "Fresh vegetables layered between slices of whole grain bread.",
        meal: "snack",
        diet: "vegetarian",
        ingredients: ["bread", "cucumber", "tomato", "carrot"]
    },

    {
        name: "Hummus with Carrot Sticks",
        description: "Creamy chickpea hummus served with crisp carrot sticks.",
        meal: "snack",
        diet: "vegan",
        ingredients: ["chickpeas", "tahini", "carrot", "lemon"]
    },

    {
        name: "Apple Peanut Butter",
        description: "Fresh apple slices served with smooth peanut butter.",
        meal: "snack",
        diet: "vegetarian",
        ingredients: ["apple", "peanut butter"]
    },

    {
        name: "Boiled Corn",
        description: "Warm sweet corn served with a little lemon and seasoning.",
        meal: "snack",
        diet: "vegan",
        ingredients: ["corn", "lemon"]
    },

    {
        name: "Sprout Chaat",
        description: "Fresh sprouts mixed with tomato, onion and lemon.",
        meal: "snack",
        diet: "vegan",
        ingredients: ["sprouts", "tomato", "onion", "lemon"]
    },

    {
        name: "Coconut Banana Shake",
        description: "Banana blended with coconut milk for a creamy drink.",
        meal: "snack",
        diet: "vegan",
        ingredients: ["banana", "coconut milk"]
    },

    {
        name: "Dates and Nuts",
        description: "A simple snack combining dates with mixed nuts.",
        meal: "snack",
        diet: "vegetarian",
        ingredients: ["dates", "almonds", "cashews"]
    },

    {
        name: "Cucumber Yogurt Bowl",
        description: "Cooling yogurt mixed with fresh cucumber and herbs.",
        meal: "snack",
        diet: "vegetarian",
        ingredients: ["cucumber", "yogurt", "mint"]
    },

    {
        name: "Berry Smoothie",
        description: "Mixed berries blended with yogurt for a refreshing smoothie.",
        meal: "snack",
        diet: "vegetarian",
        ingredients: ["berries", "yogurt", "banana"]
    },

    {
        name: "Roasted Makhana",
        description: "Lightly roasted fox nuts seasoned with gentle spices.",
        meal: "snack",
        diet: "vegetarian",
        ingredients: ["makhana", "spices"]
    },

    {
        name: "Chickpea Salad",
        description: "Chickpeas mixed with cucumber, tomato and fresh herbs.",
        meal: "snack",
        diet: "vegan",
        ingredients: ["chickpeas", "cucumber", "tomato"]
    },

    {
        name: "Peanut Banana Toast",
        description: "Toast topped with peanut butter and sliced banana.",
        meal: "snack",
        diet: "vegetarian",
        ingredients: ["bread", "peanut butter", "banana"]
    },

    {
        name: "Fresh Orange Bowl",
        description: "Juicy orange segments served as a refreshing snack.",
        meal: "snack",
        diet: "vegan",
        ingredients: ["orange"]
    },


    /* =======================
       DINNER
    ======================= */

    {
        name: "Vegetable Chapati Roll",
        description: "Whole wheat chapati filled with seasoned vegetables.",
        meal: "dinner",
        diet: "vegetarian",
        ingredients: ["wheat", "carrot", "cabbage", "peas"]
    },

    {
        name: "Chicken Chapati Roll",
        description: "Soft chapati filled with seasoned chicken and vegetables.",
        meal: "dinner",
        diet: "non-veg",
        ingredients: ["chicken", "wheat", "lettuce", "tomato"]
    },

    {
        name: "Paneer Tikka with Roti",
        description: "Grilled paneer tikka served with warm whole wheat roti.",
        meal: "dinner",
        diet: "vegetarian",
        ingredients: ["paneer", "wheat", "bell pepper", "onion"]
    },

    {
        name: "Vegetable Soup",
        description: "Warm soup made with a variety of fresh vegetables.",
        meal: "dinner",
        diet: "vegan",
        ingredients: ["carrot", "beans", "peas", "cabbage"]
    },

    {
        name: "Chicken Soup",
        description: "Comforting chicken soup with vegetables and herbs.",
        meal: "dinner",
        diet: "non-veg",
        ingredients: ["chicken", "carrot", "celery", "onion"]
    },

    {
        name: "Dal Roti",
        description: "Warm lentil curry served with soft whole wheat roti.",
        meal: "dinner",
        diet: "vegetarian",
        ingredients: ["dal", "wheat", "tomato", "onion"]
    },

    {
        name: "Palak Paneer",
        description: "Paneer cooked in a smooth spinach and tomato gravy.",
        meal: "dinner",
        diet: "vegetarian",
        ingredients: ["spinach", "paneer", "tomato"]
    },

    {
        name: "Vegetable Kichdi",
        description: "Soft rice and lentils cooked with mixed vegetables.",
        meal: "dinner",
        diet: "vegetarian",
        ingredients: ["rice", "moong dal", "carrot", "peas"]
    },

    {
        name: "Grilled Fish with Vegetables",
        description: "Seasoned grilled fish served with colorful vegetables.",
        meal: "dinner",
        diet: "non-veg",
        ingredients: ["fish", "carrot", "beans", "lemon"]
    },

    {
        name: "Chicken Vegetable Stir Fry",
        description: "Chicken cooked quickly with fresh vegetables and mild seasoning.",
        meal: "dinner",
        diet: "non-veg",
        ingredients: ["chicken", "broccoli", "carrot", "bell pepper"]
    },

    {
        name: "Vegetable Pasta",
        description: "Pasta tossed with colorful vegetables and a light tomato sauce.",
        meal: "dinner",
        diet: "vegetarian",
        ingredients: ["pasta", "tomato", "bell pepper", "carrot"]
    },

    {
        name: "Tomato Pasta",
        description: "Pasta coated in a simple homemade tomato sauce.",
        meal: "dinner",
        diet: "vegetarian",
        ingredients: ["pasta", "tomato", "garlic", "basil"]
    },

    {
        name: "Paneer Vegetable Bowl",
        description: "Paneer served with colorful vegetables and rice.",
        meal: "dinner",
        diet: "vegetarian",
        ingredients: ["paneer", "rice", "carrot", "peas"]
    },

    {
        name: "Egg Vegetable Curry",
        description: "Boiled eggs cooked in a flavorful tomato and vegetable curry.",
        meal: "dinner",
        diet: "eggetarian",
        ingredients: ["egg", "tomato", "onion", "peas"]
    },

    {
        name: "Chana Masala with Roti",
        description: "Spiced chickpea curry served with warm whole wheat roti.",
        meal: "dinner",
        diet: "vegan",
        ingredients: ["chickpeas", "wheat", "tomato", "onion"]
    },

    {
        name: "Mixed Vegetable Curry",
        description: "A colorful mix of vegetables cooked with aromatic spices.",
        meal: "dinner",
        diet: "vegan",
        ingredients: ["carrot", "peas", "beans", "potato"]
    },

    {
        name: "Tofu Stir Fry",
        description: "Tofu cooked with colorful vegetables and light seasoning.",
        meal: "dinner",
        diet: "vegan",
        ingredients: ["tofu", "broccoli", "carrot", "bell pepper"]
    },

    {
        name: "Vegetable Coconut Curry",
        description: "Mixed vegetables simmered in a fragrant coconut curry.",
        meal: "dinner",
        diet: "vegan",
        ingredients: ["coconut milk", "carrot", "beans", "potato"]
    },

    {
        name: "Chicken Rice Bowl",
        description: "Seasoned chicken served with rice and fresh vegetables.",
        meal: "dinner",
        diet: "non-veg",
        ingredients: ["chicken", "rice", "carrot", "cucumber"]
    },

    {
        name: "Vegetable Quinoa Bowl",
        description: "Quinoa served with colorful vegetables and a light dressing.",
        meal: "dinner",
        diet: "vegan",
        ingredients: ["quinoa", "cucumber", "carrot", "peas"]
    }

];/* =========================================================
   CHECK RECIPE DATABASE
========================================================= */

/*
   recipes.js must create:

   const recipes = [ ... ];

   Example:

   const recipes = [
       {
           name: "Masala Dosa",
           description: "...",
           meal: "breakfast",
           diet: "vegetarian"
       }
   ];
*/

function getRecipeDatabase() {

    if (
        typeof recipes === "undefined" ||
        !Array.isArray(recipes)
    ) {

        console.error(
            "Recipe database not found. Make sure recipes.js is loaded before script.js."
        );

        return [];

    }

    return recipes;

}


/* =========================================================
   HELPER — SHOW PAGE
========================================================= */

function showPage(page) {

    loginPage.classList.add("hidden");
    otpPage.classList.add("hidden");
    setupPage.classList.add("hidden");
    appPage.classList.add("hidden");
    profilePage.classList.add("hidden");

    page.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


/* =========================================================
   HELPER — MESSAGE
========================================================= */

function showMessage(
    element,
    message,
    isError = false
) {

    if (!element) {
        return;
    }

    element.textContent = message;

    if (isError) {

        element.style.color = "#e96b6b";

    } else {

        element.style.color = "#7a8a91";

    }

}


/* =========================================================
   LOGIN
========================================================= */

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const email =
            emailInput.value
                .trim()
                .toLowerCase();


        if (!email) {

            showMessage(
                loginMessage,
                "Please enter your Gmail.",
                true
            );

            return;

        }


        if (!email.endsWith("@gmail.com")) {

            showMessage(
                loginMessage,
                "Please use a Gmail address.",
                true
            );

            return;

        }


        const button =
            loginForm.querySelector("button");

        button.disabled = true;
        button.textContent = "Sending...";


        try {

            const { error } =
                await db.auth.signInWithOtp({

                    email: email,

                    options: {
                        shouldCreateUser: true
                    }

                });


            if (error) {
                throw error;
            }


            currentEmail = email;


            showMessage(
                loginMessage,
                "Code sent. Check your Gmail."
            );


            setTimeout(() => {

                showPage(otpPage);

                otpInput.focus();

            }, 700);


        } catch (error) {

            console.error(error);

            showMessage(
                loginMessage,
                error.message ||
                "Unable to send the code.",
                true
            );

        } finally {

            button.disabled = false;

            button.textContent = "Send code";

        }

    }
);


/* =========================================================
   OTP
========================================================= */

otpForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const code =
            otpInput.value.trim();


        if (!/^\d{6}$/.test(code)) {

            showMessage(
                otpMessage,
                "Enter the 6-digit code.",
                true
            );

            return;

        }


        const button =
            otpForm.querySelector("button");

        button.disabled = true;

        button.textContent = "Checking...";


        try {

            const { data, error } =
                await db.auth.verifyOtp({

                    email: currentEmail,

                    token: code,

                    type: "email"

                });


            if (error) {
                throw error;
            }


            currentUser = data.user;


            showMessage(
                otpMessage,
                "Verified."
            );


            await loadUserProfile();


        } catch (error) {

            console.error(error);

            showMessage(
                otpMessage,
                error.message ||
                "Invalid code.",
                true
            );

        } finally {

            button.disabled = false;

            button.textContent = "Verify code";

        }

    }
);


/* =========================================================
   BACK TO LOGIN
========================================================= */

backToLogin.addEventListener(
    "click",
    function () {

        otpInput.value = "";

        showMessage(
            otpMessage,
            ""
        );

        showPage(loginPage);

        emailInput.focus();

    }
);


/* =========================================================
   SETUP STEP SYSTEM
========================================================= */

function showSetupStep(stepNumber) {

    currentSetupStep = stepNumber;


    setupSteps.forEach(step => {

        const stepNumberValue =
            Number(step.dataset.step);


        if (
            stepNumberValue === stepNumber
        ) {

            step.classList.remove("hidden");

        } else {

            step.classList.add("hidden");

        }

    });

}


/* =========================================================
   SETUP NEXT BUTTONS
========================================================= */

nextStepButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            if (
                !validateSetupStep(
                    currentSetupStep
                )
            ) {

                return;

            }


            if (
                currentSetupStep < 6
            ) {

                showSetupStep(
                    currentSetupStep + 1
                );

            }

        }
    );

});


/* =========================================================
   VALIDATE SETUP
========================================================= */

function validateSetupStep(step) {

    if (step === 1) {

        if (!nameInput.value.trim()) {

            showMessage(
                setupMessage,
                "Please enter your name.",
                true
            );

            nameInput.focus();

            return false;

        }

    }
if (step === 2) {

    if (!dobInput.value) {

        showMessage(
            setupMessage,
            "Please enter your date of birth.",
            true
        );

        return false;

    }

    const birthDate = new Date(dobInput.value);
    const today = new Date();

    /* Future date */
    if (birthDate > today) {

        showMessage(
            setupMessage,
            "Please enter a valid date of birth.",
            true
        );

        return false;

    }

    /* Calculate age */
    let age =
        today.getFullYear() -
        birthDate.getFullYear();

    const monthDifference =
        today.getMonth() -
        birthDate.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birthDate.getDate()
        )
    ) {
        age--;
    }

    /* Prevent unrealistic ages */
    if (age < 1 || age > 120) {

        showMessage(
            setupMessage,
            "Please enter a valid date of birth.",
            true
        );

        return false;

    }

}
    if (step === 3) {

        const activity =
            document.querySelector(
                'input[name="activity"]:checked'
            );


        if (!activity) {

            showMessage(
                setupMessage,
                "Please select your activity level.",
                true
            );

            return false;

        }

    }


    if (step === 4) {

        const diet =
            document.querySelector(
                'input[name="diet"]:checked'
            );


        if (!diet) {

            showMessage(
                setupMessage,
                "Please select a food preference.",
                true
            );

            return false;

        }

    }


    if (step === 6) {

        const goal =
            document.querySelector(
                'input[name="goal"]:checked'
            );


        if (!goal) {

            showMessage(
                setupMessage,
                "Please select a preference.",
                true
            );

            return false;

        }

    }


    showMessage(
        setupMessage,
        ""
    );

    return true;

}


/* =========================================================
   SAVE PROFILE
========================================================= */

finishSetup.addEventListener(
    "click",
    async function () {

        if (!validateSetupStep(6)) {
            return;
        }


        if (!currentUser) {

            showMessage(
                setupMessage,
                "Your session has expired. Please sign in again.",
                true
            );

            return;

        }


        const activity =
            document.querySelector(
                'input[name="activity"]:checked'
            )?.value || "";


        const diet =
            document.querySelector(
                'input[name="diet"]:checked'
            )?.value || "";


        const goal =
            document.querySelector(
                'input[name="goal"]:checked'
            )?.value || "";


        const profileData = {

            id: currentUser.id,

            name:
                nameInput.value.trim(),

            date_of_birth:
                dobInput.value || null,

            height:
                heightInput.value
                    ? Number(heightInput.value)
                    : null,

            weight:
                weightInput.value
                    ? Number(weightInput.value)
                    : null,

            activity:
                activity,

            diet_preference:
                diet,

            avoid_foods:
                avoidInput.value.trim(),

            goal:
                goal

        };


        finishSetup.disabled = true;

        finishSetup.textContent =
            "Creating...";


        try {

            const { data, error } =
                await db
                    .from("profiles")
                    .upsert(profileData)
                    .select()
                    .single();


            if (error) {
                throw error;
            }


            currentProfile = data;


            showHome();


        } catch (error) {

            console.error(error);

            showMessage(
                setupMessage,
                error.message ||
                "Unable to create your profile.",
                true
            );

        } finally {

            finishSetup.disabled = false;

            finishSetup.textContent =
                "Create my Dietfy";

        }

    }
);


/* =========================================================
   LOAD USER PROFILE
========================================================= */

async function loadUserProfile() {

    if (!currentUser) {
        return;
    }


    try {

        const { data, error } =
            await db
                .from("profiles")
                .select("*")
                .eq("id", currentUser.id)
                .maybeSingle();


        if (error) {
            throw error;
        }


        if (!data) {

            resetSetup();

            showPage(setupPage);

            return;

        }


        currentProfile = data;

        showHome();


    } catch (error) {

        console.error(error);

        showMessage(
            otpMessage,
            "Unable to load your profile.",
            true
        );

    }

}


/* =========================================================
   RESET SETUP
========================================================= */

function resetSetup() {

    currentSetupStep = 1;

    nameInput.value = "";

    dobInput.value = "";

    heightInput.value = "";

    weightInput.value = "";

    avoidInput.value = "";


    document
        .querySelectorAll(
            'input[name="activity"]'
        )
        .forEach(input => {

            input.checked = false;

        });


    document
        .querySelectorAll(
            'input[name="diet"]'
        )
        .forEach(input => {

            input.checked = false;

        });


    document
        .querySelectorAll(
            'input[name="goal"]'
        )
        .forEach(input => {

            input.checked = false;

        });


    showSetupStep(1);

    showMessage(
        setupMessage,
        ""
    );

}


/* =========================================================
   GET USER AGE
========================================================= */

function getUserAge() {

    if (!currentProfile?.date_of_birth) {
        return null;
    }


    const birthDate =
        new Date(
            currentProfile.date_of_birth
        );

    const today =
        new Date();


    let age =
        today.getFullYear() -
        birthDate.getFullYear();


    const monthDifference =
        today.getMonth() -
        birthDate.getMonth();


    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birthDate.getDate()
        )
    ) {

        age--;

    }


    return age;

}


/* =========================================================
   NORMALIZE TEXT
========================================================= */

function normalizeText(value) {

    return String(value || "")
        .toLowerCase()
        .trim();

}


/* =========================================================
   GET AVOIDED FOODS
========================================================= */

function getAvoidedFoods() {

    if (!currentProfile?.avoid_foods) {
        return [];
    }


    return currentProfile.avoid_foods
        .split(",")
        .map(item => normalizeText(item))
        .filter(Boolean);

}


/* =========================================================
   RECIPE MATCH — DIET
========================================================= */

function recipeMatchesDiet(recipe) {

    const userDiet =
        normalizeText(
            currentProfile?.diet_preference
        );


    if (!userDiet) {
        return true;
    }


    const recipeDiet =
        normalizeText(recipe.diet);


    /*
       Flexible matching.

       Your recipe database can use:

       vegetarian
       non-veg
       vegan
       eggetarian
       any
    */


    if (
        recipeDiet === "any" ||
        recipeDiet === ""
    ) {

        return true;

    }


    if (
        userDiet === recipeDiet
    ) {

        return true;

    }


    if (
        userDiet.includes("veg") &&
        !userDiet.includes("non") &&
        !userDiet.includes("egg")
    ) {

        return (
            recipeDiet === "vegetarian" ||
            recipeDiet === "vegan"
        );

    }


    if (
        userDiet.includes("vegan")
    ) {

        return recipeDiet === "vegan";

    }


    return true;

}


/* =========================================================
   RECIPE MATCH — AVOIDED FOODS
========================================================= */

function recipeMatchesAvoidFoods(recipe) {

    const avoidedFoods =
        getAvoidedFoods();


    if (avoidedFoods.length === 0) {
        return true;
    }


    const recipeText =
        normalizeText(
            [
                recipe.name,
                recipe.description,
                recipe.ingredients
            ]
                .flat()
                .join(" ")
        );


    for (
        const avoided of avoidedFoods
    ) {

        if (
            recipeText.includes(avoided)
        ) {

            return false;

        }

    }


    return true;

}


/* =========================================================
   RECIPE MATCH — MEAL TYPE
========================================================= */

function recipeMatchesMealType(
    recipe,
    mealType
) {

    const recipeMeal =
        normalizeText(recipe.meal);


    return (
        recipeMeal === normalizeText(mealType)
    );

}


/* =========================================================
   FILTER RECIPES
========================================================= */

function getSuitableRecipes(mealType) {

    const database =
        getRecipeDatabase();


    if (database.length === 0) {

        return [];

    }


    let suitable =
        database.filter(recipe => {

            return (
                recipeMatchesMealType(
                    recipe,
                    mealType
                ) &&

                recipeMatchesDiet(
                    recipe
                ) &&

                recipeMatchesAvoidFoods(
                    recipe
                )
            );

        });


    /*
       If filtering is too strict,
       use all recipes of that meal type
       rather than showing nothing.
    */

    if (suitable.length === 0) {

        suitable =
            database.filter(recipe => {

                return recipeMatchesMealType(
                    recipe,
                    mealType
                );

            });

    }


    return suitable;

}


/* =========================================================
   RANDOM RECIPE
========================================================= */

function getRandomRecipe(list) {

    if (
        !list ||
        list.length === 0
    ) {

        return null;

    }


    const randomIndex =
        Math.floor(
            Math.random() * list.length
        );


    return list[randomIndex];

}


/* =========================================================
   CREATE RANDOM MEAL PLAN
========================================================= */

function generateMealPlan() {

    const mealTypes = [
        "breakfast",
        "lunch",
        "snack",
        "dinner"
    ];


    const plan = {};


    mealTypes.forEach(
        mealType => {

            const suitableRecipes =
                getSuitableRecipes(
                    mealType
                );


            plan[mealType] =
                getRandomRecipe(
                    suitableRecipes
                );

        }
    );


    return plan;

}


/* =========================================================
   STORE GENERATED PLANS
========================================================= */

let generatedPlans = {

    today: null,

    tomorrow: null

};


/* =========================================================
   CREATE TODAY + TOMORROW
========================================================= */

function generatePlansForUser() {

    generatedPlans.today =
        generateMealPlan();


    generatedPlans.tomorrow =
        generateMealPlan();


    /*
       Make sure tomorrow isn't
       exactly the same as today
       when enough recipes exist.
    */

    if (
        generatedPlans.today &&
        generatedPlans.tomorrow
    ) {

        const todayNames =
            Object.values(
                generatedPlans.today
            )
                .filter(Boolean)
                .map(recipe => recipe.name);


        const tomorrowNames =
            Object.values(
                generatedPlans.tomorrow
            )
                .filter(Boolean)
                .map(recipe => recipe.name);


        /*
           If there are many recipes,
           regenerate tomorrow once
           when it overlaps heavily.
        */

        const overlap =
            tomorrowNames.filter(
                name =>
                    todayNames.includes(name)
            );


        if (
            overlap.length >= 3
        ) {

            generatedPlans.tomorrow =
                generateMealPlan();

        }

    }

}


/* =========================================================
   SHOW HOME
========================================================= */

function showHome() {

    if (!currentProfile) {
        return;
    }


    const name =
        currentProfile.name ||
        "there";


    homeName.textContent =
        name.split(" ")[0] + ".";


    profileInitial.textContent =
        name.charAt(0).toUpperCase();


    /*
       Generate personalized meals
       when the user enters the app.
    */

    generatePlansForUser();


    showPage(appPage);


    currentDay = "today";


    updateDayButtons();

    updateMeals();

}


/* =========================================================
   UPDATE DAY BUTTONS
========================================================= */

function updateDayButtons() {

    if (
        currentDay === "today"
    ) {

        todayButton.classList.add("active");

        tomorrowButton.classList.remove(
            "active"
        );

    } else {

        todayButton.classList.remove(
            "active"
        );

        tomorrowButton.classList.add(
            "active"
        );

    }

}


/* =========================================================
   DATE HELPERS
========================================================= */

function formatDate(date) {

    return date.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* =========================================================
   DISPLAY ONE MEAL
========================================================= */

function displayMeal(
    recipe,
    nameElement,
    descriptionElement
) {

    if (!recipe) {

        nameElement.textContent =
            "No meal available";

        descriptionElement.textContent =
            "Add more recipes to your recipe database.";

        return;

    }


    nameElement.textContent =
        recipe.name || "Unnamed recipe";


    descriptionElement.textContent =
        recipe.description ||
        "A delicious meal selected for you.";

}


/* =========================================================
   UPDATE MEALS
========================================================= */

function updateMeals() {

    const now =
        new Date();


    const displayDate =
        new Date(now);


    if (
        currentDay === "tomorrow"
    ) {

        displayDate.setDate(
            displayDate.getDate() + 1
        );

    }


    selectedDayLabel.textContent =
        currentDay === "today"
            ? "TODAY"
            : "TOMORROW";


    selectedDate.textContent =
        formatDate(
            displayDate
        );


    const dayPlan =
        generatedPlans[currentDay];


    if (!dayPlan) {

        return;

    }


    displayMeal(
        dayPlan.breakfast,
        breakfastName,
        breakfastDescription
    );


    displayMeal(
        dayPlan.lunch,
        lunchName,
        lunchDescription
    );


    displayMeal(
        dayPlan.snack,
        snackName,
        snackDescription
    );


    displayMeal(
        dayPlan.dinner,
        dinnerName,
        dinnerDescription
    );

}


/* =========================================================
   TODAY
========================================================= */

todayButton.addEventListener(
    "click",
    function () {

        currentDay = "today";

        updateDayButtons();

        updateMeals();

    }
);


/* =========================================================
   TOMORROW
========================================================= */

tomorrowButton.addEventListener(
    "click",
    function () {

        currentDay = "tomorrow";

        updateDayButtons();

        updateMeals();

    }
);


/* =========================================================
   OPEN PROFILE
========================================================= */

profileButton.addEventListener(
    "click",
    function () {

        loadProfilePage();

        showPage(profilePage);

    }
);


/* =========================================================
   LOAD PROFILE PAGE
========================================================= */

function loadProfilePage() {

    if (!currentProfile) {
        return;
    }


    profileName.textContent =
        currentProfile.name || "—";


    profileEmail.textContent =
        currentUser?.email || "—";


    profileDob.textContent =
        currentProfile.date_of_birth || "—";


    profileHeight.textContent =
        currentProfile.height
            ? `${currentProfile.height} cm`
            : "—";


    profileWeight.textContent =
        currentProfile.weight
            ? `${currentProfile.weight} kg`
            : "—";


    profileActivity.textContent =
        currentProfile.activity || "—";


    profileDiet.textContent =
        currentProfile.diet_preference || "—";


    profileAvoid.textContent =
        currentProfile.avoid_foods ||
        "None";


    profileGoal.textContent =
        currentProfile.goal || "—";

}


/* =========================================================
   BACK HOME
========================================================= */

backHomeButton.addEventListener(
    "click",
    function () {

        showPage(appPage);

    }
);


/* =========================================================
   EDIT PROFILE
========================================================= */

editProfileButton.addEventListener(
    "click",
    function () {

        if (!currentProfile) {
            return;
        }


        nameInput.value =
            currentProfile.name || "";


        dobInput.value =
            currentProfile.date_of_birth || "";


        heightInput.value =
            currentProfile.height || "";


        weightInput.value =
            currentProfile.weight || "";


        avoidInput.value =
            currentProfile.avoid_foods || "";


        const activityInput =
            document.querySelector(
                `input[name="activity"][value="${currentProfile.activity}"]`
            );


        if (activityInput) {

            activityInput.checked =
                true;

        }


        const dietInput =
            document.querySelector(
                `input[name="diet"][value="${currentProfile.diet_preference}"]`
            );


        if (dietInput) {

            dietInput.checked =
                true;

        }


        const goalInput =
            document.querySelector(
                `input[name="goal"][value="${currentProfile.goal}"]`
            );


        if (goalInput) {

            goalInput.checked =
                true;

        }


        showSetupStep(1);

        showPage(setupPage);

    }
);


/* =========================================================
   LOGOUT
========================================================= */

logoutButton.addEventListener(
    "click",
    async function () {

        const button =
            logoutButton;


        button.disabled = true;

        button.textContent =
            "Signing out...";


        try {

            const { error } =
                await db.auth.signOut();


            if (error) {
                throw error;
            }


            currentUser = null;

            currentProfile = null;

            currentEmail = "";


            generatedPlans = {
                today: null,
                tomorrow: null
            };


            emailInput.value = "";

            otpInput.value = "";


            showPage(loginPage);


        } catch (error) {

            console.error(error);

            alert(
                error.message ||
                "Unable to sign out."
            );

        } finally {

            button.disabled = false;

            button.textContent =
                "Sign out";

        }

    }
);


/* =========================================================
   CHECK EXISTING SESSION
========================================================= */

async function checkSession() {

    try {

        const {
            data: {
                session
            }
        } =
            await db.auth.getSession();


        if (session?.user) {

            currentUser =
                session.user;


            currentEmail =
                session.user.email || "";


            await loadUserProfile();

        } else {

            showPage(loginPage);

        }

    } catch (error) {

        console.error(
            "Session error:",
            error
        );


        showPage(loginPage);

    }

}


/* =========================================================
   AUTH STATE LISTENER
========================================================= */

db.auth.onAuthStateChange(
    async (event, session) => {

        if (session?.user) {

            currentUser =
                session.user;


            currentEmail =
                session.user.email || "";

        }

    }
);


/* =========================================================
   OTP INPUT
========================================================= */

otpInput.addEventListener(
    "input",
    function () {

        this.value =
            this.value
                .replace(/\D/g, "")
                .slice(0, 6);

    }
);


/* =========================================================
   START APP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        checkSession();

    }
);