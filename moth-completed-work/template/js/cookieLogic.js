let score = 0;
let clickPower = 1;

// ---==== Cookie clicking ====---
let cookie = document.getElementById('cookie');
let scoreDisplay = document.getElementById('score');

// Event listener for cookie click
// Increment score on click
function cookieClick() {
    score += clickPower;
    clickedLastSecond += clickPower;
    refreshCookieCount();
}
    
cookie.addEventListener("click", cookieClick);

let refreshCookieCount = function() {
    scoreDisplay.textContent = score;
};

// ---==== Cookies Per Second ====---
let clickedLastSecond = 0;

// Function to update the cookies per second display
function updateCPS() {
    let cpsDisplay = document.getElementById('cps');
    cpsDisplay.textContent = clickedLastSecond + autoClickerPower1 + autoClickerPower2;  
    clickedLastSecond = 0; 
}

// Update the cookies per second display every second
setInterval(updateCPS, 1000);

// ---==== Shop ====---
// Function to create an upgrade button
function createUpgrade({ buttonId, priceElementId, levelElementId, multipleElementId, priceAmount, scalingAmount, levelNumber, power, onUpgrade }) {
    let button = document.getElementById(buttonId);
    let priceElement = document.getElementById(priceElementId);
    let levelElement = document.getElementById(levelElementId);
    let multipleElement = document.getElementById(multipleElementId);

    button.addEventListener("click", function () {
        if (score >= priceAmount) {
            // Subtract cookies from the price of the item
            score -= priceAmount;

            // Update cookie counter
            refreshCookieCount();

            // Update scores
            levelNumber += 1;
            priceAmount = Math.floor(priceAmount * scalingAmount);

            // Perform custom upgrade logic
            onUpgrade(levelNumber);

            // Refresh shop item
            refreshUpgrade();
        } else {
            showMessage("Not enough cookies");
        }
    });

    let refreshUpgrade = function() {
        levelElement.innerHTML = levelNumber;
        priceElement.innerHTML = priceAmount;
        multipleElement.innerHTML = power(levelNumber);
    };

    // Refresh display
    refreshUpgrade();
}

// Upgrade click power, making each click worth more cookies
createUpgrade({
    buttonId: 'buy-click-power',
    priceElementId: 'click-power-price',
    levelElementId: 'click-power-level',
    multipleElementId: 'click-power-multiple',
    priceAmount: 1,
    scalingAmount: 2,
    levelNumber: 1,
    power: (level) => level,
    onUpgrade: function(level) {
        clickPower = level;
    }
});

// Start the auto-clicker interval
let autoClickerPower1 = 0;
let autoClickerPower2 = 0;

setInterval(() => {
    level = parseInt(document.getElementById("auto-clicker-level-2").textContent)
    autoClickerPower2 = (clickedLastSecond + autoClickerPower1) * level
    score += autoClickerPower1+autoClickerPower2;
    refreshCookieCount();
}, 1000);

// Upgrade auto-clicker, which automatically clicks the cookie for you
createUpgrade({
    buttonId: 'buy-auto-clicker-1',
    priceElementId: 'auto-clicker-price-1',
    levelElementId: 'auto-clicker-level-1',
    multipleElementId: 'auto-clicker-multiple-1',
    priceAmount: 100,
    scalingAmount: 2.5,
    levelNumber: 0, // start at level 0 when not bought
    power: (level) => (level*level), 
    onUpgrade: function(level) {
        autoClickerPower1 = (level*level);
    }
});

// The Cooler Auto-Clicker
createUpgrade({
    buttonId: 'buy-auto-clicker-2',
    priceElementId: 'auto-clicker-price-2',
    levelElementId: 'auto-clicker-level-2',
    multipleElementId: 'auto-clicker-multiple-2',
    priceAmount: 500,
    scalingAmount: 5,
    levelNumber: 0, // start at level 0 when not bought
    power: (level) => (level), 
    onUpgrade: function(level) {
    }
});

// ---==== Golden Cookie ====---
let goldenCookie = document.getElementById('golden-cookie');
var letGoldenIn = true; // flag to stop multiple golden cookies spawning at once

// Function to spawn a golden cookie at a random position with a random value
function spawnGoldenCookie() {

    const cookieVal = Math.random()*score*0.9+score*0.1;
    const delay = Math.random()*90000+30000;
    const duration = (1-(cookieVal/(score+1)))*10000+5000

    if (!letGoldenIn) {return}; // no spawn if letGoldenIn false
    letGoldenIn = false; // no further spawning until this one is clicked
    setTimeout(() => {
        const x = Math.random() * (window.innerWidth - 100); 
        const y = Math.random() * (window.innerHeight - 100);

        goldenCookie.style.left = `${x}px`;
        goldenCookie.style.top = `${y}px`;
        goldenCookie.style.display = 'block';
        goldenCookie.style.animation = 'none'; // restart animation
        goldenCookie.dataset.value = cookieVal;
        void goldenCookie.offsetWidth; // force reflow

        goldenCookie.style.animation = `popInOut ${duration}ms ease-in-out forwards`;

        // Auto-remove after animation (5s)
        setTimeout(() => {
            goldenCookie.style.display = 'none';
            spawnGoldenCookie(); // Schedule next one
        }, duration + 5000);
    }, delay);
    letGoldenIn = true;
}

// Click event for the golden cookie
// Increment score on golden cookie click then hide golden cookie and spawn a new one
goldenCookie.addEventListener('click', () => {
    let goldVal = parseInt(goldenCookie.dataset.value); // Get the value of the golden cookie
    score += goldVal; // Increment score by the value of the golden cookie
    // --- Something is missing here ---    
    refreshCookieCount();

    goldenCookie.style.display = 'none'; // Hide on click
    spawnGoldenCookie(); // Schedule next one
});

// How do you start the cycle of golden cookies appearing?
spawnGoldenCookie();

// ---==== Message Modal ====---
 // Function to show a modal (popup box) with a custom message
 function showMessage(message) {
    const modal = document.getElementById('message-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

let closeModal = document.getElementById('close-modal');
// Close modal functionality
closeModal.addEventListener('click', () => {
    console.log("close modal")
    document.getElementById('message-modal').style.display = 'none';
});

function showSecretMessage() { 
    showMessage("Secret message!");
}

setTimeout(showSecretMessage, 10000);