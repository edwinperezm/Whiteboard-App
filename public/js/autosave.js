let saveTimeout;

function autoSave(content) {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
    }, 1000);
}
