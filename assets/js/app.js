// seleccion de inputs del form
let dayInp = document.getElementById("day");
let monthInp = document.getElementById("month");
let yearInp = document.getElementById("year");

// seleccion de spans de los h1
let dayOtp = document.getElementById("day-result");
let monthOtp = document.getElementById("month-result");
let yearOtp = document.getElementById("year-result");

// seleccion del form
let form = document.querySelector("form");

// seleccion de la fecha actual
const date = new Date();
// seleccion del dia
let currentDay = date.getDate();
// seleccion del mes (comienza desde 0, se suma 1)
let currentMonth = date.getMonth() + 1;
// seleccion del año
let currentYear = date.getFullYear();
// array de cantidad de dias de los meses (1 al 12)
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// funcion validate()
function validate() {
  // Selección de todos los inputs
  const inputs = document.querySelectorAll("input");
  let validator = true;

  inputs.forEach((i) => {
    const parent = i.parentElement;
    const value = parseInt(i.value, 10);
    const name = i.id;

    i.style.borderColor = "";
    parent.querySelector("small").innerText = "";

    if (!value) {
      i.style.borderColor = "red";
      parent.querySelector("small").innerText = "This field is required";
      validator = false;
    } else if (name === "month" && (value > 12 || value < 1)) {
      i.style.borderColor = "hsl(0, 100%, 67%)";
      parent.querySelector("small").innerText = "Must be a valid month";
      validator = false;
    } else if (name === "day" && (value > 31 || value < 1)) {
      i.style.borderColor = "hsl(0, 100%, 67%)";
      parent.querySelector("small").innerText = "Must be a valid day";
      validator = false;
    } else if (name === "year" && value > currentYear) {
      i.style.borderColor = "hsl(0, 100%, 67%)";
      parent.querySelector("small").innerText = "Must be in the past";
      validator = false;
    } else if (name === "day" && monthInp.value && yearInp.value) {
      const daysInMonth = new Date(yearInp.value, monthInp.value, 0).getDate();
      if (value > daysInMonth) {
        i.style.borderColor = "hsl(0, 100%, 67%)";
        parent.querySelector("small").innerText = "Must be a valid date";
        validator = false;
      }
    }
  });

  return validator;
}

// Función de handleSubmit
function handleSubmit(e) {
  e.preventDefault();

  if (validate()) {
    let birthDay = parseInt(dayInp.value, 10);
    let birthMonth = parseInt(monthInp.value, 10);
    let birthYear = parseInt(yearInp.value, 10);

    let calculatedDay = currentDay - birthDay;
    let calculatedMonth = currentMonth - birthMonth;
    let calculatedYear = currentYear - birthYear;

    if (calculatedDay < 0) {
      calculatedDay += months[currentMonth - 2];
      calculatedMonth--;
    }

    if (calculatedMonth < 0) {
      calculatedMonth += 12;
      calculatedYear--;
    }

    dayOtp.innerHTML = calculatedDay;
    monthOtp.innerHTML = calculatedMonth;
    yearOtp.innerHTML = calculatedYear;
  }
}

// Agregar función en evento submit del form
form.addEventListener("submit", handleSubmit);
