class Bookings {
  constructor(data) {
    this.id = data.id
    this.userID = data.userID
    this.date = data.date
    this.roomNumber = data.roomNumber
    this.bookingDate = 0
  }
}

export { Bookings }