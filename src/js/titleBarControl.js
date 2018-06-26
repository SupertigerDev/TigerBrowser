const remote = require('electron').remote;

function closeWindow() {
    const window = remote.getCurrentWindow();
    window.close();
}

function maxWindow() {
    const window = remote.getCurrentWindow();
    if (window.isMaximized()) {
        window.restore();
    } else {
        window.maximize();
    }
}

function minWindow() {
    const window = remote.getCurrentWindow();
    window.minimize();
}