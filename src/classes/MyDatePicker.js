import { Bookings } from "./Bookings"

class MyDatePicker {
  constructor(datepickerSelector, datesToCheck) {
    this.datepickerSelector = datepickerSelector;
    this.prevSelectedDate = null;
    this.selectedDateStr = null;
    this.datesToCheck = datesToCheck || [];
    // this.bookingAPI = bookingsAPI;
    this.init();
  }

  init() {
      $(this.datepickerSelector).datepicker({
        defaultDate: new Date('2022/01/01'),
        onSelect: (dateText, inst) => {
          const selectedDate = $(this.datepickerSelector).datepicker('getDate');
          
          // Check if the selected date is in the array of unavailable dates
          const selectedDateStr = $.datepicker.formatDate('yy/mm/dd', selectedDate);
          if (this.datesToCheck.includes(selectedDateStr)) {
            this.displayNoRoomsAvailable();
          } else {
            // Set the selected date in the datepicker
            const dayOfMonth = selectedDate.getDate();
            const monthNumber = selectedDate.getMonth() + 1;
            const year = selectedDate.getFullYear();
            
            this.selectedDateStr = `${year}/${monthNumber}/${dayOfMonth}`;
            console.log(this.selectedDateStr);
            
            // Call the public method to check if the selected date matches a date from the array
            this.checkSelectedDatePublic();
          }
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
  
  displayNoRoomsAvailable() {
    const datepicker = $(this.datepickerSelector);
    const unavailableDay = datepicker.find(`a.ui-state-default[data-date="${this.selectedDateStr.split("/").join("")}"]`);
    unavailableDay.addClass("highlight-unavailable-day");
  
    const message = "Sorry, there are no Rooms available this day.";
    const messageDiv = $("<div>").text(message).addClass("no-rooms-available");
  
    const maxMessages = 3;
    const existingMessages = $(".no-rooms-available").length;
    const messageContainer = $(this.datepickerSelector).parent();
  
    if (existingMessages < maxMessages) {
      messageContainer.append(messageDiv);
      // Set a timer to remove the message after 2 seconds
      setTimeout(() => {
        messageDiv.remove();
        unavailableDay.removeClass("highlight-unavailable-day");
      }, 2000);
    } else {
      messageContainer.find(".no-rooms-available").first().remove();
      messageContainer.append(messageDiv);
    }
  }

  checkSelectedDate() {
    const datesToCheck = this.datesToCheck.map(dateStr => {
      const dateParts = dateStr.split('/');
      return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    });
  
    const selectedDate = new Date(this.selectedDateStr);
    const matches = datesToCheck.some(date => {
      return date.getFullYear() === selectedDate.getFullYear() &&
             date.getMonth() === selectedDate.getMonth() &&
             date.getDate() === selectedDate.getDate();
    });
  
    if (matches) {
      console.log(`The date ${this.selectedDateStr} matches a date in the array.`);
      this.displayNoRoomsAvailable();
    } else {
      console.log(`The date ${this.selectedDateStr} does not match any date in the array.`);
      $(".no-rooms-available").remove();
    }
  }
  
  // getBookingdata(data) {
  //   return data.filter((booking) => booking.userID === this.id);
  // }

  checkSelectedDatePublic() {
    this.checkSelectedDate();
  }
}

export default MyDatePicker;







  