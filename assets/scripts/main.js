import { clickButton } from "./functions.js";

/*
    Page Setup
    
    1.  Get JSON data
    2.  Display 'weekly' default
    3.  Set button event listeners
*/

// 1. Get JSON data
const data = await fetch("./assets/data/data.json") // path relative to index
  .then((response) => response.json())
  .finally((response) => response);

// 2. Display 'weekly' default
// await clickButton(data, 'weekly');

// 3.  Set button event listeners
document.getElementById("show-daily").addEventListener("click", () => clickButton(data, "daily"));
document.getElementById("show-weekly").addEventListener("click", () => clickButton(data, "weekly"));
document.getElementById("show-monthly").addEventListener("click", () => clickButton(data, "monthly"));
