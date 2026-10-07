/* =========================================================
   HUSTLE LIFE MULTIPLAYER CHAT
========================================================= */

(function () {

    "use strict";


    /*
    ---------------------------------------------------------
    SOCKET CONNECTION
    ---------------------------------------------------------
    */

    const socket = io();


    /*
    ---------------------------------------------------------
    STATE
    ---------------------------------------------------------
    */

    let currentPlayer = null;

    let selectedPlayer = null;

    let onlinePlayers = [];

    let globalMessages = [];

    let privateMessages = [];

    let unreadMessages = {};

    let blockedPlayers = new Set();

    let chatMode = "global";


    /*
    ---------------------------------------------------------
    GET PLAYER NAME
    ---------------------------------------------------------
    */

    function getUsername() {

        /*
        Try common Hustle Life locations.
        */

        if (
            window.HustleLife &&
            window.HustleLife.username
        ) {
            return window.HustleLife.username;
        }


        if (
            window.gameState &&
            window.gameState.username
        ) {
            return window.gameState.username;
        }


        if (
            window.gameData &&
            window.gameData.username
        ) {
            return window.gameData.username;
        }


        const savedUsername =
            localStorage.getItem(
                "hustleLifeUsername"
            );


        if (savedUsername) {
            return savedUsername;
        }


        /*
        Temporary fallback.
        Replace this with your actual
        logged-in player username.
        */

        return "Player";

    }


    /*
    ---------------------------------------------------------
    REGISTER
    ---------------------------------------------------------
    */

    function registerPlayer() {

        const username = getUsername();


        socket.emit(
            "player:register",
            {
                username
            }
        );

    }


    /*
    ---------------------------------------------------------
    SOCKET EVENTS
    ---------------------------------------------------------
    */

    socket.on(
        "connect",
        registerPlayer
    );


    socket.on(
        "player:registered",
        (player) => {

            currentPlayer = player;

            console.log(
                "Multiplayer chat connected:",
                player.username
            );

            socket.emit(
                "chat:getBlocked"
            );

        }
    );


    socket.on(
        "chat:onlinePlayers",
        (players) => {

            onlinePlayers = players;

            renderOnlinePlayers();

        }
    );


    socket.on(
        "chat:globalHistory",
        (messages) => {

            globalMessages = messages || [];

            if (chatMode === "global") {
                renderMessages();
            }

        }
    );


    socket.on(
        "chat:globalMessage",
        (message) => {

            globalMessages.push(message);


            if (
                globalMessages.length > 100
            ) {
                globalMessages.shift();
            }


            if (chatMode === "global") {

                renderMessages();

            } else {

                showNotification(
                    `${message.senderUsername}: ${message.message}`
                );

            }

        }
    );


    socket.on(
        "chat:privateMessage",
        (message) => {

            privateMessages.push(message);


            if (
                privateMessages.length > 100
            ) {
                privateMessages.shift();
            }


            const otherId =
                message.senderId === currentPlayer.id
                    ? message.recipientId
                    : message.senderId;


            if (
                selectedPlayer &&
                selectedPlayer.id === otherId
            ) {

                renderMessages();

            } else if (
                message.senderId !== currentPlayer.id
            ) {

                unreadMessages[message.senderId] =
                    (
                        unreadMessages[message.senderId] || 0
                    ) + 1;


                showNotification(
                    `New message from ${message.senderUsername}`
                );


                renderOnlinePlayers();

            }

        }
    );


    socket.on(
        "chat:history",
        (data) => {

            privateMessages =
                data.messages || [];


            renderMessages();

        }
    );


    socket.on(
        "chat:blockedList",
        (list) => {

            blockedPlayers =
                new Set(list || []);

        }
    );


    socket.on(
        "chat:blockUpdated",
        (data) => {

            if (data.blocked) {

                blockedPlayers.add(
                    data.playerId
                );

            } else {

                blockedPlayers.delete(
                    data.playerId
                );

            }


            renderOnlinePlayers();

        }
    );


    socket.on(
        "chat:typing",
        (data) => {

            if (
                selectedPlayer &&
                selectedPlayer.id === data.playerId
            ) {

                showTypingIndicator(
                    data.typing
                        ? `${data.username} is typing...`
                        : ""
                );

            }

        }
    );


    socket.on(
        "chat:system",
        (data) => {

            console.log(
                "[Hustle Life]",
                data.message
            );

        }
    );


    socket.on(
        "chat:error",
        (data) => {

            alert(
                data.message ||
                "Chat error."
            );

        }
    );


    /*
    ---------------------------------------------------------
    CHAT UI
    ---------------------------------------------------------
    */

    window.HustleChatUI = {

        open,
        close,
        global,
        selectPlayer,
        sendMessage,
        blockPlayer,
        unblockPlayer

    };


    function open() {

        let panel =
            document.getElementById(
                "hustleMultiplayerChat"
            );


        if (!panel) {

            createChatUI();

            panel =
                document.getElementById(
                    "hustleMultiplayerChat"
                );

        }


        panel.classList.remove(
            "hidden"
        );


        renderOnlinePlayers();

        renderMessages();

    }


    function close() {

        const panel =
            document.getElementById(
                "hustleMultiplayerChat"
            );


        if (panel) {

            panel.classList.add(
                "hidden"
            );

        }

    }


    function global() {

        chatMode = "global";

        selectedPlayer = null;

        renderOnlinePlayers();

        renderMessages();

    }


    /*
    ---------------------------------------------------------
    CREATE UI
    ---------------------------------------------------------
    */

    function createChatUI() {

        const panel =
            document.createElement("div");


        panel.id =
            "hustleMultiplayerChat";


        panel.className =
            "hustle-chat-panel hidden";


        panel.innerHTML = `

            <div class="hustle-chat-header">

                <div>

                    <strong>
                        💬 Hustle Chat
                    </strong>

                    <small>
                        Multiplayer
                    </small>

                </div>

                <button
                    onclick="HustleChatUI.close()">

                    ✕

                </button>

            </div>


            <div class="hustle-chat-body">


                <aside
                    class="hustle-chat-players">

                    <button
                        class="hustle-global-button"
                        onclick="HustleChatUI.global()">

                        🌍 Global Chat

                    </button>


                    <h4>
                        🟢 Online Players
                    </h4>


                    <div
                        id="hustleOnlinePlayers">

                    </div>

                </aside>


                <main
                    class="hustle-chat-main">


                    <div
                        id="hustleChatTitle"
                        class="hustle-chat-title">

                        🌍 Global Chat

                    </div>


                    <div
                        id="hustleChatMessages"
                        class="hustle-chat-messages">

                    </div>


                    <div
                        id="hustleTyping"
                        class="hustle-chat-typing">

                    </div>


                    <div
                        class="hustle-chat-input">

                        <input
                            id="hustleChatInput"
                            type="text"
                            maxlength="500"
                            placeholder="Type a message..."
                            autocomplete="off"
                        />


                        <button
                            onclick="HustleChatUI.sendMessage()">

                            ➤

                        </button>

                    </div>

                </main>

            </div>

        `;


        document.body.appendChild(
            panel
        );


        const input =
            document.getElementById(
                "hustleChatInput"
            );


        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    sendMessage();

                }

            }
        );


        input.addEventListener(
            "input",
            function () {

                if (
                    chatMode === "private" &&
                    selectedPlayer
                ) {

                    socket.emit(
                        "chat:typing",
                        {
                            recipientId:
                                selectedPlayer.id,

                            typing:
                                input.value.length > 0
                        }
                    );

                }

            }
        );

    }


    /*
    ---------------------------------------------------------
    ONLINE PLAYER LIST
    ---------------------------------------------------------
    */

    function renderOnlinePlayers() {

        const container =
            document.getElementById(
                "hustleOnlinePlayers"
            );


        if (!container) {
            return;
        }


        container.innerHTML = "";


        onlinePlayers.forEach(
            (player) => {

                if (
                    currentPlayer &&
                    player.id === currentPlayer.id
                ) {
                    return;
                }


                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "hustle-player-button";


                const unread =
                    unreadMessages[player.id] || 0;


                button.innerHTML = `

                    <span>

                        🟢

                        ${escapeHTML(
                            player.username
                        )}

                    </span>

                    ${
                        unread > 0
                            ? `<b>${unread}</b>`
                            : ""
                    }

                `;


                button.onclick =
                    function () {

                        selectPlayer(
                            player
                        );

                    };


                container.appendChild(
                    button
                );

            }
        );

    }


    /*
    ---------------------------------------------------------
    SELECT PRIVATE CHAT
    ---------------------------------------------------------
    */

    function selectPlayer(player) {

        if (!player) {
            return;
        }


        if (
            blockedPlayers.has(
                player.id
            )
        ) {

            alert(
                "You have blocked this player."
            );

            return;

        }


        chatMode = "private";

        selectedPlayer = player;


        unreadMessages[player.id] = 0;


        socket.emit(
            "chat:getHistory",
            {
                playerId: player.id
            }
        );


        const title =
            document.getElementById(
                "hustleChatTitle"
            );


        if (title) {

            title.innerHTML =
                `👤 ${escapeHTML(
                    player.username
                )}`;

        }


        renderOnlinePlayers();

    }


    /*
    ---------------------------------------------------------
    SEND MESSAGE
    ---------------------------------------------------------
    */

    function sendMessage() {

        const input =
            document.getElementById(
                "hustleChatInput"
            );


        if (!input) {
            return;
        }


        const message =
            input.value.trim();


        if (!message) {
            return;
        }


        if (chatMode === "global") {

            socket.emit(
                "chat:global",
                {
                    message
                }
            );

        } else {

            if (!selectedPlayer) {
                return;
            }


            socket.emit(
                "chat:private",
                {
                    recipientId:
                        selectedPlayer.id,

                    message
                }
            );

        }


        input.value = "";


        socket.emit(
            "chat:typing",
            {
                recipientId:
                    selectedPlayer
                        ? selectedPlayer.id
                        : null,

                typing: false
            }
        );

    }


    /*
    ---------------------------------------------------------
    RENDER MESSAGES
    ---------------------------------------------------------
    */

    function renderMessages() {

        const container =
            document.getElementById(
                "hustleChatMessages"
            );


        if (!container) {
            return;
        }


        let messagesToShow = [];


        if (chatMode === "global") {

            messagesToShow =
                globalMessages;

        } else if (
            selectedPlayer &&
            currentPlayer
        ) {

            messagesToShow =
                privateMessages.filter(
                    (message) => {

                        return (
                            (
                                message.senderId ===
                                currentPlayer.id &&
                                message.recipientId ===
                                selectedPlayer.id
                            )
                            ||
                            (
                                message.senderId ===
                                selectedPlayer.id &&
                                message.recipientId ===
                                currentPlayer.id
                            )
                        );

                    }
                );

        }


        container.innerHTML = "";


        messagesToShow.forEach(
            (message) => {

                const element =
                    document.createElement(
                        "div"
                    );


                const mine =
                    currentPlayer &&
                    message.senderId ===
                    currentPlayer.id;


                element.className =
                    mine
                        ? "hustle-message mine"
                        : "hustle-message";


                element.innerHTML = `

                    <div
                        class="hustle-message-name">

                        ${escapeHTML(
                            message.senderUsername ||
                            "System"
                        )}

                    </div>


                    <div
                        class="hustle-message-text">

                        ${escapeHTML(
                            message.message
                        )}

                    </div>


                    <small>

                        ${formatTime(
                            message.timestamp
                        )}

                    </small>

                `;


                container.appendChild(
                    element
                );

            }
        );


        container.scrollTop =
            container.scrollHeight;

    }


    /*
    ---------------------------------------------------------
    BLOCK PLAYER
    ---------------------------------------------------------
    */

    function blockPlayer() {

        if (!selectedPlayer) {
            return;
        }


        socket.emit(
            "chat:block",
            {
                playerId:
                    selectedPlayer.id
            }
        );


        alert(
            `${selectedPlayer.username} blocked.`
        );

    }


    /*
    ---------------------------------------------------------
    UNBLOCK PLAYER
    ---------------------------------------------------------
    */

    function unblockPlayer(playerId) {

        socket.emit(
            "chat:unblock",
            {
                playerId
            }
        );

    }


    /*
    ---------------------------------------------------------
    TYPING
    ---------------------------------------------------------
    */

    function showTypingIndicator(text) {

        const element =
            document.getElementById(
                "hustleTyping"
            );


        if (element) {

            element.textContent =
                text || "";

        }

    }


    /*
    ---------------------------------------------------------
    NOTIFICATION
    ---------------------------------------------------------
    */

    function showNotification(message) {

        console.log(
            "🔔",
            message
        );


        /*
        Browser notification if allowed.
        */

        if (
            "Notification" in window &&
            Notification.permission === "granted"
        ) {

            new Notification(
                "Hustle Life",
                {
                    body: message
                }
            );

        }

    }


    /*
    ---------------------------------------------------------
    ESCAPE HTML
    ---------------------------------------------------------
    */

    function escapeHTML(value) {

        return String(value)
            .replaceAll(
                "&",
                "&amp;"
            )
            .replaceAll(
                "<",
                "&lt;"
            )
            .replaceAll(
                ">",
                "&gt;"
            )
            .replaceAll(
                '"',
                "&quot;"
            )
            .replaceAll(
                "'",
                "&#039;"
            );

    }


    /*
    ---------------------------------------------------------
    TIME
    ---------------------------------------------------------
    */

    function formatTime(timestamp) {

        return new Date(
            timestamp
        ).toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    }


    /*
    ---------------------------------------------------------
    REQUEST NOTIFICATIONS
    ---------------------------------------------------------
    */

    if (
        "Notification" in window &&
        Notification.permission === "default"
    ) {

        Notification.requestPermission();

    }


})();
