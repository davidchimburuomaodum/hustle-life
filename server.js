const express = require("express");
const http = require("http");
const path = require("path");
const crypto = require("crypto");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const players = new Map();
const messages = [];
const blockedUsers = new Map();

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 5000;


/* =========================================================
   SECURITY / VALIDATION
========================================================= */

function cleanText(value, maxLength = MAX_MESSAGE_LENGTH) {
    if (typeof value !== "string") {
        return "";
    }

    return value
        .replace(/[<>]/g, "")
        .trim()
        .slice(0, maxLength);
}


function createMessageId() {
    return crypto.randomUUID();
}


function getPlayer(socketId) {
    return players.get(socketId);
}


function isBlocked(userA, userB) {
    const blocked = blockedUsers.get(userA);

    if (!blocked) {
        return false;
    }

    return blocked.has(userB);
}


function addMessage(message) {
    messages.push(message);

    if (messages.length > MAX_HISTORY) {
        messages.shift();
    }
}


function publicPlayer(player) {
    return {
        id: player.id,
        username: player.username,
        online: true
    };
}


function sendOnlinePlayers() {
    const onlinePlayers =
        Array.from(players.values())
            .map(publicPlayer);

    io.emit(
        "chat:onlinePlayers",
        onlinePlayers
    );
}


/* =========================================================
   SOCKET CONNECTION
========================================================= */

io.on("connection", (socket) => {

    console.log(
        "Socket connected:",
        socket.id
    );


    /* =====================================================
       REGISTER PLAYER
    ===================================================== */

    socket.on(
        "player:register",
        (data) => {

            const username = cleanText(
                data && data.username,
                30
            );


            if (!username) {

                socket.emit(
                    "chat:error",
                    {
                        message:
                            "A valid username is required."
                    }
                );

                return;
            }


            const player = {

                id: socket.id,

                username,

                connectedAt: Date.now()

            };


            players.set(
                socket.id,
                player
            );


            socket.emit(
                "player:registered",
                {
                    id: player.id,
                    username: player.username
                }
            );


            const globalHistory =
                messages
                    .filter(
                        message =>
                            message.type === "global"
                    )
                    .slice(-100);


            socket.emit(
                "chat:globalHistory",
                globalHistory
            );


            sendOnlinePlayers();


            socket.broadcast.emit(
                "chat:system",
                {
                    message:
                        `${username} is now online.`,

                    timestamp:
                        Date.now()
                }
            );

        }
    );


    /* =====================================================
       GLOBAL CHAT
    ===================================================== */

    socket.on(
        "chat:global",
        (data) => {

            const player =
                getPlayer(socket.id);


            if (!player) {
                return;
            }


            const text =
                cleanText(
                    data && data.message
                );


            if (!text) {
                return;
            }


            const message = {

                id:
                    createMessageId(),

                type:
                    "global",

                senderId:
                    player.id,

                senderUsername:
                    player.username,

                message:
                    text,

                timestamp:
                    Date.now()

            };


            addMessage(message);


            io.emit(
                "chat:globalMessage",
                message
            );

        }
    );


    /* =====================================================
       PRIVATE CHAT
    ===================================================== */

    socket.on(
        "chat:private",
        (data) => {

            const sender =
                getPlayer(socket.id);


            if (!sender) {
                return;
            }


            const recipientId =
                cleanText(
                    data && data.recipientId,
                    100
                );


            const text =
                cleanText(
                    data && data.message
                );


            if (
                !recipientId ||
                !text
            ) {
                return;
            }


            const recipient =
                players.get(
                    recipientId
                );


            if (!recipient) {

                socket.emit(
                    "chat:error",
                    {
                        message:
                            "That player is offline."
                    }
                );

                return;
            }


            if (
                isBlocked(
                    sender.id,
                    recipient.id
                ) ||
                isBlocked(
                    recipient.id,
                    sender.id
                )
            ) {

                socket.emit(
                    "chat:error",
                    {
                        message:
                            "You cannot message this player."
                    }
                );

                return;
            }


            const message = {

                id:
                    createMessageId(),

                type:
                    "private",

                senderId:
                    sender.id,

                senderUsername:
                    sender.username,

                recipientId:
                    recipient.id,

                recipientUsername:
                    recipient.username,

                message:
                    text,

                timestamp:
                    Date.now()

            };


            addMessage(message);


            io.to(recipient.id).emit(
                "chat:privateMessage",
                message
            );


            socket.emit(
                "chat:privateMessage",
                message
            );

        }
    );


    /* =====================================================
       PRIVATE CHAT HISTORY
    ===================================================== */

    socket.on(
        "chat:getHistory",
        (data) => {

            const player =
                getPlayer(socket.id);


            if (!player) {
                return;
            }


            const otherPlayerId =
                cleanText(
                    data && data.playerId,
                    100
                );


            if (!otherPlayerId) {
                return;
            }


            const history =
                messages
                    .filter(
                        message => {

                            if (
                                message.type !==
                                "private"
                            ) {
                                return false;
                            }


                            return (

                                (
                                    message.senderId ===
                                    player.id &&

                                    message.recipientId ===
                                    otherPlayerId
                                )

                                ||

                                (
                                    message.senderId ===
                                    otherPlayerId &&

                                    message.recipientId ===
                                    player.id
                                )

                            );

                        }
                    )
                    .slice(-100);


            socket.emit(
                "chat:history",
                {
                    playerId:
                        otherPlayerId,

                    messages:
                        history
                }
            );

        }
    );


    /* =====================================================
       BLOCK PLAYER
    ===================================================== */

    socket.on(
        "chat:block",
        (data) => {

            const player =
                getPlayer(socket.id);


            if (!player) {
                return;
            }


            const targetId =
                cleanText(
                    data && data.playerId,
                    100
                );


            if (
                !targetId ||
                targetId === player.id
            ) {
                return;
            }


            if (
                !blockedUsers.has(
                    player.id
                )
            ) {

                blockedUsers.set(
                    player.id,
                    new Set()
                );

            }


            blockedUsers
                .get(player.id)
                .add(targetId);


            socket.emit(
                "chat:blockUpdated",
                {
                    playerId:
                        targetId,

                    blocked:
                        true
                }
            );

        }
    );


    /* =====================================================
       UNBLOCK PLAYER
    ===================================================== */

    socket.on(
        "chat:unblock",
        (data) => {

            const player =
                getPlayer(socket.id);


            if (!player) {
                return;
            }


            const targetId =
                cleanText(
                    data && data.playerId,
                    100
                );


            const blocked =
                blockedUsers.get(
                    player.id
                );


            if (blocked) {

                blocked.delete(
                    targetId
                );

            }


            socket.emit(
                "chat:blockUpdated",
                {
                    playerId:
                        targetId,

                    blocked:
                        false
                }
            );

        }
    );


    /* =====================================================
       GET BLOCKED PLAYERS
    ===================================================== */

    socket.on(
        "chat:getBlocked",
        () => {

            const player =
                getPlayer(socket.id);


            if (!player) {
                return;
            }


            const blocked =
                blockedUsers.get(
                    player.id
                );


            socket.emit(
                "chat:blockedList",

                blocked
                    ? Array.from(blocked)
                    : []
            );

        }
    );


    /* =====================================================
       TYPING INDICATOR
    ===================================================== */

    socket.on(
        "chat:typing",
        (data) => {

            const player =
                getPlayer(socket.id);


            if (!player) {
                return;
            }


            const recipientId =
                cleanText(
                    data && data.recipientId,
                    100
                );


            if (!recipientId) {
                return;
            }


            io.to(recipientId).emit(
                "chat:typing",
                {
                    playerId:
                        player.id,

                    username:
                        player.username,

                    typing:
                        Boolean(
                            data.typing
                        )
                }
            );

        }
    );


    /* =====================================================
       DISCONNECT
    ===================================================== */

    socket.on(
        "disconnect",
        () => {

            const player =
                players.get(
                    socket.id
                );


            if (!player) {
                return;
            }


            players.delete(
                socket.id
            );


            socket.broadcast.emit(
                "chat:system",
                {
                    message:
                        `${player.username} went offline.`,

                    timestamp:
                        Date.now()
                }
            );


            sendOnlinePlayers();


            console.log(
                "Player disconnected:",
                player.username
            );

        }
    );

});


/* =========================================================
   START SERVER
========================================================= */

server.listen(
    PORT,
    () => {

        console.log(
            `Hustle Life server running on port ${PORT}`
        );

    }
);
