
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
       alert("Something went wrong");//Shouldn't enter this
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
