// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// import { apiCalls, addNewBooking } from "./apiCalls";
// import Customer from "./class/Customer"
// import Booking from "./class/Booking"
// import Room from "./class/Room"

//I want to be able to keep the right container hidden from view until the user searches I am using CSS visibility: hidden
// document.querySelector('.containerRight').classList.add('hidden');
// document.querySelector('.containerRight').classList.remove('hidden');


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

//this is the datepicker
// $( function() {
//     $( "#datepicker" ).datepicker();
//   } );

// Initialize the datepicker
$('#datepicker').datepicker({
    onSelect: function(dateText, inst) {
      // Get the selected date as a Date object
      var selectedDate = $(this).datepicker('getDate');
      // Get the day of the month from the selected date
      var dayOfMonth = selectedDate.getDate();
      // Get the month from the selected date
      var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var monthName = monthNames[selectedDate.getMonth()];
      // Get the year from the selected date
      var year = selectedDate.getFullYear();
      // Do something with the selected day, month and year, e.g. log them to the console
      console.log('Selected day: ' + dayOfMonth);
      console.log('Selected month: ' + monthName);
      console.log('Selected year: ' + year);
    }
  });
  
  
  
  
