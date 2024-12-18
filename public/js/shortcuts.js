document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'z':
                if (e.shiftKey) historyManager.redo();
                else historyManager.undo();
                break;
            case 'c':
                if (selectedElement) copyElement(selectedElement);
                break;
            case 'v':
                pasteElement();
                break;
            case 's':
                e.preventDefault();
                workspaceManager.exportWorkspace();
                break;
        }
    }
});
