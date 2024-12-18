export class CollaborativeCursors {
    constructor() {
        this.cursors = new Map();
        this.colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
        this.init();
    }

    init() {
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        
        this.socket.on('cursor-move', (data) => {
            this.updateCursor(data.userId, data.x, data.y, data.username);
        });

        this.socket.on('user-disconnected', (userId) => {
            this.removeCursor(userId);
        });
    }

    handleMouseMove(e) {
        this.socket.emit('cursor-move', {
            x: e.clientX,
            y: e.clientY,
            userId: this.socket.id,
            username: 'User ' + this.socket.id.slice(0, 4)
        });
    }

    updateCursor(userId, x, y, username) {
        if (userId === this.socket.id) return;

        let cursor = this.cursors.get(userId);
        if (!cursor) {
            cursor = this.createCursor(userId, username);
        }

        cursor.style.transform = `translate(${x}px, ${y}px)`;
        cursor.querySelector(".cursor-label").textContent = username;
    }

    createCursor(userId, username) {
        const cursor = document.createElement('div');
        cursor.className = 'remote-cursor';
        cursor.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M5,2l15,15h-5v5l-10-10h5v-10z" 
                      fill="${this.getRandomColor()}"/>
            </svg>
            <span class="cursor-label">${username}</span>
        `;
        document.body.appendChild(cursor);
        this.cursors.set(userId, cursor);
        return cursor;
    }

    removeCursor(userId) {
        const cursor = this.cursors.get(userId);
        if (cursor) {
            cursor.remove();
            this.cursors.delete(userId);
        }
    }

    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
}