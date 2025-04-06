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

let goldenCookie = document.getElementById('golden-cookie');
// let goldenChipList = [document.getElementById('g-chip1'), document.getElementById('g-chip2'), document.getElementById('g-chip3'), document.getElementById('g-chip4'), document.getElementById('g-chip5'), document.getElementById('g-chip6'), document.getElementById('g-chip7')];    
letGoldenIn = false;

function spawnGoldenCookie() {
    const cookieVal = Math.ceil(Math.sqrt(Math.random() * 10000) + 1); // Random number between 1 and 100

    const delay = Math.random() * 20000 + 20000; // 20s to 40s
    setTimeout(() => {
        
        console.log("Golden cookie spawned! with val", cookieVal);

        
        // var stepSize = 2 * Math.PI / goldenChipList.length;
        // var angle = 0;


        // for (let i in goldenChipList) {
        //     var angle = angle + stepSize;
        //     var r = (Math.random())*40;
        //     const gx = Math.cos(angle)*r + 40;
        //     const gy = Math.sin(angle)*r + 40;
        //     goldenChipList[i].style.left = `${gx}px`;
        //     goldenChipList[i].style.top = `${gy}px`;
        // }

        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);

        goldenCookie.style.left = `${x}px`;
        goldenCookie.style.top = `${y}px`;
        goldenCookie.style.display = 'block';
        goldenCookie.style.animation = 'none'; // restart animation
        goldenCookie.dataset.value = cookieVal;
        void goldenCookie.offsetWidth; // force reflow

        const duration = (20000-((cookieVal + 30)**2))/2;
        console.log("Golden cookie duration", duration);

        goldenCookie.style.animation = `popInOut ${duration}ms ease-in-out forwards`;

        // Auto-remove after animation (5s)
        setTimeout(() => {
            goldenCookie.style.display = 'none';
            spawnGoldenCookie(); // Schedule next one
        }, duration + 1000);
    }, delay);
}

goldenCookie.addEventListener('click', () => {
    let goldVal = parseInt(goldenCookie.dataset.value);
    score += goldVal;
    console.log("score",score)
    refreshCookieCount();
    
    goldenCookie.style.display = 'none'; // Hide on click
    spawnGoldenCookie(); // Schedule next one
});

spawnGoldenCookie(); // Start the loop


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
    scalingAmount: 2.33,
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
    scalingAmount: 2.5,
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