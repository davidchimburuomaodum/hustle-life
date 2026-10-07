/* =========================================================
   HUSTLE LIFE — CRIME + WANTED SYSTEM
   Stage 1A
========================================================= */

(function () {

    "use strict";

    /* =====================================================
       CRIME DATABASE
    ===================================================== */

    const CRIMES = {

        theft: {
            name: "Petty Theft",
            icon: "👜",
            reward: 50000,
            wantedIncrease: 1,
            successChance: 0.85
        },

        burglary: {
            name: "Burglary",
            icon: "🏠",
            reward: 250000,
            wantedIncrease: 2,
            successChance: 0.70
        },

        robbery: {
            name: "Armed Robbery",
            icon: "🔫",
            reward: 750000,
            wantedIncrease: 3,
            successChance: 0.55
        },

        vehicleTheft: {
            name: "Vehicle Theft",
            icon: "🚗",
            reward: 500000,
            wantedIncrease: 2,
            successChance: 0.65
        },

        cyberFraud: {
            name: "Cyber Fraud",
            icon: "💻",
            reward: 1000000,
            wantedIncrease: 3,
            successChance: 0.50
        }

    };


    /* =====================================================
       PLAYER CRIME DATA
    ===================================================== */

    function getCrimeData() {

        if (!window.hustleCrimeData) {

            window.hustleCrimeData = {

                wantedLevel: 0,

                crimes: [],

                arrests: [],

                fines: [],

                jailTime: 0

            };

        }

        return window.hustleCrimeData;

    }


    /* =====================================================
       WANTED LEVEL
    ===================================================== */

    function getWantedLevel() {

        return getCrimeData().wantedLevel;

    }


    function increaseWantedLevel(amount) {

        const data = getCrimeData();

        data.wantedLevel += amount;

        if (data.wantedLevel > 5) {
            data.wantedLevel = 5;
        }

        saveCrimeData();

        updateWantedDisplay();

    }


    function decreaseWantedLevel(amount) {

        const data = getCrimeData();

        data.wantedLevel -= amount;

        if (data.wantedLevel < 0) {
            data.wantedLevel = 0;
        }

        saveCrimeData();

        updateWantedDisplay();

    }


    /* =====================================================
       WANTED DISPLAY
    ===================================================== */

    function getWantedStars() {

        const level = getWantedLevel();

        let stars = "";

        for (let i = 0; i < 5; i++) {

            stars += i < level ? "⭐" : "☆";

        }

        return stars;

    }


    function updateWantedDisplay() {

        const element =
            document.getElementById("wantedLevel");

        if (!element) {
            return;
        }

        element.textContent =
            getWantedStars();

    }


    /* =====================================================
       CRIME EXECUTION
    ===================================================== */

    function commitCrime(crimeType) {

        const crime = CRIMES[crimeType];

        if (!crime) {

            console.error(
                "Unknown crime:",
                crimeType
            );

            return;

        }


        const data = getCrimeData();


        const successful =
            Math.random() <= crime.successChance;


        const record = {

            type: crimeType,

            name: crime.name,

            timestamp: new Date().toISOString(),

            successful: successful,

            reward: successful
                ? crime.reward
                : 0

        };


        data.crimes.push(record);


        /* ================================================
           SUCCESSFUL CRIME
        ================================================ */

        if (successful) {

            increaseWantedLevel(
                crime.wantedIncrease
            );


            addCrimeMoney(
                crime.reward
            );


            notifyCrime(
                `${crime.icon} ${crime.name} successful!`,
                `You earned ₦${formatMoney(crime.reward)}.`
            );

        }


        /* ================================================
           FAILED CRIME
        ================================================ */

        else {

            increaseWantedLevel(
                Math.max(
                    1,
                    crime.wantedIncrease - 1
                )
            );


            notifyCrime(
                `🚨 ${crime.name} failed!`,
                "The police may be looking for you."
            );

        }


        saveCrimeData();

        updateWantedDisplay();

        return record;

    }


    /* =====================================================
       MONEY HANDLER
    ===================================================== */

    function addCrimeMoney(amount) {

        /*
         * This intentionally does NOT modify the existing
         * game money system yet.
         *
         * We will connect it to Hustle Life's actual
         * money/bank system in the next integration stage.
         */

        console.log(
            `Crime reward generated: ₦${amount}`
        );

    }


    /* =====================================================
       MONEY FORMAT
    ===================================================== */

    function formatMoney(amount) {

        return Number(amount)
            .toLocaleString("en-NG");

    }


    /* =====================================================
       CRIME NOTIFICATION
    ===================================================== */

    function notifyCrime(title, message) {

        console.log(
            `[CRIME] ${title} — ${message}`
        );


        const notification =
            document.createElement("div");

        notification.className =
            "crime-notification";


        notification.innerHTML = `
            <strong>${title}</strong>
            <div>${message}</div>
        `;


        document.body.appendChild(
            notification
        );


        setTimeout(() => {

            notification.remove();

        }, 4000);

    }


    /* =====================================================
       SAVE DATA
    ===================================================== */

    function saveCrimeData() {

        try {

            localStorage.setItem(
                "hustleCrimeData",
                JSON.stringify(
                    getCrimeData()
                )
            );

        } catch (error) {

            console.error(
                "Unable to save crime data:",
                error
            );

        }

    }


    /* =====================================================
       LOAD DATA
    ===================================================== */

    function loadCrimeData() {

        try {

            const saved =
                localStorage.getItem(
                    "hustleCrimeData"
                );


            if (saved) {

                window.hustleCrimeData =
                    JSON.parse(saved);

            }

        } catch (error) {

            console.error(
                "Unable to load crime data:",
                error
            );

        }


        updateWantedDisplay();

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.HustleCrime = {

        crimes: CRIMES,

        commitCrime,

        getWantedLevel,

        getWantedStars,

        increaseWantedLevel,

        decreaseWantedLevel,

        getCrimeData,

        saveCrimeData

    };


    /* =====================================================
       INITIALIZE
    ===================================================== */

    loadCrimeData();


})();
