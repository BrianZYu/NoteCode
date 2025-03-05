document.addEventListener('DOMContentLoaded', () => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode: 'javascript',
        lineNumbers: true,
        theme: 'dracula'
    });

    const saveBtn = document.getElementById('saveBtn');
    const loadBtn = document.getElementById('loadBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const snippetList = document.getElementById('snippetList');

    const API_URL = 'http://localhost:3000';
    let token = localStorage.getItem('token');

    // Register user
    registerBtn.addEventListener('click', async () => {
        const username = prompt('Enter username:');
        const password = prompt('Enter password:');
        if (!username || !password) return alert('Username and password required!');

        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const result = await response.json();
        alert(result.message);
    });
});