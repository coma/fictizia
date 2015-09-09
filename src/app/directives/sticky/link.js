var StickyLink = function (scope, element) {

    if (!(this instanceof StickyLink)) {

        return new StickyLink(scope, element);
    }

    this.stick   = true;
    this.element = element[0];

    var observer = new MutationObserver(this.onMutation.bind(this));

    observer.observe(this.element, {
        childList: true,
        subtree  : true
    });

    element.on('scroll', this.onScroll.bind(this));
    scope.$on('$destroy', observer.disconnect.bind(observer));
};

StickyLink.prototype.onMutation = function () {

    this.forced = true;

    if (this.stick) {

        this.element.scrollTop = this.element.scrollHeight;
    }
};

StickyLink.prototype.onScroll = function () {

    this.stick  = this.forced && this.element.scrollTop < this.element.scrollHeight - 20;
    this.forced = false;
};

module.exports = StickyLink;
