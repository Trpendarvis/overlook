import './css/styles.css';
import { getAPIData } from "./apiCalls";
import { Customers } from "./classes/Customers"
import { Bookings } from "./classes/Bookings"
import { Rooms } from "./classes/Rooms"
// import { customers, bookings, rooms } from "./data/mockdata"
import MyDatePicker from './classes/MyDatePicker.js';

const bookingButton = document.querySelector("#booking-button");
const tripsButton = document.querySelector("#trips-button");
const searchButton =  document.querySelector("#search-button");
// const bookButton = document.querySelector("#booking-button");
// const radioButtons = document.querySelectorAll('input[type="radio"][name="radio"]');
const currencyDropdown = document.querySelector('#currency-dropdown');
// const residentialBtn = document.getElementById('radio1');
// const singleBtn = document.getElementById('radio2');
// const suiteBtn = document.getElementById('radio3');
// const jrSuiteBtn = document.getElementById('radio4');


let customersAPI
let bookingsAPI
let roomsAPI
// let allBookings
let currentCustomer
let allRooms

const customerId = 43 

//urls for my API data
let customersURL = 'http://localhost:3001/api/v1/customers/'
let customerURLID = `http://localhost:3001/api/v1/customers/${customerId}`;
let bookingsURL = 'http://localhost:3001/api/v1/bookings/'
let roomsURL = 'http://localhost:3001/api/v1/rooms/'
fetchData([customersURL, bookingsURL, roomsURL])

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



currencyDropdown.addEventListener('change', () => {
  const selectedCurrency = currencyDropdown.value;
  const roomsWithConvertedPrices = roomsAPI.map(room => {
    let convertedPrice = room.costPerNight;
    switch (selectedCurrency) {
      case 'usd':
        convertedPrice = room.costPerNight;
        break;
      case 'eur':
        convertedPrice = room.costPerNight * 0.83; // convert to euros
        break;
      case 'gbp':
        convertedPrice = room.costPerNight * 0.72; // convert to pounds
        break;
      case 'jpy':
        convertedPrice = room.costPerNight * 89.54; // convert to yen
        break;
      case 'aud':
        convertedPrice = room.costPerNight * 1.29; // convert to AUD
        break;
      default:
        convertedPrice = room.costPerNight;
    }
    return {
      ...room,
      costPerNight: convertedPrice
    };
  });
  console.log(roomsWithConvertedPrices);
  // Do something with the converted prices, such as displaying them on the page
});


const radioContainer = document.querySelector('#radio-buttons');
radioContainer.addEventListener('change', (event) => {
  const selectedRoomType = event.target.value;
  filterRoomsByType(selectedRoomType);
});
function filterRoomsByType(type) {
  const filteredRooms = roomsAPI.filter(room => {
    const roomType = room.roomType.toLowerCase();
    return roomType.includes(type.toLowerCase());
  });
  console.log(filteredRooms);
  // Do something with the filtered rooms, such as displaying them on the page
}

  



function fetchData(urls){
    Promise.all([getAPIData(urls[0]),getAPIData(urls[1]),getAPIData(urls[2])])
        .then(data => {
            customersAPI = data[0]
            // console.log("hellow?",customersAPI) //confirmed all data is coming through
            bookingsAPI = data[1].bookings
            // console.log("?123?",bookingsAPI)
            roomsAPI = data[2].rooms

            getNewCustomer(customersAPI)
            getRooms(roomsAPI)
            // allBookings = bookingsAPI.map(bookingData => new Bookings(bookingData));
            // Create the MyDatePicker instance after allBookings is defined
            const myDatePicker = new MyDatePicker('#datepicker', bookingsAPI);
        })
        .catch(err => {
            console.error('There was a problem fetching the data:', err);
        });
}


function getNewCustomer(data) {
    currentCustomer = new Customers(data);
    currentCustomer.allBookings = currentCustomer.getBookingdata(bookingsAPI);
    return currentCustomer;
  }

  function getRooms(data){
      allRooms = data.map((currentBooking) => {
          return new Rooms(currentBooking)
        })
        console.log("all rooms!?",allRooms);
        return allRooms;
    }
    // function getNewCustomer(data){
    //     currentCustomer = new Customers(data)
    //     allBookings = currentCustomer.getBookingdata(bookingsAPI)
    //     return currentCustomer
    // }
    

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
