function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");
}
toggleSidebar()

function openFeatures(){
    var wadiv = document.querySelector('.main')
    var cards = document.querySelectorAll('.card')
var allCards = document.querySelector('.cards')
var fullelem = document.querySelectorAll('.fullelem')
var fullelemback = document.querySelectorAll('.fullelem  .back ')
var footer = document.querySelectorAll('.footer');

cards.forEach(function(card) {
  card.addEventListener('click', function() {
    fullelem[card.id].style.display = 'block';
    allCards.style.display = 'none';
    wadiv.style.display = 'none';
    
    footer.forEach(function(ft) {
      ft.style.display = 'none';
    });
  });
});

fullelemback.forEach(function(back) {
  back.addEventListener('click', function() {
    fullelem[back.id].style.display = 'none';
    allCards.style.display = 'grid';
    wadiv.style.display = 'flex';
    
    footer.forEach(function(ft) {
      ft.style.display = 'block';
    });
  });
});
}
openFeatures();

function NICKNAME(){
    var nickName = document.getElementById(".user");
var myInput=document.getElementById('myInput');
if(localStorage.getItem('myData')){
    myInput.value=localStorage.getItem('myData');
}
myInput.addEventListener('input'  ,function(){
    localStorage.setItem('myData' ,myInput.value)
})
}
NICKNAME()
function TODOLIST(){
    var currentTask = [];
if (localStorage.getItem('currentTask')) {
    currentTask = JSON.parse(localStorage.getItem('currentTask'));//coverts data into string and stores in local storage
} else {
    console.log("Task list is empty");
}

var taskInput = document.querySelector('#taskInput');
var taskDetails = document.querySelector('#taskDetails');
var checkboxtask = document.querySelector('#checkboxtask');
var form = document.querySelector('form');
var sound = document.querySelector('#mySoundCOMPLETED');

function renderTask() {
    localStorage.setItem('currentTask', JSON.stringify(currentTask));
    var allTask = document.querySelector('.allTask');
    var sum = '';
    currentTask.forEach(function(elem, index) {
        sum += `<div class="task">
                    <h5>${elem.task}${elem.imp ? ' <span class="important">Imp</span>' : ''}</h5>
                    <p>${elem.details}</p>
                    <button class="completeBtn" data-index="${index}">Mark As Completed</button>
                </div>`;
    });
    allTask.innerHTML = sum;

    // After rendering, add event listeners to "Mark As Completed" buttons
    var markCompletedBTN = document.querySelectorAll('.completeBtn');
    markCompletedBTN.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var index = btn.getAttribute('data-index');
            currentTask.splice(index, 1);
            localStorage.setItem('currentTask', JSON.stringify(currentTask));
            renderTask();
            sound.play();
        });
    });
}

renderTask();

form.addEventListener('submit', function(e) {
    e.preventDefault();
var addTaskSound=document.querySelector('#mySoundADD')
    currentTask.push({
        task: taskInput.value,
        details: taskDetails.value,
        imp: checkboxtask.checked
    });
    addTaskSound.play();
    // Save to localStorage
    localStorage.setItem('currentTask', JSON.stringify(currentTask));

    // Clear form
    taskInput.value = '';
    taskDetails.value = '';
    checkboxtask.checked = false;

    renderTask();
});

}
TODOLIST();

function DAILYPLANNER(){
    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`);

var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {};

var wholeDaySum = '';

hours.forEach(function(elem, idx) {
    var savedData = dayPlanData[idx] || '';
    wholeDaySum += `<div class="dayPlanner-Time">
        <p>${elem}</p>
        <input id="${idx}" type="text" placeholder="..." value="${savedData}">
    </div>`;
});

var dayPlanner = document.querySelector('.dayPlanner');
dayPlanner.innerHTML = wholeDaySum;

var dayPlannerInput = document.querySelectorAll('.dayPlanner input');
dayPlannerInput.forEach(function(elem) {
    elem.addEventListener('input', function() {
        dayPlanData[elem.id] = elem.value;
        localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData));
    });
});

}
DAILYPLANNER();

function MOTIVATIONQUOTE(){
    var quote=document.querySelector('.motivationContainer h2');
var author=document.querySelector('.motivationContainer h4');
async function fetchQuote(){
    let response = await fetch('https://randominspirationalquotes.onrender.com/')
    let data = await response.json();
    quote.innerHTML=data.quote;
    author.innerHTML=data.author;
    
    
}
fetchQuote()
}
MOTIVATIONQUOTE();
function FULLSCREENPOMO(){
document.getElementById("fullBtn").addEventListener("click", function() {
  let vid = document.querySelector('.overlay')
  
  if (vid.requestFullscreen) {
     vid.requestFullscreen();
     
     
  } else if (vid.webkitRequestFullscreen) { // Safari
     vid.webkitRequestFullscreen();
     
  } else if (vid.msRequestFullscreen) { // IE/Edge
     vid.msRequestFullscreen();
  }
  fullBtn.style.display = 'none';
});
  
}
FULLSCREENPOMO();

const backgroundVideos = [
    "https://res.cloudinary.com/dhox2ocnr/video/upload/v1754764521/bgwall0_vunz7f.mp4",
    // "https://res.cloudinary.com/dhox2ocnr/video/upload/v1754764503/bgwall1_ay5ahz.mp4",
    "https://res.cloudinary.com/dhox2ocnr/video/upload/v1754824201/dark-galaxy.1920x1080_svmcxl.mp4",
    "https://res.cloudinary.com/dhox2ocnr/video/upload/v1754809282/hydrangeas-rain.3840x2160_utj2on.mp4"
];

let currentVideoIndex = 0;

function changeBG() {
    const video = document.querySelector('.vdo');
    currentVideoIndex = (currentVideoIndex + 1) % backgroundVideos.length;
    video.src = backgroundVideos[currentVideoIndex];
    video.load();
    video.play();
}
function changeBGPomo() {
    const video = document.querySelector('.vid');
    currentVideoIndex = (currentVideoIndex + 1) % backgroundVideos.length;
    video.src = backgroundVideos[currentVideoIndex];
    video.load();
    video.play();
}

function POMODORO(){
    let totalSeconds=25*60
let timerInterval
var startBtn=document.querySelector('.pomoTimer .start-timer');
var stopBtn=document.querySelector('.pomoTimer .stop-timer');
var resetBtn=document.querySelector('.pomoTimer  .reset-timer');
var session=document.querySelector(' .session')
var done=document.querySelector('.done')
var cb=document.querySelector('.cb')
var isWorkSession= true


function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            upDateTime();
        } else {
            clearInterval(timerInterval);
            cb.play();
            isWorkSession = !isWorkSession;
            if (isWorkSession) {
                totalSeconds = 25 * 60;
                session.innerHTML = 'Work Session';
                session.style.backgroundColor = "var(--grn)";
            } else {
                totalSeconds = 5 * 60;
                session.innerHTML = "Take a Break";
                session.style.backgroundColor = "var(--blu)";
            }
            upDateTime();
            // Automatically start the next session's timer
            startTimer();
        }
    }, 1000);
}
function stopTimer(){
    clearInterval(timerInterval)
}
function resetTimer(){
    clearInterval(timerInterval)
    totalSeconds=25*60
    upDateTime()
    session.innerHTML='Work Session'
    session.style.backgroundColor="var(--grn)"
}
startBtn.addEventListener('click',startTimer)

stopBtn.addEventListener('click',stopTimer)
resetBtn.addEventListener('click' ,resetTimer)


let timer = document.querySelector('.pomoTimer h1')
function upDateTime(){
    let minutes = Math.floor(totalSeconds/60)
    let seconds=totalSeconds%60
    console.log(seconds);
    timer.innerHTML=`${String(minutes).padStart('2','0')} : ${String(seconds).padStart('2','0')}`
}


}
POMODORO()

function WEATHER(){
    
var head1Time=document.querySelector('.head2 h2');
var head1Cond= document.querySelector('.head1 h3')
var head1Temp=document.querySelector('.head1 h2')
var head2Date=document.querySelector('.head2 h3');
var head2condn=document.querySelector('head2 h4')
var precip=document.querySelector('.head1 .precip')
var humid=document.querySelector('.head1 .humid')
var wndspd=document.querySelector('.head1 .wndspd')
var key='9242786e102c40ce995154409251007';
var city='Nagpur'
async function weatherApiCall(){
      var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`)
      
      var data = await response.json();
      console.log(data);
      head1Temp.innerHTML=`${data.current.temp_c}°C`
      head1Cond.innerHTML=`${data.current.condition.text}`
      precip.innerHTML=`Precipitation : ${data.current.precip_mm} mm`;
      humid.innerHTML=`Humidity : ${data.current.humidity}%`
      wndspd.innerHTML=`Wind Speed : ${data.current.wind_kph} km/h`

      
}
weatherApiCall();




function dateTime(){
const totaldaysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
   var date =new Date();
   var dayOfWeek=totaldaysOfWeek[date.getDay()]
   var hours= date.getHours();
   var minutes=date.getMinutes();
   var dates=date.getDate();
   var month=months[date.getMonth()+1];
   var year=date.getFullYear();
   
   head2Date.innerHTML=`${dates}  ${month}  ${year}`
   
   if(hours>12){
    head1Time.innerHTML=`${dayOfWeek} , ${hours-12}:${minutes}PM`;
   }else{
    head1Time.innerHTML=`${dayOfWeek} , ${hours}:${minutes}AM`;
   }
}
dateTime();
}
WEATHER()
