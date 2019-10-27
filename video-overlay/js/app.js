let m;

let cbConnecting = function() {
    document.querySelector('#connect').innerText = 'Connecting';
    document.querySelector('#connect').disabled = true;
};

let cbConnected = function() {
    document.querySelector('#connect').innerText = 'Disconnect';
    document.querySelector('#connect').disabled = false;
};

let cbDisconnected = function() {
    document.querySelector('#connect').innerText = 'Connect';
    document.querySelector('#connect').disabled = false;
};

let cbMessage = function(m) {
    console.log(m);

    /*
    for (let k in m.data) {
        if (m.data.hasOwnProperty(k)) {
            console.log(k + ': ' + m.data[k]);
        }
    }
    */
};

let draw = function() {
    requestAnimationFrame(draw);
    canvas.getContext('2d').drawImage(player, 0, 0);
};

let player;
let canvas;

document.addEventListener('DOMContentLoaded', function(e) {
    m = new PM5(cbConnecting,
        cbConnected,
        cbDisconnected,
        cbMessage);

    document.querySelector('#connect').addEventListener('click', function() {
        if (!navigator.bluetooth) {
            alert('Web Bluetooth is not supported! You need a browser and ' +
                'platform that supports Web Bluetooth to use this application.');
        }

        if (m.connected()) {
            m.doDisconnect();
        } else {
            m.doConnect();
        }
    });

    /*
     * Video setup stuff.
     */

    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(function(stream) {
            player = document.querySelector('#player');
            canvas = document.querySelector('#output');
            player.srcObject = stream;
            player.onloadedmetadata = function(e) {
                canvas.width = player.videoWidth;
                canvas.height = player.videoHeight;
                requestAnimationFrame(draw);
            };
        });
});
