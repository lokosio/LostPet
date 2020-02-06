export function DateCurrent() {
    const that = this;
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds
    const fecha = {
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    };
    return fecha 
}