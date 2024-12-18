const socket = io();
const canvas = document.getElementById('canvas');
let selectedTool = 'select';
let isDragging = false;
let currentElement = null;

document.querySelectorAll('.tool-button').forEach(button => {
    button.addEventListener('click', () => {
        selectedTool = button.dataset.tool;
        document.querySelectorAll('.tool-button').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
    });
});

canvas.addEventListener('mousedown', (e) => {
    if (selectedTool === 'text' || selectedTool === 'shape') {
        const element = document.createElement('div');
        element.className = 'element';
        element.style.left = `${e.clientX}px`;
        element.style.top = `${e.clientY}px`;
        
        if (selectedTool === 'text') {
            element.contentEditable = true;
        }
        
        canvas.appendChild(element);
        socket.emit('element-created', {
            type: selectedTool,
            x: e.clientX,
            y: e.clientY
        });
    }
});

// Handle element dragging
document.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('element')) {
        isDragging = true;
        currentElement = e.target;
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging && currentElement) {
        currentElement.style.left = `${e.clientX}px`;
        currentElement.style.top = `${e.clientY}px`;
        socket.emit('element-moved', {
            id: currentElement.id,
            x: e.clientX,
            y: e.clientY
        });
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    currentElement = null;
});

// Initialize features
const connectionManager = new ConnectionManager();
zoomController.init();

// Create element controls when new element is added
canvas.addEventListener('elementcreated', (e) => {
    new ElementControls(e.target);
});

// Initialize collaborative cursors
const collaborativeCursors = new CollaborativeCursors();
