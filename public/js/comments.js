class CommentSystem {
    constructor() {
        this.comments = new Map();
    }

    addComment(x, y, text) {
        const comment = document.createElement('div');
        comment.className = 'comment-bubble';
        comment.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">User</span>
                <span class="comment-time">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="comment-text">${text}</div>
        `;
        comment.style.left = `${x}px`;
        comment.style.top = `${y}px`;
        canvas.appendChild(comment);
    }
}
