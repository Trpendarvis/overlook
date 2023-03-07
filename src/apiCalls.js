// let apiCalls; //this will let me use this in scripts as a var
// import { Customers } from "./classes/Customers"

// // const customerData = fetch('http://localhost:3001/api/v1/customers/')
// //                         //http://localhost:3001/api/v1/customers/<id> where<id> will be a number of a customer’s id `${customer.id}`
// // .then(response => response.json())
// // .then(data => data)
// // .catch(err => alert(`Server Error: ${err}. Please try again later.`))

// const getAllCustomers = fetch('http://localhost:3001/api/v1/customers')
//       .then(response => {
//         console.log("!!!!",response);
//         return response.json();
//       })
//       .catch(err => {
//         console.log(err);
//         return [];
//       });

// const findCustomerById = fetch(`http://localhost:3001/api/v1/customers/${id}`)
//       .then(response => {
//         console.log(response);
//         return response.json();
//       })
//       .then(customer => {
//         return customer;
//       })
//       .catch(err => {
//         console.log(err);
//         return null;
//       });

// apiCalls = [getAllCustomers, findCustomerById]

// function bookARoom(customer, ) {
//     fetch('URL', {
//         method: 'POST',
//         body: JSON.stringify({ userID: , recipeID: }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(err => alert(`Server Error: ${err}. Please try again later.`))
// }


// class API {
//     constructor(baseUrl) {
//       this.baseUrl = baseUrl;
//     }
  
//     makeRequest(endpoint) {
//       return fetch(`${this.baseUrl}/${endpoint}`)
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`Network response was not ok (${response.status} ${response.statusText})`);
//           }
  
//           return response.json();
//         });
//     }
  
//     getAllCustomers() {
//       return this.makeRequest('customers');
//     }
  
//     getCustomerById(id) {
//       return this.makeRequest(`customers/${id}`);
//     }
  
//     getAllRooms() {
//       return this.makeRequest('rooms');
//     }
  
//     getAllBookings() {
//       return this.makeRequest('bookings');
//     }
  
//     getBookingsForCustomer(customerId) {
//       return this.getAllBookings()
//         .then(bookings => bookings.filter(booking => booking.userID === customerId));
//     }
//   }
  
//   class Customers {
//     constructor(api) {
//       this.api = api;
//     }
  
//     getAllCustomers() {
//       return this.api.makeRequest('customers');
//     }
  
//     getCustomerById(id) {
//       return this.api.makeRequest(`customers/${id}`);
//     }
//   }
  
//   class Rooms {
//     constructor(api) {
//       this.api = api;
//     }
  
//     getAllRooms() {
//       return this.api.makeRequest('rooms');
//     }
//   }
  
//   class Bookings {
//     constructor(api) {
//       this.api = api;
//     }
  
//     getAllBookings() {
//       return this.api.makeRequest('bookings');
//     }
  
//     getBookingsForCustomer(customerId) {
//       return this.api.getBookingsForCustomer(customerId);
//     }
//   }
  
//   module.exports = {
//     API,
//     Customers,
//     Rooms,
//     Bookings
//   };
  

// // export { apiCalls }