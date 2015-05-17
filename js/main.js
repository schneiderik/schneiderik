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

var UrlParameters = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
  return query_string;
} ();

var tabClick = function(e) {
  e.preventDefault();
  var active_item = document.querySelectorAll('nav.tabs a.active')[0];
  removeClass(active_item, 'active');
  addClass(e.target, 'active');
  toggleContent(e.target.getAttribute('href'));
}

var updateCart = function() {
  var cart = document.querySelectorAll('#cart input[type="submit"], nav input[type="submit"]')[0];

  var itemCount = 0
  eachItem(paypal.minicart.cart.items(), function(item) {
    itemCount += item.get('quantity')
  });
  cart.value = "Cart (" + itemCount + ")"
}

var cartAltered = function(idx, product, isExisting) {
  updateCart();

  product.on('change', updateCart)
}

var nav_tabs = document.querySelectorAll('nav.tabs a');
eachItem(nav_tabs, function(item) {
  item.addEventListener('click', tabClick);
});

// paypal.minicart.render({action: "https://www.sandbox.paypal.com/cgi-bin/webscr"});
paypal.minicart.render({action: "https://www.paypal.com/cgi-bin/webscr"});

if (UrlParameters.co == 'y') {
  paypal.minicart.reset();
}

paypal.minicart.cart.on("add", cartAltered);
paypal.minicart.cart.on("remove", cartAltered);
updateCart();


