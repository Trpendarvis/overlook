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


let customersAPI = [];
let bookingsAPI = [];
let roomsAPI = [];
let allRooms
let customerId = 1
// let currentCustomer = 50 

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

// function showDashboard(customer, bookings) {
//     // Filter bookings to get past and upcoming ones for this customer
//     const pastBookings = bookings.filter(booking => booking.userID === customer.id && booking.bookingDate < customer.getCurrentDate());
//     const upcomingBookings = bookings.filter(booking => booking.userID === customer.id && booking.bookingDate >= customer.getCurrentDate());
  
//     // Calculate total spending by adding up cost per night for all past bookings
//     const totalSpending = pastBookings.reduce((acc, booking) => {
//       const room = rooms.find(room => room.number === booking.roomNumber);
//       return acc + room.costPerNight;
//     }, 0);
  
//     // Display past and upcoming bookings and total spending on dashboard
//     const pastBookingContainer = document.getElementById('past-booking-container');
//     pastBookingContainer.innerHTML = `<h2>Past Bookings</h2>${pastBookings.map(booking => `<div>Room ${booking.roomNumber} on ${booking.date}</div>`).join('')}`;
//     const upcomingBookingContainer = document.getElementById('upcoming-booking-container');
//     upcomingBookingContainer.innerHTML = `<h2>Upcoming Bookings</h2>${upcomingBookings.map(booking => `<div>Room ${booking.roomNumber} on ${booking.date}</div>`).join('')}`;
//     const totalSpendingElement = document.createElement('div');
//     totalSpendingElement.innerHTML = `Total spending: $${totalSpending.toFixed(2)}`;
//     upcomingBookingContainer.appendChild(totalSpendingElement);
//   }


////API STUFF////

let customersURL = 'http://localhost:3001/api/v1/customers/'
let customerURLID = `http://localhost:3001/api/v1/customers/${customerId}`;
let bookingsURL = 'http://localhost:3001/api/v1/bookings/'
let roomsURL = 'http://localhost:3001/api/v1/rooms/'
fetchData([customersURL, bookingsURL, roomsURL])

  function fetchData(urls) {
    Promise.all(urls.map(getAPIData))
      .then(data => {
        const [customersURL, bookingsURL, roomsURL] = data;
        const customersAPI = customersURL.customers;
        const bookingsAPI = bookingsURL.bookings;
        const roomsAPI = roomsURL.rooms;
  
        const currentDate = new Date().toISOString().slice(0, 10);
        const currentCustomer = customersAPI.find(customer => customer.id === customerId);
        const pastBookings = bookingsAPI.filter(booking => booking.userID === customerId && booking.date < currentDate);
        const upcomingBookings = bookingsAPI.filter(booking => booking.userID === customerId && booking.date >= currentDate);
        const conversionRates = {
            usd: 1,
            eur: 0.83,
            gbp: 0.72,
            jpy: 89.54,
            aud: 1.29,
          };
          
        const pastTotalSpending = pastBookings.reduce((total, booking) => {
          const room = roomsAPI.find(room => room.number === booking.roomNumber);
          return total + room.costPerNight;
        }, 0);
  
        const pastBookingContainer = document.getElementById('past-booking-container');
        pastBookingContainer.innerHTML = `<h2>Past Bookings</h2>${pastBookings.map(booking => `<div>Room ${booking.roomNumber} on ${booking.date}</div>`).join('')}`;
  
        const upcomingBookingContainer = document.getElementById('upcoming-booking-container');
        upcomingBookingContainer.innerHTML = `<h2>Upcoming Bookings</h2>${upcomingBookings.map(booking => `<div class="booking" data-room-number="${booking.roomNumber}">Room ${booking.roomNumber} on ${booking.date}</div>`).join('')}`;
  
        const pastTotalSpendingElement = document.createElement('div');
        pastTotalSpendingElement.id = 'past-total-spending';
        pastTotalSpendingElement.innerHTML = `Total spending on past bookings: $${pastTotalSpending.toFixed(2)}`;
        pastBookingContainer.appendChild(pastTotalSpendingElement);
  
        const upcomingTotalSpending = upcomingBookings.reduce((total, booking) => {
          const room = roomsAPI.find(room => room.number === booking.roomNumber);
          return total + room.costPerNight;
        }, 0);
  
        const totalSpending = pastTotalSpending + upcomingTotalSpending;
        const totalSpendingElement = document.createElement('div');
        totalSpendingElement.id = 'total-spending';
        totalSpendingElement.innerHTML = `Total spending: $${totalSpending.toFixed(2)}`;
        upcomingBookingContainer.appendChild(totalSpendingElement);
  
        const currencyDropdown = document.getElementById('currency-dropdown');
        currencyDropdown.addEventListener('change', () => {
          const selectedCurrency = currencyDropdown.value;
  
          // Calculate converted past total spending
          const pastConversionRate = conversionRates[selectedCurrency];
          const convertedPastTotalSpending = (pastTotalSpending * pastConversionRate).toFixed(2);
          pastTotalSpendingElement.innerHTML = `Total spending on past bookings: ${selectedCurrency.toUpperCase()} ${convertedPastTotalSpending}`;
  
        // Calculate converted upcoming total spending
        const upcomingConversionRate = conversionRates[selectedCurrency];
        const convertedUpcomingTotalSpending = (upcomingTotalSpending * upcomingConversionRate).toFixed(2);
        totalSpendingElement.innerHTML = `Total spending: ${selectedCurrency.toUpperCase()} ${convertedUpcomingTotalSpending}`;

        // Calculate converted cost per night for each room
        const roomsWithConvertedPrices = roomsAPI.map(room => {
          const convertedPrice = (room.costPerNight * conversionRates[selectedCurrency]).toFixed(2);
          return {
            ...room,
            costPerNight: convertedPrice,
          };
        });

        console.log('Rooms with converted prices:', roomsWithConvertedPrices);
      });

        // Add click event listener to upcoming bookings container
        const bookingContainer = document.getElementById('upcoming-booking-container');
        let previousBookingElement;

        bookingContainer.addEventListener('click', event => {
        const bookingElement = event.target.closest('.booking');
        
        if (bookingElement && bookingElement !== previousBookingElement) {
            const roomNumber = bookingElement.dataset.roomNumber;
            const room = roomsAPI.find(room => room.number === parseInt(roomNumber));
            
            if (room) {
            // Calculate converted cost per night based on selected currency
            const selectedCurrency = currencyDropdown.value;
            const conversionRate = conversionRates[selectedCurrency];
            const convertedCostPerNight = (room.costPerNight * conversionRate).toFixed(2);

            // Create new container to display room information
            const roomInfoContainer = document.createElement('div');
            roomInfoContainer.classList.add('room-info-container');
            roomInfoContainer.innerHTML = `
                <h2>Room ${room.number}</h2>
                <p>Type: ${room.roomType}</p>
                <p>Number of beds: ${room.numBeds}</p>
                <p>Bed size: ${room.bedSize}</p>
                <p>Cost per night: ${selectedCurrency.toUpperCase()} ${convertedCostPerNight}</p>
                <p>Amenities: ${room.amenities ? room.amenities.join(', ') : 'none'}</p>
            `;

            // Remove previous room information container, if any
            if (previousBookingElement) {
                previousBookingElement.classList.remove('selected');
                const previousRoomInfoContainer = previousBookingElement.querySelector('.room-info-container');
                if (previousRoomInfoContainer) {
                previousRoomInfoContainer.remove();
                }
            }

            // Highlight selected booking element and append room information container
            bookingElement.classList.add('selected');
            bookingElement.appendChild(roomInfoContainer);
            
            // Set previous booking element
            previousBookingElement = bookingElement;
            }
        }
    });
});
}

  
  

// function getRooms(roomsData) {
//   roomsData.forEach(roomData => {
//     const room = new Room(roomData);
//     room.displayRoom();
//   });
// }


////BUTTON STUFF////
   
  
// const radioContainer = document.querySelector('#radio-buttons')
// radioContainer.addEventListener('change', (event) => {
// const selectedRoomType = event.target.value
// filterRoomsByType(selectedRoomType)
//   })
//   function filterRoomsByType(type) {
//     const filteredRooms = roomsAPI.filter(room => {
//       const roomType = room.roomType.toLowerCase()
//       return roomType === type.toLowerCase()
//     })
//     console.log(filteredRooms)
//     // Do something with the filtered rooms, such as displaying them on the page
//   }

//this displays to the DOM the button clicked
// const radioContainer = document.querySelector('#radio-buttons')
// const roomDetailContainer = document.querySelector('#room-detail-container')
// radioContainer.addEventListener('change', (event) => {
//   const selectedRoomType = event.target.value
//   const filteredRooms = filterRoomsByType(selectedRoomType)
//   // display the filtered room type in the room detail container
//   const filteredRoomTypeElement = document.createElement('p')
//   filteredRoomTypeElement.textContent = `Filtered room type: ${selectedRoomType}`
//   roomDetailContainer.appendChild(filteredRoomTypeElement)
//   // show the room detail container
//   roomDetailContainer.classList.remove('hidden')
// })
// function filterRoomsByType(type) {
//   const filteredRooms = roomsAPI.filter(room => {
//     const roomType = room.roomType.toLowerCase()
//     return roomType === type.toLowerCase()
//   })
//   console.log(filteredRooms)
//   return filteredRooms
// }


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
  

// function getNewCustomer(data) {
//     currentCustomer = new Customers(data);
//     currentCustomer.allBookings = currentCustomer.getBookingdata(bookingsAPI);
//     showDashboard(currentCustomer, bookingsAPI);
//     return currentCustomer;
// }

function getRooms(data) {
    allRooms = data.map((currentBooking) => {
    return new Rooms(currentBooking)
    })
    return allRooms;
}


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
function currentDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    return `${year}/${month}/${day}`;
  }

