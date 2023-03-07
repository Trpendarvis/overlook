class Bookings {
  constructor(data) {
    this.id = data.id
    this.userID = data.userID
    this.date = data.date
    this.roomNumber = data.roomNumber
    this.bookingDate = 0
  }

  formateDate() {
    let dateAsNum = this.date.split('/')
    dateAsNum = Number(dateAsNum.join(''))
    this.bookingDate = dateAsNum;
  }
}

export { Bookings }