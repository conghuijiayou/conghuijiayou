function CustomScrollbar(content, scrollbar, ops) {
    var def_ops = {
        fix: true,
        touch: true
    };
    ops = $.extend({}, def_ops, ops);
    var container = $(content);
    if (container.length === 0) return;
    if (ops.fix) {
        (function() {
            var width = 0;
            var child = $(':first', container).children();
            for (var i = 0; i < child.length; i++) {
                width += $(child[i]).width() + parseInt($(child[i]).css('margin-left')) + parseInt($(child[i]).css('margin-right'));
            }
            $(':first', container).css('width', width);
        })();
    }
    var line = $(scrollbar);
    if (line.length !== 0)
        container.css('overflow-x', 'hidden');
    var all = $(':first', container);
    var btn = $(':first', line);
    container.on('scroll', function() {
        var max = line.width() - btn.width();
        var p = this.scrollLeft / (this.scrollWidth - container.width());
        btn.css('left', max * p);
    });
    var start;
    function px(event) {
        return event.originalEvent.touches ? event.originalEvent.touches[0].pageX : event.pageX;
    }
    function touchstart(event) {
        if (event.type !== 'touchstart') event.preventDefault();
        var t = !container.is(this);
        start = {
            x: px(event),
            o: t ? parseInt(btn.css('left')) : container.get(0).scrollLeft,
            t: t
        };
    }

    function touchmove(event) {
        if (!start) return;
        if (event.type !== 'touchmove') event.preventDefault();
        var d = px(event) - start.x;
        var t, max;
        if (start.t) {
            t = start.o + d;
            if (t < 0) t = 0;
            max = line.width() - btn.width();
            if (t > max) t = max;
            container.get(0).scrollLeft = t / max * (container.get(0).scrollWidth - container.width());
        } else {
            t = start.o - d;
            if (t < 0) t = 0;
            max = container.get(0).scrollWidth - container.width();
            if (t > max) t = max;
            container.get(0).scrollLeft = t;
        }
    }

    function touchend(event) {
        if (!start) return;
        if (event.type !== 'touchend') event.preventDefault();
        start = null;
    }

    btn.on('mousedown', touchstart).on('touchstart', touchstart);
    if (ops.touch) {
        container.on('mousedown', touchstart).on('touchstart', touchstart);
    }
    $(document).on('mousemove', touchmove)
        .on('mouseup', touchend)
        .on('touchmove', touchmove)
        .on('touchend', touchend);
}
