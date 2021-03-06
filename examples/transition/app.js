(function () {

  var Transition = mokit.Transition;

  var random = function (min, max) {
    return parseInt(Math.random() * (max - min + 1) + min);
  };

  var Page = new mokit.Component({
    template: '<div class="page" style="background-color:{{color}}"><span>Tap me</span></div>',
    properties: { color: '#000' },
    onInit: function () {
      this.color = 'rgb(' + random(50, 200) + ',' +
        random(50, 200) + ',' +
        random(50, 200) + ')';
    }
  });

  mokit({
    element: document.getElementById('app'),
    change: function () {
      this.view.switchTo(new Page(), new Transition(random(1, 68)));
    },
    onReady: function () {
      this.view.switchTo(new Page());
    }
  }).start();

})(mokit);