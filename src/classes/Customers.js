import { Bookings } from "./Bookings";

class Customers {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.allBookings = [];
    this.upcomingBookings = [];
    this.pastBookings = [];
  }

  getBookingdata(bookingData) {
    return bookingData.map((currentBooking) => {
      return new Bookings(currentBooking);
    });
  }

  getCustomersBookingInfo(bookingData) {
    this.allBookings = bookingData.filter((currentBooking) => {
      console.log('getCustomersBookingInfo', bookingData);
      return currentBooking.userID === this.id;
    });
  } 

  getPastBookings(bookingData) {
    console.log('getPastBookings', bookingData);
    let bookingIsUpcoming;
    let currentDate = this.getCurrentDate();
    this.pastBookings = bookingData.filter((currentBooking) => {
      let selectedDate = currentBooking.date.split('/');
      selectedDate = Number(selectedDate.join(''));
      if(selectedDate >= currentDate) {
        bookingIsUpcoming = true;
      } else {
        bookingIsUpcoming = false;
      }
      return currentBooking.userID === this.id && !bookingIsUpcoming;
    });
  }

  getUpcomingBookings(bookingData) {
    console.log('getUpcomingBookings', bookingData);
    let bookingIsUpcoming;
    let currentDate = this.getCurrentDate();
    this.upcomingBookings = bookingData.filter((currentBooking) => {
      let selectedDate = currentBooking.date.split('/');
      selectedDate = Number(selectedDate.join(''));
      if(selectedDate >= currentDate) {
        bookingIsUpcoming = true;
      } else {
        bookingIsUpcoming = false;
      }
      return currentBooking.userID === this.id && bookingIsUpcoming;
    });
  }

  findAvailableRooms(date, bookingData, roomData){
    const unavailableRooms = bookingData.filter((currentBooking) => {
      let formatDate = currentBooking.date.split('/');
      formatDate = Number(formatedDate.join(''));
      return formatedDate === date;
    });
    let unavailableRoom = unavailableRooms.map((currentAvailablity) => {
      return currentAvailablity.roomNumber;
    });
    let availableRooms = roomData.reduce((acc, room) => {
      if(!unavailableRoom.includes(room.roomNumber)) {
        acc.push(room);
      }
      return acc;
    }, []);
    return availableRooms;
  }

  filterRoomByRoomType(roomsRoomType, availableRoom) {
    return availableRoom.filter((currentRoom) => {
      return currentRoom.roomType === roomsRoomType;
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
