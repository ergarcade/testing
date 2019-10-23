let grid;

document.addEventListener('DOMContentLoaded', function(e) {
    var pckry = new Packery('.grid', {
        itemSelector: '.grid-item',
        columnWidth: 100,
    });

    grid = document.querySelector('.grid');

    function getItemElement() {
        var item = document.createElement('div');
        // add width and height class
        var wRand = Math.random();
        var hRand = Math.random();
        var widthClass = wRand > 0.85 ? 'grid-item--width3' : wRand > 0.7 ? 'grid-item--width2' : '';
        var heightClass = hRand > 0.85 ? 'grid-item--height3' : hRand > 0.5 ? 'grid-item--height2' : '';
        item.className = 'grid-item ' + widthClass + ' ' + heightClass;
        return item;
    }

    let append_button = document.querySelector('#append-box');
    append_button.addEventListener('click', function() {
        let items = [
            getItemElement(),
            getItemElement(),
            getItemElement(),
        ];
        let fragment = document.createDocumentFragment();
        fragment.appendChild(items[0]);
        fragment.appendChild(items[1]);
        fragment.appendChild(items[2]);
        grid.appendChild(fragment);

        pckry.appended(items);

        items.forEach(function(el) {
            let draggie = new Draggabilly(el);
            pckry.bindDraggabillyEvents(draggie);
        });
    });

    pckry.getItemElements().forEach( function( itemElem ) {
      var draggie = new Draggabilly( itemElem );
      pckry.bindDraggabillyEvents( draggie );
    });
});
