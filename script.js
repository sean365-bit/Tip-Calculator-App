/* variables */
const displayAmountPrice = document.getElementById("tipAmountPrice");
const displayTotalPrice = document.getElementById("tipTotalPrice");
const testButton = document.getElementById("testbutton");
const buttons = document.querySelectorAll(".tipButton");
const resetButton = document.querySelector(".resetButton");
let selectedButton = null; //
let tipRate;

/* functionality */
function calculateSplitBill(bill, numPeople, tipRate) {
  const perPersonBill = bill / numPeople;
  const tipAmount = parseFloat((perPersonBill * tipRate).toFixed(2));
  const total = parseFloat((perPersonBill + tipAmount).toFixed(2));

  return { tipAmount, total };
}

/* Event Listeners */
/* Reset input fields */
resetButton.addEventListener("click", () => {
  document.getElementById("bill").value = "";
  document.getElementById("numberOfPeople").value = "";
  displayAmountPrice.innerText = "$0.00";
  displayTotalPrice.innerText = "$0.00";

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (selectedButton) {
        selectedButton.classList.remove("activeButton");
      }
      button.classList.add("activeButton");
      selectedButton = button;
    });
  });

  if (selectedButton) {
    selectedButton.classList.remove("activeButton");
    selectedButton = null;
  }

  tipRate = undefined; // Reset tipRate
});

/* Display amounts*/
testButton.addEventListener("click", () => {
  const billInput = parseFloat(document.getElementById("bill").value);
  const numberOfPeopleInput = parseFloat(
    document.getElementById("numberOfPeople").value
  );

  // Validate inputs
  if (typeof tipRate === "undefined") {
    alert("Please select a Tip rate");
    return;
  }

  if (
    isNaN(billInput) ||
    isNaN(numberOfPeopleInput) ||
    billInput <= 0 ||
    numberOfPeopleInput <= 0
  ) {
    alert("Please enter valid values");
    return;
  }

  /* Invoking function */
  const resultTest = calculateSplitBill(
    billInput,
    numberOfPeopleInput,
    tipRate
  );
  displayAmountPrice.innerText = `$${resultTest.tipAmount}`;
  displayTotalPrice.innerText = `$${resultTest.total}`;
});

/* Button click handling */
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove the activeButton class from all buttons
    buttons.forEach((btn) => btn.classList.remove("activeButton"));

    // Add the activeButton class to the clicked button
    button.classList.add("activeButton");

    // Set the tip rate
    tipRate = parseFloat(button.value);
  });
});
