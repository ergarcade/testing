let drake;

document.addEventListener("DOMContentLoaded", function() {
    drake = dragula([ document.querySelector('#graphs') ]);

    document.querySelectorAll('#variables > div').forEach(function(el, i) {
        el.draggable = true;
    });

    document.querySelector('#variables').addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('variable', e.target.id);
    });

    let newgraph = document.querySelector('#newgraph');
    newgraph.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    newgraph.addEventListener('drop', function(e) {
        let variable = e.dataTransfer.getData('variable');

        let p = document.createElement('div');
        p.className = "graph";
        p.id = "graph_" + (Math.floor((Math.random() * 98) + 1)); 
        p.textContent = p.id;
        p.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        p.addEventListener('drop', function(e) {
            let variable = e.dataTransfer.getData('variable');

            console.log('adding variable ' + variable + ' to ' + e.srcElement.id);
        });

        document.querySelector('#graphs').appendChild(p);
        console.log('new graph ' + p.id + ' for variable ' + variable);
    });

    document.querySelectorAll('.graph').forEach(function(el, i) {
        el.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        el.addEventListener('drop', function(e) {
            let variable = e.dataTransfer.getData('variable');

            console.log('adding variable ' + variable + ' to ' + e.srcElement.id);
        });
    });
});
