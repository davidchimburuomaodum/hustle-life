let player = {
    name: "",
    balance: 100000000000,
    x: 0,
    y: 0
};

function startGame() {

    const name = document.getElementById("username").value.trim();

    if (!name) {
        alert("Enter your name first.");
        return;
    }

    player.name = name;

    document.getElementById("playerName").textContent = name;

    document.getElementById("balance").textContent =
        player.balance.toLocaleString();

    document.getElementById("loginScreen").classList.add("hidden");

    document.getElementById("gameScreen").classList.remove("hidden");
}

function move(direction) {

    if (direction === "up") player.y--;
    if (direction === "down") player.y++;
    if (direction === "left") player.x--;
    if (direction === "right") player.x++;

    console.log("Player position:", player.x, player.y);
}

function openPanel(type) {

    const panel = document.getElementById("panel");

    if (type === "phone") {
        panel.innerHTML = `
            <h2>📱 Virtual Phone</h2>
            <p>Your personal phone inside Hustle City.</p>
            <div class="phone-actions">
                <button onclick="openPanel('chat')">💬 Messages</button>
                <button onclick="openPanel('transfer')">💸 Send Money</button>
                <button onclick="alert('Calls will be added next.')">📞 Calls</button>
            </div>
        `;
    }

    if (type === "chat") {
        panel.innerHTML = `
            <h2>💬 Chat</h2>
            <p>Talk to other players in Hustle City.</p>
            <input placeholder="Type a message...">
            <button onclick="alert('Chat backend coming next!')">Send</button>
        `;
    }

    if (type === "transfer") {
        panel.innerHTML = `
            <h2>💸 Money Transfer</h2>
            <p>Send virtual money to another player.</p>
            <input id="recipient" placeholder="Player name">
            <input id="amount" type="number" placeholder="Amount">
            <button onclick="transferMoney()">Send Money</button>
        `;
    }

    if (type === "business") {
        panel.innerHTML = `
            <h2>🏢 Businesses</h2>
            <p>Build businesses and grow your virtual empire.</p>
            <button onclick="alert('Business marketplace coming next!')">
                Open Marketplace
            </button>
        `;
    }

    if (type === "police") {
        panel.innerHTML = `
            <h2>👮 Police</h2>
            <p>Hustle City Police Department.</p>
            <p>Crime and law enforcement systems will be connected here.</p>
        `;
    }

    if (type === "justice") {
        panel.innerHTML = `
            <h2>⚖️ Justice</h2>
            <p>Courts, fines, trials and legal cases.</p>
        `;
    }

    if (type === "rankings") {
        panel.innerHTML = `
            <h2>🏆 Rankings</h2>
            <p>1. ${player.name} — ₦${player.balance.toLocaleString()}</p>
            <p>More players will appear when multiplayer is connected.</p>
        `;
    }
}

function transferMoney() {

    const amount = Number(document.getElementById("amount").value);

    if (!amount || amount <= 0) {
        alert("Enter a valid amount.");
        return;
    }

    if (amount > player.balance) {
        alert("Insufficient virtual funds.");
        return;
    }

    player.balance -= amount;

    document.getElementById("balance").textContent =
        player.balance.toLocaleString();

    alert("Virtual money transfer completed.");

}
