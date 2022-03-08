/*
    Functions.js

    1. Display Data (with helper functions above)
    2. Timeframe Buttons (with helper functions above)

    exports: clickButton(data, timeframe)

*/

async function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

// Adds "hidden" to the class list and waits for the animation to finish
async function hide(elements) {
  elements.forEach((element) => {
    element.classList.add("hidden");
  });

  return await wait(250);
}

// Removes "hidden" from class list and waits for animation to finish
async function show(elements) {
  elements.forEach((element) => {
    element.classList.remove("hidden");
  });

  return await wait(500);
}

/* 
    Displays data for the corresponding timeframe
 
    timeframes: 'daily', 'weekly' (default), 'monthly'
*/
export async function displayData(data, timeframe) {
  const previousPeriodPrefix = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };

  // Get .activity-cards
  const cards = document.getElementsByClassName("activity-card");

  // Get direct parents of .activity-card__hours and .activity-card__last-period
  const dataElements = Array.from(document.getElementsByClassName("activity-card__line2"));

  // Hide only the elements to be modified
  // Waits for the animation to finish
  await hide(dataElements);

  // Go through each .activity-card
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    let cardData = data[i].timeframes[timeframe];

    card.querySelector(".activity-card__hours").innerText = cardData.current + "hrs";
    card.querySelector(".activity-card__last-period").innerText =
      previousPeriodPrefix[timeframe] + " - " + cardData.previous + "hrs";
  }

  show(dataElements); // By not awaiting, the button transition to .displaying will be in sync with data
}

/*

    Timeframe Buttons

*/

function getButtons() {
  return Array.from(document.getElementsByClassName("profile-card__text-button"));
}

function disableButtons(buttons) {
  buttons.forEach((button) => {
    button.setAttribute("disabled", "true");
  });
}

function enableButtons(buttons) {
  buttons.forEach((button) => {
    button.removeAttribute("disabled");
  });
}

function deselectButtons(buttons) {
  buttons.forEach((button) => {
    button.classList.remove("displaying");
  });
}

function selectButton(timeframe) {
  const button = document.getElementById("show-" + timeframe);
  button.classList.add("displaying");
}

export async function clickButton(data, timeframe) {
  console.log(`displaying ${timeframe}...`);

  const buttons = getButtons();

  disableButtons(buttons);
  deselectButtons(buttons);

  await displayData(data, timeframe);

  selectButton(timeframe);
  enableButtons(buttons);
}
