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

  // getPastBookings(bookingData) {
  //   let getUpcomingBookings
  //   let currentDate = this.getCurrentDate()
  //   this.pastBookings = bookingData.filter((currentBooking) => {
      
  //   })
  // }
  checkSelectedDate() {
    const bookingAPI = new Bookings({ id: null, userID: null, date: this.selectedDateStr, roomNumber: null });
    
    bookingAPI.getAllBookings().then(bookingData => {
      const datesToCheck = bookingData.bookings.map(booking => {
        const dateParts = booking.date.split('/');
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
      });
  
      const selectedDate = new Date(this.selectedDateStr);
      const matches = datesToCheck.some(date => {
        return date.getFullYear() === selectedDate.getFullYear() &&
               date.getMonth() === selectedDate.getMonth() &&
               date.getDate() === selectedDate.getDate();
      });
  
      if (matches) {
        console.log(`The date ${this.selectedDateStr} matches a date in the array.`);
        this.displayNoRoomsAvailable();
      } else {
        console.log(`The date ${this.selectedDateStr} does not match any date in the array.`);
        $(".no-rooms-available").remove();
      }
    });
  }
  
  findPastBookings(bookingData) {
    let currentDate = this.getCurrentDate();
    
    return bookingData.filter((booking) => {
      let bookingDate = new Date(booking.date);
      return booking.userID === this.currentCustomerId && bookingDate < currentDate;
    });
  }

  findUpcomingBookings(bookingData) {
    let currentDate = this.getCurrentDate();
    
    return bookingData.filter((booking) => {
      let bookingDate = new Date(booking.date);
      console.log("HEY yOu",bookingDate)
      return booking.userID === this.currentCustomerId && bookingDate >= currentDate;
    });
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

//   getAllCustomers() {
//     return fetch('http://localhost:3001/api/v1/customers')
//       .then(response => {
//         // console.log("!!!!",response);
//         return response.json();
//       })
//       .catch(err => {
//         console.log(err);
//         return [];
//       });
//   }

//   findById(id) {
//     return fetch(`http://localhost:3001/api/v1/customers/${id}`)
//       .then(response => {
//         // console.log(response);
//         return response.json();
//       })
//       .then(customer => {
//         return customer;
//       })
//       .catch(err => {
//         console.log(err);
//         return null;
//       });
//   }



// // const customers = [
// //     {
// //     "id": 1,
// //     "name": "Leatha Ullrich"
// //     },
// // ]