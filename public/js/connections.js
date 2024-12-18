class ConnectionManager {
    constructor() {
        this.connections = new Set();
    }

    createConnection(element1, element2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('stroke', '#000');
        line.setAttribute('stroke-width', '2');
        this.updateConnectionPosition(line, element1, element2);
        this.connections.add({
            line,
            element1,
            element2
        });
    }

    updateConnectionPosition(line, element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        line.setAttribute('x1', rect1.x + rect1.width/2);
        line.setAttribute('y1', rect1.y + rect1.height/2);
        line.setAttribute('x2', rect2.x + rect2.width/2);
        line.setAttribute('y2', rect2.y + rect2.height/2);
    }
}
