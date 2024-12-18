const zoomController = {
    level: 1,
    min: 0.25,
    max: 4,

    init() {
        canvas.style.transform = `scale(${this.level})`;
        this.addZoomControls();
        this.addWheelZoom();
    },

    addZoomControls() {
        const controls = document.createElement('div');
        controls.className = 'zoom-controls';
        controls.innerHTML = `
            <button onclick="zoomController.zoomIn()">+</button>
            <span>${Math.round(this.level * 100)}%</span>
            <button onclick="zoomController.zoomOut()">-</button>
        `;
        document.body.appendChild(controls);
    },

    zoomIn() {
        this.level = Math.min(this.level * 1.2, this.max);
        this.updateZoom();
    },

    zoomOut() {
        this.level = Math.max(this.level / 1.2, this.min);
        this.updateZoom();
    },

    updateZoom() {
        canvas.style.transform = `scale(${this.level})`;
    }
};
