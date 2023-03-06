//NOTE IN THE APIs ALL THIS DATA IS INSIDE AN OBJ:


const customers = [
    {
    "id": 1,
    "name": "Leatha Ullrich"
    },
    {
    "id": 2,
    "name": "Rocio Schuster"
    },
    {
    "id": 3,
    "name": "Kelvin Schiller"
    },
    {
    "id": 4,
    "name": "Kennedi Emard"
    }
];

const rooms = [
    {
    "number": 1,
    "roomType": "residential suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 358.4
    },
    {
    "number": 2,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 477.38
    },
    {
    "number": 3,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 491.14
    },
    {
    "number": 4,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 429.44
    },
    {
    "number": 5,
    "roomType": "single room",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 2,
    "costPerNight": 340.17
    },
    {
    "number": 6,
    "roomType": "junior suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 397.02
    }
];

const bookings = [
    {
    "id": "5fwrgu4i7k55hl6sz",
    "userID": 1,
    "date": "2022/04/22",
    "roomNumber": 15
    },
    {
    "id": "5fwrgu4i7k55hl6t5",
    "userID": 2,
    "date": "2022/01/24",
    "roomNumber": 24
    },
    {
    "id": "5fwrgu4i7k55hl6t6",
    "userID": 3,
    "date": "2022/01/10",
    "roomNumber": 12
    },
    {
    "id": "5fwrgu4i7k55hl6t7",
    "userID": 4,
    "date": "2022/02/16",
    "roomNumber": 7
    },
    {
    "id": "5fwrgu4i7k55hl6t8",
    "userID": 1,
    "date": "2022/02/05",
    "roomNumber": 12
    },
    {
    "id": "5fwrgu4i7k55hl6t9",
    "userID": 3,
    "date": "2023/12/14",
    "roomNumber": 14
    },
    {
    "id": "5fwrgu4i7k55hl6ta",
    "userID": 2,
    "date": "2022/01/11",
    "roomNumber": 9
    },
    {
    "id": "5fwrgu4i7k55hl6tb",
    "userID": 4,
    "date": "2022/02/06",
    "roomNumber": 5
    }
];

export default {customers, rooms, bookings};

