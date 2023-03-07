import { Bookings } from "./Bookings"
import { getAPIData } from "../apiCalls";

class MyDatePicker {
  constructor(datepickerSelector, datesToCheck) {
    this.datepickerSelector = datepickerSelector;
    this.selectedDateStr = null;
    this.datesToCheck = datesToCheck || [];
    this.init();
  }

  init() {
    console.log(this.datesToCheck); // check the value of datesToCheck
  
    $(this.datepickerSelector).datepicker({
      defaultDate: new Date('2022/01/01'),
      onSelect: (dateText, inst) => {
        const selectedDate = $(this.datepickerSelector).datepicker('getDate');
        // Check if the selected date is in the array of unavailable dates
        const selectedDateStr = $.datepicker.formatDate('yy/mm/dd', selectedDate);
        console.log(selectedDateStr); // check the value of selectedDateStr
  
        // if (this.datesToCheck.includes(selectedDateStr)) { // check if datesToCheck is defined
        //   this.displayNoRoomsAvailable();
        // } else {
        //   // Set the selected date in the datepicker
        //   const dayOfMonth = selectedDate.getDate();
        //   const monthNumber = selectedDate.getMonth() + 1;
        //   const year = selectedDate.getFullYear();

        //   this.selectedDateStr = `${year}/${monthNumber}/${dayOfMonth}`;
        //   console.log(this.selectedDateStr);
        // }
      }
    });

    // Add event listener for Escape key to skip to the next element
    $(document).on('keydown', this.datepickerSelector, (e) => {
      if (e.keyCode === 27) { // Escape key
        e.preventDefault();
        $('input[type="radio"]').first().focus();
      }
    });

    $(this.datepickerSelector).keydown((e) => {
      const $datepicker = $(this.datepickerSelector);
      if (e.keyCode === 37) { // leftArrow
        console.log("Left arrow key pressed");
        e.preventDefault();
        const prevDate = $datepicker.datepicker('getDate');
        prevDate.setMonth(prevDate.getMonth() - 1);
        $datepicker.datepicker('setDate', prevDate);
      } else if (e.keyCode === 39) { // rightArrow
        console.log("Right arrow key pressed");
        e.preventDefault();
        const nextDate = $datepicker.datepicker('getDate');
        nextDate.setMonth(nextDate.getMonth() + 1);
        $datepicker.datepicker('setDate', nextDate);
      }
    });
  }

  // displayNoRoomsAvailable() {
  //   const datepicker = $(this.datepickerSelector);
  //   const unavailableDay = datepicker.find(`a.ui-state-default[data-date="${this.selectedDateStr.split("/").join("")}"]`);
  //   unavailableDay.addClass("highlight-unavailable-day");

  //   const message = "Sorry, there are no Rooms available this day.";
  //   const messageDiv = $("<div>").text(message).addClass("no-rooms-available");

  //   const maxMessages = 3;
  //   const existingMessages = $(".no-rooms-available").length;
  //   const messageContainer = $(this.datepickerSelector).parent();

  //   if (existingMessages < maxMessages) {
  //     messageContainer.append(messageDiv);
  //     // Set a timer to remove the message after 2 seconds
  //     setTimeout(() => {
  //       messageDiv.remove();
  //       unavailableDay.removeClass("highlight-unavailable-day");
  //     }, 2000);
  //   } else {
  //     messageContainer.find(".no-rooms-available").first().remove();
  //     messageContainer.append(messageDiv);
  //   }
  // }

  // checkSelectedDate(bookings) {
  //   const selectedDate = new Date(this.selectedDateStr);
  
  //   // Check if there is a booking for the selected date
  //   const hasBooking = this.hasBookingForDate(bookings, selectedDate);
  
  //   if (hasBooking) {
  //     console.log(`The date ${this.selectedDateStr} matches a booking.`);
  //     this.displayNoRoomsAvailable();
  //   } else {
  //     console.log(`The date ${this.selectedDateStr} does not match any bookings.`);
  //     $(".no-rooms-available").remove();
  //   }
  // }
  
  // hasBookingForDate(bookings, date) {
  //   const selectedDate = new Date(date);
  //   const bookingKeys = Object.keys(bookings);
  //   for (const key of bookingKeys) {
  //     const booking = bookings[key];
  //     const bookingDate = new Date(booking.date);
  //     if (
  //       bookingDate.getFullYear() === selectedDate.getFullYear() &&
  //       bookingDate.getMonth() === selectedDate.getMonth() &&
  //       bookingDate.getDate() === selectedDate.getDate()
  //     ) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  
}  
     
export default MyDatePicker;







  