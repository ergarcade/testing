let grid;

$(function () {
    grid = $(".gridster > ul").gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [100, 55],
        resize: {
            enabled: true
        }
    }).data('gridster');

    var widgets = [
        ['<li>0</li>', 1, 2],
        ['<li>1</li>', 3, 2],
        ['<li>2</li>', 3, 2],
        ['<li>3</li>', 2, 1],
        ['<li>4</li>', 4, 1],
        ['<li>5</li>', 1, 2],
        ['<li>6</li>', 2, 1],
        ['<li>7</li>', 3, 2],
        ['<li>8</li>', 1, 1],
        ['<li>9</li>', 2, 2],
        ['<li>10</li>', 1, 3]
    ];

    $.each(widgets, function (i, widget) {
        console.log(widget[0], widget[1], widget[2]);
        grid.add_widget(widget[0], widget[1], widget[2]);
    });

    $('#add_widget').on('click', function(e) {
        grid.add_widget('<li>11</li>');
    });
});
