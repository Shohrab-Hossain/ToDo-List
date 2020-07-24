
checkEmptyTodo();

// ------------------------------------------------------------------------------------------------------ //
/* --------( this function slide up and down the input field with h1 i click )-------- */
$('h1 i').on('click', function(){
    $('#inputContainer').slideToggle(700);
    $(this).fadeOut(500, function(){
        $(this).toggleClass("fas fa-plus-square fas fa-chevron-circle-up");
        $(this).fadeIn(100);
    })
})



// ------------------------------------------------------------------------------------------------------ //
/* --------( shows "No Todo Listed" window when there is no todo or all todo is deleted )-------- */
$('#noList').on('click', function(){
    $('h1 i').click();
})

function checkEmptyTodo (noTodo = true){
    if(noTodo){
        $('#noList').fadeIn(700, function(){
            $('#noList').css({display: 'inline-block'});
        })
    }
    else {
        $('#noList').fadeOut(700, function(){
            $('#noList').css({display: 'none'});
        })
    }
}



// ------------------------------------------------------------------------------------------------------ //
/* --------( this functions creates hover and focus effects on inputContainer fields )-------- */
var isCliked = false;

$('#inputContainer').hover(
    function(){  // creates box shadow effect when hover-in
        $(this).css('box-shadow', '4px 4px 15px #00868b');
    },
    function(){  // removes box shadow effect when hover-out, only if input field does not have focus or clicked
        if(!isCliked){
            $(this).css('box-shadow', 'none');
        }
    }
)

$('#inputContainer input').on('click', function(event){  // creates box shadow effect when input field has focus or clicked
    isCliked = true;
    $('#inputContainer').css('box-shadow', '4px 4px 15px #00868b');
    event.stopPropagation();
})

$('body').on('click', function(){  // removes box shadow effect when input field focus is removed or clicked outside
    if(isCliked){
        isCliked = false;
        $('#inputContainer').css('box-shadow', 'none');
    }
})



// ------------------------------------------------------------------------------------------------------ //
/* --------( this functions animates message and button visibility of inputContainer )-------- */
$('#inputContainer button').on('click', addNewTodo);   // add new ToDo when Checked-button is pressed

$('#inputContainer input').on('keyup', function(event){  // listen for key entered in input field and analyze it
    var text = $(this).val();
    if(text.length>0){  // checks either there is text in input field or not
        show_AddTodoButton();
        if(event.which == 13){  // add new ToDo when Enter is pressed
            addNewTodo();
        }
    }
    else{
        hide_AddTodoButton();
    }
})

function show_AddTodoButton(){
    $('#inputContainer input').css('width', '85%');
    $('#inputContainer button').fadeIn(500).css({width: '15%', display: 'inline-block'});
}

function hide_AddTodoButton(_callback){  // _callback is used for callback function. Which fires if any callback fuction is provided
    $('#inputContainer button').fadeOut(500, function(){
        $(this).css({display: 'none'});
        $('#inputContainer input').css('width', '100%');
        if(_callback != undefined){  // checks wether any callback funtion is provided or not
            _callback();
        }
    })
}

function addNewTodo(){  // this function add new todo to the end position of ul list (append)
    var inp =   "<li>"                                 +
                    "<input type='checkbox'>"          +
                    "<span></span>"                    +
                    "<input type='text'>"              +
                    "<button>Cancel</button>"          +
                    "<i class='fas fa-trash-alt'></i>" +
                    "<i class='fas fa-edit'></i>"      +
                "</li>";

    $('#ulTodo').append(inp);
    $('#ulTodo li:last-child span').text( $('#inputContainer input').val() );

    checkEmptyTodo($('#ulTodo li').length == 0);
    
    $('#ulTodo li:last-child').css({display: 'none'}).fadeIn(1200);
    $('#inputContainer input').toggleClass('ji');
    $('#inputContainer input').val('').blur().prop('disabled', true);
    $('#inputContainer button').prop('disabled', true);
    $('#ulTodo li i').prop('disabled', true);
    $('#inputContainer button i').toggleClass('fa-check-square fa-check').css({fontSize: '135%', fontWeight: 'bolder'});
    
    doneMessage('New ToDo is added', function(){
        $('#inputContainer').css('box-shadow', 'none');
        $('#inputContainer input').toggleClass('ji');
        hide_AddTodoButton(function(){
            $('#inputContainer input').prop('disabled', false);
            $('#inputContainer button').prop('disabled', false);
            $('#ulTodo li i').prop('disabled', false);
            $('#inputContainer button i').toggleClass('fa-check fa-check-square').css({fontSize: '100%', fontWeight: 'bold'});;
        })
    })

    addScrollBar();

}

function doneMessage(msg, _callback){  // this function shows a slide up message when a new todo is added
    $('body').toggleClass('ji');
    $('#message p').text(msg);
    $('#message p').addClass('doneMessage').slideToggle(700, function(){
        $(this).delay(800).slideToggle(700, function(){
            $(this).removeClass('doneMessage').text('');
            $('body').toggleClass('ji');
            if(_callback != undefined){
                _callback();
            }
        })
    })
} 

function addScrollBar(){
    if( $('#ulTodo li').length >= 6 ){  // this checks the height of ul, and make the window scrollable if height is 300px, and turn to normal if less than 300px
        $('#ulTodo').addClass('scrolBar');
    }
    else{
        $('#ulTodo').removeClass('scrolBar');
    }
}


// ------------------------------------------------------------------------------------------------------ //
/* --------( this functions change font color and line-through effect when checkbox and span is clicked )-------- */
$('#ulTodo').on('click', 'li span', function(){
    $(this).toggleClass('completedTodo');
    if($(this).siblings("input[type='checkbox']").prop('checked') == true){  // span and checkbox are siblings. So here checkbox is selected by selecting span and traversing to checkbox using siblings()
        $(this).siblings("input[type='checkbox']").prop('checked', false);
    }
    else{
        $(this).siblings("input[type='checkbox']").prop('checked', true);
    }
})

$('#ulTodo').on('click', "li input[type='checkbox']", function(){
    $(this).siblings("span").toggleClass('completedTodo');  // traversing from checkbox to span using siblings(), as checkbox and span are siblings in li
})



// ------------------------------------------------------------------------------------------------------ //
/* --------( this functions removes a todo )-------- */
$('#ulTodo').on('click', 'li i:nth-last-child(2)', function(){
    $('#inputContainer input').prop('disabled', true);
    $('#ulTodo li i').prop('disabled', true);
    $(this).parent().fadeOut(700, function(){
        $(this).remove();
        addScrollBar();
        checkEmptyTodo($('#ulTodo li').length == 0);
    })
    doneMessage('Todo is deleted', function(){
        $('#inputContainer input').prop('disabled', false);
        $('#ulTodo li i').prop('disabled', false);
    })
})



// ------------------------------------------------------------------------------------------------------ //
/* --------( displays edit box filled to edit a selected todo and make them disapper after edit )-------- */
var isEditOn = false;
var _this = undefined;
$('#ulTodo').on('click', 'li i:nth-last-child(1)', function(event){
    isEditOn = true;
    $('#inputContainer input').prop('disabled', true);
    $('#ulTodo li i').prop('disabled', true);
    $(this).parent().toggleClass('boxShadow').css({border: "3px solid rgb(60, 60, 235)"});
    $(this).siblings("button").css({display: 'inline-block', width: '21%', opacity: '1.0'});
    $(this).siblings("input[type='text']").css({display: 'inline-block', width: '79%', opacity: '1.0'}).focus().val($(this).siblings("span").text());
    $(this).siblings("input[type='checkbox']").remove();
    $(this).siblings("span").css({display: 'none'});
    $(this).siblings("i").remove();
    _this = $(this).siblings("button");  // _this stores the selection for latter use on body click
    $(this).remove();  // this statement should be here, donot move up. Otherwise it will be deleted and selection will not work properly
    event.stopPropagation();  // this will stop Event Bubling
})

$('#ulTodo').on("keyup", "li input[type='text']", function(event){
    if($(this).val() == $(this).siblings('span').text()){
        $(this).siblings("button").text('Cancel');
    }
    else{
        $(this).siblings("button").text('Update');
    }

    if(event.which == 13) {
        $(this).siblings("button").click();
    }
})

$('#ulTodo').on("click", "li input[type='text']", function(event){
    event.stopPropagation();
})

$('#ulTodo').on('click', 'li button', function(event){
    isEditOn = false;
    $(this).parent().toggleClass('boxShadow').css({border: "none"});
    var inp = "<input type='checkbox'>";
    $(this).parent().prepend(inp);
    $(this).siblings("span").css({display: 'inline-block'});
    var inp = "<i class='fas fa-trash-alt'></i>" +
              "<i class='fas fa-edit'></i>";
    $(this).parent().append(inp);
    $(this).siblings("input[type='text']").css({display: 'none', width: '0', opacity: '0'});
    $(this).css({display: 'none', width: '0', opacity: '0'});
    if($(this).text() == 'Update'){
        $(this).siblings("span").text($(this).siblings("input[type='text']").val()).removeClass('completedTodo');
        $(this).text('Cancel');
        doneMessage('ToDo is updated');
    }
    $('#inputContainer input').prop('disabled', false);
    $('#ulTodo li i').prop('disabled', false);
    event.stopPropagation();  // this will stop Event Bubling
})

$('body').on('click', function(){
    if(isEditOn){
        _this.text('Cancel');  // here _this = $(this).siblings("button") and this = "#ulTodo li input[type='text']"
        _this.click();
    }
})