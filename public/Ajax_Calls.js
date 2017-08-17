
var previousTitle ="<%= title %>";
function validateTitle()
{
	var data = {};
      data.title = document.getElementById('title').value;
      data.content = document.getElementById('textbox').value;
        $.ajax({ 
          url: 'submitData', 
          type: 'post', 
          cache: false,
      
      data: data,
      success: function(data){
        if(typeof data.redirect == 'string')
        {
            window.location = data.redirect;
        }
        else
        {
            alert(data); //Title doesn't exists.
        }
         
      },
      error: function(result){
       //Shouldn't enter this
      }

    });
}

function saveData(previousTitle)
{
	var prevTitle = previousTitle;
	var data = {};
	data.title = document.getElementById('title').value;
	data.content = document.getElementById('textbox').value;
	data.prevTitle = prevTitle;
	$.ajax(
	{ 
		url: 'saveData', 
		type: 'post', 
		cache: false, 
		data: data,
		success: function(data)
		{
			if(typeof data.redirect == 'string')
			{
				window.location = data.redirect;
			}
      else
      {
        alert(data);
      }  
		},
		error: function(result)
		{
			alert("Something went wrong"); //Shouldn't enter this
		}
	});
}


function previewFile() {
  var preview = document.querySelector('.image_preview');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();
  
  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}



//Typeahead bootstrap function.
$(document).ready(function()
{
  $('#typeahead').typeahead(
  {
    items: 5,
    source: function(text, result)
    {
      $.ajax(
      {
        url: "../wiki/search",
        method: "get",
        data: {text: text},
        dataType: "json",
        success: function(data)
        {
          return result(data);
        }
      });
    },
    minLength: 2,
    menu: '<ul class="typeahead dropdown-menu" role="listbox"></ul>',
    item: '<li class = "dropdown_list_item"><a class = "dropdown-item" href = "#" role = "option"></a></li>',
    afterSelect: function(data)
    {
      window.location = "../wiki/"+data;
    }
  });
});

$(document).ready(function(e)
{
  $("#uploadImage").on('submit',function(e)
  {
    e.preventDefault();
    $("#status").empty().text("File is uploading ...");
    $.ajax(
    {
      url: "/wiki_image/submitImage",
      type: "post",
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: function(data)
      {
        $('#status').empty().text(data);
      },
      error: function(data)
      {
        $('#status').empty().text(data);
      }
    });
  });
});

/*$(document).ready(function()
{
  $("#uploadImage").submit(function()
  {
    var image_name = $('#image_name').val();
    $("#status").empty().text("File is uploading ...");
    $(this).ajaxSubmit(
    {
      data: {image_name: image_name},
      contentType: false,
      error: function(xhr)
      {
        alert(xhr);
        //status('Error: ' + xhr.status);
      },

      success: function(response)
      {
        alert("HELLO");
        //$('#status').empty().text(response);
      }
    });
    return false;
  });
});*/

