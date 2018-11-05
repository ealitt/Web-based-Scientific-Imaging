var imageNum = 0;

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    $('.dropper').dropper({
      clickCallback: function(color) {
        $('#swatch').css('background-color','#'+color.rgbhex);
      }
    });
});

function initSlider(){
  $(document).ready( function() {
    $('#threshold').slider();

    $(document).on("click","#page-slider",function(){
        $('#threshold').toggle("slow");
    });
  });
}

function initProcessed() {
    document.getElementById("processed-tab").click();
}

function imageSelect(imgVal) {
  var selectedImage = document.getElementById("edited");
  selectedImage.src = imgVal.src;
}

function uploadFile() {
  if(window.File && window.FileList && window.FileReader)
  {
      $('#files').on("change", function(event) {
          var files = event.target.files; //FileList object
          var output = document.getElementById("result");
          for(var i = 0; i < files.length; i++)
          {
              var file = files[i];

              if(file.type.match('image.*')){
                  if(this.files[0].size < 10485760){
                    var imgReader = new FileReader();
                    imgReader.addEventListener("load",function(event){
                        var imgFile = event.target;
                        var div = document.createElement("div");
                        div.innerHTML = "<img id=image_" + imageNum + " class='thumbnail' src='" + imgFile.result + "'" +
                                "title='preview image' onclick=imageSelect(image_" + imageNum + ") />";
                        output.insertBefore(div,null);
                        if(imageNum == 0){
                          // let selectedImage = document.getElementById("edited");
                          let defaultImage = document.getElementById("image_0");
                          // selectedImage.src = defaultImage.src;
                          imageSelect(defaultImage);
                        }
                        imageNum = imageNum + 1;
                  });
                  //Read the image
                  $('#clear, #result').show();
                  imgReader.readAsDataURL(file);
                  }else{
                      alert("Image Size is too big. Maximum size is 10MB.");
                      $(this).val("");
                  }
              }else{
              alert("You can only upload image files.");
              $(this).val("");
          }
          }
      });
  }
  else
  {
      console.log("Your browser does not support File API");
  }
}

function tools(){
  $( "#threshold" ).slider({
    value: 0,
    animate:"fast",
    orientation: "horizontal",
    slide: function( event, ui ) {
      console.log($( "#threshold" ).slider( "value" ));
    }
  });
}


$('#files').on("click", function() {
    $('.thumbnail').parent().remove();
    $('result').hide();
    $(this).val("");
});

$('#clear').on("click", function() {
    $('.thumbnail').parent().remove();
    $('#result').hide();
    $('#files').val("");
    $(this).hide();
});

window.onload = function() {
  initSlider();
  uploadFile();
  tools();
}
