import { expect } from 'chai';
import { Bookings } from '/Users/trpendarvis/Turing/mod2/overlook/src/classes/Bookings.js';
import { Customers } from '/Users/trpendarvis/Turing/mod2/overlook/src/classes/Customers.js';

describe('Customers', () => {
  let customer, bookings;

  beforeEach(() => {
    const customerData = {
      id: 1,
      name: 'Leatha Ullrich'
    };
    const bookingData = [      {        id: '5fwrgu4i7k55hl6sz',        userID: 1,        date: '2022/04/22',        roomNumber: 5      },      {        id: '5fwrgu4i7k55hl6t5',        userID: 1,        date: '2022/01/24',        roomNumber: 4      }    ];
    customer = new Customers(customerData);
    bookings = customer.getBookingdata(bookingData);
  });

  it('should have an id property', () => {
    expect(customer).to.have.property('id');
    expect(customer.id).to.equal(1);
  });

  it('should have a name property', () => {
    expect(customer).to.have.property('name');
    expect(customer.name).to.equal('Leatha Ullrich');
  });

  it('should have an allBookings property that stores all bookings of a customer', () => {
    customer.getCustomersBookingInfo(bookings);
    expect(customer.allBookings).to.be.an('array').that.has.lengthOf(2);
    expect(customer.allBookings[0]).to.be.an.instanceOf(Bookings);
  });

  it('should have a pastBookings property that stores past bookings of a customer', () => {
    customer.getPastBookings(bookings);
    expect(customer.pastBookings).to.be.an('array').that.has.lengthOf(1);
    expect(customer.pastBookings[0]).to.be.an.instanceOf(Bookings);
    expect(customer.pastBookings[0].date).to.equal('2022/01/24');
  });

  it('should have an upcomingBookings property that stores upcoming bookings of a customer', () => {
    customer.getUpcomingBookings(bookings);
    expect(customer.upcomingBookings).to.be.an('array').that.has.lengthOf(1);
    expect(customer.upcomingBookings[0]).to.be.an.instanceOf(Bookings);
    expect(customer.upcomingBookings[0].date).to.equal('2022/04/22');
  });
})

