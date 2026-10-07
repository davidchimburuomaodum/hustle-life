/* =========================================================
   HUSTLE LIFE — CRIME UI
   Stage 1B
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CREATE CRIME PANEL
    ===================================================== */

    function createCrimePanel() {

        if (document.getElementById("crimePanel")) {
            return;
        }


        const panel = document.createElement("div");

        panel.id = "crimePanel";

        panel.className = "crime-panel";


        panel.innerHTML = `

            <div class="crime-panel-header">

                <div>
                    <h2>🚨 Crime</h2>

                    <p>
                        Choose an illegal activity.
                    </p>
                </div>


                <button
                    type="button"
                    class="crime-close"
                    id="crimeCloseButton"
                >
                    ✕
                </button>

            </div>


            <div class="wanted-box">

                <div class="wanted-title">
                    ⭐ Wanted Level
                </div>


                <div
                    id="wantedLevel"
                    class="wanted-stars"
                >
                    ☆☆☆☆☆
                </div>

            </div>


            <div
                id="crimeList"
                class="crime-list"
            ></div>


            <div
                id="crimeResult"
                class="crime-result"
            ></div>

        `;


        document.body.appendChild(panel);


        document
            .getElementById("crimeCloseButton")
            .addEventListener(
                "click",
                closeCrimePanel
            );


        renderCrimeList();

    }


    /* =====================================================
       RENDER CRIME LIST
    ===================================================== */

    function renderCrimeList() {

        const list =
            document.getElementById("crimeList");


        if (!list) {
            return;
        }


        if (
            !window.HustleCrime ||
            !window.HustleCrime.crimes
        ) {

            list.innerHTML = `
                <p>
                    Crime system is loading...
                </p>
            `;

            return;

        }


        const crimes =
            window.HustleCrime.crimes;


        list.innerHTML = "";


        Object.entries(crimes)
            .forEach(
                ([crimeId, crime]) => {

                    const card =
                        document.createElement("div");


                    card.className =
                        "crime-card";


                    card.innerHTML = `

                        <div class="crime-icon">
                            ${crime.icon}
                        </div>

                        <div class="crime-info">

                            <h3>
                                ${crime.name}
                            </h3>

                            <p>
                                Reward:
                                ₦${Number(
                                    crime.reward
                                ).toLocaleString("en-NG")}
                            </p>

                            <p>
                                Wanted:
                                +${crime.wantedIncrease} ⭐
                            </p>

                            <p>
                                Success:
                                ${Math.round(
                                    crime.successChance * 100
                                )}%
                            </p>

                        </div>


                        <button
                            type="button"
                            class="crime-action"
                            data-crime="${crimeId}"
                        >
                            Commit
                        </button>

                    `;


                    list
