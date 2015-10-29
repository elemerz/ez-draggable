(function ($) {
    $.fn.ezDraggable = function (opts) {
        var defaults={
                handle: "", //selector to an inner handle to be grabbed. Default: empty==> the element itself is dragged.
                cursor: "move", //default drag cursor
                zIndex: 1000 //default zIndex of dragged element.
            },
            cfg= $.extend({},defaults,opts),
            $el = !!cfg.handle ? this.find(cfg.handle) : this;

        return $el.css('cursor', cfg.cursor).on("mousedown", function (e) {
            var $drag = cfg.handle ? $(this).addClass('active-handle').parent().addClass('draggable') : $(this).addClass('draggable'),
                z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;

            $drag.css('z-index', cfg.zIndex).parents().on("mousemove", function (e) {
                $('.draggable').offset({
                    top: e.pageY + pos_y - drg_h,
                    left: e.pageX + pos_x - drg_w
                }).on("mouseup", function () {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function () {
            if (cfg.handle) {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            } else {
                $(this).removeClass('draggable');
            }
        });
    };
})(jQuery);
