// import bookings from "./data/mockdata";
// import bookings? since they have user id and times they have rooms

// import { customers } from '../data/mockdata.js';

// class Customers {
//   constructor(customerID) {
//     this.customerId = customerID; //this is the unique ID for the customer
//     this.pastBookings = []; //this will be compaired to the current date and if it is in the past it will be pushed into this array
//     this.upComingBookings = []; //this will be compaired to the current date and if it is in the future it will be pushed into this array
//     this.totalSpent; //this comes from the ROOMs data as costPerNight this needs to be added up to get the total 
//   }
// }

// class Customers {
//     constructor(customer) {
//         this.id = customer.id
//         this.name = customer.name
//     }
// }


class Customers {
  constructor() { //pass in customer?
    // this.id = customer.id
    // this.name = customer.name
  }

  getAllCustomers() {
    return fetch('http://localhost:3001/api/v1/customers')
      .then(response => {
        // console.log("!!!!",response);
        return response.json();
      })
      .catch(err => {
        console.log(err);
        return [];
      });
  }

  findById(id) {
    return fetch(`http://localhost:3001/api/v1/customers/${id}`)
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(customer => {
        return customer;
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  }
}


// const customers = [
//     {
//     "id": 1,
//     "name": "Leatha Ullrich"
//     },
// ]

export { Customers };