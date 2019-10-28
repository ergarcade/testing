let width = 640;
let height = 480;

let statsConfig = {
    left: 0,
    top: 0,
    width: 160,
    height: height,
    fill: 'rgba(64, 64, 64, 0.5)',
    color: 'rgb(255, 255, 255)'
};

let labelConfig = {
    elapsedTime: {
        label: { left: 5, top: 20, textSize: 15 },
        value: { left: 5, top: 45, textSize: 25 }
    },
    distance: {
        label: { left: 5, top: 80, textSize: 15 },
        value: { left: 5, top: 105, textSize: 25 }
    },
    currentPace: {
        label: { left: 5, top: 140, textSize: 15 },
        value: { left: 5, top: 165, textSize: 25 }
    },
    strokeRate: {
        label: { left: 5, top: 200, textSize: 15 },
        value: { left: 5, top: 225, textSize: 25 }
    },
    strokePower: {
        label: { left: 5, top: 260, textSize: 15 },
        value: { left: 5, top: 285, textSize: 25 }
    },
    averagePace: {
        label: { left: 5, top: 320, textSize: 15 },
        value: { left: 5, top: 345, textSize: 25 }
    },
    averagePower: {
        label: { left: 5, top: 380, textSize: 15 },
        value: { left: 5, top: 405, textSize: 25 }
    }
};

let capture;

function setup() {
    createCanvas(width, height);
    capture = createCapture(VIDEO);
    capture.size(width, height);
    capture.hide();
}

function draw() {
    image(capture, 0, 0, width, height);
    drawStats();
}

function drawStats() {
    strokeWeight(0);
    fill(statsConfig.fill);
    rect(statsConfig.left, statsConfig.top, statsConfig.width, statsConfig.height);

    fill(statsConfig.color);

    for (let k in labelConfig) {
        if (shared.hasOwnProperty(k)) {
            textSize(labelConfig[k].label.textSize);
            text(pm5fields[k].label, labelConfig[k].label.left, labelConfig[k].label.top);

            textSize(labelConfig[k].value.textSize);
            text(pm5fields[k].printable(shared[k]), labelConfig[k].value.left, labelConfig[k].value.top);
        }
    }
}


let shared = {};
let toShared = function(k, v) {
    shared[k] = v;
}

let cbMessage = function(m) {
    for (let k in m.data) {
        if (m.data.hasOwnProperty(k) && values.hasOwnProperty(k)) {
            toShared(k, m.data[k]);
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    setInterval(function() { toShared('elapsedTime', 100+(Math.random() * 10)); }, 1000);
    setInterval(function() { toShared('distance', Math.random() * 500) }, 1000);
    setInterval(function() { toShared('currentPace', 120+(Math.random() * 2)) }, 1000);
    setInterval(function() { toShared('strokeRate', 20 + Math.trunc(Math.random() * 5)) }, 1000);
    setInterval(function() { toShared('averagePace', 120+(Math.random() * 2)) }, 1000);
    setInterval(function() { toShared('averagePower', 200 + Math.trunc(Math.random() * 20)) }, 1000);
    setInterval(function() { toShared('strokePower', 200 + Math.trunc(Math.random() * 20)) }, 1000);
});
