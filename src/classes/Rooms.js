class Rooms {
  constructor(data) {
    this.number = data.number;
    this.roomType = data.roomType;
    this.bidet = data.bidet;
    this.bedSize = data.bedSize;
    this.numBeds = data.numBeds;
    this.costPerNight = data.costPerNight;
  }
}

export { Rooms };


//   getRooms() {
//     return fetch('http://localhost:3001/api/v1/rooms')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         return data;
//       })
//       .catch(error => {
//         console.error('There was a problem fetching the data:', error);
//       });
//   }
// }

// const room = bookingsForCustomer[0].roomNumber;
// const roomDetails = allRooms.find(roomData => roomData.number === room);

// // Get the cost per night for the room
// const costPerNight = roomDetails.costPerNight;

// // Display the cost per night to the DOM
// const costPerNightElement = document.getElementById('cost-per-night');
// costPerNightElement.textContent = costPerNight;

// {
// const rooms = [
//     {
//     "number": 1,
//     "roomType": "residential suite",
//     "bidet": true,
//     "bedSize": "queen",
//     "numBeds": 1,
//     "costPerNight": 358.4
//     },
// ]
// }
