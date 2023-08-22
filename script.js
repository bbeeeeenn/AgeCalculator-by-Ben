const yearOutput = document.getElementById("yearOutput");
const monthOutput = document.getElementById("monthOutput");
const dayOutput = document.getElementById("dayOutput");
const enter = document.getElementById("enter");
const year = document.getElementById("year");
const month = document.getElementById("month");
const day = document.getElementById("day");
const errorMsg = document.querySelectorAll(".error-msg");
const dayError = document.getElementById("dayError");
const monthError = document.getElementById("monthError");
const yearError = document.getElementById("yearError");
const labels = document.querySelectorAll(".dmy-label");
const inputs = document.querySelectorAll(".dmy-input");

function indicateError(i, err) {
	if (err == true) {
		inputs[i].classList.add("error");
		labels[i].classList.add("error");
	} else if (err == false) {
		inputs[i].classList.remove("error");
		labels[i].classList.remove("error");
	}
}

function submit() {
	const dayInput = document.getElementById("dayInput").value;
	const monthInput = document.getElementById("monthInput").value;
	const yearInput = document.getElementById("yearInput").value;
	const today = new Date();
	// Validator
	if (
		dayInput > 31 ||
		monthInput > 12 ||
		yearInput > today.getFullYear() ||
		dayInput == "" ||
		monthInput == "" ||
		yearInput == ""
	) {
		if (dayInput == "") {
			dayError.innerText = "This field is required.";
			indicateError(0, true);
		} else if (dayInput > 31 || dayInput < 1) {
			dayError.innerText = "Must be a valid day.";
			indicateError(0, true);
		} else {
			dayError.innerText = "";
			indicateError(0, false);
		}

		if (monthInput == "") {
			monthError.innerText = "This field is required.";
			indicateError(1, true);
		} else if (monthInput > 12 || monthInput < 1) {
			monthError.innerText = "Must be a valid month.";
			indicateError(1, true);
		} else {
			monthError.innerText = "";
			indicateError(1, false);
		}

		if (yearInput == "") {
			yearError.innerText = "This field is required.";
			indicateError(2, true);
		} else if (yearInput > today.getFullYear()) {
			yearError.innerText = "Must be in the past.";
			indicateError(2, true);
		} else {
			yearError.innerText = "";
			indicateError(2, false);
		}
		// Function
	} else {
		// Check if valid date
		function isValidDate(year, month, day) {
			const date = new Date(year, month - 1, day);
			return (
				date.getFullYear() == year &&
				date.getMonth() == month - 1 &&
				date.getDate() == day
			);
		}
		if (isValidDate(yearInput, monthInput, dayInput)) {
			const birthday = new Date(yearInput, monthInput - 1, dayInput);
			birthday.setHours(8);
			const result = new Date(today - birthday);
			const yr = result.getFullYear() - 1970;
			const m = result.getMonth();
			const d = result.getDate() - 1;
			yearOutput.innerText = yr;
			monthOutput.innerText = m;
			dayOutput.innerText = d;

			function checkPlural(n, word) {
				if (n === 1) {
					return word;
				} else {
					return word + "s";
				}
			}
			year.innerText = checkPlural(yr, "year");
			month.innerText = checkPlural(m, "month");
			day.innerText = checkPlural(d, "day");

			labels.forEach((e) => {
				e.classList.remove("error");
			});
			inputs.forEach((e) => {
				e.classList.remove("error");
			});
			errorMsg.forEach((e) => {
				e.innerText = "";
			});
		} else {
			labels.forEach((e) => {
				e.classList.add("error");
			});
			inputs.forEach((e) => {
				e.classList.add("error");
			});
			errorMsg.forEach((e) => {
				e.innerText = "";
			});
			errorMsg[0].innerText = "Must be a valid date.";
		}
	}
}
