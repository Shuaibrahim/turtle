document.addEventListener('alpine:init', () => {
  Alpine.data('tickets', () => ({
      date: null,
      ticketTypes: [
          {
              name: 'Sri Lankan Adult',
              peak: 6,
              offPeak: 4,
              count: 0,
              total: 0
          },
          {
              name: 'Sri Lankan Child',
              peak: 3,
              offPeak: 2,
              count: 0,
              total: 0
          },
          {
              name: 'Foreign Adult',
              peak: 13,
              offPeak: 10,
              count: 0,
              total: 0
          },
          {
              name: 'Foreign Child',
              peak: 8,
              offPeak: 5,
              count: 0,
              total: 0
          },
          {
              name: 'Infant',
              peak: 0,
              offPeak: 0,
              count: 0,
              total: 0
          },
      ],
      openTimes: [
          {
              title: '7AM to 8AM',
              isPeak: false
          },
          {
              title: '8AM to 9AM',
              isPeak: false
          },
          {
              title: '9AM to 10AM',
              isPeak: false
          },
          {
              title: '10AM to 11AM',
              isPeak: true
          },
          {
              title: '11AM to 12PM',
              isPeak: true
          },
          {
              title: '12PM to 1PM',
              isPeak: true
          },
          {
              title: '1PM to 2PM',
              isPeak: false
          },
          {
              title: '2PM to 3PM',
              isPeak: false
          },
          {
              title: '3PM to 4PM',
              isPeak: true
          },
          {
              title: '4PM to 5PM',
              isPeak: true
          },
          {
              title: '5PM to 6PM',
              isPeak: true
          },
      ],

      selectedTimeSlots: [],

      showTimes: false,
      //------- Functions -------

      selectTimeSlot(index) {

          // check if the index is already in the array
          if (this.selectedTimeSlots.includes(index)) {

              // remove the index from the array
              this.selectedTimeSlots = this.selectedTimeSlots.filter(item => item !== index);

          } else {

              // Todo - you should be able to select time slots in the past !!!

              // get the last element of the array
              let lastElement = this.selectedTimeSlots[this.selectedTimeSlots.length - 1];

              // add 1 to the last element and check if the value is equals to the index
              if (!this.selectedTimeSlots.length || index - 1 == lastElement) {

                  // add the index to the array
                  this.selectedTimeSlots.push(index);

              } else {
                  alert('You can only select consecutive time slots');
              }
          }

          // sort the array
          this.selectedTimeSlots = this.selectedTimeSlots.sort();


          console.log(this.selectedTimeSlots);
      },

      calculate(ticketType) {

          let total = 0;

          this.selectedTimeSlots.forEach((timeSlotIndex) => {

              // calculate the total
              total += parseInt(ticketType.count * (this.openTimes[timeSlotIndex].isPeak ? ticketType.peak : ticketType.offPeak));
          });

          ticketType.total = total;
      
      },
      calculateGrandTotal(ticketTypes) {
        grandTotal = 0;
        ticketTypes.forEach((ticketType) => {
            grandTotal += ticketType.total;
        });
        return grandTotal;
    },
      
     
      
      gotoCheckout(){
          // store the data in the local storage
          localStorage.setItem('ticketTypes', JSON.stringify(this.ticketTypes));
          localStorage.setItem('savedGrandTotal', grandTotal);
          localStorage.setItem('savedDate',JSON.stringify(this.date));
          localStorage.setItem('openTimes', JSON.stringify(this.openTimes));
          localStorage.setItem('selectedTimeSlots', JSON.stringify(this.selectedTimeSlots));

          // redirect to the checkout page
          window.location.href = 'details.html';
      }

  }));
})