// Select HTML elements for interaction
const bill = document.getElementById("bill");
const tips = document.querySelectorAll(".btn"); // Selects all buttons with class "btn"
const numberCustom = document.getElementById("number-custom");
const numberPeople = document.getElementById("number-people");
const amount = document.getElementById("amount");
const total = document.getElementById("total");
const reset = document.getElementById("reset");
const spanError = document.querySelector(".error"); // Selects the first element with class "error"

/**
 * Calculates the tip amount and total bill per person based on user input.
 * Updates the displayed values in the HTML elements.
 */
function calculateTip() {
  // Get the bill value as a floating-point number
  const billValue = parseFloat(bill.value);

  let tipPercentage = 0; // Initialize tip percentage to 0

  // Check if custom tip is entered
  if (numberCustom.value !== "") {
    // Get custom tip percentage as a decimal (dividing by 100)
    tipPercentage = parseFloat(numberCustom.value) / 100;
  } else {
    // Loop through all tip buttons
    for (const tip of tips) {
      // Check if the current button has the "active" class
      if (tip.classList.contains("active")) {
        // Get the tip percentage value from the button
        tipPercentage = parseFloat(tip.value);
        // Exit the loop after finding the active button
        break;
      }
    }
  }

  // Get the number of people as an integer
  const numPeople = parseInt(numberPeople.value);

  // Validate number of people (must be positive)
  if(isNaN(numPeople) || numPeople <= 0) {
    // Display error message and apply red outline for invalid input
    spanError.textContent = "Can't be a zero";
    numberPeople.style.outlineColor = '#FF0000';
    return; // Exit the function if invalid number
  } else {
    // Clear error message if previously displayed
    spanError.textContent = '';
  }

  // Calculate total amount (bill + tip)
  const totalAmount = (billValue * tipPercentage) + billValue;

  // Calculate tip amount per person
  const tipAmount = (billValue * tipPercentage) / numPeople;

  // Calculate total bill per person
  const totalPerPerson = totalAmount / numPeople;

  // Update displayed tip amount with formatting (2 decimal places)
  amount.textContent = `$${tipAmount.toFixed(2)}`;

  // Update displayed total bill per person with formatting (2 decimal places)
  total.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// Event listener for bill input change - triggers recalculation
bill.addEventListener("input", calculateTip);

// Event listener for custom tip input change - triggers recalculation
numberCustom.addEventListener("input", calculateTip);

// Event listener for each tip button click
tips.forEach(tip => {
  tip.addEventListener('click', function(){
    // Remove "active" class from all tip buttons
    tips.forEach(btn => {
      btn.classList.remove('active');
    });
    // Add "active" class to the clicked button
    this.classList.add('active');
    // Trigger recalculation
    calculateTip();
  });
});

// Event listener for reset button click
reset.addEventListener('click', function(){
  // Reset all input values and displayed results
  bill.value = '';
  numberCustom.value = '';
  tips.forEach(btn => btn.classList.remove('active'));
  amount.textContent = '$0.00';
  total.textContent = '$0.00';
  numberPeople.value = '';
  spanError.textContent = '';
});
