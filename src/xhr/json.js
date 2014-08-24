import "xhr";

d3.json = function(url, callback) {
  //return d3_xhr(url, "application/json", d3_json, callback);
  var xhr = d3_xhr(url, "application/json", d3_json, callback);
  return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
};

function d3_json(request) {
  return JSON.parse(request.responseText);
}
