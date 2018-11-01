let dstC1 = null;
let dstC3 = null;
let dstC4 = null;

function contourDetection(){
  var imgSize;

  let imgElement = document.getElementById('edited');
  let inputElement = document.getElementById('fileInput');

  inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
  }, false);

  imgElement.onload = function() {
    let mat = cv.imread(imgElement);

    imgSize = [imgElement.width, imgElement.height];
    height = imgElement.height / (imgElement.width / width);

    clearMemory();

    src = new cv.Mat(height, width, cv.CV_8UC4);

    let dsize = new cv.Size(width, height);
    cv.resize(mat, src, dsize, 0, 0, cv.INTER_AREA);

    cv.imshow('canvasInputImage', src);

    result = contourDetection();

    showImage();
  };
};

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
  cv.imshow('canvasOutputImage', result);
}

function contourDetection() {
  cv.cvtColor(src, dstC1, cv.COLOR_RGBA2GRAY, 0);
  return dstC1;
}
