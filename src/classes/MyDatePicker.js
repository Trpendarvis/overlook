import { Bookings } from "./Bookings"
import { getAPIData } from "../apiCalls"
import { bookingData } from "../scripts"
import { roomData } from "../scripts"
import {findAvailableRooms, updateAvailableRooms} from "../scripts"
import {availableRooms} from "../scripts"

class MyDatePicker {
  constructor(datepickerSelector, datesToCheck) {
    this.datepickerSelector = datepickerSelector
    this.selectedDateStr = null
    this.datesToCheck = datesToCheck || []
    this.init()
  }

  init() {
    $(this.datepickerSelector).datepicker({
      defaultDate: new Date('2022/01/01'),
      onSelect: () => {
        const selectedDate = $(this.datepickerSelector).datepicker('getDate');
        const selectedDateStr = $.datepicker.formatDate('yy/mm/dd', selectedDate);
        const availableRooms = findAvailableRooms(selectedDateStr, bookingData, roomData);
        updateAvailableRooms(availableRooms, roomData);
      }
    });

    $(document).on('keydown', this.datepickerSelector, (e) => {
      if (e.keyCode === 27) { // Escape key
        e.preventDefault()
        $('input[type="radio"]').first().focus()
      }
    })

    $(this.datepickerSelector).keydown((e) => {
      const $datepicker = $(this.datepickerSelector)
      if (e.keyCode === 37) { // leftArrow
        console.log("Left arrow key pressed")
        e.preventDefault()
        const prevDate = $datepicker.datepicker('getDate')
        prevDate.setMonth(prevDate.getMonth() - 1)
        $datepicker.datepicker('setDate', prevDate)
      } else if (e.keyCode === 39) { // rightArrow
        console.log("Right arrow key pressed")
        e.preventDefault()
        const nextDate = $datepicker.datepicker('getDate')
        nextDate.setMonth(nextDate.getMonth() + 1)
        $datepicker.datepicker('setDate', nextDate)
      }
    })
  }
}  
   
export default MyDatePicker;







  