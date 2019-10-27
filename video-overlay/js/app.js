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

let labels = {
    elapsedTime:        { handle: undefined, options: { left: 5, top: 5, fontSize: 15 } },
    distance:           { handle: undefined, options: { left: 5, top: 55, fontSize: 15 } },
    currentPace:        { handle: undefined, options: { left: 5, top: 105, fontSize: 15 } },
    strokeRate:         { handle: undefined, options: { left: 5, top: 155, fontSize: 15 } },
    averagePace:        { handle: undefined, options: { left: 5, top: 205, fontSize: 15 } },
    averagePower:       { handle: undefined, options: { left: 5, top: 255, fontSize: 15 } },
    strokePower:        { handle: undefined, options: { left: 5, top: 305, fontSize: 15 } },
};

let values = {
    elapsedTime:        { handle: undefined, options: { left: 5, top: 20, fontSize: 20 } },
    distance:           { handle: undefined, options: { left: 5, top: 70, fontSize: 20 } },
    currentPace:        { handle: undefined, options: { left: 5, top: 120, fontSize: 20 } },
    strokeRate:         { handle: undefined, options: { left: 5, top: 170, fontSize: 20 } },
    averagePace:        { handle: undefined, options: { left: 5, top: 220, fontSize: 20 } },
    averagePower:       { handle: undefined, options: { left: 5, top: 270, fontSize: 20 } },
    strokePower:        { handle: undefined, options: { left: 5, top: 320, fontSize: 20 } },
};

let drawText = function(key, value) {
    if (labels[key].handle == undefined) {
        labels[key].handle = new fabric.Text(pm5fields[key].label, labels[key].options);
        values[key].handle = new fabric.Text("pending", values[key].options);

        fabricCanvas.add(labels[key].handle);
        fabricCanvas.add(values[key].handle);
    }

    //console.log(pm5fields[key].label + ": " + pm5fields[key].printable(value));
    values[key].handle.set('text', pm5fields[key].printable(value));

    /* XXX maybe do this in the render callback for video
     * so it only happens once?
     */
    //fabricCanvas.renderAll();
};

let cbMessage = function(m) {
    console.log(m);

    for (let k in m.data) {
        if (m.data.hasOwnProperty(k) && values.hasOwnProperty(k)) {
            drawText(k, m.data[k]);
        }
    }
};

let draw = function() {
    requestAnimationFrame(draw);
    canvas.getContext('2d').drawImage(player, 0, 0);
    fabricCanvas.renderAll();
};

let player;
let canvas;
let fabricCanvas;

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

                /*
                 * Non-interactive elements.
                 */
                fabricCanvas = this.__canvas = new fabric.StaticCanvas('output');
                let rect = new fabric.Rect({
                    left: 0,
                    top: 0,
                    width: 120,     /* XXX need to do dynamic resize */
                    height: 500,    /* XXX need to do dynamic resize */
                    fill: '#ccc6'
                });
                fabricCanvas.setBackgroundColor('', fabricCanvas.renderAll.bind(fabricCanvas));
                fabricCanvas.add(rect);
                fabricCanvas.bringToFront(rect);

                requestAnimationFrame(draw);
    setInterval(function() { drawText('elapsedTime', Math.random() * 10); }, 1000);
    setInterval(function() { drawText('distance', Math.random() * 500) }, 1000);
    setInterval(function() { drawText('currentPace', Math.random() * 2) }, 1000);
    setInterval(function() { drawText('strokeRate', 20 + Math.trunc(Math.random() * 5)) }, 1000);
    setInterval(function() { drawText('averagePace', Math.random() * 2) }, 1000);
    setInterval(function() { drawText('averagePower', 200 + Math.trunc(Math.random() * 20)) }, 1000);
    setInterval(function() { drawText('strokePower', 200 + Math.trunc(Math.random() * 20)) }, 1000);
            };
        });
});
