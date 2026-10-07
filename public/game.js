/* =========================================================
   HUSTLE LIFE - GAME ENGINE
   Frontend Prototype
========================================================= */


/* =========================================================
   PLAYER DATA
========================================================= */

const player = {

    name: "",

    gender: "male",

    age: 18,

    balance: 100000000000,

    bankBalance: 0,

    x: 50,

    y: 50,

    reputation: 0,

    businesses: [],

    vehicles: [],

    properties: [],

    transactions: []

};


/* =========================================================
   BUSINESS MARKETPLACE
========================================================= */

const MARKETPLACE_BUSINESSES = [

    {
        id: "small_shop",
        name: "Small Shop",
        price: 50000000,
        emoji: "🏪",
        description: "A small retail business."
    },

    {
        id: "restaurant",
        name: "Restaurant",
        price: 150000000,
        emoji: "🍽️",
        description: "A busy restaurant serving customers."
    },

    {
        id: "tech_company",
        name: "Tech Company",
        price: 500000000,
        emoji: "💻",
        description: "A technology company."
    },

    {
        id: "private_bank",
        name: "Private Bank",
        price: 2000000000,
        emoji: "🏦",
        description: "A private financial institution."
    },

    {
        id: "oil_company",
        name: "Oil Company",
        price: 5000000000,
        emoji: "🛢️",
        description: "A major oil and energy company."
    }

];


/* =========================================================
   VEHICLE MARKETPLACE
========================================================= */

const MARKETPLACE_VEHICLES = [

    {
        id: "luxury_sedan",
        name: "Luxury Sedan",
        price: 30000000,
        emoji: "🚘",
        description: "A comfortable luxury sedan."
    },

    {
        id: "luxury_suv",
        name: "Luxury SUV",
        price: 80000000,
        emoji: "🚙",
        description: "A powerful luxury SUV."
    },

    {
        id: "sports_car",
        name: "Sports Car",
        price: 150000000,
        emoji: "🏎️",
        description: "A fast performance sports car."
    },

    {
        id: "supercar",
        name: "Supercar",
        price: 500000000,
        emoji: "🏎️",
        description: "An exotic high-performance supercar."
    },

    {
        id: "private_jet",
        name: "Private Jet",
        price: 5000000000,
        emoji: "✈️",
        description: "Your own private jet."
    }

];
/* =========================================================
   PROPERTY MARKETPLACE
========================================================= */

const MARKETPLACE_PROPERTIES = [

    {
        id: "small_apartment",
        name: "Small Apartment",
        price: 25000000,
        emoji: "🏠",
        description: "A comfortable apartment in Hustle City."
    },

    {
        id: "luxury_apartment",
        name: "Luxury Apartment",
        price: 100000000,
        emoji: "🏢",
        description: "A high-end apartment with premium facilities."
    },

    {
        id: "family_house",
        name: "Family House",
        price: 250000000,
        emoji: "🏡",
        description: "A spacious family home."
    },

    {
        id: "mansion",
        name: "Luxury Mansion",
        price: 1000000000,
        emoji: "🏰",
        description: "A massive luxury mansion."
    },

    {
        id: "estate",
        name: "Private Estate",
        price: 5000000000,
        emoji: "🏯",
        description: "A prestigious private estate."
    },

    {
        id: "skyscraper",
        name: "Skyscraper",
        price: 20000000000,
        emoji: "🏙️",
        description: "A major commercial skyscraper."
    }

];

/* =========================================================
   START CHARACTER CREATION
========================================================= */

function showCharacterCreation() {

    const username =
        document.getElementById("username").value.trim();

    if (!username) {

        alert("Please enter your character name.");

        return;
    }


    document.getElementById("characterName").value =
        username;

    document.getElementById("previewName").textContent =
        username;


    document
        .getElementById("loginScreen")
        .classList.add("hidden");


    document
        .getElementById("characterScreen")
        .classList.remove("hidden");

}


/* =========================================================
   CHARACTER NAME PREVIEW
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const characterName =
        document.getElementById("characterName");

    if (characterName) {

        characterName.addEventListener(
            "input",
            function () {

                document.getElementById(
                    "previewName"
                ).textContent =
                    this.value || "Your Character";

            }
        );

    }

});


/* =========================================================
   SELECT GENDER
========================================================= */

function selectGender(gender) {

    player.gender = gender;


    const maleButton =
        document.getElementById("maleBtn");

    const femaleButton =
        document.getElementById("femaleBtn");


    if (maleButton) {

        maleButton.classList.remove("selected");

    }


    if (femaleButton) {

        femaleButton.classList.remove("selected");

    }


    if (gender === "male") {

        if (maleButton) {

            maleButton.classList.add("selected");

        }


        const avatar =
            document.getElementById("characterAvatar");

        if (avatar) {

            avatar.textContent = "👨🏿";

        }

    }


    if (gender === "female") {

        if (femaleButton) {

            femaleButton.classList.add("selected");

        }


        const avatar =
            document.getElementById("characterAvatar");

        if (avatar) {

            avatar.textContent = "👩🏿";

        }

    }

}


/* =========================================================
   CREATE CHARACTER
========================================================= */

function createCharacter() {

    const name =
        document
            .getElementById("characterName")
            .value
            .trim();


    const age =
        Number(
            document.getElementById("age").value
        );


    if (!name) {

        alert("Please enter a character name.");

        return;

    }


    player.name = name;

    player.age = age;


    const avatar =
        player.gender === "male"
            ? "👨🏿"
            : "👩🏿";


    document.getElementById(
        "playerName"
    ).textContent =
        player.name;


    document.getElementById(
        "playerAge"
    ).textContent =
        `${player.age} years • Citizen`;


    document.getElementById(
        "topAvatar"
    ).textContent =
        avatar;


    document.getElementById(
        "player"
    ).textContent =
        avatar;


    updateMoneyDisplay();


    player.transactions.push({

        type: "Starting Balance",

        amount: 100000000000,

        description:
            "Hustle Life starting capital",

        date:
            new Date().toLocaleString()

    });


    document
        .getElementById("characterScreen")
        .classList.add("hidden");


    document
        .getElementById("gameScreen")
        .classList.remove("hidden");


    updatePlayer();

}


/* =========================================================
   MONEY DISPLAY
========================================================= */

function updateMoneyDisplay() {

    const balanceElement =
        document.getElementById("balance");


    if (balanceElement) {

        balanceElement.textContent =
            player.balance.toLocaleString();

    }

}


/* =========================================================
   PLAYER MOVEMENT
========================================================= */

function move(direction) {

    const step = 4;


    if (direction === "up") {

        player.y -= step;

    }


    if (direction === "down") {

        player.y += step;

    }


    if (direction === "left") {

        player.x -= step;

    }


    if (direction === "right") {

        player.x += step;

    }


    player.x =
        Math.max(
            8,
            Math.min(92, player.x)
        );


    player.y =
        Math.max(
            12,
            Math.min(88, player.y)
        );


    updatePlayer();

}


/* =========================================================
   UPDATE PLAYER POSITION
========================================================= */

function updatePlayer() {

    const character =
        document.getElementById("player");


    if (!character) {

        return;

    }


    character.style.left =
        player.x + "%";


    character.style.top =
        player.y + "%";

}


/* =========================================================
   CITY INTERACTION
========================================================= */

function interact() {

    const choice = prompt(
        "⚡ HUSTLE CITY\n\n" +
        "Choose an action:\n\n" +
        "1. 👤 View Profile\n" +
        "2. 💰 View Cash\n" +
        "3. 🏠 Properties\n" +
        "4. 🏢 Businesses\n" +
        "5. 🚗 Vehicles\n" +
        "6. 📱 Phone\n" +
        "7. ❌ Cancel\n\n" +
        "Enter a number:"
    );

    switch (choice) {

        case "1":
            alert(
                "👤 PROFILE\n\n" +
                "Name: " + player.name + "\n" +
                "Age: " + player.age + "\n" +
                "Status: " + player.status
            );
            break;

        case "2":
            alert(
                "💰 CASH\n\n" +
                "₦" + player.balance.toLocaleString()
            );
            break;

        case "3":
            openPanel("property");
            break;

        case "4":
            openPanel("business");
            break;

        case "5":
            openPanel("vehicle");
            break;

        case "6":
            openPanel("phone");
            break;

        default:
            break;
    }

}


/* =========================================================
   LOCATION INTERACTION
========================================================= */

function locationInteraction(location) {

    if (location === "bank") {

        openPanel("bank");

        return;

    }


    if (location === "business") {

        openPanel("business");

        return;

    }


    if (location === "police") {

        openPanel("police");

        return;

    }


    if (location === "home") {

        HustlePropertyUI.open();

        return;

    }

}


/* =========================================================
   OPEN GAME PANEL
========================================================= */

function openPanel(type) {

    const panel =
        document.getElementById("gamePanel");


    const content =
        document.getElementById("panelContent");


    if (!panel || !content) {

        return;

    }


    panel.classList.remove("hidden");


    /* =====================================================
       PHONE
    ===================================================== */

    if (type === "phone") {

        content.innerHTML = `

            <h2>📱 Virtual Phone</h2>

            <p>
                Your personal phone inside Hustle Life.
            </p>


            <button
                class="panel-button"
                onclick="openPanel('chat')">

                💬 Messages

            </button>


            <button
                class="panel-button"
                onclick="showMessage(
                    '📞 Calling system will be connected to multiplayer players.'
                )">

                📞 Calls

            </button>


            <button
                class="panel-button"
                onclick="openPanel('transfer')">

                💸 Money Transfer

            </button>

        `;

        return;

    }


    /* =====================================================
       CHAT
    ===================================================== */

    if (type === "chat") {

        content.innerHTML = `

            <h2>💬 Messages</h2>

            <p>
                Your multiplayer messages will appear here.
            </p>


            <input
                id="chatMessage"
                type="text"
                placeholder="Type a message..."
                style="
                    width:100%;
                    padding:14px;
                    margin-top:15px;
                    background:#080c11;
                    color:white;
                    border:1px solid #293642;
                    border-radius:10px;
                ">


            <button
                class="panel-button"
                onclick="sendChatMessage()">

                📨 Send Message

            </button>

        `;

        return;

    }


    /* =====================================================
       BANK
    ===================================================== */

    if (type === "bank") {

        content.innerHTML = `

            <h2>🏦 Hustle Bank</h2>

            <p>
                Manage your virtual finances.
            </p>


            <div class="panel-button">

                💵 Cash

                <br>

                <strong>
                    ₦${player.balance.toLocaleString()}
                </strong>

            </div>


            <div class="panel-button">

                🏦 Bank Balance

                <br>

                <strong>
                    ₦${player.bankBalance.toLocaleString()}
                </strong>

            </div>


            <div class="panel-button">

                💎 Total Wealth

                <br>

                <strong>
                    ₦${(
                        player.balance +
                        player.bankBalance
                    ).toLocaleString()}
                </strong>

            </div>


            <button
                class="panel-button"
                onclick="depositMoney()">

                ⬆️ Deposit Money

            </button>


            <button
                class="panel-button"
                onclick="withdrawMoney()">

                ⬇️ Withdraw Money

            </button>


            <button
                class="panel-button"
                onclick="showTransactions()">

                📜 Transaction History

            </button>

        `;

        return;

    }


    /* =====================================================
       MONEY TRANSFER
    ===================================================== */

    if (type === "transfer") {

        content.innerHTML = `

            <h2>💸 Money Transfer</h2>

            <p>
                Send virtual money to another player.
            </p>


            <input
                id="recipient"
                type="text"
                placeholder="Recipient username"
                style="
                    width:100%;
                    padding:14px;
                    margin-top:15px;
                    background:#080c11;
                    color:white;
                    border:1px solid #293642;
                    border-radius:10px;
                "
            >


            <input
                id="transferAmount"
                type="number"
                min="1"
                placeholder="Amount"
                style="
                    width:100%;
                    padding:14px;
                    margin-top:10px;
                    background:#080c11;
                    color:white;
                    border:1px solid #293642;
                    border-radius:10px;
                "
            >


            <button
                class="panel-button"
                onclick="transferMoney()">

                💸 Send Money

            </button>

        `;

        return;

    }


    /* =====================================================
       BUSINESS
    ===================================================== */

    if (type === "business") {

        content.innerHTML = `

            <h2>🏢 Businesses</h2>

            <p>
                Build your virtual business empire.
            </p>


            <button
                class="panel-button"
                onclick="openMarketplace()">

                🏪 Business Marketplace

            </button>


            <button
                class="panel-button"
                onclick="showBusinesses()">

                📊 My Businesses

            </button>

        `;

        return;

    }


    /* =====================================================
       VEHICLES
    ===================================================== */

    if (type === "vehicle") {

        content.innerHTML = `

            <h2>🚗 Vehicles</h2>

            <p>
                Purchase and own vehicles in Hustle City.
            </p>


            <button
                class="panel-button"
                onclick="showVehicleDealership()">

                🚘 Vehicle Dealership

            </button>


            <button
                class="panel-button"
                onclick="showVehicles()">

                🚙 My Vehicles

            </button>

        `;

        return;

    }


    /* =====================================================
       POLICE
    ===================================================== */

    if (type === "police") {

        content.innerHTML = `

            <h2>👮 Police Department</h2>

            <p>
                Law enforcement operates throughout
                Hustle City.
            </p>


            <button
                class="panel-button"
                onclick="showMessage(
                    '🚨 Crime system will be added to the city.'
                )">

                🚨 Crime

            </button>


            <button
                class="panel-button"
                onclick="showMessage(
                    '📋 Your police records will appear here.'
                )">

                📋 Police Records

            </button>


            <button
                class="panel-button"
                onclick="openPanel('justice')">

                ⚖️ Justice System

            </button>

        `;

        return;

    }


    /* =====================================================
       JUSTICE
    ===================================================== */

    if (type === "justice") {

        content.innerHTML = `

            <h2>⚖️ Justice System</h2>

            <p>
                Courts, trials, fines and legal cases
                will operate here.
            </p>


            <button
                class="panel-button"
                onclick="showMessage(
                    '⚖️ Court system coming next.'
                )">

                🏛️ Court

            </button>


            <button
                class="panel-button"
                onclick="showMessage(
                    '📋 Your legal cases will appear here.'
                )">

                📋 My Cases

            </button>

        `;

        return;

    }


    /* =====================================================
       RANKINGS
    ===================================================== */

    if (type === "rankings") {

        content.innerHTML = `

            <h2>🏆 Hustle Rankings</h2>


            <div class="panel-button">

                🥇

                <strong>
                    ${escapeHTML(player.name)}
                </strong>

                <br>

                ₦${player.balance.toLocaleString()}

            </div>


            <button
                class="panel-button"
                onclick="showMessage(
                    '💰 Global wealth rankings coming with multiplayer.'
                )">

                💰 Wealth Ranking

            </button>


            <button
                class="panel-button"
                onclick="showMessage(
                    '🏢 Business rankings coming with multiplayer.'
                )">

                🏢 Business Ranking

            </button>


            <button
                class="panel-button"
                onclick="showMessage(
                    '⭐ Reputation rankings coming with multiplayer.'
                )">

                ⭐ Reputation Ranking

            </button>

        `;

        return;

    }

}


/* =========================================================
   BUSINESS MARKETPLACE
========================================================= */

function openMarketplace() {

    const content =
        document.getElementById("panelContent");


    if (!content) {

        return;

    }


    content.innerHTML = `

        <h2>🏪 Business Marketplace</h2>

        <p>
            Choose a business and build your empire.
        </p>

        <div class="panel-button">

            💰 Available Cash

            <br>

            <strong>
                ₦${player.balance.toLocaleString()}
            </strong>

        </div>


        ${MARKETPLACE_BUSINESSES.map(
            function (business) {

                return `

                    <div
                        class="panel-button"
                        style="margin-bottom:12px;"
                    >

                        <strong>
                            ${business.emoji}
                            ${escapeHTML(business.name)}
                        </strong>

                        <br>

                        <small>
                            ${escapeHTML(business.description)}
                        </small>

                        <br><br>

                        💰 Price:
                        <strong>
                            ₦${business.price.toLocaleString()}
                        </strong>

                        <br><br>

                        <button
                            class="panel-button"
                            onclick="buyBusiness('${business.id}')"
                        >

                            🛒 Buy Business

                        </button>

                    </div>

                `;

            }
        ).join("")}

    `;

}


/* =========================================================
   BUY BUSINESS
========================================================= */

function buyBusiness(id) {

    const business =
        MARKETPLACE_BUSINESSES.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!business) {

        alert("Business not found.");

        return;

    }


    if (player.balance < business.price) {

        alert(
            "You don't have enough cash to buy this business."
        );

        return;

    }


    const alreadyOwned =
        player.businesses.some(
            function (item) {

                return item.id === business.id;

            }
        );


    if (alreadyOwned) {

        alert(
            `You already own ${business.name}.`
        );

        return;

    }


    const confirmed =
        confirm(
            `Buy ${business.name} for ₦${business.price.toLocaleString()}?`
        );


    if (!confirmed) {

        return;

    }


    player.balance -= business.price;


    player.businesses.push({

        id: business.id,

        name: business.name,

        value: business.price,

        emoji: business.emoji

    });


    addTransaction(
        "Business Purchase",
        business.price,
        `Purchased ${business.name}`
    );


    updateMoneyDisplay();


    alert(
        `🎉 Congratulations!\n\nYou now own ${business.name}.`
    );


    showBusinesses();

}


/* =========================================================
   VEHICLE DEALERSHIP
========================================================= */

function showVehicleDealership() {

    const content =
        document.getElementById("panelContent");


    if (!content) {

        return;

    }


    content.innerHTML = `

        <h2>🚘 Vehicle Dealership</h2>

        <p>
            Purchase vehicles for your Hustle Life.
        </p>


        <div class="panel-button">

            💰 Available Cash

            <br>

            <strong>
                ₦${player.balance.toLocaleString()}
            </strong>

        </div>


        ${MARKETPLACE_VEHICLES.map(
            function (vehicle) {

                return `

                    <div
                        class="panel-button"
                        style="margin-bottom:12px;"
                    >

                        <strong>
                            ${vehicle.emoji}
                            ${escapeHTML(vehicle.name)}
                        </strong>

                        <br>

                        <small>
                            ${escapeHTML(vehicle.description)}
                        </small>

                        <br><br>

                        💰 Price:
                        <strong>
                            ₦${vehicle.price.toLocaleString()}
                        </strong>

                        <br><br>

                        <button
                            class="panel-button"
                            onclick="buyVehicle('${vehicle.id}')"
                        >

                            🛒 Buy Vehicle

                        </button>

                    </div>

                `;

            }
        ).join("")}

    `;

}


/* =========================================================
   BUY VEHICLE
========================================================= */

function buyVehicle(id) {

    const vehicle =
        MARKETPLACE_VEHICLES.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!vehicle) {

        alert("Vehicle not found.");

        return;

    }


    if (player.balance < vehicle.price) {

        alert(
            "You don't have enough cash to buy this vehicle."
        );

        return;

    }


    const confirmed =
        confirm(
            `Buy ${vehicle.name} for ₦${vehicle.price.toLocaleString()}?`
        );


    if (!confirmed) {

        return;

    }


    player.balance -= vehicle.price;


    player.vehicles.push({

        id: vehicle.id,

        name: vehicle.name,

        value: vehicle.price,

        emoji: vehicle.emoji

    });


    addTransaction(
        "Vehicle Purchase",
        vehicle.price,
        `Purchased ${vehicle.name}`
    );


    updateMoneyDisplay();


    alert(
        `🎉 Congratulations!\n\nYou now own ${vehicle.name}.`
    );


    showVehicles();

}


/* =========================================================
   DEPOSIT MONEY
========================================================= */

function depositMoney() {

    const amount =
        Number(
            prompt(
                "How much would you like to deposit?"
            )
        );


    if (!amount || amount <= 0) {

        return;

    }


    if (amount > player.balance) {

        alert("You don't have enough cash.");

        return;

    }


    player.balance -= amount;

    player.bankBalance += amount;


    addTransaction(
        "Deposit",
        amount,
        "Cash deposited into Hustle Bank"
    );


    updateMoneyDisplay();

    openPanel("bank");

}


/* =========================================================
   WITHDRAW MONEY
========================================================= */

function withdrawMoney() {

    const amount =
        Number(
            prompt(
                "How much would you like to withdraw?"
            )
        );


    if (!amount || amount <= 0) {

        return;

    }


    if (amount > player.bankBalance) {

        alert(
            "Insufficient bank balance."
        );

        return;

    }


    player.bankBalance -= amount;

    player.balance += amount;


    addTransaction(
        "Withdrawal",
        amount,
        "Money withdrawn from Hustle Bank"
    );


    updateMoneyDisplay();

    openPanel("bank");

}


/* =========================================================
   TRANSFER MONEY
========================================================= */

function transferMoney() {

    const recipientInput =
        document.getElementById("recipient");


    const amountInput =
        document.getElementById("transferAmount");


    if (!recipientInput || !amountInput) {

        return;

    }


    const recipient =
        recipientInput.value.trim();


    const amount =
        Number(
            amountInput.value
        );


    if (!recipient) {

        alert("Enter the recipient username.");

        return;

    }


    if (!amount || amount <= 0) {

        alert("Enter a valid amount.");

        return;

    }


    if (amount > player.balance) {

        alert("Insufficient cash.");

        return;

    }


    if (
        recipient.toLowerCase() ===
        player.name.toLowerCase()
    ) {

        alert(
            "You cannot transfer money to yourself."
        );

        return;

    }


    /*
       Local prototype.

       Multiplayer server-side transfer
       will be connected later.
    */


    player.balance -= amount;


    addTransaction(
        "Transfer",
        amount,
        `Transfer sent to ${recipient}`
    );


    updateMoneyDisplay();


    alert(
        `₦${amount.toLocaleString()} virtual money sent to ${recipient}.`
    );


    openPanel("transfer");

}


/* =========================================================
   TRANSACTION HISTORY
========================================================= */

function addTransaction(
    type,
    amount,
    description
) {

    player.transactions.unshift({

        type: type,

        amount: amount,

        description: description,

        date:
            new Date().toLocaleString()

    });

}


/* =========================================================
   SHOW TRANSACTIONS
========================================================= */

function showTransactions() {

    const content =
        document.getElementById("panelContent");


    if (!content) {

        return;

    }


    let transactionsHTML = "";


    if (player.transactions.length === 0) {

        transactionsHTML = `
            <p>No transactions yet.</p>
        `;

    } else {

        player.transactions.forEach(
            function (transaction) {

                transactionsHTML += `

                    <div class="panel-button">

                        <strong>
                            ${escapeHTML(
                                transaction.type
                            )}
                        </strong>

                        <br>

                        ${escapeHTML(
                            transaction.description
                        )}

                        <br>

                        <small>

                            ₦${transaction.amount.toLocaleString()}

                            <br>

                            ${escapeHTML(
                                transaction.date
                            )}

                        </small>

                    </div>

                `;

            }
        );

    }


    content.innerHTML = `

        <h2>📜 Transaction History</h2>

        ${transactionsHTML}

        <br>

        <button
            class="panel-button"
            onclick="openPanel('bank')">

            ⬅️ Back to Bank

        </button>

    `;

}


/* =========================================================
   BUSINESSES
========================================================= */

function showBusinesses() {

    const content =
        document.getElementById("panelContent");


    if (!content) {

        return;

    }


    if (player.businesses.length === 0) {

        content.innerHTML = `

            <h2>📊 My Businesses</h2>

            <p>
                You don't own any businesses yet.
            </p>

            <button
                class="panel-button"
                onclick="openMarketplace()">

                🏪 Open Marketplace

            </button>

            <br>

            <button
                class="panel-button"
                onclick="openPanel('business')">

                ⬅️ Back

            </button>

        `;

        return;

    }


    let html = `

        <h2>📊 My Businesses</h2>

        <p>
            Businesses you currently own.
        </p>

    `;


    player.businesses.forEach(
        function (business) {

            html += `

                <div class="panel-button">

                    ${business.emoji || "🏢"}

                    <strong>
                        ${escapeHTML(
                            business.name
                        )}
                    </strong>

                    <br>

                    Value:
                    ₦${business.value.toLocaleString()}

                </div>

            `;

        }
    );


    html += `

        <button
            class="panel-button"
            onclick="openMarketplace()">

            🏪 Buy Another Business

        </button>


        <button
            class="panel-button"
            onclick="openPanel('business')">

            ⬅️ Back

        </button>

    `;


    content.innerHTML = html;

}


/* =========================================================
   VEHICLES
========================================================= */

function showVehicles() {

    const content =
        document.getElementById("panelContent");


    if (!content) {

        return;

    }


    if (player.vehicles.length === 0) {

        content.innerHTML = `

            <h2>🚙 My Vehicles</h2>

            <p>
                You don't own any vehicles yet.
            </p>

            <button
                class="panel-button"
                onclick="showVehicleDealership()">

                🚘 Open Dealership

            </button>

            <br>

            <button
                class="panel-button"
                onclick="openPanel('vehicle')">

                ⬅️ Back

            </button>

        `;

        return;

    }


    let html = `

        <h2>🚙 My Vehicles</h2>

        <p>
            Vehicles you currently own.
        </p>

    `;


    player.vehicles.forEach(
        function (vehicle) {

            html += `

                <div class="panel-button">

                    ${vehicle.emoji || "🚗"}

                    <strong>
                        ${escapeHTML(
                            vehicle.name
                        )}
                    </strong>

                    <br>

                    Value:
                    ₦${vehicle.value.toLocaleString()}

                </div>

            `;

        }
    );


    html += `

        <button
            class="panel-button"
            onclick="showVehicleDealership()">

            🚘 Buy Another Vehicle

        </button>


        <button
            class="panel-button"
            onclick="openPanel('vehicle')">

            ⬅️ Back

        </button>

    `;


    content.innerHTML = html;

}


/* =========================================================
   CHAT
========================================================= */

function sendChatMessage() {

    const input =
        document.getElementById(
            "chatMessage"
        );


    if (!input) {

        return;

    }


    const message =
        input.value.trim();


    if (!message) {

        return;

    }


    alert(
        `Message ready for multiplayer chat:\n\n${message}`
    );


    input.value = "";

}


/* =========================================================
   MESSAGE HELPER
========================================================= */

function showMessage(message) {

    alert(message);

}


/* =========================================================
   CLOSE PANEL
========================================================= */

function closePanel() {

    const panel =
        document.getElementById("gamePanel");


    if (panel) {

        panel.classList.add("hidden");

    }

}


/* =========================================================
   BASIC HTML ESCAPING
========================================================= */

function escapeHTML(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        const gameScreen =
            document.getElementById("gameScreen");


        if (
            !gameScreen ||
            gameScreen.classList.contains("hidden")
        ) {

            return;

        }


        if (event.key === "ArrowUp") {

            move("up");

        }


        if (event.key === "ArrowDown") {

            move("down");

        }


        if (event.key === "ArrowLeft") {

            move("left");

        }


        if (event.key === "ArrowRight") {

            move("right");

        }

    }
);
/* =========================================================
   HUSTLE CRIME SYSTEM
========================================================= */

window.HustleCrimeUI = {

    crimes: [
        {
            id: "pickpocket",
            name: "Pickpocket",
            icon: "👜",
            reward: 50000,
            risk: 15,
            cooldown: 30000
        },
        {
            id: "shop_robbery",
            name: "Shop Robbery",
            icon: "🏪",
            reward: 250000,
            risk: 30,
            cooldown: 60000
        },
        {
            id: "bank_heist",
            name: "Bank Heist",
            icon: "🏦",
            reward: 1000000,
            risk: 50,
            cooldown: 120000
        },
        {
            id: "car_theft",
            name: "Car Theft",
            icon: "🚗",
            reward: 500000,
            risk: 40,
            cooldown: 90000
        },
        {
            id: "cyber_heist",
            name: "Cyber Heist",
            icon: "💻",
            reward: 2500000,
            risk: 60,
            cooldown: 180000
        }
    ],

    open() {

        const panel = document.getElementById("gamePanel");

        if (!panel) {
            alert("Crime system panel is unavailable.");
            return;
        }

        panel.classList.remove("hidden");

        panel.innerHTML = `
            <div style="
                padding:20px;
                color:white;
                background:#090d14;
                min-height:100%;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:20px;
                ">

                    <div>
                        <h2 style="margin:0;">
                            🚨 Crime
                        </h2>

                        <p style="
                            margin:5px 0 0;
                            color:#94a3b8;
                        ">
                            Choose your crime carefully.
                        </p>
                    </div>

                    <button
                        onclick="closePanel()"
                        style="
                            border:0;
                            background:#1e293b;
                            color:white;
                            padding:8px 12px;
                            border-radius:8px;
                            font-size:18px;
                        ">
                        ✕
                    </button>

                </div>

                <div style="
                    background:#111827;
                    padding:15px;
                    border-radius:12px;
                    margin-bottom:18px;
                ">

                    <div style="
                        display:flex;
                        justify-content:space-between;
                    ">

                        <span>🚔 Wanted Level</span>

                        <strong id="crimeWantedLevel">
                            ${this.getWantedLevel()}
                        </strong>

                    </div>

                </div>

                <div id="crimeList">

                    ${this.crimes.map(crime => `

                        <div style="
                            background:#111827;
                            border:1px solid #1f2937;
                            border-radius:14px;
                            padding:16px;
                            margin-bottom:12px;
                        ">

                            <div style="
                                display:flex;
                                justify-content:space-between;
                                align-items:center;
                            ">

                                <div>

                                    <h3 style="
                                        margin:0 0 6px;
                                    ">
                                        ${crime.icon}
                                        ${crime.name}
                                    </h3>

                                    <div style="
                                        color:#94a3b8;
                                        font-size:13px;
                                    ">
                                        Reward:
                                        ₦${this.formatMoney(crime.reward)}
                                    </div>

                                    <div style="
                                        color:#94a3b8;
                                        font-size:13px;
                                        margin-top:3px;
                                    ">
                                        Police Risk:
                                        ${crime.risk}%
                                    </div>

                                </div>

                                <button
                                    onclick="HustleCrimeUI.commit('${crime.id}')"
                                    style="
                                        background:#dc2626;
                                        border:0;
                                        color:white;
                                        padding:10px 14px;
                                        border-radius:9px;
                                        font-weight:bold;
                                    ">
                                    Commit
                                </button>

                            </div>

                        </div>

                    `).join("")}

                </div>

                <div style="
                    margin-top:20px;
                    padding:15px;
                    background:#111827;
                    border-radius:12px;
                ">

                    <h3 style="margin-top:0;">
                        📜 Crime History
                    </h3>

                    <div id="crimeHistory">
                        ${this.renderHistory()}
                    </div>

                </div>

            </div>
        `;
    },


    commit(crimeId) {

        const crime = this.crimes.find(
            item => item.id === crimeId
        );

        if (!crime) {
            return;
        }

        const cooldownKey =
            "crimeCooldown_" + crime.id;

        const lastCrime =
            Number(localStorage.getItem(cooldownKey) || 0);

        const now = Date.now();

        if (now - lastCrime < crime.cooldown) {

            const remaining =
                Math.ceil(
                    (crime.cooldown - (now - lastCrime)) / 1000
                );

            alert(
                `⏳ Lay low for ${remaining} seconds before attempting this crime again.`
            );

            return;
        }

        localStorage.setItem(
            cooldownKey,
            String(now)
        );

        const caught =
            Math.random() * 100 < crime.risk;

        if (caught) {

            this.increaseWantedLevel();

            const fine =
                Math.max(
                    10000,
                    Math.floor(crime.reward * 0.25)
                );

            this.removeMoney(fine);

            this.addHistory(
                `🚔 Caught during ${crime.name}. Fine: ₦${this.formatMoney(fine)}`
            );

            alert(
                `🚔 YOU GOT CAUGHT!\n\n` +
                `${crime.name}\n` +
                `Fine: ₦${this.formatMoney(fine)}\n\n` +
                `Wanted Level: ${this.getWantedLevel()}`
            );

        } else {

            this.addMoney(crime.reward);

            this.addHistory(
                `✅ ${crime.name} successful. Earned ₦${this.formatMoney(crime.reward)}`
            );

            alert(
                `✅ CRIME SUCCESSFUL!\n\n` +
                `${crime.name}\n` +
                `You earned ₦${this.formatMoney(crime.reward)}.`
            );
        }

        this.open();
    },


    addMoney(amount) {

        if (typeof window.money === "number") {

            window.money += amount;

        } else if (typeof money === "number") {

            money += amount;

        } else if (
            window.gameState &&
            typeof window.gameState.money === "number"
        ) {

            window.gameState.money += amount;

        } else if (
            window.player &&
            typeof window.player.money === "number"
        ) {

            window.player.money += amount;

        }

        if (typeof updateMoneyDisplay === "function") {
            updateMoneyDisplay();
        }

        if (typeof saveGame === "function") {
            saveGame();
        }
    },


    removeMoney(amount) {

        if (typeof window.money === "number") {

            window.money =
                Math.max(0, window.money - amount);

        } else if (typeof money === "number") {

            money =
                Math.max(0, money - amount);

        } else if (
            window.gameState &&
            typeof window.gameState.money === "number"
        ) {

            window.gameState.money =
                Math.max(
                    0,
                    window.gameState.money - amount
                );

        } else if (
            window.player &&
            typeof window.player.money === "number"
        ) {

            window.player.money =
                Math.max(
                    0,
                    window.player.money - amount
                );

        }

        if (typeof updateMoneyDisplay === "function") {
            updateMoneyDisplay();
        }

        if (typeof saveGame === "function") {
            saveGame();
        }
    },


    getWantedLevel() {

        return Number(
            localStorage.getItem("hustleWantedLevel") || 0
        );
    },


    increaseWantedLevel() {

        let level =
            this.getWantedLevel();

        level++;

        if (level > 5) {
            level = 5;
        }

        localStorage.setItem(
            "hustleWantedLevel",
            String(level)
        );
    },


    addHistory(message) {

        let history =
            JSON.parse(
                localStorage.getItem("hustleCrimeHistory") || "[]"
            );

        history.unshift({
            message: message,
            time: new Date().toLocaleString()
        });

        history =
            history.slice(0, 20);

        localStorage.setItem(
            "hustleCrimeHistory",
            JSON.stringify(history)
        );
    },


    renderHistory() {

        const history =
            JSON.parse(
                localStorage.getItem("hustleCrimeHistory") || "[]"
            );

        if (!history.length) {

            return `
                <p style="color:#64748b;">
                    No crime history yet.
                </p>
            `;
        }

        return history.map(item => `

            <div style="
                padding:10px 0;
                border-bottom:1px solid #1f2937;
            ">

                <div>
                    ${this.escapeHTML(item.message)}
                </div>

                <small style="
                    color:#64748b;
                ">
                    ${this.escapeHTML(item.time)}
                </small>

            </div>

        `).join("");
    },


    formatMoney(amount) {

        return Number(amount).toLocaleString(
            "en-NG"
        );
    },


    escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

};


/* =========================================================
   END HUSTLE CRIME SYSTEM
========================================================= */
/* =========================================================
   HUSTLE LIFE — POLICE SYSTEM
========================================================= */

window.HustlePoliceUI = {

    open() {

        const panel = document.getElementById("gamePanel");

        if (!panel) {
            alert("Police system panel is unavailable.");
            return;
        }

        panel.classList.remove("hidden");

        const wantedLevel =
            Number(
                localStorage.getItem("hustleWantedLevel") || 0
            );

        const stars =
            "⭐".repeat(wantedLevel) +
            "☆".repeat(5 - wantedLevel);

        panel.innerHTML = `

            <div style="
                padding:20px;
                color:white;
                background:#090d14;
                min-height:100%;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:20px;
                ">

                    <div>
                        <h2 style="margin:0;">
                            👮 Police Department
                        </h2>

                        <p style="
                            color:#94a3b8;
                            margin-top:5px;
                        ">
                            Manage your wanted status and legal situation.
                        </p>
                    </div>

                    <button
                        onclick="closePanel()"
                        style="
                            background:#1e293b;
                            color:white;
                            border:0;
                            padding:9px 12px;
                            border-radius:8px;
                        ">
                        ✕
                    </button>

                </div>


                <div style="
                    background:#111827;
                    border-radius:14px;
                    padding:18px;
                    margin-bottom:15px;
                ">

                    <h3 style="margin-top:0;">
                        🚨 Wanted Level
                    </h3>

                    <div style="
                        font-size:24px;
                        margin:10px 0;
                    ">
                        ${stars}
                    </div>

                    <p style="color:#cbd5e1;">
                        Level ${wantedLevel}/5
                    </p>

                </div>


                <div style="
                    background:#111827;
                    border-radius:14px;
                    padding:18px;
                    margin-bottom:15px;
                ">

                    <h3>
                        🔍 Police Search
                    </h3>

                    <p style="color:#94a3b8;">
                        Police may search for players with high
                        wanted levels.
                    </p>

                    <button
                        onclick="HustlePoliceUI.policeSearch()"
                        style="
                            width:100%;
                            padding:13px;
                            background:#2563eb;
                            color:white;
                            border:0;
                            border-radius:9px;
                            font-weight:bold;
                        ">
                        🔎 Search Status
                    </button>

                </div>


                <div style="
                    background:#111827;
                    border-radius:14px;
                    padding:18px;
                    margin-bottom:15px;
                ">

                    <h3>
                        ⚖️ Legal Options
                    </h3>

                    <button
                        onclick="HustlePoliceUI.payFine()"
                        style="
                            width:100%;
                            padding:13px;
                            margin-bottom:10px;
                            background:#16a34a;
                            color:white;
                            border:0;
                            border-radius:9px;
                            font-weight:bold;
                        ">
                        💰 Pay Fine
                    </button>


                    <button
                        onclick="HustlePoliceUI.reduceWanted()"
                        style="
                            width:100%;
                            padding:13px;
                            background:#7c3aed;
                            color:white;
                            border:0;
                            border-radius:9px;
                            font-weight:bold;
                        ">
                        🔓 Reduce Wanted Level
                    </button>

                </div>


                <div style="
                    background:#111827;
                    border-radius:14px;
                    padding:18px;
                ">

                    <h3>
                        📋 Arrest History
                    </h3>

                    <div>
                        ${this.renderHistory()}
                    </div>

                </div>

            </div>
        `;
    },


    policeSearch() {

        const wantedLevel =
            Number(
                localStorage.getItem("hustleWantedLevel") || 0
            );

        if (wantedLevel === 0) {

            alert(
                "✅ Police search complete.\n\n" +
                "You have no active wanted level."
            );

            return;
        }

        const chance =
            Math.min(
                90,
                wantedLevel * 15
            );

        const caught =
            Math.random() * 100 < chance;

        if (caught) {

            this.arrest();

        } else {

            this.addHistory(
                "🚔 Police searched for you but failed to locate you."
            );

            alert(
                "🏃 You escaped the police search!"
            );

        }

        this.open();
    },


    arrest() {

        const wantedLevel =
            Number(
                localStorage.getItem("hustleWantedLevel") || 0
            );

        const jailTime =
            wantedLevel * 30;

        const fine =
            Math.max(
                10000,
                wantedLevel * 50000
            );

        this.removeMoney(fine);

        localStorage.setItem(
            "hustleJailTime",
            String(Date.now() + jailTime * 1000)
        );

        localStorage.setItem(
            "hustleWantedLevel",
            "0"
        );

        this.addHistory(
            `🚔 Arrested. Fine: ₦${this.formatMoney(fine)}. Jail: ${jailTime} seconds.`
        );

        alert(
            "🚔 YOU HAVE BEEN ARRESTED!\n\n" +
            `Fine: ₦${this.formatMoney(fine)}\n` +
            `Jail time: ${jailTime} seconds\n\n` +
            "Your wanted level has been cleared."
        );
    },


    payFine() {

        const wantedLevel =
            Number(
                localStorage.getItem("hustleWantedLevel") || 0
            );

        if (wantedLevel === 0) {

            alert(
                "✅ You currently have no wanted level."
            );

            return;
        }

        const fine =
            wantedLevel * 100000;

        if (!this.hasMoney(fine)) {

            alert(
                "❌ You do not have enough money to pay the fine."
            );

            return;
        }

        this.removeMoney(fine);

        localStorage.setItem(
            "hustleWantedLevel",
            "0"
        );

        this.addHistory(
            `💰 Paid police fine of ₦${this.formatMoney(fine)}.`
        );

        alert(
            `✅ Fine paid successfully!\n\n` +
            `Amount: ₦${this.formatMoney(fine)}\n` +
            `Wanted level cleared.`
        );

        this.open();
    },


    reduceWanted() {

        const wantedLevel =
            Number(
                localStorage.getItem("hustleWantedLevel") || 0
            );

        if (wantedLevel === 0) {

            alert(
                "✅ Your wanted level is already zero."
            );

            return;
        }

        const cost = 250000;

        if (!this.hasMoney(cost)) {

            alert(
                "❌ You need ₦250,000 to reduce your wanted level."
            );

            return;
        }

        this.removeMoney(cost);

        localStorage.setItem(
            "hustleWantedLevel",
            String(
                Math.max(
                    0,
                    wantedLevel - 1
                )
            )
        );

        this.addHistory(
            "🔓 Wanted level reduced by one."
        );

        alert(
            "🔓 Wanted level reduced!\n\n" +
            "Cost: ₦250,000"
        );

        this.open();
    },


    hasMoney(amount) {

        if (
            typeof window.money === "number"
        ) {
            return window.money >= amount;
        }

        if (
            typeof money === "number"
        ) {
            return money >= amount;
        }

        if (
            window.gameState &&
            typeof window.gameState.money === "number"
        ) {
            return window.gameState.money >= amount;
        }

        if (
            window.player &&
            typeof window.player.money === "number"
        ) {
            return window.player.money >= amount;
        }

        return false;
    },


    removeMoney(amount) {

        if (
            typeof window.money === "number"
        ) {

            window.money =
                Math.max(
                    0,
                    window.money - amount
                );

        } else if (
            typeof money === "number"
        ) {

            money =
                Math.max(
                    0,
                    money - amount
                );

        } else if (
            window.gameState &&
            typeof window.gameState.money === "number"
        ) {

            window.gameState.money =
                Math.max(
                    0,
                    window.gameState.money - amount
                );

        } else if (
            window.player &&
            typeof window.player.money === "number"
        ) {

            window.player.money =
                Math.max(
                    0,
                    window.player.money - amount
                );
        }

        if (
            typeof updateMoneyDisplay === "function"
        ) {
            updateMoneyDisplay();
        }

        if (
            typeof saveGame === "function"
        ) {
            saveGame();
        }
    },


    addHistory(message) {

        let history =
            JSON.parse(
                localStorage.getItem(
                    "hustlePoliceHistory"
                ) || "[]"
            );

        history.unshift({

            message: message,

            time:
                new Date().toLocaleString()

        });

        history =
            history.slice(0, 20);

        localStorage.setItem(
            "hustlePoliceHistory",
            JSON.stringify(history)
        );
    },


    renderHistory() {

        const history =
            JSON.parse(
                localStorage.getItem(
                    "hustlePoliceHistory"
                ) || "[]"
            );

        if (!history.length) {

            return `
                <p style="color:#64748b;">
                    No police records yet.
                </p>
            `;
        }

        return history.map(item => `

            <div style="
                padding:10px 0;
                border-bottom:1px solid #1f2937;
            ">

                <div>
                    ${this.escapeHTML(item.message)}
                </div>

                <small style="
                    color:#64748b;
                ">
                    ${this.escapeHTML(item.time)}
                </small>

            </div>

        `).join("");
    },


    formatMoney(amount) {

        return Number(amount).toLocaleString(
            "en-NG"
        );
    },


    escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

};


/* =========================================================
   END POLICE SYSTEM
========================================================= */
/* =========================================================
   HUSTLE LIFE — COURT & LEGAL SYSTEM
========================================================= */

window.HustleCourtUI = {

    open() {

        const panel = document.getElementById("gamePanel");

        if (!panel) {
            alert("Court system panel is unavailable.");
            return;
        }

        panel.classList.remove("hidden");

        const wanted =
            Number(localStorage.getItem("hustleWantedLevel") || 0);

        const jailTime =
            Number(localStorage.getItem("hustleJailTime") || 0);

        const remaining =
            Math.max(
                0,
                Math.ceil((jailTime - Date.now()) / 1000)
            );

        panel.innerHTML = `

            <div style="
                padding:20px;
                color:white;
                background:#090d14;
                min-height:100%;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:20px;
                ">

                    <div>
                        <h2 style="margin:0;">
                            ⚖️ Court & Legal
                        </h2>

                        <p style="
                            color:#94a3b8;
                            margin-top:5px;
                        ">
                            Manage your legal cases.
                        </p>
                    </div>

                    <button
                        onclick="closePanel()"
                        style="
                            background:#1e293b;
                            color:white;
                            border:0;
                            padding:9px 12px;
                            border-radius:8px;
                        ">
                        ✕
                    </button>

                </div>


                <div style="
                    background:#111827;
                    padding:18px;
                    border-radius:14px;
                    margin-bottom:15px;
                ">

                    <h3>🚨 Legal Status</h3>

                    <p>
                        Wanted Level:
                        <strong>${wanted}/5</strong>
                    </p>

                    <p>
                        Jail Status:
                        <strong>
                            ${
                                remaining > 0
                                ? "🔒 " + remaining + " seconds"
                                : "🟢 Free"
                            }
                        </strong>
                    </p>

                </div>


                <div style="
                    background:#111827;
                    padding:18px;
                    border-radius:14px;
                    margin-bottom:15px;
                ">

                    <h3>⚖️ Court Options</h3>

                    <button
                        onclick="HustleCourtUI.requestTrial()"
                        style="
                            width:100%;
                            padding:13px;
                            margin-bottom:10px;
                            background:#2563eb;
                            color:white;
                            border:0;
                            border-radius:9px;
                            font-weight:bold;
                        ">
                        ⚖️ Request Trial
                    </button>


                    <button
                        onclick="HustleCourtUI.postBail()"
                        style="
                            width:100%;
                            padding:13px;
                            margin-bottom:10px;
                            background:#16a34a;
                            color:white;
                            border:0;
                            border-radius:9px;
                            font-weight:bold;
                        ">
                        💰 Post Bail
                    </button>


                    <button
                        onclick="HustleCourtUI.checkRelease()"
                        style="
                            width:100%;
                            padding:13px;
                            background:#7c3aed;
                            color:white;
                            border:0;
                            border-radius:9px;
                            font-weight:bold;
                        ">
                        🔓 Check Release
                    </button>

                </div>


                <div style="
                    background:#111827;
                    padding:18px;
                    border-radius:14px;
                ">

                    <h3>📜 Court Records</h3>

                    ${this.renderCases()}

                </div>

            </div>
        `;
    },


    requestTrial() {

        const wanted =
            Number(
                localStorage.getItem("hustleWantedLevel") || 0
            );

        if (wanted === 0) {

            alert(
                "✅ You have no active criminal case."
            );

            return;
        }

        const caseNumber =
            "CASE-" +
            Math.floor(
                100000 + Math.random() * 900000
            );

        localStorage.setItem(
            "hustleActiveCase",
            caseNumber
        );

        this.addCase(
            `⚖️ Trial requested. Case ${caseNumber}.`
        );

        alert(
            "⚖️ CASE FILED\n\n" +
            `Case Number: ${caseNumber}\n\n` +
            "Your case has been submitted to court."
        );

        this.open();
    },


    postBail() {

        const jailTime =
            Number(
                localStorage.getItem("hustleJailTime") || 0
            );

        if (jailTime <= Date.now()) {

            alert(
                "🟢 You are not currently in jail."
            );

            return;
        }

        const bail = 500000;

        if (!this.hasMoney(bail)) {

            alert(
                "❌ You need ₦500,000 to post bail."
            );

            return;
        }

        this.removeMoney(bail);

        localStorage.removeItem(
            "hustleJailTime"
        );

        this.addCase(
            "💰 Bail posted. Player released from jail."
        );

        alert(
            "🔓 BAIL ACCEPTED\n\n" +
            "You have been released."
        );

        this.open();
    },


    checkRelease() {

        const jailTime =
            Number(
                localStorage.getItem("hustleJailTime") || 0
            );

        if (!jailTime || jailTime <= Date.now()) {

            localStorage.removeItem(
                "hustleJailTime"
            );

            alert(
                "🟢 You are free."
            );

            return;
        }

        const remaining =
            Math.ceil(
                (jailTime - Date.now()) / 1000
            );

        alert(
            "🔒 STILL IN JAIL\n\n" +
            `Remaining time: ${remaining} seconds`
        );

        this.open();
    },


    addCase(message) {

        let cases =
            JSON.parse(
                localStorage.getItem(
                    "hustleCourtRecords"
                ) || "[]"
            );

        cases.unshift({

            message: message,

            time:
                new Date().toLocaleString()

        });

        cases =
            cases.slice(0, 30);

        localStorage.setItem(
            "hustleCourtRecords",
            JSON.stringify(cases)
        );
    },


    renderCases() {

        const cases =
            JSON.parse(
                localStorage.getItem(
                    "hustleCourtRecords"
                ) || "[]"
            );

        if (!cases.length) {

            return `
                <p style="color:#64748b;">
                    No court records yet.
                </p>
            `;
        }

        return cases.map(item => `

            <div style="
                padding:10px 0;
                border-bottom:1px solid #1f2937;
            ">

                <div>
                    ${this.escapeHTML(item.message)}
                </div>

                <small style="
                    color:#64748b;
                ">
                    ${this.escapeHTML(item.time)}
                </small>

            </div>

        `).join("");
    },


    hasMoney(amount) {

        if (typeof window.money === "number") {
            return window.money >= amount;
        }

        if (typeof money === "number") {
            return money >= amount;
        }

        if (
            window.gameState &&
            typeof window.gameState.money === "number"
        ) {
            return window.gameState.money >= amount;
        }

        if (
            window.player &&
            typeof window.player.money === "number"
        ) {
            return window.player.money >= amount;
        }

        return false;
    },


    removeMoney(amount) {

        if (typeof window.money === "number") {

            window.money =
                Math.max(0, window.money - amount);

        } else if (typeof money === "number") {

            money =
                Math.max(0, money - amount);

        } else if (
            window.gameState &&
            typeof window.gameState.money === "number"
        ) {

            window.gameState.money =
                Math.max(
                    0,
                    window.gameState.money - amount
                );

        } else if (
            window.player &&
            typeof window.player.money === "number"
        ) {

            window.player.money =
                Math.max(
                    0,
                    window.player.money - amount
                );
        }

        if (typeof updateMoneyDisplay === "function") {
            updateMoneyDisplay();
        }

        if (typeof saveGame === "function") {
            saveGame();
        }
    },


    escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

};


/* =========================================================
   END COURT & LEGAL SYSTEM
========================================================= */
/* =========================================================
   HUSTLE LIFE — BUSINESS SYSTEM
========================================================= */

window.HustleBusinessUI = {

    businesses: [
        {
            id: "restaurant",
            name: "Restaurant",
            icon: "🍽️",
            price: 5000000,
            income: 150000,
            level: 1
        },
        {
            id: "car_dealership",
            name: "Car Dealership",
            icon: "🚘",
            price: 15000000,
            income: 450000,
            level: 1
        },
        {
            id: "tech_company",
            name: "Tech Company",
            icon: "💻",
            price: 30000000,
            income: 900000,
            level: 1
        },
        {
            id: "nightclub",
            name: "Nightclub",
            icon: "🎵",
            price: 50000000,
            income: 1500000,
            level: 1
        },
        {
            id: "security_company",
            name: "Security Company",
            icon: "🛡️",
            price: 75000000,
            income: 2200000,
            level: 1
        }
    ],


    open() {

        const panel =
            document.getElementById("gamePanel");

        if (!panel) {
            alert("Business panel unavailable.");
            return;
        }

        panel.classList.remove("hidden");

        panel.innerHTML = `

            <div style="
                padding:20px;
                color:white;
                background:#090d14;
                min-height:100%;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:20px;
                ">

                    <div>

                        <h2 style="margin:0;">
                            🏢 Businesses
                        </h2>

                        <p style="
                            color:#94a3b8;
                            margin-top:5px;
                        ">
                            Build and manage your business empire.
                        </p>

                    </div>

                    <button
                        onclick="closePanel()"
                        style="
                            background:#1e293b;
                            color:white;
                            border:0;
                            padding:9px 12px;
                            border-radius:8px;
                        ">
                        ✕
                    </button>

                </div>


                ${this.businesses.map(
                    business =>
                        this.renderBusiness(business)
                ).join("")}


                <div style="
                    background:#111827;
                    border-radius:14px;
                    padding:18px;
                    margin-top:20px;
                ">

                    <h3>
                        📊 Business Statistics
                    </h3>

                    <p>
                        Owned Businesses:
                        <strong>
                            ${this.getOwnedCount()}
                        </strong>
                    </p>

                    <p>
                        Total Level:
                        <strong>
                            ${this.getTotalLevels()}
                        </strong>
                    </p>

                    <p>
                        Income Per Collection:
                        <strong>
                            ₦${this.formatMoney(
                                this.getTotalIncome()
                            )}
                        </strong>
                    </p>

                </div>

            </div>
        `;
    },


    renderBusiness(business) {

        const data =
            this.getBusinessData(
                business.id
            );

        const owned =
            data.owned;

        const level =
            data.level;

        const income =
            business.income * level;

        const upgradeCost =
            Math.floor(
                business.price *
                0.5 *
                level
            );

        return `

            <div style="
                background:#111827;
                border:1px solid #1f2937;
                border-radius:14px;
                padding:18px;
                margin-bottom:12px;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    gap:15px;
                ">

                    <div>

                        <h3 style="
                            margin:0 0 8px;
                        ">
                            ${business.icon}
                            ${business.name}
                        </h3>

                        <p style="
                            color:#94a3b8;
                            margin:4px 0;
                        ">
                            ${
                                owned
                                ? `Level ${level}`
                                : `Price: ₦${this.formatMoney(
                                    business.price
                                )}`
                            }
                        </p>

                        <p style="
                            color:#94a3b8;
                            margin:4px 0;
                        ">
                            Income:
                            ₦${this.formatMoney(income)}
                        </p>

                    </div>


                    <div>

                        ${
                            !owned
                            ? `
                                <button
                                    onclick="
                                        HustleBusinessUI.buy(
                                            '${business.id}'
                                        )
                                    "
                                    style="
                                        background:#16a34a;
                                        color:white;
                                        border:0;
                                        padding:10px 14px;
                                        border-radius:9px;
                                        font-weight:bold;
                                    ">
                                    Buy
                                </button>
                            `
                            :
                            `
                                <button
                                    onclick="
                                        HustleBusinessUI.collect(
                                            '${business.id}'
                                        )
                                    "
                                    style="
                                        background:#2563eb;
                                        color:white;
                                        border:0;
                                        padding:10px 14px;
                                        border-radius:9px;
                                        font-weight:bold;
                                        margin-bottom:7px;
                                    ">
                                    💰 Collect
                                </button>

                                <br>

                                <button
                                    onclick="
                                        HustleBusinessUI.upgrade(
                                            '${business.id}'
                                        )
                                    "
                                    style="
                                        background:#7c3aed;
                                        color:white;
                                        border:0;
                                        padding:10px 14px;
                                        border-radius:9px;
                                        font-weight:bold;
                                    ">
                                    ⬆️ Upgrade
                                </button>
                            `
                        }

                    </div>

                </div>

            </div>
        `;
    },


    buy(id) {

        const business =
            this.businesses.find(
                item => item.id === id
            );

        if (!business) {
            return;
        }

        const data =
            this.getBusinessData(id);

        if (data.owned) {

            alert(
                "You already own this business."
            );

            return;
        }

        if (!this.hasMoney(business.price)) {

            alert(
                "❌ You do not have enough money.\n\n" +
                `Required: ₦${this.formatMoney(
                    business.price
                )}`
            );

            return;
        }

        this.removeMoney(
            business.price
        );

        data.owned = true;
        data.level = 1;
        data.lastCollection = Date.now();

        this.saveBusinessData(
            id,
            data
        );

        alert(
            `🏢 ${business.name} purchased successfully!`
        );

        this.open();
    },


    collect(id) {

        const business =
            this.businesses.find(
                item => item.id === id
            );

        if (!business) {
            return;
        }

        const data =
            this.getBusinessData(id);

        if (!data.owned) {

            alert(
                "You do not own this business."
            );

            return;
        }

        const now =
            Date.now();

        const last =
            Number(
                data.lastCollection || now
            );

        const hours =
            Math.max(
                0,
                Math.floor(
                    (now - last) /
                    (60 * 60 * 1000)
                )
            );

        if (hours < 1) {

            alert(
                "⏳ Your business has not generated " +
                "a new collection yet.\n\n" +
                "Come back after at least 1 hour."
            );

            return;
        }

        const income =
            business.income *
            data.level *
            hours;

        this.addMoney(income);

        data.lastCollection = now;

        this.saveBusinessData(
            id,
            data
        );

        alert(
            `💰 Collection successful!\n\n` +
            `Business: ${business.name}\n` +
            `Hours: ${hours}\n` +
            `Earned: ₦${this.formatMoney(income)}`
        );

        this.open();
    },


    upgrade(id) {

        const business =
            this.businesses.find(
                item => item.id === id
            );

        if (!business) {
            return;
        }

        const data =
            this.getBusinessData(id);

        if (!data.owned) {

            alert(
                "Buy the business first."
            );

            return;
        }

        if (data.level >= 10) {

            alert(
                "⭐ This business has reached maximum level."
            );

            return;
        }

        const cost =
            Math.floor(
                business.price *
                0.5 *
                data.level
            );

        if (!this.hasMoney(cost)) {

            alert(
                "❌ Not enough money.\n\n" +
                `Upgrade cost: ₦${this.formatMoney(cost)}`
            );

            return;
        }

        this.removeMoney(cost);

        data.level++;

        this.saveBusinessData(
            id,
            data
        );

        alert(
            `⬆️ ${business.name} upgraded!\n\n` +
            `New Level: ${data.level}`
        );

        this.open();
    },


    getBusinessData(id) {

        const key =
            "hustleBusiness_" + id;

        const saved =
            localStorage.getItem(key);

        if (saved) {

            try {
                return JSON.parse(saved);
            } catch (error) {
                console.warn(
                    "Invalid business data."
                );
            }
        }

        return {
            owned: false,
            level: 1,
            lastCollection: Date.now()
        };
    },


    saveBusinessData(id, data) {

        localStorage.setItem(
            "hustleBusiness_" + id,
            JSON.stringify(data)
        );
    },


    getOwnedCount() {

        return this.businesses.filter(
            business =>
                this.getBusinessData(
                    business.id
                ).owned
        ).length;
    },


    getTotalLevels() {

        return this.businesses.reduce(
            (total, business) => {

                const data =
                    this.getBusinessData(
                        business.id
                    );

                return total +
                    (data.owned
                        ? data.level
                        : 0);

            },
            0
        );
    },


    getTotalIncome() {

        return this.businesses.reduce(
            (total, business) => {

                const data =
                    this.getBusinessData(
                        business.id
                    );

                if (!data.owned) {
                    return total;
                }

                return total +
                    business.income *
                    data.level;

            },
            0
        );
    },


    hasMoney(amount) {

        if (
            typeof window.money === "number"
        ) {
            return window.money >= amount;
        }

        if (
            typeof money === "number"
        ) {
            return money >= amount;
        }

        if (
            window.gameState &&
            typeof window.gameState.money === "number"
        ) {
            return window.gameState.money >= amount;
        }

        if (
            window.player &&
            typeof window.player.money === "number"
        ) {
            return window.player.money >= amount;
        }

        return false;
    },


    addMoney(amount) {

        if (
            typeof window.money === "number"
        ) {
            window.money += amount;

        } else if (
            typeof money === "number"
        ) {
            money += amount;

        } else if (
            window.gameState &&
            typeof window.gameState.money === "number"
        ) {
            window.gameState.money += amount;

        } else if (
            window.player &&
            typeof window.player.money === "number"
        ) {
            window.player.money += amount;
        }

        if (
            typeof updateMoneyDisplay === "function"
        ) {
            updateMoneyDisplay();
        }

        if (
            typeof saveGame === "function"
        ) {
            saveGame();
        }
    },


    removeMoney(amount) {

        if (
            typeof window.money === "number"
        ) {
            window.money =
                Math.max(
                    0,
                    window.money - amount
                );

        } else if (
            typeof money === "number"
        ) {
            money =
                Math.max(
                    0,
                    money - amount
                );

        } else if (
            window.gameState &&
            typeof window.gameState.money === "number"
        ) {
            window.gameState.money =
                Math.max(
                    0,
                    window.gameState.money - amount
                );

        } else if (
            window.player &&
            typeof window.player.money === "number"
        ) {
            window.player.money =
                Math.max(
                    0,
                    window.player.money - amount
                );
        }

        if (
            typeof updateMoneyDisplay === "function"
        ) {
            updateMoneyDisplay();
        }

        if (
            typeof saveGame === "function"
        ) {
            saveGame();
        }
    },


    formatMoney(amount) {

        return Number(
            amount
        ).toLocaleString("en-NG");
    }

};


/* =========================================================
   END BUSINESS SYSTEM
========================================================= */
/* =========================================================
   HUSTLE LIFE — PROPERTY SYSTEM
========================================================= */

window.HustlePropertyUI = {

    properties: [

        {
            id: "small_house",
            name: "Small House",
            icon: "🏠",
            price: 10000000,
            rent: 250000
        },

        {
            id: "luxury_house",
            name: "Luxury House",
            icon: "🏡",
            price: 50000000,
            rent: 1500000
        },

        {
            id: "penthouse",
            name: "Penthouse",
            icon: "🏙️",
            price: 150000000,
            rent: 5000000
        },

        {
            id: "office_building",
            name: "Office Building",
            icon: "🏢",
            price: 300000000,
            rent: 10000000
        },

        {
            id: "hotel",
            name: "Luxury Hotel",
            icon: "🏨",
            price: 750000000,
            rent: 25000000
        }

    ],


    open() {

        const panel =
            document.getElementById("gamePanel");

        if (!panel) {

            alert(
                "Property panel unavailable."
            );

            return;
        }

        panel.classList.remove("hidden");

        panel.innerHTML = `

            <div style="
                padding:12px;
                color:white;
                background:#090d14;
                height:100%;
                max-height:calc(100vh - 40px);
                overflow-y:auto;
                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:10px;
                ">
                    margin-bottom:20px;
                ">

                    <div>

                        <h2 style="margin:0;">
                            🏠 Properties
                        <p style="
                            color:#94a3b8;
                            margin:3px 0 0;
                            font-size:13px;
                        ">
                            Build your property empire.
                        </p>
                            Build your property empire.
                        </p>

                    </div>


                    <button
                        onclick="closePanel()"
                        style="
                            background:#1e293b;
                            color:white;
                            border:0;
                            padding:9px 12px;
                            border-radius:8px;
                        ">
                        ✕
                    </button>

                </div>


                ${this.properties.map(
                    property =>
                        this.renderProperty(property)
                ).join("")}


                <div style="
                    background:#111827;
                    padding:12px;
                    border-radius:10px;
                    margin-top:10px;
                ">

                    <h3>
                        📊 Property Statistics
                    </h3>

                    <p>
                        Properties Owned:
                        <strong>
                            ${this.getOwnedCount()}
                        </strong>
                    </p>

                    <p>
                        Total Property Value:
                        <strong>
                            ₦${this.formatMoney(
                                this.getTotalValue()
                            )}
                        </strong>
                    </p>

                    <p>
                        Rent Per Collection:
                        <strong>
                            ₦${this.formatMoney(
                                this.getTotalRent()
                            )}
                        </strong>
                    </p>

                </div>

            </div>
        `;
    },


    renderProperty(property) {

        const data =
            this.getPropertyData(
                property.id
            );

        const owned =
            data.owned;

        const level =
            data.level;

        const rent =
            property.rent * level;

        const upgradeCost =
            Math.floor(
                property.price *
                0.25 *
                level
            );

        return `

            <div style="
                background:#111827;
                border:1px solid #1f2937;
                border-radius:10px;
                padding:11px;
                margin-bottom:8px;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    gap:10px;
                ">

                    <div style="
                        min-width:0;
                    ">

                        <h3 style="
                            margin:0 0 4px;
                            font-size:16px;
                            line-height:1.2;
                        ">
                            ${property.icon}
                            ${property.name}
                        </h3>

                        <p style="
                            color:#94a3b8;
                            margin:2px 0;
                            font-size:13px;
                        ">
                            ${
                                owned
                                ? `Level ${level}`
                                : `Price: ₦${this.formatMoney(
                                    property.price
                                )}`
                            }
                        </p>

                        <p style="
                            color:#94a3b8;
                            margin:2px 0;
                            font-size:13px;
                        ">
                            Rent:
                            ₦${this.formatMoney(rent)}
                        </p>

                    </div>

                    <div style="
                        flex-shrink:0;
                        text-align:right;
                    ">

                        ${
                            !owned

                            ? `

                                <button
                                    onclick="
                                        HustlePropertyUI.buy(
                                            '${property.id}'
                                        )
                                    "
                                    style="
                                        background:#16a34a;
                                        color:white;
                                        border:0;
                                        padding:8px 13px;
                                        border-radius:8px;
                                        font-weight:bold;
                                        font-size:13px;
                                    ">
                                    Buy
                                </button>

                            `

                            :

                            `

                                <button
                                    onclick="
                                        HustlePropertyUI.collectRent(
                                            '${property.id}'
                                        )
                                    "
                                    style="
                                        background:#2563eb;
                                        color:white;
                                        border:0;
                                        padding:7px 10px;
                                        border-radius:7px;
                                        font-weight:bold;
                                        font-size:12px;
                                        margin-bottom:4px;
                                    ">
                                    💰 Rent
                                </button>

                                <br>

                                <button
                                    onclick="
                                        HustlePropertyUI.upgrade(
                                            '${property.id}'
                                        )
                                    "
                                    style="
                                        background:#7c3aed;
                                        color:white;
                                        border:0;
                                        padding:7px 10px;
                                        border-radius:7px;
                                        font-weight:bold;
                                        font-size:12px;
                                    ">
                                    ⬆️ Upgrade
                                </button>

                            `
                        }

                    </div>

                </div>

            </div>

        `;
    },

    buy(id) {

        const property =
            this.properties.find(
                item =>
                    item.id === id
            );

        if (!property) {
            return;
        }

        const data =
            this.getPropertyData(id);

        if (data.owned) {

            alert(
                "You already own this property."
            );

            return;
        }

        if (
            !this.hasMoney(
                property.price
            )
        ) {

            alert(
                "❌ You do not have enough money.\n\n" +
                `Required: ₦${this.formatMoney(
                    property.price
                )}`
            );

            return;
        }

        this.removeMoney(
            property.price
        );

        data.owned = true;

        data.level = 1;

        data.lastCollection =
            Date.now();

        this.savePropertyData(
            id,
            data
        );

        alert(
            `🏠 ${property.name} purchased successfully!`
        );

        this.open();
    },


    collectRent(id) {

        const property =
            this.properties.find(
                item =>
                    item.id === id
            );

        if (!property) {
            return;
        }

        const data =
            this.getPropertyData(id);

        if (!data.owned) {

            alert(
                "You do not own this property."
            );

            return;
        }

        const now =
            Date.now();

        const last =
            Number(
                data.lastCollection ||
                now
            );

        const hours =
            Math.max(
                0,
                Math.floor(
                    (
                        now -
                        last
                    ) /
                    (
                        60 *
                        60 *
                        1000
                    )
                )
            );

        if (hours < 1) {

            alert(
                "⏳ No new rent is available yet.\n\n" +
                "Come back after at least 1 hour."
            );

            return;
        }

        const income =
            property.rent *
            data.level *
            hours;

        this.addMoney(
            income
        );

        data.lastCollection =
            now;

        this.savePropertyData(
            id,
            data
        );

        alert(
            `💰 RENT COLLECTED!\n\n` +
            `Property: ${property.name}\n` +
            `Hours: ${hours}\n` +
            `Earned: ₦${this.formatMoney(
                income
            )}`
        );

        this.open();
    },


    upgrade(id) {

        const property =
            this.properties.find(
                item =>
                    item.id === id
            );

        if (!property) {
            return;
        }

        const data =
            this.getPropertyData(id);

        if (!data.owned) {

            alert(
                "Buy the property first."
            );

            return;
        }

        if (data.level >= 10) {

            alert(
                "⭐ Maximum property level reached."
            );

            return;
        }

        const cost =
            Math.floor(
                property.price *
                0.25 *
                data.level
            );

        if (
            !this.hasMoney(cost)
        ) {

            alert(
                "❌ Not enough money.\n\n" +
                `Upgrade cost: ₦${this.formatMoney(
                    cost
                )}`
            );

            return;
        }

        this.removeMoney(
            cost
        );

        data.level++;

        this.savePropertyData(
            id,
            data
        );

        alert(
            `⬆️ ${property.name} upgraded!\n\n` +
            `New Level: ${data.level}`
        );

        this.open();
    },


    getPropertyData(id) {

        const key =
            "hustleProperty_" + id;

        const saved =
            localStorage.getItem(key);

        if (saved) {

            try {

                return JSON.parse(
                    saved
                );

            } catch (error) {

                console.warn(
                    "Invalid property data."
                );

            }

        }

        return {

            owned: false,

            level: 1,

            lastCollection:
                Date.now()

        };
    },


    savePropertyData(
        id,
        data
    ) {

        localStorage.setItem(
            "hustleProperty_" + id,
            JSON.stringify(data)
        );
    },


    getOwnedCount() {

        return this.properties.filter(
            property =>
                this.getPropertyData(
                    property.id
                ).owned
        ).length;
    },


    getTotalValue() {

        return this.properties.reduce(
            (
                total,
                property
            ) => {

                const data =
                    this.getPropertyData(
                        property.id
                    );

                if (!data.owned) {
                    return total;
                }

                return total +
                    property.price *
                    data.level;

            },
            0
        );
    },


    getTotalRent() {

        return this.properties.reduce(
            (
                total,
                property
            ) => {

                const data =
                    this.getPropertyData(
                        property.id
                    );

                if (!data.owned) {
                    return total;
                }

                return total +
                    property.rent *
                    data.level;

            },
            0
        );
    },


    hasMoney(amount) {

        if (
            typeof window.money ===
            "number"
        ) {

            return window.money >= amount;
        }

        if (
            typeof money ===
            "number"
        ) {

            return money >= amount;
        }

        if (
            window.gameState &&
            typeof window.gameState.money ===
            "number"
        ) {

            return (
                window.gameState.money >=
                amount
            );
        }

        if (
            window.player &&
            typeof window.player.money ===
            "number"
        ) {

            return (
                window.player.money >=
                amount
            );
        }

        return false;
    },


    addMoney(amount) {

        if (
            typeof window.money ===
            "number"
        ) {

            window.money += amount;

        } else if (
            typeof money ===
            "number"
        ) {

            money += amount;

        } else if (
            window.gameState &&
            typeof window.gameState.money ===
            "number"
        ) {

            window.gameState.money +=
                amount;

        } else if (
            window.player &&
            typeof window.player.money ===
            "number"
        ) {

            window.player.money +=
                amount;
        }

        if (
            typeof updateMoneyDisplay ===
            "function"
        ) {

            updateMoneyDisplay();
        }

        if (
            typeof saveGame ===
            "function"
        ) {

            saveGame();
        }
    },


    removeMoney(amount) {

        if (
            typeof window.money ===
            "number"
        ) {

            window.money =
                Math.max(
                    0,
                    window.money -
                    amount
                );

        } else if (
            typeof money ===
            "number"
        ) {

            money =
                Math.max(
                    0,
                    money -
                    amount
                );

        } else if (
            window.gameState &&
            typeof window.gameState.money ===
            "number"
        ) {

            window.gameState.money =
                Math.max(
                    0,
                    window.gameState.money -
                    amount
                );

        } else if (
            window.player &&
            typeof window.player.money ===
            "number"
        ) {

            window.player.money =
                Math.max(
                    0,
                    window.player.money -
                    amount
                );
        }

        if (
            typeof updateMoneyDisplay ===
            "function"
        ) {

            updateMoneyDisplay();
        }

        if (
            typeof saveGame ===
            "function"
        ) {

            saveGame();
        }
    },


    formatMoney(amount) {

        return Number(
            amount
        ).toLocaleString(
            "en-NG"
        );
    }

};


/* =========================================================
   END PROPERTY SYSTEM
========================================================= */
/* =========================================================
   HUSTLE LIFE — VEHICLE SYSTEM
========================================================= */

window.HustleVehicleUI = {

    vehicles: [

        {
            id: "toyota",
            name: "Toyota Camry",
            icon: "🚗",
            price: 12000000,
            value: 12000000
        },

        {
            id: "benz",
            name: "Mercedes-Benz",
            icon: "🚘",
            price: 35000000,
            value: 35000000
        },

        {
            id: "range_rover",
            name: "Range Rover",
            icon: "🚙",
            price: 65000000,
            value: 65000000
        },

        {
            id: "lamborghini",
            name: "Lamborghini",
            icon: "🏎️",
            price: 250000000,
            value: 250000000
        },

        {
            id: "rolls_royce",
            name: "Rolls-Royce",
            icon: "🚘",
            price: 500000000,
            value: 500000000
        }

    ],


    open() {

        const panel =
            document.getElementById(
                "gamePanel"
            );

        if (!panel) {

            alert(
                "Vehicle panel unavailable."
            );

            return;
        }

        panel.classList.remove(
            "hidden"
        );

        panel.innerHTML = `

            <div style="
                padding:20px;
                color:white;
                background:#090d14;
                min-height:100%;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:20px;
                ">

                    <div>

                        <h2 style="margin:0;">
                            🚗 Vehicles
                        </h2>

                        <p style="
                            color:#94a3b8;
                            margin-top:5px;
                        ">
                            Build your vehicle collection.
                        </p>

                    </div>


                    <button
                        onclick="closePanel()"
                        style="
                            background:#1e293b;
                            color:white;
                            border:0;
                            padding:9px 12px;
                            border-radius:8px;
                        ">
                        ✕
                    </button>

                </div>


                ${this.vehicles.map(
                    vehicle =>
                        this.renderVehicle(
                            vehicle
                        )
                ).join("")}


                <div style="
                    background:#111827;
                    padding:18px;
                    border-radius:14px;
                    margin-top:20px;
                ">

                    <h3>
                        📊 Garage Statistics
                    </h3>

                    <p>
                        Vehicles Owned:
                        <strong>
                            ${this.getOwnedCount()}
                        </strong>
                    </p>

                    <p>
                        Garage Value:
                        <strong>
                            ₦${this.formatMoney(
                                this.getGarageValue()
                            )}
                        </strong>
                    </p>

                </div>

            </div>
        `;
    },


    renderVehicle(vehicle) {

        const data =
            this.getVehicleData(
                vehicle.id
            );

        const owned =
            data.owned;

        const level =
            data.level;

        const currentValue =
            Math.floor(
                vehicle.value *
                (
                    1 +
                    (level - 1) *
                    0.1
                )
            );

        const upgradeCost =
            Math.floor(
                vehicle.price *
                0.15 *
                level
            );

        return `

            <div style="
                background:#111827;
                border:1px solid #1f2937;
                border-radius:14px;
                padding:18px;
                margin-bottom:12px;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    gap:15px;
                ">

                    <div>

                        <h3 style="
                            margin:0 0 8px;
                        ">
                            ${vehicle.icon}
                            ${vehicle.name}
                        </h3>


                        <p style="
                            color:#94a3b8;
                            margin:4px 0;
                        ">
                            ${
                                owned
                                ? `Level ${level}`
                                : `Price: ₦${this.formatMoney(
                                    vehicle.price
                                )}`
                            }
                        </p>


                        <p style="
                            color:#94a3b8;
                            margin:4px 0;
                        ">
                            Value:
                            ₦${this.formatMoney(
                                currentValue
                            )}
                        </p>

                    </div>


                    <div>

                        ${
                            !owned

                            ?

                            `

                                <button
                                    onclick="
                                        HustleVehicleUI.buy(
                                            '${vehicle.id}'
                                        )
                                    "
                                    style="
                                        background:#16a34a;
                                        color:white;
                                        border:0;
                                        padding:10px 14px;
                                        border-radius:9px;
                                        font-weight:bold;
                                    ">
                                    Buy
                                </button>

                            `

                            :

                            `

                                <button
                                    onclick="
                                        HustleVehicleUI.upgrade(
                                            '${vehicle.id}'
                                        )
                                    "
                                    style="
                                        background:#7c3aed;
                                        color:white;
                                        border:0;
                                        padding:10px 14px;
                                        border-radius:9px;
                                        font-weight:bold;
                                        margin-bottom:7px;
                                    ">
                                    ⬆️ Upgrade
                                </button>

                                <br>

                                <button
                                    onclick="
                                        HustleVehicleUI.sell(
                                            '${vehicle.id}'
                                        )
                                    "
                                    style="
                                        background:#dc2626;
                                        color:white;
                                        border:0;
                                        padding:10px 14px;
                                        border-radius:9px;
                                        font-weight:bold;
                                    ">
                                    💰 Sell
                                </button>

                            `
                        }

                    </div>

                </div>

            </div>

        `;
    },


    buy(id) {

        const vehicle =
            this.vehicles.find(
                item =>
                    item.id === id
            );

        if (!vehicle) {
            return;
        }

        const data =
            this.getVehicleData(id);

        if (data.owned) {

            alert(
                "You already own this vehicle."
            );

            return;
        }

        if (
            !this.hasMoney(
                vehicle.price
            )
        ) {

            alert(
                "❌ You do not have enough money.\n\n" +
                `Required: ₦${this.formatMoney(
                    vehicle.price
                )}`
            );

            return;
        }

        this.removeMoney(
            vehicle.price
        );

        data.owned = true;

        data.level = 1;

        this.saveVehicleData(
            id,
            data
        );

        alert(
            `🚗 ${vehicle.name} purchased successfully!`
        );

        this.open();
    },


    upgrade(id) {

        const vehicle =
            this.vehicles.find(
                item =>
                    item.id === id
            );

        if (!vehicle) {
            return;
        }

        const data =
            this.getVehicleData(id);

        if (!data.owned) {

            alert(
                "Buy the vehicle first."
            );

            return;
        }

        if (data.level >= 10) {

            alert(
                "⭐ Maximum vehicle level reached."
            );

            return;
        }

        const cost =
            Math.floor(
                vehicle.price *
                0.15 *
                data.level
            );

        if (
            !this.hasMoney(cost)
        ) {

            alert(
                "❌ Not enough money.\n\n" +
                `Upgrade cost: ₦${this.formatMoney(
                    cost
                )}`
            );

            return;
        }

        this.removeMoney(
            cost
        );

        data.level++;

        this.saveVehicleData(
            id,
            data
        );

        alert(
            `⬆️ ${vehicle.name} upgraded!\n\n` +
            `New Level: ${data.level}`
        );

        this.open();
    },


    sell(id) {

        const vehicle =
            this.vehicles.find(
                item =>
                    item.id === id
            );

        if (!vehicle) {
            return;
        }

        const data =
            this.getVehicleData(id);

        if (!data.owned) {

            alert(
                "You do not own this vehicle."
            );

            return;
        }

        const value =
            Math.floor(
                vehicle.value *
                (
                    1 +
                    (data.level - 1) *
                    0.1
                )
            );

        const salePrice =
            Math.floor(
                value * 0.75
            );

        const confirmed =
            confirm(
                `Sell ${vehicle.name}?\n\n` +
                `Sale price: ₦${this.formatMoney(
                    salePrice
                )}`
            );

        if (!confirmed) {
            return;
        }

        this.addMoney(
            salePrice
        );

        localStorage.removeItem(
            "hustleVehicle_" + id
        );

        alert(
            `💰 ${vehicle.name} sold for ₦${this.formatMoney(
                salePrice
            )}.`
        );

        this.open();
    },


    getVehicleData(id) {

        const saved =
            localStorage.getItem(
                "hustleVehicle_" + id
            );

        if (saved) {

            try {

                return JSON.parse(
                    saved
                );

            } catch (error) {

                console.warn(
                    "Invalid vehicle data."
                );

            }

        }

        return {

            owned: false,

            level: 1

        };
    },


    saveVehicleData(
        id,
        data
    ) {

        localStorage.setItem(
            "hustleVehicle_" + id,
            JSON.stringify(data)
        );
    },


    getOwnedCount() {

        return this.vehicles.filter(
            vehicle =>
                this.getVehicleData(
                    vehicle.id
                ).owned
        ).length;
    },


    getGarageValue() {

        return this.vehicles.reduce(
            (
                total,
                vehicle
            ) => {

                const data =
                    this.getVehicleData(
                        vehicle.id
                    );

                if (!data.owned) {
                    return total;
                }

                return total +
                    Math.floor(
                        vehicle.value *
                        (
                            1 +
                            (
                                data.level -
                                1
                            ) *
                            0.1
                        )
                    );

            },
            0
        );
    },


    hasMoney(amount) {

        if (
            typeof window.money ===
            "number"
        ) {

            return (
                window.money >=
                amount
            );
        }

        if (
            typeof money ===
            "number"
        ) {

            return (
                money >=
                amount
            );
        }

        if (
            window.gameState &&
            typeof window.gameState.money ===
            "number"
        ) {

            return (
                window.gameState.money >=
                amount
            );
        }

        if (
            window.player &&
            typeof window.player.money ===
            "number"
        ) {

            return (
                window.player.money >=
                amount
            );
        }

        return false;
    },


    addMoney(amount) {

        if (
            typeof window.money ===
            "number"
        ) {

            window.money +=
                amount;

        } else if (
            typeof money ===
            "number"
        ) {

            money +=
                amount;

        } else if (
            window.gameState &&
            typeof window.gameState.money ===
            "number"
        ) {

            window.gameState.money +=
                amount;

        } else if (
            window.player &&
            typeof window.player.money ===
            "number"
        ) {

            window.player.money +=
                amount;
        }

        if (
            typeof updateMoneyDisplay ===
            "function"
        ) {

            updateMoneyDisplay();
        }

        if (
            typeof saveGame ===
            "function"
        ) {

            saveGame();
        }
    },


    removeMoney(amount) {

        if (
            typeof window.money ===
            "number"
        ) {

            window.money =
                Math.max(
                    0,
                    window.money -
                    amount
                );

        } else if (
            typeof money ===
            "number"
        ) {

            money =
                Math.max(
                    0,
                    money -
                    amount
                );

        } else if (
            window.gameState &&
            typeof window.gameState.money ===
            "number"
        ) {

            window.gameState.money =
                Math.max(
                    0,
                    window.gameState.money -
                    amount
                );

        } else if (
            window.player &&
            typeof window.player.money ===
            "number"
        ) {

            window.player.money =
                Math.max(
                    0,
                    window.player.money -
                    amount
                );
        }

        if (
            typeof updateMoneyDisplay ===
            "function"
        ) {

            updateMoneyDisplay();
        }

        if (
            typeof saveGame ===
            "function"
        ) {

            saveGame();
        }
    },


    formatMoney(amount) {

        return Number(
            amount
        ).toLocaleString(
            "en-NG"
        );
    }

};


/* =========================================================
   END VEHICLE SYSTEM
========================================================= */
/* =========================================================
   HUSTLE LIFE — PHONE SYSTEM
========================================================= */

window.HustlePhoneUI = (() => {

    const contactsKey = "hustlePhoneContacts";
    const callsKey = "hustlePhoneCalls";
    const messagesKey = "hustlePhoneMessages";

    function getContacts() {
        return JSON.parse(localStorage.getItem(contactsKey) || "[]");
    }

    function getCalls() {
        return JSON.parse(localStorage.getItem(callsKey) || "[]");
    }

    function getMessages() {
        return JSON.parse(localStorage.getItem(messagesKey) || "[]");
    }

    function saveContacts(data) {
        localStorage.setItem(contactsKey, JSON.stringify(data));
    }

    function saveCalls(data) {
        localStorage.setItem(callsKey, JSON.stringify(data));
    }

    function saveMessages(data) {
        localStorage.setItem(messagesKey, JSON.stringify(data));
    }

    function open() {

        const contacts = getContacts();
        const calls = getCalls();
        const messages = getMessages();

        const panel = document.getElementById("gamePanel");

        if (!panel) {
            alert("Game panel not found.");
            return;
        }

        panel.classList.remove("hidden");

        panel.innerHTML = `
            <div style="
                padding:20px;
                max-height:85vh;
                overflow-y:auto;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:20px;
                ">

                    <h2>📱 Phone</h2>

                    <button
                        onclick="closePanel()"
                        style="
                            padding:8px 14px;
                            border:none;
                            border-radius:8px;
                            cursor:pointer;
                        "
                    >
                        ✕
                    </button>

                </div>


                <!-- PHONE STATUS -->

                <div style="
                    padding:15px;
                    border-radius:12px;
                    margin-bottom:15px;
                    background:rgba(20,30,45,.8);
                ">

                    <h3>📶 Phone Status</h3>

                    <p>
                        Network:
                        <strong>Connected</strong>
                    </p>

                    <p>
                        Signal:
                        <strong>█████</strong>
                    </p>

                    <p>
                        Contacts:
                        <strong>${contacts.length}</strong>
                    </p>

                    <p>
                        Messages:
                        <strong>${messages.length}</strong>
                    </p>

                </div>


                <!-- PHONE ACTIONS -->

                <div style="
                    display:grid;
                    grid-template-columns:repeat(2,1fr);
                    gap:10px;
                    margin-bottom:20px;
                ">

                    <button
                        onclick="window.HustlePhoneUI.addContact()"
                        style="padding:15px;border-radius:10px;border:none;cursor:pointer;"
                    >
                        👤
                        <br>
                        Add Contact
                    </button>


                    <button
                        onclick="window.HustlePhoneUI.contacts()"
                        style="padding:15px;border-radius:10px;border:none;cursor:pointer;"
                    >
                        📒
                        <br>
                        Contacts
                    </button>


                    <button
                        onclick="window.HustlePhoneUI.dial()"
                        style="padding:15px;border-radius:10px;border:none;cursor:pointer;"
                    >
                        📞
                        <br>
                        Make Call
                    </button>


                    <button
                        onclick="window.HustlePhoneUI.callHistory()"
                        style="padding:15px;border-radius:10px;border:none;cursor:pointer;"
                    >
                        🕘
                        <br>
                        Call History
                    </button>


                    <button
                        onclick="window.HustlePhoneUI.sendMessage()"
                        style="padding:15px;border-radius:10px;border:none;cursor:pointer;"
                    >
                        💬
                        <br>
                        Messages
                    </button>


                    <button
                        onclick="window.HustlePhoneUI.messageHistory()"
                        style="padding:15px;border-radius:10px;border:none;cursor:pointer;"
                    >
                        📩
                        <br>
                        Message History
                    </button>

                </div>


                <!-- PHONE NUMBER -->

                <div style="
                    padding:18px;
                    border-radius:12px;
                    background:rgba(20,30,45,.8);
                    text-align:center;
                ">

                    <h3>📱 Your Number</h3>

                    <div style="
                        font-size:24px;
                        font-weight:bold;
                        margin-top:10px;
                    ">
                        +234 800 HUSTLE
                    </div>

                </div>

            </div>
        `;
    }


    function addContact() {

        const name = prompt("Enter contact name:");

        if (!name) return;

        const phone = prompt("Enter phone number:");

        if (!phone) return;

        const contacts = getContacts();

        contacts.push({
            id: Date.now(),
            name: name,
            phone: phone,
            createdAt: new Date().toLocaleString()
        });

        saveContacts(contacts);

        alert("Contact saved.");

        open();
    }


    function contacts() {

        const contacts = getContacts();

        const panel = document.getElementById("gamePanel");

        if (!panel) return;

        panel.classList.remove("hidden");

        let html = `
            <div style="padding:20px">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                ">

                    <h2>📒 Contacts</h2>

                    <button onclick="window.HustlePhoneUI.open()">
                        Back
                    </button>

                </div>

                <hr>
        `;

        if (contacts.length === 0) {

            html += `
                <p style="margin-top:20px">
                    No contacts saved yet.
                </p>
            `;

        } else {

            contacts.forEach(contact => {

                html += `
                    <div style="
                        padding:15px;
                        margin:10px 0;
                        border-radius:10px;
                        background:rgba(20,30,45,.8);
                    ">

                        <strong>
                            👤 ${escapeHTML(contact.name)}
                        </strong>

                        <p>
                            📱 ${escapeHTML(contact.phone)}
                        </p>

                        <button
                            onclick="window.HustlePhoneUI.call('${contact.phone}')"
                        >
                            📞 Call
                        </button>

                        <button
                            onclick="window.HustlePhoneUI.message('${contact.phone}')"
                        >
                            💬 Message
                        </button>

                        <button
                            onclick="window.HustlePhoneUI.deleteContact(${contact.id})"
                        >
                            🗑️ Delete
                        </button>

                    </div>
                `;

            });

        }

        html += `</div>`;

        panel.innerHTML = html;
    }


    function deleteContact(id) {

        if (!confirm("Delete this contact?")) return;

        let contacts = getContacts();

        contacts = contacts.filter(contact => contact.id !== id);

        saveContacts(contacts);

        contacts();
    }


    function dial() {

        const number = prompt("Enter phone number:");

        if (!number) return;

        call(number);
    }


    function call(number) {

        const calls = getCalls();

        calls.unshift({
            id: Date.now(),
            number: number,
            type: "Outgoing",
            status: "Completed",
            time: new Date().toLocaleString()
        });

        saveCalls(calls);

        alert(
            "📞 Calling " +
            number +
            "..."
        );

        setTimeout(() => {

            alert(
                "📞 Call ended with " +
                number
            );

        }, 1000);
    }


    function callHistory() {

        const calls = getCalls();

        const panel = document.getElementById("gamePanel");

        if (!panel) return;

        panel.innerHTML = `
            <div style="padding:20px">

                <button
                    onclick="window.HustlePhoneUI.open()"
                >
                    ← Back
                </button>

                <h2 style="margin-top:20px">
                    🕘 Call History
                </h2>

                <hr>

                ${
                    calls.length === 0
                    ?
                    "<p>No calls yet.</p>"
                    :
                    calls.map(call => `
                        <div style="
                            padding:15px;
                            margin:10px 0;
                            border-radius:10px;
                            background:rgba(20,30,45,.8);
                        ">

                            <strong>
                                📞 ${escapeHTML(call.number)}
                            </strong>

                            <p>
                                ${escapeHTML(call.type)}
                            </p>

                            <p>
                                ${escapeHTML(call.status)}
                            </p>

                            <small>
                                ${escapeHTML(call.time)}
                            </small>

                        </div>
                    `).join("")
                }

            </div>
        `;
    }


    function sendMessage() {

        const number = prompt("Enter phone number:");

        if (!number) return;

        message(number);
    }


    function message(number) {

        const text = prompt(
            "Enter your message:"
        );

        if (!text) return;

        const messages = getMessages();

        messages.unshift({
            id: Date.now(),
            number: number,
            text: text,
            type: "Sent",
            time: new Date().toLocaleString()
        });

        saveMessages(messages);

        alert("💬 Message sent.");

    }


    function messageHistory() {

        const messages = getMessages();

        const panel = document.getElementById("gamePanel");

        if (!panel) return;

        panel.innerHTML = `
            <div style="padding:20px">

                <button
                    onclick="window.HustlePhoneUI.open()"
                >
                    ← Back
                </button>

                <h2 style="margin-top:20px">
                    💬 Messages
                </h2>

                <hr>

                ${
                    messages.length === 0
                    ?
                    "<p>No messages yet.</p>"
                    :
                    messages.map(msg => `
                        <div style="
                            padding:15px;
                            margin:10px 0;
                            border-radius:10px;
                            background:rgba(20,30,45,.8);
                        ">

                            <strong>
                                📱 ${escapeHTML(msg.number)}
                            </strong>

                            <p style="
                                margin-top:8px;
                                word-break:break-word;
                            ">
                                ${escapeHTML(msg.text)}
                            </p>

                            <small>
                                ${escapeHTML(msg.time)}
                            </small>

                        </div>
                    `).join("")
                }

            </div>
        `;
    }


    return {
        open,
        addContact,
        contacts,
        deleteContact,
        dial,
        call,
        callHistory,
        sendMessage,
        message,
        messageHistory
    };

})();


/* =========================================================
   END PHONE SYSTEM
========================================================= */
