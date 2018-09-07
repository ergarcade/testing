'use strict';

let m = new Monitor();

document.addEventListener('DOMContentLoaded', function() {
    let uiConnected = function() {
        document.querySelector('#connect').disabled = true;
        document.querySelector('#disconnect').disabled = false;
    };

    let uiDisconnected = function() {
        document.querySelector('#connect').disabled = false;
        document.querySelector('#disconnect').disabled = true;
    };

    let cbDisconnected = function() {
        console.log('cbDisconnected');
        this.removeEventListener('multiplexed-information', cbMultiplexed)
        this.removeEventListener('force-curve', cbForceCurve);
        this.removeEventListener('disconnect', cbDisconnected);

        uiDisconnected();
    };

    let cbMultiplexed = function(e) {
        let div = document.getElementById(e.type);
        if (!div) {
            div = document.createElement('div');
            div.id = e.type;
            document.querySelector('#notifications').appendChild(div);

            dragula([div]);
        }

        /* iterate data elements and create / update value */
        for (let k in e.data) {
            if (e.data.hasOwnProperty(k)) {
                let selector = '#' + e.type + ' span.' + k;
                let s = document.querySelector(selector);
                if (!s) {
                    let p = document.createElement('div');      /* one block per item */

                    let desc = document.createElement('span');
                    desc.className = 'element';
                    desc.textContent = k;

                    s = document.createElement('span');         /* create item */
                    s.className = 'value ' + k;

                    p.appendChild(desc);                        /* key name */
                    p.appendChild(s);                           /* data element */
                    div.appendChild(p);                         /* append block to container */

                    p.addEventListener('click', function(e) {
                        toggleClass(this, 'highlight');
                    });
                }
                s.textContent = e.data[k];
            }
        }
    };

    let cbForceCurve = function(e) {
        /*
        console.log('force curve');
        console.log(e);
        */
    };

    document.querySelector('#connect').addEventListener('click', function() {
        m.connect()
        .then(() => {
            uiConnected();
            return m.getMonitorInformation()
        })
        .then(information => {
            console.log(information);

            return m.addEventListener('multiplexed-information', cbMultiplexed)
            .then(() => {
                return m.addEventListener('force-curve', cbForceCurve)
            })
            .then(() => {
                return m.addEventListener('disconnect', cbDisconnected);
            })
            .catch(error => {
                console.log(error);
            });
        });
    });

    document.querySelector('#disconnect').addEventListener('click', function() {
        m.removeEventListener('multiplexed-information', cbMultiplexed)
        .then(() => {
            return m.removeEventListener('force-curve', cbForceCurve);
        })
        .then(() => {
            return m.disconnect();
        });
    });

    /*
     * Toggle highlight on selected elements.
     */
    document.querySelectorAll('#notifications > div').forEach(function(el, i) {
        el.addEventListener('click', function(e) {
            toggleClass(this, 'highlight');
        });
    });
});
