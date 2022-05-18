export default class AnchorScroll {
    constructor() {
        this.anchorScroll();
    }

    anchorScroll() {
        var buttons = Array.from(document.querySelectorAll('.btn-js-scroll'));
        var headerH = getComputedStyle(document.body).getPropertyValue('--topbar-height').replace('px', '');

        buttons.forEach(function (item) {
            item.addEventListener('click', function () {
                var target = this.dataset.target;
                if (!target) { console.log('No attribute data-target specified') }
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (document.getElementById(target)) {
                    target = document.getElementById(target).getBoundingClientRect();
                } else {
                    target = document.querySelector('.view:last-child section:nth-of-type(2)').getBoundingClientRect();
                }
                target = Math.round(target.top + scrollTop - headerH - 0);
                scrollTo(document.documentElement, target, 600);
            });
        });

        function scrollTo(element, to, duration) {
            var start = element.scrollTop,
                change = to - start,
                currentTime = 0,
                increment = 5;
            var animateScroll = function () {
                currentTime += increment;
                var val = Math.easeInOutExpo(currentTime, start, change, duration);
                element.scrollTop = val;
                if (currentTime < duration) {
                    window.setTimeout(animateScroll, increment);
                }
            };
            requestAnimationFrame(animateScroll);
        }

        Math.easeInOutExpo = function (t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        };
    }
}