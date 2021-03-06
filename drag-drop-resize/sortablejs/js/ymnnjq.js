/*
 * From http://youmightnotneedjquery.com/
 */
let toggleClass = function (el, className) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      el.className = classes.join(' ');
    }
}

let hasClass = function(el, className) {
    return el.classList.contains(className);
}
