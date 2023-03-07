// import Bookings from "./Bookings";
import { Bookings } from "./Bookings";
import { MyDatePicker } from './MyDatePicker.js';

class Customers {
  constructor(data) {
    this.id = data.id; //this is the unique ID for the customer
    this.name = data.name;
    this.allBookings = []; //tracks all bookings from a user
    this.upcomingBookings = []; //this will be compaired to the current date and if it is in the future it will be pushed into this array
    this.pastBookings = []; //this will be compaired to the current date and if it is in the past it will be pushed into this array
    this.totalSpent = 0; //this comes from the ROOMs data as costPerNight this needs to be added up to get the total 

  }

  getBookingdata(bookingData) {
    console.log("im looking for this its bookings",bookingData)
    return bookingData.map((currentBooking) => {
      return new Bookings(currentBooking)
      })
    }

  getCustomersBookingInfo(bookingData) {
    this.allBookings = bookingData.filter((currentBooking) => {
      return currentBooking.userID === this.id
    })
  } 

  getPastBookings(bookingData) {
    let bookingIsUpcoming
    let currentDate = this.getCurrentDate()
    this.pastBookings = bookingData.filter((currentBooking) => {
      let selectedDate = currentBooking.date.split('/')
      selectedDate = Number(selectedDate.join(''))
      if(selectedDate >= currentDate) {
        bookingIsUpcoming = true
      } else {
        bookingIsUpcoming = false
      }
      return currentBooking.userID === this.id && !bookingIsUpcoming
    })
  }

  getUpcomingBookings(bookingData) {
    let bookingIsUpcoming
    let currentDate = this.getCurrentDate()
    this.upcomingBookings = bookingData.filter((currentBooking) => {
      let selectedDate = currentBooking.date.split('/')
      selectedDate = Number(selectedDate.join(''))
      if(selectedDate >= currentDate) {
        bookingIsUpcoming = true
      } else {
        bookingIsUpcoming = false
      }
      return currentBooking.userID === this.id && !bookingIsUpcoming
    })
  }




  getCurrentDate() {
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
}

export { Customers };

// // const customers = [
// //     {
// //     "id": 1,
// //     "name": "Leatha Ullrich"
// //     },
// // ]