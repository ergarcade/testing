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
        onClone: function(e) {
            e.item.id = "graph_" + (Math.floor((Math.random() * 98) + 1));
        },
        onSort: function(e) {
            e.item.classList.remove('variable');
            e.item.classList.add('graph');
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
