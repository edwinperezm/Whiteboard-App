class ElementControls {
    constructor(element) {
        this.element = element;
        this.addResizeHandles();
        this.addColorPicker();
    }

    addResizeHandles() {
        const handles = ['nw', 'ne', 'sw', 'se'];
        handles.forEach(position => {
            const handle = document.createElement('div');
            handle.className = `resize-handle ${position}`;
            this.element.appendChild(handle);
        });
    }

    addColorPicker() {
        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.className = 'color-picker';
        colorPicker.addEventListener('input', (e) => {
            this.element.style.backgroundColor = e.target.value;
        });
        this.element.appendChild(colorPicker);
    }
}
