import "../core/document";
import "xhr";

d3.html = function(url, callback) {
  //return d3_xhr(url, "text/html", d3_html, callback);
  var xhr = d3_xhr(url, "text/html", d3_html, callback);
  return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
};

function d3_html(request) {
  var range = d3_document.createRange();
  range.selectNode(d3_document.body);
  return range.createContextualFragment(request.responseText);
}
