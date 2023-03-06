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
    }
  }
  
export default MyDatePicker;
  