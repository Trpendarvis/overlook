let customersData = 'http://localhost:3001/api/v1/customers/'
let customerData = `http://localhost:3001/api/v1/customers/${$id}`
let bookingsData = 'http://localhost:3001/api/v1/bookings/'
let roomsData = 'http://localhost:3001/api/v1/rooms/'

const getAPIData = (url) => {
    return fetch(url)
    .then(response => {
        if(!response.ok){
            throw new Error(`Error ${response.status}, please reload and try again`)
        }
        return response.json()
    
    })
    .catch(err => {
        console.log("An error happened", err)
    })
}

export { getAPIData }




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
