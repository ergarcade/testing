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
    let div = document.getElementById(m.type);
    if (!div) {
        div = document.createElement('div');
        div.id = m.type;
        document.querySelector('#notifications').appendChild(div);
    }

    /* iterate data elements and create / update value */
    for (let k in m.data) {
        if (m.data.hasOwnProperty(k)) {
            let selector = '#' + m.type + ' span.' + k;
            let s = document.querySelector(selector);
            if (!s) {
                let p = document.createElement('div');      /* one block per item */

                let desc = document.createElement('span');
                desc.className = 'element';
                desc.textContent = pm5fields[k].label;

                s = document.createElement('span');         /* create item */
                s.className = 'value ' + k;

                p.appendChild(desc);                        /* key name */
                p.appendChild(s);                           /* data element */
                div.appendChild(p);                         /* append block to container */

                p.addEventListener('click', function(e) {
                    toggleClass(this, 'highlight');
                });
            }
            s.textContent = pm5fields[k].printable(m.data[k]);
        }
    }
};

document.addEventListener('DOMContentLoaded', function(e) {
    document.querySelector('#connect').addEventListener('click', function() {
        if (!navigator.bluetooth) {
            alert('Web Bluetooth is not supported! You need a browser and ' +
                'platform that supports Web Bluetooth to use this application.');
            return;
        }

        let worker = new Worker('js/worker.js');

        worker.onmessage = function(event) {
            switch (event.messageId) {
                case 'connecting':
                    cbConnecting();
                    break;

                case 'connected':
                    cbConnected();
                    break;

                case 'disconnected':
                    cbDisconnected();
                    break;

                case 'message':
                    cbMessage(event.message);
                    break;
            }
        };

        worker.postMessage('start');
    });

    document.querySelector('#toggle-instructions').addEventListener('click', function() {
        let e = document.querySelector('#instruction-text');
        let button_text = 'Show instructions';

        toggleClass(e, 'hidden');
        if (!e.classList.contains('hidden')) {
            button_text = 'Hide instructions';
        }

        document.querySelector('#toggle-instructions').innerText = button_text;
    });
});
