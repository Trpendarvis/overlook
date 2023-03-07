import Bookings from "./Bookings";

class Customers {
  constructor(data) {
    this.customerId = data.id; //this is the unique ID for the customer
    this.name = data.name;
    this.allBookings = []; //tracks all bookings from a user
    this.pastBookings = []; //this will be compaired to the current date and if it is in the past it will be pushed into this array
    this.upComingBookings = []; //this will be compaired to the current date and if it is in the future it will be pushed into this array
    this.totalSpent = 0; //this comes from the ROOMs data as costPerNight this needs to be added up to get the total 
  }


getBookingdata(bookingData) {
  console.log("im looking for this",bookingData)
  return bookingData.map((currentBooking) => {
    return new Bookings(currentBooking)
    })
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