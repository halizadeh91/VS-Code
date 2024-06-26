(function ($) {
    "use strict";
    var Defaults = {
        NoItemLg: 1,
        NoItemMd: 1,
        NoItemSm: 1,
        SlidtoScroll: false,
        ItemtoSlide: 1
    };

    $.fn.slider = function (Options) {
        var Settings = $.extend({}, Defaults, Options);
        var TargetName = this;
        var Finddiv = $(this).children("div");
        Finddiv.addClass("items");
        Finddiv.wrapAll("<div class='slider-main'><div class='landing-wrapper'><div class='landing-inner-content'></div></div></div>");
        $(this).find(".slider-main").append("<div class='arrow-main'><span class='arrow arrow-left'><i class='fas fa-chevron-left'></i></span><span class='arrow arrow-right'><i class='fas fa-chevron-right'></i></span></div>");

        var autoScrollTimeline;

        function Refresh(Settings, Target) {
            var LandingWrapper = Target.find(".landing-wrapper");
            var LandingInnerContent = Target.find(".landing-inner-content");
            var NumberOfItem = getNumberOfItems(Settings);
            var Itemwidth = LandingWrapper.width() / NumberOfItem;
            var Slides = Target.find(".items").css("width", Itemwidth);
            var TotalItems = Slides.length;
            LandingInnerContent.empty(); // Clear previous clones
            var clonesBefore = Slides.clone().addClass('clone');
            var clonesAfter = Slides.clone().addClass('clone');
            LandingInnerContent.prepend(clonesBefore).append(clonesAfter).css("width", Itemwidth * (TotalItems * 6));
            LandingWrapper.scrollLeft(Itemwidth * TotalItems);

            function getNumberOfItems(Settings) {
               {
                    return 3;
                }
            }

            function startAutoScroll() {
                if (autoScrollTimeline) {
                    autoScrollTimeline.kill();
                }
                var loopTime = 10 * TotalItems;
                autoScrollTimeline = new TimelineMax({ repeat: -1, ease: Linear.easeNone });
                autoScrollTimeline.to(LandingWrapper, loopTime, {
                    scrollTo: { x: "+=" + (Itemwidth * TotalItems) },
                    onComplete: function () {
                        LandingWrapper.scrollLeft(Itemwidth * TotalItems);
                    }
                });
            }

            function slide(direction) {
                var distance = direction === 'right' ? "+=" : "-=";
                TweenMax.to(LandingWrapper, 2, {
                    scrollTo: { x: distance + Itemwidth * Settings.ItemtoSlide },
                    onComplete: function () {
                        if (direction === 'right' && LandingWrapper.scrollLeft() >= Itemwidth * (TotalItems * 2)) {
                            LandingWrapper.scrollLeft(Itemwidth * TotalItems);
                        } else if (direction === 'left' && LandingWrapper.scrollLeft() <= 0) {
                            LandingWrapper.scrollLeft(Itemwidth * TotalItems);
                        }
                        startAutoScroll();
                    }
                });
            }

            Target.find(".arrow-left").off("click").on("click", function () {
                slide('left');
            });
            Target.find(".arrow-right").off("click").on("click", function () {
                slide('right');
            });

            startAutoScroll();
        }

        function initialize() {
            Refresh(Settings, TargetName);
            $(window).on("resize orientationchange", function () {
                clearTimeout($.data(this, 'resizeTimer'));
                $.data(this, 'resizeTimer', setTimeout(function () {
                    // Re-initialize the slider on resize or orientation change
                    Refresh(Settings, TargetName);
                }, 250));
            });
        }

        initialize();
    };
})(jQuery);

$(document).ready(function () {
    $("#slider1").slider({
        NoItemLg: 5,
        NoItemMd: 4,
        NoItemSm: 2,
        SlidtoScroll: false,
        ItemtoSlide: 2
    });
});
