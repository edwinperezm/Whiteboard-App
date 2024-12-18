const stickerPanel = {
    init() {
        const panel = document.createElement('div');
        panel.className = 'sticker-panel';
        panel.innerHTML = `
            <div class="sticker-grid">
                ${this.getCommonEmojis().map(emoji => 
                    `<button class="sticker-btn">${emoji}</button>`
                ).join('')}
            </div>
        `;
        document.body.appendChild(panel);
    },

    getCommonEmojis() {
        return ['👍', '❤️', '🚀', '💡', '⭐', '🎯', '🎨', '📌', '✨', '🔥'];
    }
};
