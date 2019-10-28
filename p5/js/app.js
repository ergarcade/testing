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
        label: { left: 5, top: 70, textSize: 15 },
        value: { left: 5, top: 95, textSize: 25 }
    },
    currentPace: {
        label: { left: 5, top: 120, textSize: 15 },
        value: { left: 5, top: 145, textSize: 25 }
    },
    strokeRate: {
        label: { left: 5, top: 170, textSize: 15 },
        value: { left: 5, top: 195, textSize: 25 }
    },
    averagePace: {
        label: { left: 5, top: 220, textSize: 15 },
        value: { left: 5, top: 245, textSize: 25 }
    },
    averagePower: {
        label: { left: 5, top: 270, textSize: 15 },
        value: { left: 5, top: 295, textSize: 25 }
    },
    strokePower: {
        label: { left: 5, top: 320, textSize: 15 },
        value: { left: 5, top: 345, textSize: 25 }
    }
};

function setup() {
    createCanvas(width, height);
}

function draw() {
    background(255);

    /* XXX video image */

    fill(0);
    //ellipse(random(width), random(height), random(width), random(height));
    ellipse(mouseX, mouseY, 50, 50);

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
            text(
                pm5fields[k].label,
                statsConfig.left + labelConfig[k].label.left,
                statsConfig.top + labelConfig[k].label.top
            );

            textSize(labelConfig[k].value.textSize);
            text(
                pm5fields[k].printable(shared[k]),
                statsConfig.left + labelConfig[k].value.left,
                statsConfig.top + labelConfig[k].value.top
            );
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
