import './css/styles.css';
import { getAPIData } from "./apiCalls";
import { Customers } from "./classes/Customers"
import { Bookings } from "./classes/Bookings"
import { Rooms } from "./classes/Rooms"
import MyDatePicker from './classes/MyDatePicker.js';
// import { customers, bookings, rooms } from "./data/mockdata"

const bookingButton = document.querySelector("#booking-button");
const tripsButton = document.querySelector("#trips-button");
const searchButton =  document.querySelector("#search-button");
// const bookButton = document.querySelector("#booking-button");
const currencyDropdown = document.querySelector('#currency-dropdown');

let customersAPI
let bookingsAPI
let roomsAPI
let currentCustomer
let allRooms
const customerId = 50 

////API STUFF////
let customersURL = 'http://localhost:3001/api/v1/customers/'
let customerURLID = `http://localhost:3001/api/v1/customers/${customerId}`;
let bookingsURL = 'http://localhost:3001/api/v1/bookings/'
let roomsURL = 'http://localhost:3001/api/v1/rooms/'
fetchData([customersURL, bookingsURL, roomsURL])

function fetchData(urls){
    Promise.all([getAPIData(urls[0]),getAPIData(urls[1]),getAPIData(urls[2])])
        .then(data => {
            customersAPI = data[0]
            bookingsAPI = data[1].bookings
            roomsAPI = data[2].rooms

            getNewCustomer(customersAPI)
            getRooms(roomsAPI)
            const myDatePicker = new MyDatePicker('#datepicker', bookingsAPI);
        })
        .catch(err => {
            console.error('There was a problem fetching the data:', err);
        });
}

////BUTTON STUFF////
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
  })
  
const radioContainer = document.querySelector('#radio-buttons')
radioContainer.addEventListener('change', (event) => {
const selectedRoomType = event.target.value
filterRoomsByType(selectedRoomType)
  })
  function filterRoomsByType(type) {
    const filteredRooms = roomsAPI.filter(room => {
      const roomType = room.roomType.toLowerCase()
      return roomType.includes(type.toLowerCase())
    })
    console.log(filteredRooms)
    // Do something with the filtered rooms, such as displaying them on the page
  }
  

////DOM STUFF////
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
});
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
});    

// const roomDetailContainer = document.querySelector('#room-detail-container');
// function filterRoomsByType(type) {
//   const filteredRooms = roomsAPI.filter(room => {
//     const roomType = room.roomType.toLowerCase();
//     return roomType.includes(type.toLowerCase());
//   });
//   // Clear any existing room detail content
//   roomDetailContainer.innerHTML = '';
//   // Loop through filtered rooms and create HTML elements to display each room's details
//   filteredRooms.forEach(room => {
//     const roomDetails = `
//       <h2>Room ${room.number}</h2>
//       <ul>
//         <li>Room Type: ${room.roomType}</li>
//         <li>Bidet: ${room.bidet ? 'Yes' : 'No'}</li>
//         <li>Bed Size: ${room.bedSize}</li>
//         <li>Number of Beds: ${room.numBeds}</li>
//         <li>Cost per Night: ${room.costPerNight}</li>
//       </ul>
//     `;
//     const roomElement = document.createElement('div');
//     roomElement.innerHTML = roomDetails;
//     roomDetailContainer.appendChild(roomElement);
//   });

//   // Display the book button
//   const bookButton = document.querySelector('#book-button');
//   bookButton.style.display = 'block';
// }

// function displayBookingDetails(room, currency) {
//     const costPerNight = room.costPerNight;
//     const convertedPrice = convertCurrency(costPerNight, currency);
//     const priceDisplay = `${currency.toUpperCase()} ${convertedPrice.toFixed(2)}`;
    
//     const pastBookingContainer = document.querySelector('#past-booking-container');
//     const upcomingBookingContainer = document.querySelector('#upcoming-booking-container');
    
//     if (room.customerId === 50) {
//       const pastBookingDetails = `
//         <p>Room Details: ${room.roomType} - ${room.bedSize} bed(s)</p>
//         <p>Cost per night: ${priceDisplay}</p>
//       `;
//       pastBookingContainer.innerHTML = pastBookingDetails;
//     } else if (room.customerId === 50) {
//       const upcomingBookingDetails = `
//         <p>Room Details: ${room.roomType} - ${room.bedSize} bed(s)</p>
//         <p>Cost per night: ${priceDisplay}</p>
//       `;
//       upcomingBookingContainer.innerHTML = upcomingBookingDetails;
//     }
//   }
  

function getNewCustomer(data) {
    currentCustomer = new Customers(data);
    currentCustomer.allBookings = currentCustomer.getBookingdata(bookingsAPI);
    return currentCustomer;
}

function getRooms(data) {
    allRooms = data.map((currentBooking) => {
    return new Rooms(currentBooking)
    })
    return allRooms;
}
    // function getNewCustomer(data){
    //     currentCustomer = new Customers(data)
    //     allBookings = currentCustomer.getBookingdata(bookingsAPI)
    //     return currentCustomer
    // }

// function UpdateDOM() {
    
// }    

function userInformation() {
    currentCustomer.getPastBookings(allBookings)
    customerPastBookings = currentCustomer.pastBookings
    currentCustomer.getUpcomingBookings(allBookings)
    customerUpcomingBookings = currentCustomer.upcomingBookings
}

// function displayTotalCost() {
//     currentCustomer.getCustomersBookingInfo(allBookings)
//     const 
// }

function formatPostData(id,date,roomnumber) {
    date = date.toString()
    date = date.split('')
    let year = date.slice(0,4)
    year = year.join(4,6)
    let month = date.join('')
    month = month.join('')
    let day = date.slice(6,8)
    day = day.join('')
    date = year + '/' + month + '/' + day
    postData = 
    {
        userID: id,
        date: date,
        roomNumber: roomnumber
    }
}

// function updateBookings(newBookings) {
//     allBookings = currentCustomer.getBookingdata(newBookings.bookings) {
//         currentCustomer.getUpcomingBookings(allBookings)
//         customerUpcomingBookings = currentCustomer.upcomingBookings
//         displayUpcomingBookings()
//         displayTotalCost()
//     }
// }
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

function getCurrentDate() {
    let today = new Date();
    let dayOfMonth = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    if (dayOfMonth < 10) {
      dayOfMonth = "0" + dayOfMonth;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return Number(year + month + dayOfMonth);
  }
