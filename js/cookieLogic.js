let score = 0;
let clickPower = 1;
let clickedLastSecond = 0;

// ---==== Cookie clicking ====---
let cookie = document.getElementById('cookie');
let scoreDisplay = document.getElementById('score');

// Increment score on cookie click
cookie.addEventListener('click', () => {
    score += clickPower;
    clickedLastSecond += clickPower;
    refreshCookieCount();
});

let refreshCookieCount = function() {
    scoreDisplay.textContent = score;
};

// ---==== Cookies Per Second ====---
// Function to update the cookies per second display
function updateCPS(clickedPerSecond) {
    let cpsDisplay = document.getElementById('cps');
    cpsDisplay.textContent = autoClickerPower + clickedPerSecond;
}

// Update the cookies per second display every second
setInterval(() => {
    updateCPS(clickedLastSecond);
    clickedLastSecond = 0; // Reset clicked last second
}, 1000);

// let resetButton = document.getElementById('reset-button');

// Reset the score
// resetButton.addEventListener('click', () => {
//     score = 0;
//     refreshCookieCount();
// });

// ---==== Shop ====---

// Function to create an upgrade button
function createUpgrade({ buttonId, priceElementId, levelElementId, multipleElementId, priceAmount, scalingAmount, levelNumber, power, onUpgrade }) {
    let button = document.getElementById(buttonId);
    let priceElement = document.getElementById(priceElementId);
    let levelElement = document.getElementById(levelElementId);
    let multipleElement = document.getElementById(multipleElementId);

    button.addEventListener("click", function () {
        if (score >= priceAmount) {
            console.log("Item successfully Bought");

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

    // Initialize the display
    refreshUpgrade();
}

// Upgrade click power, making each click worth more cookies
createUpgrade({
    buttonId: 'buy-click-power',
    priceElementId: 'click-power-price',
    levelElementId: 'click-power-level',
    multipleElementId: 'click-power-multiple',
    priceAmount: 10,
    scalingAmount: 1.33,
    levelNumber: 1,
    power: (level) => level, // Power is equal to the level
    onUpgrade: function(level) {
        clickPower = level; // Update click power based on level
    }
});

// Start the auto-clicker interval
let autoClickerPower = 0;
setInterval(() => {
    score += autoClickerPower;
    refreshCookieCount();
}, 1000);

// Upgrade auto-clicker, which automatically clicks the cookie for you
createUpgrade({
    buttonId: 'buy-auto-clicker',
    priceElementId: 'auto-clicker-price',
    levelElementId: 'auto-clicker-level',
    multipleElementId: 'auto-clicker-multiple',
    priceAmount: 100,
    scalingAmount: 1.5,
    levelNumber: 1,
    power: (level) => level - 1, // Power is equal to the level minus 1
    onUpgrade: function(level) {
        autoClickerPower = level - 1; // Update auto-clicker power based on level
    }
});

// ---==== Message Modal ====---
 // Function to show a modal (popup box) with a custom message
 function showMessage(message) {
    const modal = document.getElementById('message-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

// Close modal functionality
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('message-modal').style.display = 'none';
});