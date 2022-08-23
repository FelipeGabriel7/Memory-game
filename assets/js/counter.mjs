const timer = document.querySelector('.counter')
const dangerAlert = document.querySelector('.danger')
let minutes = 0;
let seconds = 0;

export default function counter(){

  setInterval(() => {
      seconds ++ 

      if(seconds >= 59){
        seconds = 0
        minutes ++ 
      }


      if(minutes >= 3){
        dangerAlert.style.fontWeight = 'bold'
        dangerAlert.style.color = '#f14'
        dangerAlert.innerHTML = 'Você precisa praticar mais sua memória '
      }
      timer.innerHTML = `TEMPO ${minutes}:${seconds}`
    }, 1000)

}