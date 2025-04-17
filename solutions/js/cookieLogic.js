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
    
cookie.addEventListener('click', cookieClick);

let refreshCookieCount = function() {
    scoreDisplay.textContent = score;
};

// ---==== Cookies Per Second ====---
let clickedLastSecond = 0;

// Function to update the cookies per second display
function updateCPS() {
    let cpsDisplay = document.getElementById('cps');
    cpsDisplay.textContent = autoPower1 + autoPower2 + clickedLastSecond;
    clickedLastSecond = 0; // Reset clicked last second
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
    priceAmount: 10,
    scalingAmount: 1.5,
    levelNumber: 1,
    power: (level) => level, // Power is equal to the level
    onUpgrade: function(level) {
        clickPower = level; // Update click power based on level
    }
});

// Start the auto-clicker interval
let autoPower1 = 0;
let autoPower2 = 0;
setInterval(() => {
    score += autoPower1 + autoPower2; // Add auto-clicker power to score each second
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
    levelNumber: 0,
    power: (level) => (level**2), // Power is equal to the level minus 1
    onUpgrade: function(level) {
        autoPower1 = level; // Update auto-clicker power based on level
    }
});

// Upgrade auto-clicker, which automatically clicks the cookie for you
createUpgrade({
    buttonId: 'buy-auto-clicker-2',
    priceElementId: 'auto-clicker-price-2',
    levelElementId: 'auto-clicker-level-2',
    multipleElementId: 'auto-clicker-multiple-2',
    priceAmount: 200,
    scalingAmount: 5,
    levelNumber: 0,
    power: (level) => (level**3), // Power is equal to the level minus 1
    onUpgrade: function(level) {
        autoPower2 = (level*2); // Update auto-clicker power based on level
    }
});



// ---==== Golden Cookie ====---
let goldenCookie = document.getElementById('golden-cookie');
var letGoldenIn = true; // flag to stop multiple golden cookies spawning at once

// Function to spawn a golden cookie at a random position with a random value
function spawnGoldenCookie() {

    // Random number between 1 and 101 (weighted to lower values)
    const cookieVal = Math.ceil(Math.sqrt(Math.random() * 10000) + 1); 
    // 20s to 40s
    const delay = Math.random() * 20000 + 20000; 
    // random duration based on value
    const duration = (20000-((cookieVal + 30)**2))/2; 


    if (!letGoldenIn) return; // no spawn if letGoldenIn false

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
    let goldVal = parseInt(goldenCookie.dataset.value);
    score += goldVal;
    
    refreshCookieCount();
    
    goldenCookie.style.display = 'none'; // Hide on click
    spawnGoldenCookie(); // Schedule next one
});

spawnGoldenCookie(); // Start the loop

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

setTimeout(showSecretMessage, 60000); // Show a secret message after a minute

