let score = 0;
let clickPower = 1;
let clickedLastSecond = 0;

// ---==== Cookie clicking ====---
let cookie = document.getElementById('cookie');
let scoreDisplay = document.getElementById('score');

// Event listener for cookie click
// Increment score on click
function cookieClick() {
    // YOUR CODE HERE
}
    
cookie.addEventListener(???, cookieClick);

let refreshCookieCount = function() {
    scoreDisplay.textContent = score;
};

// ---==== Cookies Per Second ====---
// Function to update the cookies per second display
function updateCPS(clickedPerSecond) {
    let cpsDisplay = document.getElementById('cps');
    cpsDisplay.textContent = autoClickerPower1 + autoClickerPower2 + clickedPerSecond;
}

// Update the cookies per second display every second
setInterval(() => {
    // YOUR CODE HERE
}, 1000);

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
    scalingAmount: 1,
    levelNumber: 1,
    power: (level) => 1,
    onUpgrade: function(level) {
        clickPower = 1; 
    }
});

// Start the auto-clicker interval
let autoClickerPower1 = 0;
let autoClickerPower2 = 0;

setInterval(() => {
    // YOUR CODE HERE
}, 1000);

// Upgrade auto-clicker, which automatically clicks the cookie for you
createUpgrade({
    buttonId: 'buy-auto-clicker-1',
    priceElementId: 'auto-clicker-price-1',
    levelElementId: 'auto-blicker-level-1',
    multipleElementId: 'auto-clicker-multiple-1',
    priceAmount: 100,
    scalingAmount: 2.5,
    levelNumber: 0, // start at level 0 when not bought
    power: (level) => (level**2), 
    onUpgrade: function(level) {
        autoClickerPower1 = (level**2);
    }
});


// ---==== Golden Cookie ====---
let goldenCookie = document.getElementById('golden-cookie');
var letGoldenIn = true; // flag to stop multiple golden cookies spawning at once

// Function to spawn a golden cookie at a random position with a random value
function spawnGoldenCookie() {

    const cookieVal = undefined // YOUR CODE HERE
    const delay = undefined // YOUR CODE HERE
    const duration = undefined // YOUR CODE HERE

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
        }, duration + 1000);
    }, delay);
    letGoldenIn = true;
}

// Click event for the golden cookie
// Increment score on golden cookie click then hide golden cookie and spawn a new one
goldenCookie.addEventListener('click', () => {
    let goldVal = parseInt(goldenCookie.dataset.value); // Get the value of the golden cookie
    score += goldVal; // Increment score by the value of the golden cookie
    
    // --- Something is missing here ---    
    // YOUR CODE HERE

    goldenCookie.style.display = 'none'; // Hide on click
    spawnGoldenCookie(); // Schedule next one
});

// How do you start the cycle of golden cookies appearing?
// YOUR CODE HERE

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