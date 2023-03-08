class Customers {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.allBookings = [];
    this.upcomingBookings = [];
    this.pastBookings = [];
  }
}

export { Customers };
