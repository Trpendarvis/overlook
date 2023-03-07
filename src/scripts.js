import './css/styles.css';
// import { apiCalls } from "./apiCalls";
import { Customers } from "./classes/Customers"
import { Bookings } from "./classes/Bookings"
import { Rooms } from "./classes/Rooms"
// import { customers, bookings, rooms } from "./data/mockdata"
import MyDatePicker from './classes/MyDatePicker.js';

const bookingButton = document.querySelector("#booking-button");
const tripsButton = document.querySelector("#trips-button");
const currencyPicker = document.querySelector("#currency-dropdown");
const calendar = document.querySelector("#datepicker");
const roomTypeButton = document.querySelector("#radio-buttons");
const searchButton =  document.querySelector("#search-button");
// const bookButton = document.querySelector("#booking-button");


document.addEventListener('DOMContentLoaded', function() {
    // show the default containers
    document.getElementById('past-booking-container').classList.remove('hidden');
    document.getElementById('upcoming-booking-container').classList.remove('hidden');
  
    // set up event listeners for the buttons
    bookingButton.addEventListener('click', function() {
        console.log("YAY I GOT PRESSED",bookingButton)
      // hide the default containers
      document.getElementById('past-booking-container').classList.add('hidden');
      document.getElementById('upcoming-booking-container').classList.add('hidden');
      // show the booking-related containers
      document.getElementById('datepicker-container').classList.remove('hidden');
      searchButton.classList.remove('hidden');
      document.getElementById('room-detail-container').classList.remove('hidden');
    });
  
    tripsButton.addEventListener('click', function() {
      // hide the booking-related containers
      document.getElementById('datepicker-container').classList.add('hidden');
      searchButton.classList.add('hidden');
      document.getElementById('room-detail-container').classList.add('hidden');
      // show the default containers
      document.getElementById('past-booking-container').classList.remove('hidden');
      document.getElementById('upcoming-booking-container').classList.remove('hidden');
    });
  
    searchButton.addEventListener('click', function() {
      // hide the search-related containers
      document.getElementById('datepicker-container').classList.add('hidden');
      document.getElementById('room-detail-container').classList.add('hidden');
      searchButton.classList.add('hidden');
      // show the booking-related containers
      document.getElementById('past-booking-container').classList.remove('hidden');
      document.getElementById('upcoming-booking-container').classList.remove('hidden');
    });
  });
  
  
const myDatePicker = new MyDatePicker('#datepicker');

// //PROMISES TO HANDLE AND USE API

const customerId = 50;

const customers = new Customers();
const bookings = new Bookings();
const rooms = new Rooms();

Promise.all([
  customers.getAllCustomers(),
  customers.findById(customerId),
  bookings.bookingsForCustomer(customerId),
  rooms.getRooms(),
]).then(([allCustomers, customerById, bookingsForCustomer, allRooms]) => {
//   console.log('All Customers:', allCustomers);
//   console.log('Customer by ID:', customerById);
//   console.log('Bookings for Customer:', bookingsForCustomer);
//   console.log('All Rooms:', allRooms);
}).catch(error => {
  console.error('There was a problem fetching the data:', error);
});



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


// // Get the customer's ID (in this case, we assume it is 1)
// const customerId = 1;
// console.log(`Customer ID: ${customerId}`);
// // Step 2: Get the bookings associated with the customer
// const customerBookings = bookings.filter((booking) => booking.userID === customerId);
// console.log(`Customer Bookings: ${JSON.stringify(customerBookings)}`);
// // Step 3: Get the rooms associated with the customer's bookings
// const customerRooms = customerBookings.map((booking) => {
//   const room = rooms.find((room) => room.number === booking.roomNumber);
//   return room?.costPerNight ? room : null;
// }).filter(Boolean);
// console.log(`Rooms associated with customer bookings: ${JSON.stringify(customerRooms)}`);
// // Step 4: Calculate the total amount spent on rooms
// const totalAmountSpent = customerRooms.reduce((total, room) => total + room.costPerNight, 0);
// console.log(`Total amount spent on rooms: $${totalAmountSpent.toFixed(2)}`);
// // Step 5: Display the dashboard page
// console.log(`Bookings: ${JSON.stringify(customerBookings)}`);
// console.log(`Total amount spent: $${totalAmountSpent.toFixed(2)}`);

// // Step 6: Filter the bookings array by the selected date
// function getBookingsForDate(selectedDate) {
//     return bookings.filter((booking) => {
//       const bookingStart = new Date(booking.date);
//       const bookingEnd = new Date(bookingStart);
//       bookingEnd.setDate(bookingEnd.getDate() + 1);
//       return
//     })
// }
