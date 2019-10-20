document.addEventListener("DOMContentLoaded", function() {
    Sortable.create(document.querySelector('#variables'), {
        sort: false,
        group: {
            name: 'graphs',
            pull: 'clone',
            put: false
        },
        setData: function(dataTransfer, el) {
            dataTransfer.setData('Text', el.id);
        },
        onEnd: function(e) {
            console.log(e);
            /* XXX ugh - onEnd gets triggered on put == false */
            if (e.to.id !== "variables") {
                e.item.id = "graph_" + (Math.floor((Math.random() * 98) + 1));
                e.item.classList.remove('variable');
                e.item.classList.add('graph');
            }
        }

    });

    Sortable.create(document.querySelector('#graphs'), {
        sort: true,
        removeOnSpill: true,
        ghostClass: 'graph-ghost',
        group: {
            name: 'graphs',
        },
        onEnd: function(e) {
        }
    });
});
