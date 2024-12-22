const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        addMessage(`You: ${input.value}`, 'user');
        input.value = '';
    }
});

socket.on('message', function(msg) {
    addMessage(msg, 'system');
});

function addMessage(message, type) {
    const item = document.createElement('div');
    item.textContent = message;
    item.className = `message ${type}`;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
}
