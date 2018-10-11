$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

function uploadFile() {
  // let source = document.getElementById('upload');
  //
  // source.addEventListener('change', (e) => {
  // edited.src = URL.createObjectURL(e.target.files[0]);
  // }, false);
  // loadImage(edited.src);
  if(window.File && window.FileList && window.FileReader)
  {
      $('#files').on("change", function(event) {
          var files = event.target.files; //FileList object
          var output = document.getElementById("result");
          for(var i = 0; i< files.length; i++)
          {
              var file = files[i];

              if(file.type.match('image.*')){
                  if(this.files[0].size < 10485760){
                    var imgReader = new FileReader();
                    imgReader.addEventListener("load",function(event){
                        var imgFile = event.target;
                        var div = document.createElement("div");
                        div.innerHTML = "<img class='thumbnail' src='" + imgFile.result + "'" +
                                "title='preview image'/>";
                        // div.innerHTML = "<option data-img-src='" + imgFile.result + "'" +
                        //         " value='" + i + "'><option/>";
                        output.insertBefore(div,null);
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

// $('.image-picker').imagepicker();

window.onload = function() {
  uploadFile();
}
