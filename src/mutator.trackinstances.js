/**
 * @author Elad Ossadon (http://devign.me | http://twitter.com/elado)
 */
$.Class.Mutators.TrackInstances = function (allow) {
    if (!allow) return;

    // save current initialize method
    var oldInit = this.prototype.initialize;
    var $instance = this;

    $instance.prototype.initialize = function () {
        ($instance.instances = $instance.instances || []).push(this);
        oldInit.apply(this, arguments);
    };
};