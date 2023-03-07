import { expect } from 'chai';
import { Bookings } from '/Users/trpendarvis/Turing/mod2/overlook/src/classes/Bookings.js';

describe('Bookings', () => {
  let booking;

  beforeEach(() => {
    const bookingData = {
      id: '5fwrgu4i7k55hl6sz',
      userID: 1,
      date: '2022/04/22',
      roomNumber: 5
    };
    booking = new Bookings(bookingData);
  });

  it('should have an id property', () => {
    expect(booking).to.have.property('id');
    expect(booking.id).to.equal('5fwrgu4i7k55hl6sz');
  });

  it('should have a userID property', () => {
    expect(booking).to.have.property('userID');
    expect(booking.userID).to.equal(1);
  });

  it('should have a date property', () => {
    expect(booking).to.have.property('date');
    expect(booking.date).to.equal('2022/04/22');
  });

  it('should have a roomNumber property', () => {
    expect(booking).to.have.property('roomNumber');
    expect(booking.roomNumber).to.equal(5);
  });

  it('should have a bookingDate property', () => {
    expect(booking).to.have.property('bookingDate');
    expect(booking.bookingDate).to.equal(0);
  });

  it('should have a formateDate method that converts the date to a number', () => {
    booking.formateDate();
    expect(booking.bookingDate).to.equal(20220422);
  });
});
