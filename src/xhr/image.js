import "../core/document";
import "xhr";

d3.image = function(url, callback) {
  var xhr = d3_xhr(url, 'image/png', d3_image2, callback)
      .responseType('arraybuffer');
            //.responseType('blob');
  return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
};

function d3_image(request) {
  console.log(this.mimeType());
  console.log(this.responseType());
  console.log(request);
  //var blob = new Blob([request.response], {type : 'image/png'});
  //return blob;
  //return new Uint8Array(request.response);
  //return new Blob([request.response], {type : 'image/png'});
  return request.response;
}

function d3_image2(request) {
    var img = d3_document.createElement('img');
    img.onload = function(e) {
      console.log(e)
      window.URL.revokeObjectURL(img.src); // Clean up after yourself.
    };
    var blob = new Blob([request.response], {type : 'image/png'}); // the blob 
    img.src = d3_window.URL.createObjectURL(blob);
    return img;
}

d3.image2 = function(src, callback) {
  var image = new Image;
  image.src = src;
  image.onerror = callback;
  image.onload = function() { callback(null, image); };
};


/*
BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;

var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
xhr.responseType = 'arraybuffer';

xhr.onload = function(e) {
  if (this.status == 200) {
    var bb = new BlobBuilder();
    bb.append(this.response); // Note: not xhr.responseText

    var blob = bb.getBlob('image/png');
    var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); // the blob
    ...
  }
};

xhr.send();


var aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); // the blob

is equivalent to:

var oBuilder = new BlobBuilder();
var aFileParts = ['<a id="a"><b id="b">hey!</b></a>'];
oBuilder.append(aFileParts[0]);
var oMyBlob = oBuilder.getBlob('text/xml'); // the blob
*/
