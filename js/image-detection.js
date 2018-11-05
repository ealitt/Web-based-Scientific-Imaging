const width = 350;
let result;
let dstC1 = null;
let dstC3 = null;
let dstC4 = null;

function processImage(){
  var imgSize;

  let imgElement = document.getElementById('edited');

  tempCanvas = createCanvas(imgElement);

  // imgElement.src = URL.createObjectURL(blob);
  // console.log(imgElement)

  console.log(tempCanvas);
  let mat = cv.imread(tempCanvas);
  cv.imshow('processed', mat);
  mat.delete();

  // let mat = cv.imread(imgElement);
  // console.log(mat);
  // cv.imshow('canvasOutput', mat);
  // mat.delete();

  // imgSize = [imgElement.width, imgElement.height];
  // height = imgElement.height / (imgElement.width / width);
  //
  // clearMemory();
  //
  // src = new cv.Mat(height, width, cv.CV_8UC4);
  //
  // let dsize = new cv.Size(width, height);
  // cv.resize(mat, src, dsize, 0, 0, cv.INTER_AREA);

  // result = contourDetection();

  // showImage();



};

function createCanvas(imgElement) {
  var newCanvas = document.createElement("canvas");
  newCanvas.id = "tempCanvas";
  newCanvas.width = imgElement.width;
  newCanvas.height = imgElement.height;

  var canvasContext = newCanvas.getContext('2d');
  canvasContext.src = canvasContext.drawImage(imgElement,0,0);
  var imageData=canvasContext.getImageData(0, 0, imgElement.width, imgElement.height);

  console.log(newCanvas);
  console.log(imgElement);

  return newCanvas;
}

function clearMemory(){
  stopImageProcessing();
  dstC1 = new cv.Mat(height, width, cv.CV_8UC1);
  dstC3 = new cv.Mat(height, width, cv.CV_8UC3);
  dstC4 = new cv.Mat(height, width, cv.CV_8UC4);
}

function stopImageProcessing() {
  // if (src != null && !src.isDeleted()) src.delete();
  if (dstC1 != null && !dstC1.isDeleted()) dstC1.delete();
  if (dstC3 != null && !dstC3.isDeleted()) dstC3.delete();
  if (dstC4 != null && !dstC4.isDeleted()) dstC4.delete();
}

function showImage() {
  cv.imshow('processed', result);
}

function contourDetection() {
  cv.cvtColor(src, dstC1, cv.COLOR_RGBA2GRAY, 0);
  console.log(dstC1);
  return dstC1;
}
