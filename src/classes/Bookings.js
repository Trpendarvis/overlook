//import from "./";
//import rooms?
// class Booking {
//     constructor(customer, room) {
//         this.userID = customer.id
//         this.date = selectedDate
//         this.roomNumber = room.number
//     }
// }

class Bookings {
    constructor(booking) {
        this.id = booking.id
        this.userID = booking.userID
        this.date = booking.date
        this.roomNumber = booking.roomNumber
        this.bookingDate = 0
    }

    formateDate(){ //from myDatePicker.js needed here since this is also using a date
      let dateAsNum = this.date.split('/') //remove the / so its just a string of num
      dateAsNum = Number(dateAsNum.join(""))
      this.bookingDate = dateAsNum
    }
}

// import { Customers } from "./Customers"

// class Bookings {
//   constructor() {}

//   getAllBookings() {
//     return fetch('http://localhost:3001/api/v1/bookings')
//       .then(response => {
//         // console.log("!!!!",response);
//         return response.json();
//       })
//       .catch(err => {
//         console.log(err);
//         return [];
//       });
//   }
//   bookingsForCustomer(userId) {
//     const customers = new Customers();
//     customers.getAllCustomers().then(customerAPI => {
//       console.log("API-customers", customerAPI); // Check if you are receiving the correct data from the API
  
//       const customerIds = customerAPI.customers.map(customer => customer.id);
//       console.log("customerIds", customerIds); // Check if the IDs are correct
  
//       this.getAllBookings().then(bookingAPI => {
//         console.log("API-booking", bookingAPI); // Check if you are receiving the correct data from the API
        
//         const userIds = bookingAPI.bookings.map(booking => booking.userID);
//         console.log("userIds", userIds); // Log the user IDs in the bookings data
        
//         const customerBookings = bookingAPI.bookings.filter(booking => customerIds.includes(booking.userID));
//         console.log("customerBookings", customerBookings); // Check if the filter is working
  
//         console.log("userId", userId); // Log the value of the userId parameter
//       });
//     });
//   }
// }

export { Bookings };

// const bookings = [
//     {
//     "id": "5fwrgu4i7k55hl6sz",
//     "userID": 1,
//     "date": "2022/04/22",
//     "roomNumber": 5
//     },
// ]