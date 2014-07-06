var eachItem = function(items, callback) {
  Array.prototype.forEach.call(items, function(item, i){
    callback(item);
  });
}

var addClass = function(el, className) {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
}

var removeClass = function(el, className) {
  if (el.classList)
    el.classList.remove(className);
  else
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

var toggleContent = function(selector) {
  var tabContents = document.querySelectorAll('.tab-content');
  eachItem(tabContents, function(item) {
    removeClass(item, 'active');
  });

  var targetContent = document.querySelectorAll(selector)[0];
  addClass(targetContent, 'active');
}

var startsWithHash = /^\#/g;

var tabClick = function(e) {
  var href = e.target.getAttribute('href');
  if (href.match(startsWithHash)) {
    e.preventDefault();
    var active_item = document.querySelectorAll('nav.tabs a.active')[0];
    removeClass(active_item, 'active');
    addClass(e.target, 'active');
    toggleContent(href);
  }
}

var nav_tabs = document.querySelectorAll('nav.tabs a');
eachItem(nav_tabs, function(item) {
  item.addEventListener('click', tabClick);
});
