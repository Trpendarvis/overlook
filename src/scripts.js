// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// import { apiCalls, addNewBooking } from "./apiCalls";
// import { Customer } from "./class/Customer"
// import { Booking } from "./class/Booking"
// import { Room } from "./class/Room"
// import MyDatePicker from "./class/MyDatepicker"
import MyDatePicker from './classes/MyDatePicker.js';


//I want to be able to keep the right container hidden from view until the user searches I am using CSS visibility: hidden
// document.querySelector('.containerRight').classList.add('hidden');
// document.querySelector('.containerRight').classList.remove('hidden');

const datePicker = new MyDatePicker('#datepicker');
// const homeButton = document.querySelector("");
// const tripsButton = document.querySelector("");
// const currencyPicker = document.querySelector("");
// const calendar = document.querySelector("");
// const roomTypeButton = document.querySelector("");
// const searchButton =  document.querySelector("");
// const bookButton = document.querySelector("");


//PROMISES TO HANDLE AND USE API
// Promise.all(apiCalls)
// .then(function(values) {
//     const customerData = values[0].users;
//     const bookingData = values[1].ingredients;
//     const roomData = values[2].recipes;
//     user = new User(usersData[0]);
//     const userRecipeRepo = new RecipeRepository(usersData[0].recipesToCook, ingredientsData);
//     user.recipesToCook = userRecipeRepo;
//     mainRepository = new RecipeRepository(recipeData, ingredientsData);
//     displayCards(mainRepository);
//     buttonIndicateCurrentPage();
// });


//function to set a random image as the background from the image array above.
document.addEventListener("DOMContentLoaded", function() {
const images = ['eva-darron-oCdVtGFeDC0-unsplash.jpg', 'eva-darron-oCdVtGFeDC0-unsplash.jpg', 'dino-reichmuth-A5rCN8626Ck-unsplash.jpg', 'ross-parmly-rf6ywHVkrlY-unsplash.png', 'robert-lukeman-zNN6ubHmruI-unsplash.jpg', 'pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg', 'jack-anstey-XVoyX7l9ocY-unsplash.jpg'];
let currentIndex = 4;
function changeImage() {
    currentIndex++;
    if(currentIndex >= images.length) {
    currentIndex = 0;
    }
const imgUrl = `url(images/${images[currentIndex]})`;
document.getElementById("background-image").style.backgroundImage = imgUrl;
}
  changeImage();
  setInterval(changeImage, 300000);
})
