//import from "./";

import { rooms } from './mockdata.js';

class Room {
  constructor(room) {
    this.number = room.number;
    this.roomType = room.roomType;
    this.bidet = room.bidet;
    this.bedSize = room.bedSize;
    this.numBeds = room.numBeds;
    this.costPerNight = room.costPerNight;
  }

    findByRoomType(roomType) {
    return rooms.filter(room => room.roomType === roomType)
                .map(room => new Room(room));
  }
}

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

export { Room };