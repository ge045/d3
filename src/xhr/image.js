import "../core/document";
import "xhr";

d3.image = function(url, callback) {
  var xhr = d3_xhr(url, 'image/png', d3_image, callback)
      .responseType('blob');
      //.responseType('arraybuffer');
  return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
};

function d3_image(request) { // TODO: fallback for old browser versions needed
  var image = new Image();
  image.onload = function(e) {
      console.log("revoke callback for "+image.src)
      d3_window.URL.revokeObjectURL(image.src); // TODO: wrap this to handle various browser versions
  };
  image.src = d3_window.URL.createObjectURL(request.response); // TODO: wrap this to handle various browser versions
  return image;
}

d3.image2 = function(src, callback) {
  var image = new Image;
  image.src = src;
  image.onerror = callback;
  image.onload = function() { callback(null, image); };
};
