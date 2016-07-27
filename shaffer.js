var canvas;
var context;
var imageURL;
var imageFilter;

// grayscale filter using an arithmetic average of the color 
// components
grayscale = function (pixels, args) {
  var d = pixels.data;
  for (var i = 0; i < d.length; i += 4) {
    var r = d[i];
    var g = d[i + 1];
    var b = d[i + 2];
    d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
  }
  return pixels;
};

shaffer = function(bias) {
  return function (pixels, args) {
      var d = pixels.data;
      // bias = bias / 1000.0;

      for (var i = 0; i < d.length; i += 4) {
        // var r = d[i];
        var g = d[i + 1]/255.0;
        var b = (d[i + 2]+1)/255.0;

        var sf = 2.0 - (g-bias)/b;
        if (sf > 1) { sf = 1; }
        else if (sf < 0) { sf = 0; }

        d[i] = d[i + 1] = d[i + 2] = sf*255;
      }
      return pixels;
    };
};

// apply a filter to the image data contained in the canvas object
function filterCanvas(filter) {
  if (canvas.width > 0 && canvas.height > 0) {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    filter(imageData);
    context.putImageData(imageData, 0, 0);
  }
}

// load the image specified by the imageURL and apply
// the filter imageFilter
function update() {
  document.querySelector("#before_image").src = imageURL;
  var image = new Image();
  image.onload = function () {
    // image resize
    var MAX_WIDTH = 400;
    var MAX_HEIGHT = 300;
    var width = image.width;
    var height = image.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    image.height = height;
    image.width = width;
    // image resize END

    if (image.width != canvas.width)
      canvas.width = image.width;
    if (image.height != canvas.height)
      canvas.height = image.height;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    filterCanvas(imageFilter);
  }
  image.src = imageURL;
}

// open a File object.
function handleFiles(files) {
  var file = files[0];

  // Only process image files. 
  var imageType = /image.*/;
  if (!file.type.match(imageType)) {
    return;
  }

  var reader = new FileReader();

  reader.onerror = function (e) {
    alert('Error code: ' + e.target.error);
  };

  // Create a closure to capture the file information. 
  reader.onload = (function (file) {
    return function (evt) {
      document.querySelector("#filename").innerHTML = file.name;
      loadImage(evt.target.result);
    }
  })(file);

  // Read in the image file as a data url. 
  reader.readAsDataURL(file);
}

function loadImage(u) {
  imageURL = u;
  update();
}

function setFilter(f) {
  imageFilter = f;
  update();
}

 // Reset to default image and filter
function reset() {
  imageURL = "./h49_2.png";
  var bias = -0.07;
  imageFilter = shaffer(-0.07); //grayscale;
  biasInputText.value = bias;
  biasInputRange.value = bias;
  document.querySelector("#filename").innerHTML = "";
  update();
}

function onLoad() {
  canvas = document.querySelector("#after_image");
  context = canvas.getContext("2d");

  registerDragAndDrop(document, handleFiles);

  // Reset to defaults loading a default image
  reset();                
}

 // Define helper function to register an object for drag and drop
var registerDragAndDrop = (function () {

  function stopDefault(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  return function (obj, f) {
    // Setup drag and drop handlers. 
    obj.addEventListener('dragenter', stopDefault, false);
    obj.addEventListener('dragover', stopDefault, false);
    obj.addEventListener('dragleave', stopDefault, false);
    obj.addEventListener('drop', function (e) {
      stopDefault(e);
      var files = e.dataTransfer.files;
      if (files && files.length > 0)
        f(files);
    }, false);
  }
})();

 // Define helper function to prompt the user to choose a file from disk
var openFile = (function () {
  return function (c) {
    var fileinput = document.querySelector("#fileinput");        
    function onfilechange(e) {
        var files = e.target.files;
        if (files && files.length > 0)
          c(files);
    }
    fileinput.addEventListener('change', onfilechange, false);
    //fileinput.change(onfilechange);
    fileinput.click();
  }
})();      