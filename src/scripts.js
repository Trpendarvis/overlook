import './css/styles.css'
import { getAPIData } from "./apiCalls"
import { Customers } from "./classes/Customers"
import { Bookings } from "./classes/Bookings"
import { Rooms } from "./classes/Rooms"
import MyDatePicker  from './classes/MyDatePicker.js'

const bookingButton = document.querySelector("#booking-button")
const tripsButton = document.querySelector("#trips-button")
const searchButton =  document.querySelector("#search-button")
// const bookButton = document.querySelector("#booking-button")

let availableRooms = null
let bookingData = null
let roomData = null
let customerId = 50
let customerName = ""
let calendar

////DOM STUFF////
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('past-booking-container').classList.remove('hidden')
    document.getElementById('upcoming-booking-container').classList.remove('hidden')

    bookingButton.addEventListener('click', function() {
        document.getElementById('past-booking-container').classList.add('hidden')
        document.getElementById('upcoming-booking-container').classList.add('hidden')
        document.getElementById('datepicker-container').classList.remove('hidden')
        searchButton.classList.remove('hidden')
        document.getElementById('room-detail-container').classList.remove('hidden')
        calendar = new MyDatePicker(document.getElementById('datepicker'))
    })
    
    tripsButton.addEventListener('click', function() {
        document.getElementById('datepicker-container').classList.add('hidden')
        searchButton.classList.add('hidden')
        document.getElementById('room-detail-container').classList.add('hidden')
        document.getElementById('past-booking-container').classList.remove('hidden')
        document.getElementById('upcoming-booking-container').classList.remove('hidden')
    })
    
    searchButton.addEventListener('click', function() {
        // hide the search-related containers
        document.getElementById('datepicker-container').classList.add('hidden')
        document.getElementById('room-detail-container').classList.add('hidden')
        searchButton.classList.add('hidden')
        // show the booking-related containers
        document.getElementById('past-booking-container').classList.remove('hidden')
        document.getElementById('upcoming-booking-container').classList.remove('hidden')
    })
})

document.addEventListener("DOMContentLoaded", function() {
    const images = ['eva-darron-oCdVtGFeDC0-unsplash.jpg', 'eva-darron-oCdVtGFeDC0-unsplash.jpg', 'dino-reichmuth-A5rCN8626Ck-unsplash.jpg', 'ross-parmly-rf6ywHVkrlY-unsplash.png', 'robert-lukeman-zNN6ubHmruI-unsplash.jpg', 'pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg', 'jack-anstey-XVoyX7l9ocY-unsplash.jpg']
    let currentIndex = 4
    function changeImage() {
        currentIndex++
        if(currentIndex >= images.length) {
        currentIndex = 0
        }
        const imgUrl = `url(images/${images[currentIndex]})`
        document.getElementById("background-image").style.backgroundImage = imgUrl
        }
          changeImage()
          setInterval(changeImage, 300000)
})    

////API STUFF////
let customersURL = 'http://localhost:3001/api/v1/customers/'
let customerURLID = `http://localhost:3001/api/v1/customers/${customerId}`
let bookingsURL = 'http://localhost:3001/api/v1/bookings/'
let roomsURL = 'http://localhost:3001/api/v1/rooms/'

fetchData([customersURL, bookingsURL, roomsURL, customerURLID])

  function fetchData(urls) {
    Promise.all(urls.map(getAPIData))
      .then(data => {
        const [customersURL, bookingsURL, roomsURL] = data
        const customersAPI = customersURL.customers
        bookingData = data[1].bookings
        // console.log("1",bookingData)this can be globally used
        const bookingsAPI = bookingsURL.bookings
        // console.log("2",bookingsAPI)this can be globally used
        const roomsAPI = roomsURL.rooms
        roomData = data[2].rooms
        availableRooms = data[2].rooms
        const currentDate = new Date().toISOString().slice(0, 10)
        
        const currentCustomer = customersAPI.find(customer => customer.id === customerId)
        console.log(currentCustomer)

        const pastBookings = bookingsAPI.filter(booking => booking.userID === customerId && booking.date < currentDate)
        const upcomingBookings = bookingsAPI.filter(booking => booking.userID === customerId && booking.date >= currentDate)
        const conversionRates = {
            usd: 1,
            eur: 0.83,
            gbp: 0.72,
            jpy: 89.54,
            aud: 1.29,
        }
        
        const pastTotalSpending = pastBookings.reduce((total, booking) => {
          const room = roomsAPI.find(room => room.number === booking.roomNumber)
          return total + room.costPerNight
        }, 0)
  
        const pastBookingContainer = document.getElementById('past-booking-container')
        pastBookingContainer.innerHTML = `<h2>Past Bookings</h2>${pastBookings.map(booking => `<div>Room ${booking.roomNumber} on ${booking.date}</div>`).join('')}`
  
        const upcomingBookingContainer = document.getElementById('upcoming-booking-container')
        upcomingBookingContainer.innerHTML = `<h2>Upcoming Bookings</h2>${upcomingBookings.map(booking => `<div class="booking" data-room-number="${booking.roomNumber}">Room ${booking.roomNumber} on ${booking.date}</div>`).join('')}`
  
        const pastTotalSpendingElement = document.createElement('div')
        pastTotalSpendingElement.id = 'past-total-spending'
        pastTotalSpendingElement.innerHTML = `Total spending on past bookings: $${pastTotalSpending.toFixed(2)}`
        pastBookingContainer.appendChild(pastTotalSpendingElement)
  
        const upcomingTotalSpending = upcomingBookings.reduce((total, booking) => {
          const room = roomsAPI.find(room => room.number === booking.roomNumber)
          return total + room.costPerNight
        }, 0)
  
        const totalSpending = pastTotalSpending + upcomingTotalSpending
        const totalSpendingElement = document.createElement('div')
        totalSpendingElement.id = 'total-spending'
        totalSpendingElement.innerHTML = `Total spending: $${totalSpending.toFixed(2)}`
        upcomingBookingContainer.appendChild(totalSpendingElement)
  
        const currencyDropdown = document.getElementById('currency-dropdown')
        currencyDropdown.addEventListener('change', () => {
          const selectedCurrency = currencyDropdown.value
          const pastConversionRate = conversionRates[selectedCurrency]
          const convertedPastTotalSpending = (pastTotalSpending * pastConversionRate).toFixed(2)
          pastTotalSpendingElement.innerHTML = `Total spending on past bookings: ${selectedCurrency.toUpperCase()} ${convertedPastTotalSpending}`
  
        const upcomingConversionRate = conversionRates[selectedCurrency]
        const convertedUpcomingTotalSpending = (upcomingTotalSpending * upcomingConversionRate).toFixed(2)
        totalSpendingElement.innerHTML = `Total spending: ${selectedCurrency.toUpperCase()} ${convertedUpcomingTotalSpending}`

        const roomsWithConvertedPrices = roomsAPI.map(room => {
          const convertedPrice = (room.costPerNight * conversionRates[selectedCurrency]).toFixed(2)
          return {
            ...room,
            costPerNight: convertedPrice,
          }
        })
      })
        const bookingContainer = document.getElementById('upcoming-booking-container')
        let previousBookingElement
        bookingContainer.addEventListener('click', event => {
        const bookingElement = event.target.closest('.booking')
        if (bookingElement && bookingElement !== previousBookingElement) {
            const roomNumber = bookingElement.dataset.roomNumber
            const room = roomsAPI.find(room => room.number === parseInt(roomNumber))
            if (room) {
            const selectedCurrency = currencyDropdown.value
            const conversionRate = conversionRates[selectedCurrency]
            const convertedCostPerNight = (room.costPerNight * conversionRate).toFixed(2)
            const roomInfoContainer = document.createElement('div')
            roomInfoContainer.classList.add('room-info-container')
            roomInfoContainer.innerHTML = 
            `
                <h2>Room ${room.number}</h2>
                <p>Type: ${room.roomType}</p>
                <p>Number of beds: ${room.numBeds}</p>
                <p>Bed size: ${room.bedSize}</p>
                <p>Cost per night: ${selectedCurrency.toUpperCase()} ${convertedCostPerNight}</p>
                <p>Amenities: ${room.amenities ? room.amenities.join(', ') : 'none'}</p>
            `
            if (previousBookingElement) {
                previousBookingElement.classList.remove('selected')
                const previousRoomInfoContainer = previousBookingElement.querySelector('.room-info-container')
                if (previousRoomInfoContainer) {
                previousRoomInfoContainer.remove()
                }
            }
            bookingElement.classList.add('selected')
            bookingElement.appendChild(roomInfoContainer)
            previousBookingElement = bookingElement
            }
        }
    })
})
}

function findAvailableRooms(selectedDateStr, bookingData, roomData) {
    const matchingBookings = bookingData.filter(booking => booking.date === selectedDateStr);
    const bookedRooms = matchingBookings.map(booking => booking.roomNumber);
    const allRooms = roomData.map(room => room.number);
    const availableRooms = allRooms.filter(room => !bookedRooms.includes(room));
    
    return availableRooms;
  }
  
  function updateAvailableRooms(availableRooms) {
    const containerElement = document.getElementById('room-detail-container');
    const listElement = document.createElement('ul');
    availableRooms.forEach(roomNumber => {
      const room = roomData.find(room => room.number === roomNumber);
      const listItemElement = document.createElement('li');
      listItemElement.classList.add('room');
      listItemElement.dataset.roomNumber = room.number;
      listItemElement.textContent = `Room ${room.number} - ${room.roomType} - $${room.costPerNight}/night`;
      listElement.appendChild(listItemElement);
    });
    containerElement.innerHTML = '<h2>Available Rooms:</h2>';
    containerElement.appendChild(listElement);
    
   // this will not work because it doesnt have the same access to data like the minic does the other one lives inside of the fetch call and can use all of the data. This is all set up but doesnt have the right data to display.
    const roomElements = document.querySelectorAll('.room');
    roomElements.forEach(roomElement => {
      roomElement.addEventListener('click', event => {
        const roomNumber = event.target.dataset.roomNumber;
        const room = roomData.find(room => room.number === parseInt(roomNumber));
        if (room) {
          const selectedCurrency = currencyDropdown.value;
          const conversionRate = conversionRates[selectedCurrency];
          const convertedCostPerNight = (room.costPerNight * conversionRate).toFixed(2);
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
          const previousRoomInfoContainer = document.querySelector('.room-info-container');
          if (previousRoomInfoContainer) {
            previousRoomInfoContainer.remove();
          }
          containerElement.appendChild(roomInfoContainer);
        }
      });
    });
  }
  
//   function filterRoomByRoomType(roomsRoomType, availableRoom) {
//     return availableRoom.filter((currentRoom) => {
//     return currentRoom.roomType === roomsRoomType
//     })
//   }
  










  

// function getRooms(roomsData) {
//   roomsData.forEach(roomData => {
//     const room = new Room(roomData)
//     room.displayRoom()
//   })
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

// // this displays to the DOM the button clicked
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



// displayNoRoomsAvailable() {
//     const datepicker = $(this.datepickerSelector);
//     const unavailableDay = datepicker.find(`a.ui-state-default[data-date="${this.selectedDateStr.split("/").join("")}"]`);
//     unavailableDay.addClass("highlight-unavailable-day");
  
//     const message = "Sorry, there are no Rooms available this day.";
//     const messageDiv = $("<div>").text(message).addClass("no-rooms-available");
  
//     const maxMessages = 3;
//     const existingMessages = $(".no-rooms-available").length;
//     const messageContainer = $(this.datepickerSelector).parent();
  
//     if (existingMessages < maxMessages) {
//       messageContainer.append(messageDiv);
//       // Set a timer to remove the message after 2 seconds
//       setTimeout(() => {
//         messageDiv.remove();
//         unavailableDay.removeClass("highlight-unavailable-day");
//       }, 2000);
//     } else {
//       messageContainer.find(".no-rooms-available").first().remove();
//       messageContainer.append(messageDiv);
//     }
//   }


// function displayBookingDetails(room, currency) {
//     const costPerNight = room.costPerNight
//     const convertedPrice = convertCurrency(costPerNight, currency)
//     const priceDisplay = `${currency.toUpperCase()} ${convertedPrice.toFixed(2)}`
    
//     const pastBookingContainer = document.querySelector('#past-booking-container')
//     const upcomingBookingContainer = document.querySelector('#upcoming-booking-container')
    
//     if (room.customerId === 50) {
//       const pastBookingDetails = `
//         <p>Room Details: ${room.roomType} - ${room.bedSize} bed(s)</p>
//         <p>Cost per night: ${priceDisplay}</p>
//       `
//       pastBookingContainer.innerHTML = pastBookingDetails
//     } else if (room.customerId === 50) {
//       const upcomingBookingDetails = `
//         <p>Room Details: ${room.roomType} - ${room.bedSize} bed(s)</p>
//         <p>Cost per night: ${priceDisplay}</p>
//       `
//       upcomingBookingContainer.innerHTML = upcomingBookingDetails
//     }
//   }
  
// function getNewCustomer(data) {
//     currentCustomer = new Customers(data)
//     currentCustomer.allBookings = currentCustomer.getBookingdata(bookingsAPI)
//     showDashboard(currentCustomer, bookingsAPI)
//     return currentCustomer
// }

// function userInformation() {
//     currentCustomer.getPastBookings(allBookings)
//     customerPastBookings = currentCustomer.pastBookings
//     currentCustomer.getUpcomingBookings(allBookings)
//     customerUpcomingBookings = currentCustomer.upcomingBookings
// }

// function formatPostData(id,date,roomnumber) {
//     date = date.toString()
//     date = date.split('')
//     let year = date.slice(0,4)
//     year = year.join(4,6)
//     let month = date.join('')
//     month = month.join('')
//     let day = date.slice(6,8)
//     day = day.join('')
//     date = year + '/' + month + '/' + day
//     postData = 
//     {
//         userID: id,
//         date: date,
//         roomNumber: roomnumber
//     }
// }
// function currentDate() {
//     const today = new Date()
//     const month = today.getMonth() + 1
//     const day = today.getDate()
//     const year = today.getFullYear()
//     return `${year}/${month}/${day}`
//   }

export {bookingData} 
export {roomData} 
export {findAvailableRooms, updateAvailableRooms}
export {availableRooms}