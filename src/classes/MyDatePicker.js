class MyDatePicker {
  constructor(datepickerSelector) {
    this.datepickerSelector = datepickerSelector;
    this.prevSelectedDate = null;
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
        } else {
          // Different date selected, do something with it
          const dayOfMonth = selectedDate.getDate();
          const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          const monthName = monthNames[selectedDate.getMonth()];
          const year = selectedDate.getFullYear();
          // console.log('Selected day: ' + dayOfMonth);
          // console.log('Selected month: ' + monthName);
          // console.log('Selected year: ' + year);
          this.prevSelectedDate = selectedDate;
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
}

export default MyDatePicker;

  