export default function keyEvents({id, onSelectEnter}) {
    const selectorId = `#${id}`;
    $(selectorId).keydown(function (e) {
        var $listItem = $(`${selectorId} li`);
        var key = e.keyCode,
            $selected = $listItem.filter('.selected'),
            $current;

        if (key != 40 && key != 38 && key != 13) return;

        if (key === 40) // Down key
        {
            $selected.removeClass('selected');
            if (!$selected.length || $selected.is(':last-child')) {
                $current = $listItem.eq(0);
            }
            else {
                $current = $selected.next();
            }
            $current.addClass('selected');
        }
        else if (key === 38) // Up key
        {
            $selected.removeClass('selected');
            if (!$selected.length || $selected.is(':first-child')) {
                $current = $listItem.last();
            }
            else {
                $current = $selected.prev();
            }
            $current.addClass('selected');
        }
        else if (key == 13) {
            if (typeof onSelectEnter === 'function') onSelectEnter($selected[0].value);
        }


    });
}