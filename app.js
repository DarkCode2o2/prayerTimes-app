let continents = document.querySelectorAll('.continents-list > li')
let countriesList = document.querySelectorAll('.continents-list > li > .countries')
let countries = document.querySelectorAll('.continents-list > li > .countries li')
let continentsList = document.querySelector('.continents-list')
let chooseBtn = document.querySelector('.continents > div')
let prayerTimes = document.querySelector('.prayer-times')
let listTimes = document.querySelector('.list-times > div')
const currentDate = new Date();
const currentYear = currentDate.getFullYear(); // e.g. 2023
const currentMonth = currentDate.getMonth() + 1; // e.g. 5 (note that January is 0)
const currentDay = currentDate.getDate(); // e.g. 20
let countryArray = []


document.querySelector('.header .date small').innerHTML = `${currentDay} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentYear}`


chooseBtn.addEventListener('click', () => {
    continentsList.classList.toggle('hide')
})

continents.forEach(continent => {
    continent.addEventListener('click', () => {
        continents.forEach(continent => continent.classList.remove('active') )
        continent.classList.add('active')
        
        countriesList.forEach(country => {
            if(country != continent.children[1]) {
                country.classList.add('hide')
            }else {
                continent.children[1].classList.toggle('hide')
            }
        })

    })
})




countries.forEach(country => {
    country.addEventListener('click', () => {
    continentsList.classList.add('hide')
    document.querySelector('.list-times').classList.remove('hide')
    countryArray = country.innerHTML.split(',')
    axios.get(`https://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=${countryArray[0]}&country=${countryArray[1]}`) 
    .then(response => response.data.data)
    .then(data => {
        prayerTimes.innerHTML = ''
        for(days of data) {
            if(days.date.gregorian.day == currentDay) {
                console.log(days)
                listTimes.innerHTML =
                `
                    <h3>${parseInt(days.date.hijri.day)} ${days.date.hijri.month.en} ${days.date.hijri.year}</h3>
                    <h3>${days.date.hijri.weekday.en} - ${days.date.hijri.weekday.ar}</h3>
                    <h3>In ${countryArray[0]}, ${countryArray[1]}</h3>
                `
                let prayers = days.timings

            

                for(let prayer in prayers) {
                
                    prayerTimes.innerHTML += `<li>${prayer}: ${prayers[prayer].split(' ')[0]}</li>`
                
                }
            }
        

        }
    })
 
  })
})
