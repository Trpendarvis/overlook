import { expect } from 'chai';
import { Rooms } from '/Users/trpendarvis/Turing/mod2/overlook/src/classes/Rooms.js';

describe('Rooms', () => {
  let room;

  beforeEach(() => {
    const roomData = {
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
    };
    room = new Rooms(roomData);
  });

  // it('throws an error if data is missing a required property', () => {
  //   delete roomData.number;
  //   expect(() => {
  //     new Rooms(roomData);
  //   }).to.throw('Missing required property: number');
  // });

  // it('throws an error if data contains an invalid property', () => {
  //   roomData.invalidProperty = 'invalid value';
  //   expect(() => {
  //     new Rooms(roomData);
  //   }).to.throw('Invalid property: invalidProperty');
  // });

  it('should have a number property', () => {
    expect(room).to.have.property('number');
    expect(room.number).to.equal(1);
  });

  it('should have a roomType property', () => {
    expect(room).to.have.property('roomType');
    expect(room.roomType).to.equal('residential suite');
  });

  it('should have a bidet property', () => {
    expect(room).to.have.property('bidet');
    expect(room.bidet).to.equal(true);
  });

  it('should have a bedSize property', () => {
    expect(room).to.have.property('bedSize');
    expect(room.bedSize).to.equal('queen');
  });

  it('should have a numBeds property', () => {
    expect(room).to.have.property('numBeds');
    expect(room.numBeds).to.equal(1);
  });

  it('should have a costPerNight property', () => {
    expect(room).to.have.property('costPerNight');
    expect(room.costPerNight).to.equal(358.4);
  });
});
