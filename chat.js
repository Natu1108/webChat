// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDH9IfkkbNqjeMMGQFuSez_oVbrl9xnEwg",
    authDomain: "chatsite-c22ea.firebaseapp.com",
    databaseURL: "https://chatsite-c22ea-default-rtdb.firebaseio.com",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Elements
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const usernameInput = document.getElementById("username");

// Listen for incoming messages
db.ref("messages").on("child_added", (snapshot) => {
    const message = snapshot.val();
    displayMessage(message.username, message.text);
});

// Function to send a message
function sendMessage() {
    const messageText = messageInput.value;
    const username = usernameInput.value || "Anonymous";

    if (messageText.trim()) {
        db.ref("messages").push().set({
            username: username,
            text: messageText
        });
        messageInput.value = "";
    }
}

// Function to display messages
function displayMessage(username, text) {
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `<strong>${username}:</strong> ${text}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}
