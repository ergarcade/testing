let timerId;
let timers = [];

self.addEventListener('message', function(e) {
    if (e.data == "start") {
        timerId = setInterval(function() {
            self.postMessage({ some: 'structure', date: new Date().toLocaleTimeString() });
        }, 1000);
        timers.push(timerId);
    } else if (e.data == "stop") {
        console.log('stopping timers');
        timers.forEach(function(e, i) {
            console.log('clearing timer ' + e);
            clearInterval(e);
        });
        timers = [];
    }
});
