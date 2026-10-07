/* =========================================================
   HUSTLE LIFE - VEHICLE SYSTEM
========================================================= */

window.HustleVehicleUI = {

    vehicles: [

        {
            id: "compact",
            name: "Hustle Compact",
            type: "Car",
            price: 5000000,
            speed: 60,
            handling: 70,
            luxury: 30,
            emoji: "🚗"
        },

        {
            id: "sedan",
            name: "Hustle Sedan",
            type: "Car",
            price: 12000000,
            speed: 70,
            handling: 75,
            luxury: 50,
            emoji: "🚘"
        },

        {
            id: "suv",
            name: "Hustle SUV",
            type: "SUV",
            price: 25000000,
            speed: 65,
            handling: 70,
            luxury: 70,
            emoji: "🚙"
        },

        {
            id: "sports",
            name: "Hustle Sports",
            type: "Sports Car",
            price: 75000000,
            speed: 95,
            handling: 90,
            luxury: 80,
            emoji: "🏎️"
        },

        {
            id: "supercar",
            name: "Hustle Supercar",
            type: "Supercar",
            price: 250000000,
            speed: 100,
            handling: 95,
            luxury: 100,
            emoji: "🏎️"
        },

        {
            id: "luxury",
            name: "Hustle Luxury",
            type: "Luxury",
            price: 500000000,
            speed: 90,
            handling: 90,
            luxury: 100,
            emoji: "🚘"
        },

        {
            id: "hypercar",
            name: "Hustle Hypercar",
            type: "Hypercar",
            price: 1000000000,
            speed: 100,
            handling: 100,
            luxury: 100,
            emoji: "🏁"
        }

    ],

    getOwnedVehicles() {

        if (!Array.isArray(player.vehicles)) {
            player.vehicles = [];
        }

        return player.vehicles;

    },

    getActiveVehicle() {

        const owned = this.getOwnedVehicles();

        if (!owned.length) {
            return null;
        }

        const activeId = player.activeVehicle;

        return owned.find(v => v.id === activeId) || owned[0];

    },

    formatMoney(amount) {

        return "₦" + Number(amount || 0).toLocaleString();

    },

    buy(vehicleId) {

        const vehicle = this.vehicles.find(
            v => v.id === vehicleId
        );

        if (!vehicle) {
            alert("Vehicle not found.");
            return;
        }

        const owned = this.getOwnedVehicles();

        if (owned.some(v => v.id === vehicle.id)) {

            alert("You already own this vehicle.");

            return;

        }

        if (Number(player.balance || 0) < vehicle.price) {

            alert("You do not have enough money.");

            return;

        }

        player.balance -= vehicle.price;

        owned.push({
            id: vehicle.id,
            name: vehicle.name,
            type: vehicle.type,
            price: vehicle.price,
            speed: vehicle.speed,
            handling: vehicle.handling,
            luxury: vehicle.luxury,
            emoji: vehicle.emoji,
            purchasedAt: Date.now()
        });

        player.activeVehicle = vehicle.id;

        if (typeof updateMoneyDisplay === "function") {
            updateMoneyDisplay();
        }

        this.save();

        alert(vehicle.name + " purchased successfully!");

        this.open();

    },

    sell(vehicleId) {

        const owned = this.getOwnedVehicles();

        const index = owned.findIndex(
            v => v.id === vehicleId
        );

        if (index === -1) {
            alert("Vehicle not found.");
            return;
        }

        const vehicle = owned[index];

        const sellPrice = Math.floor(
            Number(vehicle.price || 0) * 0.70
        );

        const confirmed = confirm(
            "Sell " +
            vehicle.name +
            " for " +
            this.formatMoney(sellPrice) +
            "?"
        );

        if (!confirmed) {
            return;
        }

        player.balance += sellPrice;

        owned.splice(index, 1);

        if (player.activeVehicle === vehicle.id) {

            player.activeVehicle =
                owned.length ? owned[0].id : null;

        }

        if (typeof updateMoneyDisplay === "function") {
            updateMoneyDisplay();
        }

        this.save();

        alert(
            vehicle.name +
            " sold for " +
            this.formatMoney(sellPrice)
        );

        this.open();

    },

    select(vehicleId) {

        const owned = this.getOwnedVehicles();

        const vehicle = owned.find(
            v => v.id === vehicleId
        );

        if (!vehicle) {
            alert("You do not own this vehicle.");
            return;
        }

        player.activeVehicle = vehicle.id;

        this.save();

        alert(vehicle.name + " is now your active vehicle.");

        this.open();

    },

    save() {

        try {

            localStorage.setItem(
                "hustleLifeVehicles",
                JSON.stringify({
                    vehicles: player.vehicles || [],
                    activeVehicle: player.activeVehicle || null
                })
            );

        } catch (error) {

            console.error(
                "Vehicle save error:",
                error
            );

        }

    },

    load() {

        try {

            const saved =
                localStorage.getItem(
                    "hustleLifeVehicles"
                );

            if (!saved) {
                return;
            }

            const data = JSON.parse(saved);

            if (Array.isArray(data.vehicles)) {
                player.vehicles = data.vehicles;
            }

            if (data.activeVehicle) {
                player.activeVehicle =
                    data.activeVehicle;
            }

        } catch (error) {

            console.error(
                "Vehicle load error:",
                error
            );

        }

    },

    vehicleCard(vehicle, owned) {

        const isOwned =
            owned.some(v => v.id === vehicle.id);

        const active =
            player.activeVehicle === vehicle.id;

        return `

            <div style="
                background:#111;
                border:1px solid #333;
                border-radius:14px;
                padding:16px;
                margin-bottom:12px;
            ">

                <div style="
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                ">

                    <div>

                        <div style="
                            font-size:42px;
                        ">
                            ${vehicle.emoji}
                        </div>

                        <div style="
                            font-size:18px;
                            font-weight:bold;
                        ">
                            ${vehicle.name}
                        </div>

                        <div style="
                            color:#aaa;
                            margin-top:4px;
                        ">
                            ${vehicle.type}
                        </div>

                    </div>

                    <div style="
                        text-align:right;
                    ">

                        <div style="
                            font-size:17px;
                            font-weight:bold;
                        ">
                            ${this.formatMoney(vehicle.price)}
                        </div>

                        ${
                            isOwned
                            ? `
                                <div style="
                                    color:#4ade80;
                                    margin-top:5px;
                                ">
                                    OWNED
                                </div>
                            `
                            : ""
                        }

                    </div>

                </div>

                <div style="
                    margin-top:15px;
                    font-size:13px;
                ">

                    <div>
                        ⚡ Speed:
                        ${vehicle.speed}/100
                    </div>

                    <div>
                        🎯 Handling:
                        ${vehicle.handling}/100
                    </div>

                    <div>
                        💎 Luxury:
                        ${vehicle.luxury}/100
                    </div>

                </div>

                <div style="
                    margin-top:14px;
                ">

                    ${
                        isOwned

                        ? `

                            <button
                                onclick="
                                    HustleVehicleUI.select('${vehicle.id}')
                                "
                                style="
                                    width:100%;
                                    padding:11px;
                                    border:0;
                                    border-radius:8px;
                                    font-weight:bold;
                                    margin-bottom:8px;
                                "
                            >
                                ${
                                    active
                                    ? "✅ Active Vehicle"
                                    : "🚘 Use Vehicle"
                                }
                            </button>

                            <button
                                onclick="
                                    HustleVehicleUI.sell('${vehicle.id}')
                                "
                                style="
                                    width:100%;
                                    padding:11px;
                                    border:0;
                                    border-radius:8px;
                                    font-weight:bold;
                                "
                            >
                                💰 Sell for
                                ${this.formatMoney(
                                    Math.floor(vehicle.price * 0.70)
                                )}
                            </button>

                        `

                        : `

                            <button
                                onclick="
                                    HustleVehicleUI.buy('${vehicle.id}')
                                "
                                style="
                                    width:100%;
                                    padding:12px;
                                    border:0;
                                    border-radius:8px;
                                    font-weight:bold;
                                "
                            >
                                🛒 Buy Vehicle
                            </button>

                        `
                    }

                </div>

            </div>

        `;

    },

    open() {

        const owned =
            this.getOwnedVehicles();

        const active =
            this.getActiveVehicle();

        const panel =
            document.getElementById("gamePanel");

        if (!panel) {

            console.error(
                "gamePanel not found."
            );

            return;

        }

        panel.classList.remove("hidden");

        panel.innerHTML = `

            <div style="
                padding:16px;
                max-height:85vh;
                overflow-y:auto;
            ">

                <div style="
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    margin-bottom:18px;
                ">

                    <div>

                        <div style="
                            font-size:24px;
                            font-weight:bold;
                        ">
                            🚗 Vehicles
                        </div>

                        <div style="
                            color:#aaa;
                            font-size:13px;
                            margin-top:4px;
                        ">
                            Buy, manage and drive your vehicles
                        </div>

                    </div>

                    <button
                        onclick="closePanel()"
                        style="
                            border:0;
                            border-radius:8px;
                            padding:8px 12px;
                            font-size:18px;
                        "
                    >
                        ✕
                    </button>

                </div>


                <div style="
                    background:#151515;
                    border:1px solid #333;
                    border-radius:12px;
                    padding:14px;
                    margin-bottom:18px;
                ">

                    <div style="
                        color:#aaa;
                        font-size:12px;
                    ">
                        YOUR ACTIVE VEHICLE
                    </div>

                    <div style="
                        margin-top:8px;
                        font-size:20px;
                        font-weight:bold;
                    ">

                        ${
                            active
                            ? active.emoji +
                              " " +
                              active.name
                            : "🚶 No vehicle"
                        }

                    </div>

                    <div style="
                        margin-top:6px;
                        color:#aaa;
                    ">

                        ${
                            active
                            ? active.type
                            : "Purchase a vehicle to get started."
                        }

                    </div>

                </div>


                <div style="
                    font-size:19px;
                    font-weight:bold;
                    margin-bottom:12px;
                ">
                    🏪 Vehicle Dealership
                </div>


                ${this.vehicles.map(
                    vehicle =>
                        this.vehicleCard(
                            vehicle,
                            owned
                        )
                ).join("")}


                <div style="
                    margin-top:20px;
                    padding:14px;
                    border-radius:10px;
                    background:#111;
                    color:#aaa;
                    font-size:12px;
                    text-align:center;
                ">

                    Vehicles can be bought and sold
                    using your virtual Hustle Life money.

                </div>

            </div>

        `;

    }

};


/* =========================================================
   INITIALIZE VEHICLE DATA
========================================================= */

if (
    typeof player !== "undefined"
) {

    if (!Array.isArray(player.vehicles)) {
        player.vehicles = [];
    }

    if (
        typeof player.activeVehicle ===
        "undefined"
    ) {

        player.activeVehicle = null;

    }

    HustleVehicleUI.load();

}


/* =========================================================
   GLOBAL VEHICLE BUTTON
========================================================= */

window.openVehicles = function () {

    HustleVehicleUI.open();

};


/* =========================================================
   END VEHICLE SYSTEM
========================================================= */
