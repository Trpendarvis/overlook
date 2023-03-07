// import { Booking } from "./Booking"

class MyDatePicker {
  constructor(datepickerSelector, datesToCheck) {
    this.datepickerSelector = datepickerSelector;
    this.prevSelectedDate = null;
    this.selectedDateStr = null;
    this.datesToCheck = datesToCheck || [];
    this.init();
  }

  init() {
    $(this.datepickerSelector).datepicker({
      onSelect: (dateText, inst) => {
        const selectedDate = $(this.datepickerSelector).datepicker('getDate');

        if (this.prevSelectedDate && selectedDate.getTime() === this.prevSelectedDate.getTime()) {
          // Same date selected, deselect it
          $(this.datepickerSelector).datepicker('setDate', null);
          this.prevSelectedDate = null;
          this.selectedDateStr = null;
        } else {
          // Different date selected, do something with it
          const dayOfMonth = selectedDate.getDate();
          const monthNumber = selectedDate.getMonth() + 1;
          const year = selectedDate.getFullYear();
          
          this.selectedDateStr = `${year}/${monthNumber}/${dayOfMonth}`;
          console.log(this.selectedDateStr);
          
          this.prevSelectedDate = selectedDate;

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
  checkSelectedDate() {
    const datesToCheck = ['2023/3/6', '2023/3/10', '2023/3/15']; //this should be bookings.date? `${Booking.date}` findByDate(date)
    const formatStr = 'YYYY/M/D';
  
    const selectedDate = new Date(this.selectedDateStr);
    const matches = datesToCheck.some(dateStr => {
      const date = new Date(dateStr);
      return date.getFullYear() === selectedDate.getFullYear() &&
             date.getMonth() === selectedDate.getMonth() &&
             date.getDate() === selectedDate.getDate();
    });
  
    if (matches) {
      console.log(`The date ${this.selectedDateStr} matches a date in the array.`);
    } else {
      console.log(`The date ${this.selectedDateStr} does not match any date in the array.`);
    }
  }
  checkSelectedDatePublic() {
    this.checkSelectedDate();
  }
}

export default MyDatePicker;

  