

function fadeOut(element) {
    // element.style.opacity = "0";
    element.classList.add("fadeOut");
  }
  
  function fadeIn(element) {
    // element.style.opacity = "100%";
    element.classList.remove("fadeOut");
  }
  
  /* 
      Displays data for the corresponding timeframe
  
      timeframes: 'daily', 'weekly' (default), 'monthly'
  */
  function displayData(data, timeframe) {
    const cards = document.getElementsByClassName('activity-card');
    const dataElements = Array.from(document.getElementsByClassName('activity-card__line2'));
    const previousPeriodPrefix = {
      daily: 'Yesterday',
      weekly: 'Last Week',
      monthly: 'Last Month'
    };
  
    console.log(`displaying ${timeframe}...`);
  
    dataElements.forEach((element) => {
      fadeOut(element);
    })
  
    setTimeout(() => {
      for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        let cardData = data[i].timeframes[timeframe];
  
        card.querySelector('.activity-card__hours').innerText = cardData.current + ' hrs';
        card.querySelector('.activity-card__last-period').innerText = previousPeriodPrefix[timeframe] + ' - ' + cardData.previous + 'hrs';
      }
  
      dataElements.forEach((element) => {
        fadeIn(element);
      })
    }, 250);
  }
  
  
  /*
      Profile Timeframe Buttons
  */
  
  function deselectButtons() {
    let els = document.getElementsByClassName('profile-card__text-button--displaying')
    Array.from(els).forEach((el) => {
      el.classList.remove('profile-card__text-button--displaying');
    });
  }
  
  function selectButton(timeframe) {
    let el = document.getElementById('show-' + timeframe);
    el.classList.add('profile-card__text-button--displaying');
  }
  
  function clickButton(timeframe) {
    deselectButtons();
    selectButton(timeframe);
    displayData(data, timeframe);
  }
  
  /*
      Page Setup
      1.  Get JSON data
      2.  Display 'weekly' default
      3.  Set button event listeners
  */
  
  // 1. Get JSON data
  const data = await fetch('../assets/data/data.json')
    .then(response => response.json())
    .finally(response => response);
  
  // 2. Display 'weekly default
  displayData(data, 'weekly');
  selectButton('weekly');
  
  // 3.  Set button event listeners
  document.getElementById('show-daily').addEventListener('click', () => clickButton('daily'));
  document.getElementById('show-weekly').addEventListener('click', () => clickButton('weekly'));
  document.getElementById('show-monthly').addEventListener('click', () => clickButton('monthly'));