/* =========================================================
   HUSTLE LIFE - PHONE SYSTEM
========================================================= */

window.HustlePhoneUI = {

    currentScreen: "home",

    notifications: [],

    messages: [],

    contacts: [],

    init() {

        try {

            const saved =
                localStorage.getItem(
                    "hustleLifePhone"
                );

            if (saved) {

                const data = JSON.parse(saved);

                this.notifications =
                    Array.isArray(data.notifications)
                    ? data.notifications
                    : [];

                this.messages =
                    Array.isArray(data.messages)
                    ? data.messages
                    : [];

                this.contacts =
                    Array.isArray(data.contacts)
                    ? data.contacts
                    : [];

            }

        } catch (error) {

            console.error(
                "Phone load error:",
                error
            );

        }

    },

    save() {

        localStorage.setItem(
            "hustleLifePhone",
            JSON.stringify({

                notifications:
                    this.notifications,

                messages:
                    this.messages,

                contacts:
                    this.contacts

            })
        );

    },

    close() {

        if (typeof closePanel === "function") {
            closePanel();
        }

    },

    open() {

        this.currentScreen = "home";

        const panel =
            document.getElementById("gamePanel");

        if (!panel) {

            console.error(
                "gamePanel not found."
            );

            return;

        }

        panel.classList.remove("hidden");

        this.render();

    },

    render() {

        const panel =
            document.getElementById("gamePanel");

        if (!panel) return;

        panel.innerHTML = `

            <div style="
                padding:16px;
                max-height:85vh;
                overflow-y:auto;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:18px;
                ">

                    <div>

                        <div style="
                            font-size:25px;
                            font-weight:bold;
                        ">
                            📱 Hustle Phone
                        </div>

                        <div style="
                            color:#999;
                            font-size:13px;
                        ">
                            Your virtual phone
                        </div>

                    </div>

                    <button
                        onclick="HustlePhoneUI.close()"
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
                    background:#111;
                    border:1px solid #333;
                    border-radius:18px;
                    padding:20px;
                    margin-bottom:18px;
                    text-align:center;
                ">

                    <div style="
                        font-size:45px;
                    ">
                        📱
                    </div>

                    <div style="
                        font-size:20px;
                        font-weight:bold;
                        margin-top:8px;
                    ">
                        ${
                            player.name ||
                            "Player"
                        }
                    </div>

                    <div style="
                        color:#888;
                        font-size:12px;
                        margin-top:5px;
                    ">
                        Hustle Life Mobile
                    </div>

                </div>


                <div style="
                    display:grid;
                    grid-template-columns:
                        repeat(2, 1fr);
                    gap:10px;
                ">

                    ${this.appButton(
                        "💬",
                        "Messages",
                        "messages"
                    )}

                    ${this.appButton(
                        "👥",
                        "Contacts",
                        "contacts"
                    )}

                    ${this.appButton(
                        "📞",
                        "Calls",
                        "calls"
                    )}

                    ${this.appButton(
                        "💸",
                        "Transfer",
                        "transfer"
                    )}

                    ${this.appButton(
                        "🔔",
                        "Notifications",
                        "notifications"
                    )}

                    ${this.appButton(
                        "⚙️",
                        "Settings",
                        "settings"
                    )}

                </div>

            </div>

        `;

    },

    appButton(icon, title, screen) {

        return `

            <button
                onclick="
                    HustlePhoneUI.show('${screen}')
                "
                style="
                    padding:20px 10px;
                    border:1px solid #333;
                    border-radius:14px;
                    background:#151515;
                    color:white;
                    font-size:15px;
                    font-weight:bold;
                "
            >

                <div style="
                    font-size:30px;
                    margin-bottom:8px;
                ">
                    ${icon}
                </div>

                ${title}

            </button>

        `;

    },

    show(screen) {

        this.currentScreen = screen;

        switch (screen) {

            case "messages":
                this.messagesScreen();
                break;

            case "contacts":
                this.contactsScreen();
                break;

            case "calls":
                this.callsScreen();
                break;

            case "transfer":
                this.transferScreen();
                break;

            case "notifications":
                this.notificationsScreen();
                break;

            case "settings":
                this.settingsScreen();
                break;

            default:
                this.open();

        }

    },

    header(title) {

        return `

            <div style="
                display:flex;
                align-items:center;
                gap:10px;
                margin-bottom:18px;
            ">

                <button
                    onclick="
                        HustlePhoneUI.open()
                    "
                    style="
                        border:0;
                        border-radius:8px;
                        padding:8px 12px;
                    "
                >
                    ←
                </button>

                <div style="
                    font-size:22px;
                    font-weight:bold;
                ">
                    ${title}
                </div>

            </div>

        `;

    },

    messagesScreen() {

        const panel =
            document.getElementById("gamePanel");

        panel.innerHTML = `

            <div style="padding:16px">

                ${this.header("💬 Messages")}

                <div style="
                    background:#111;
                    border-radius:12px;
                    padding:18px;
                    text-align:center;
                    color:#999;
                ">

                    No conversations yet.

                    <br><br>

                    Multiplayer messaging will
                    connect here when player accounts
                    are available.

                </div>

            </div>

        `;

    },

    contactsScreen() {

        const panel =
            document.getElementById("gamePanel");

        panel.innerHTML = `

            <div style="padding:16px">

                ${this.header("👥 Contacts")}

                <div style="
                    background:#111;
                    border-radius:12px;
                    padding:18px;
                    text-align:center;
                    color:#999;
                ">

                    No contacts yet.

                </div>

                <button
                    onclick="
                        HustlePhoneUI.addContact()
                    "
                    style="
                        width:100%;
                        margin-top:12px;
                        padding:13px;
                        border:0;
                        border-radius:9px;
                        font-weight:bold;
                    "
                >
                    ➕ Add Contact
                </button>

            </div>

        `;

    },

    addContact() {

        const name =
            prompt("Enter player name:");

        if (!name) return;

        if (
            this.contacts.some(
                c =>
                    c.name.toLowerCase() ===
                    name.toLowerCase()
            )
        ) {

            alert(
                "This contact already exists."
            );

            return;

        }

        this.contacts.push({

            id:
                Date.now().toString(),

            name:name

        });

        this.save();

        this.contactsScreen();

    },

    callsScreen() {

        const panel =
            document.getElementById("gamePanel");

        panel.innerHTML = `

            <div style="padding:16px">

                ${this.header("📞 Calls")}

                <div style="
                    background:#111;
                    border-radius:12px;
                    padding:20px;
                    text-align:center;
                ">

                    <div style="
                        font-size:45px;
                    ">
                        📞
                    </div>

                    <div style="
                        margin-top:10px;
                        color:#aaa;
                    ">
                        Voice calls will be connected
                        to the multiplayer system.
                    </div>

                </div>

            </div>

        `;

    },

    transferScreen() {

        const panel =
            document.getElementById("gamePanel");

        panel.innerHTML = `

            <div style="padding:16px">

                ${this.header("💸 Transfer Money")}

                <div style="
                    background:#111;
                    border-radius:12px;
                    padding:16px;
                ">

                    <div style="
                        color:#999;
                        font-size:12px;
                    ">
                        AVAILABLE BALANCE
                    </div>

                    <div style="
                        font-size:24px;
                        font-weight:bold;
                        margin:6px 0 20px;
                    ">
                        ₦${Number(
                            player.balance || 0
                        ).toLocaleString()}
                    </div>

                    <input
                        id="phoneTransferPlayer"
                        placeholder="Player name"
                        style="
                            width:100%;
                            box-sizing:border-box;
                            padding:12px;
                            margin-bottom:10px;
                            border-radius:8px;
                            border:1px solid #444;
                        "
                    >

                    <input
                        id="phoneTransferAmount"
                        type="number"
                        placeholder="Amount"
                        style="
                            width:100%;
                            box-sizing:border-box;
                            padding:12px;
                            margin-bottom:10px;
                            border-radius:8px;
                            border:1px solid #444;
                        "
                    >

                    <button
                        onclick="
                            HustlePhoneUI.transfer()
                        "
                        style="
                            width:100%;
                            padding:13px;
                            border:0;
                            border-radius:8px;
                            font-weight:bold;
                        "
                    >
                        💸 Send Money
                    </button>

                </div>

            </div>

        `;

    },

    transfer() {

        const name =
            document.getElementById(
                "phoneTransferPlayer"
            ).value.trim();

        const amount =
            Number(
                document.getElementById(
                    "phoneTransferAmount"
                ).value
            );

        if (!name) {

            alert(
                "Enter a player name."
            );

            return;

        }

        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {

            alert(
                "Enter a valid amount."
            );

            return;

        }

        if (
            amount >
            Number(player.balance || 0)
        ) {

            alert(
                "Insufficient balance."
            );

            return;

        }

        /*
         * This is currently a local prototype.
         * Real player-to-player transfers will
         * require the multiplayer backend.
         */

        alert(
            "Transfer prepared for " +
            name +
            ". Multiplayer backend is required " +
            "to complete the real transfer."
        );

    },

    notificationsScreen() {

        const panel =
            document.getElementById("gamePanel");

        const items =
            this.notifications;

        panel.innerHTML = `

            <div style="padding:16px">

                ${this.header(
                    "🔔 Notifications"
                )}

                ${
                    items.length

                    ? items.map(
                        n => `
                            <div style="
                                background:#111;
                                border-radius:10px;
                                padding:14px;
                                margin-bottom:10px;
                            ">
                                ${n.text}
                            </div>
                        `
                    ).join("")

                    : `
                        <div style="
                            background:#111;
                            padding:20px;
                            border-radius:12px;
                            text-align:center;
                            color:#999;
                        ">
                            No notifications.
                        </div>
                    `
                }

            </div>

        `;

    },

    settingsScreen() {

        const panel =
            document.getElementById("gamePanel");

        panel.innerHTML = `

            <div style="padding:16px">

                ${this.header(
                    "⚙️ Phone Settings"
                )}

                <div style="
                    background:#111;
                    border-radius:12px;
                    overflow:hidden;
                ">

                    <button
                        onclick="
                            HustlePhoneUI.clearNotifications()
                        "
                        style="
                            width:100%;
                            padding:15px;
                            border:0;
                            border-bottom:1px solid #333;
                            text-align:left;
                        "
                    >
                        🧹 Clear Notifications
                    </button>

                    <button
                        onclick="
                            HustlePhoneUI.resetPhone()
                        "
                        style="
                            width:100%;
                            padding:15px;
                            border:0;
                            text-align:left;
                        "
                    >
                        ♻️ Reset Phone Data
                    </button>

                </div>

            </div>

        `;

    },

    clearNotifications() {

        this.notifications = [];

        this.save();

        this.notificationsScreen();

    },

    resetPhone() {

        if (
            !confirm(
                "Reset phone data?"
            )
        ) {

            return;

        }

        this.notifications = [];
        this.messages = [];
        this.contacts = [];

        this.save();

        this.open();

    }

};


/* =========================================================
   INITIALIZE
========================================================= */

if (
    typeof player !== "undefined"
) {

    HustlePhoneUI.init();

}


/* =========================================================
   GLOBAL PHONE FUNCTION
========================================================= */

window.openHustlePhone = function () {

    HustlePhoneUI.open();

};


/* =========================================================
   END PHONE SYSTEM
========================================================= */
