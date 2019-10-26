let m;

let cbconnecting = function() {
    self.postMessage({ messageId: 'connecting' });
};
let cbconnected = function() {
    self.postMessage({ messageId: 'connected' });
};
let cbdisconnected = function() {
    self.postMessage({ messageId: 'disconnected' });
};
let cbmessage = function(m) {
    self.postMessage({ messageId: 'message', message: m });
};

let start = function() {
    m = new PM5(cbconnecting,
        cbconnected,
        cbdisconnected,
        cbmessage);

    if (m.connected()) {
        m.doDisconnect();
    } else {
        m.doConnect();
    }
};

self.addEventListener('message', function(m) {
    if (m.data == 'start') {
        start();
    }
});

self.importScripts('pm5.js');

console.log(navigator);
