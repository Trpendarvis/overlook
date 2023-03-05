let apiCalls; //this will let me use this in scripts as a var

const customerData = fetch('http://localhost:3001/api/v1/customers')
                        //http://localhost:3001/api/v1/customers/<id> where<id> will be a number of a customer’s id
.then(response => response.json())
.then(data => data)
.catch(err => alert(`Server Error: ${err}. Please try again later.`))

const roomsData = fetch('http://localhost:3001/api/v1/rooms')
.then(response => response.json())
.then(data => data)

const bookingData = fetch('http://localhost:3001/api/v1/bookings')
.then(response => response.json())
.then(data => data)

apiCalls = [customerData, roomsData, bookingData]


function addNewBooking(booking, user) {
    fetch('http://localhost:3001/api/v1/bookings', {
        method: 'POST',
        body: JSON.stringify({ userID: user.id, date: "2019/09/23", roomNumber: room.id }),
                            //{ "userID": 48, "date": "2019/09/23", "roomNumber": 4 }
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => alert(`Server Error: ${err}. Please try again later.`))
}

export { apiCalls, addNewBooking }