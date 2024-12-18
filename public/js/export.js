const workspaceManager = {
    exportWorkspace() {
        const elements = Array.from(canvas.querySelectorAll('.element')).map(el => ({
            type: el.dataset.type,
            content: el.innerHTML,
            position: {
                x: el.style.left,
                y: el.style.top
            },
            style: {
                backgroundColor: el.style.backgroundColor,
                width: el.style.width,
                height: el.style.height
            }
        }));

        const blob = new Blob([JSON.stringify(elements)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workspace.json';
        a.click();
    },

    importWorkspace(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const elements = JSON.parse(e.target.result);
            elements.forEach(el => this.recreateElement(el));
        };
        reader.readAsText(file);
    }
};
