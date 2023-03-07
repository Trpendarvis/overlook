class Bookings {
  constructor(data) {
    this.id = data.id;
    this.userID = data.userID;
    this.date = data.date;
    this.roomNumber = data.roomNumber;
    this.bookingDate = 0;
  }

  formateDate() {
    let dateAsNum = this.date.split('/'); //remove the / so its just a string of num
    dateAsNum = Number(dateAsNum.join(''));
    this.bookingDate = dateAsNum;
  }
}

export { Bookings };