const userList = new Set();

socket.on('connect', () => {
    socket.emit('user-joined', { userId: socket.id });
});

socket.on('users-updated', (users) => {
    updateUserList(users);
});

function updateUserList(users) {
    const userListElement = document.getElementById('user-list');
    userListElement.innerHTML = users
        .map(user => `<div class="user-item">${user}</div>`)
        .join('');
}
