## **To-Do List** - a JavaScript based project

This app is designed using **`JavaScript`** and **`jQuery`**. The feature of this app is:  
1. [Adding new ToDo](#1-adding-new-todo)  
2. [Mark the ToDo that is completed](#2-mark-the-todo-that-is-completed)  
3. [Edit a ToDo](#3-edit-a-todo)  
4. [Delete a ToDo](#4-delete-a-todo)  

&nbsp;

### 1. Adding new todo  

> Animate the input field  

There is a `Plus-Icon` in the upper right corner, which is selected by query selector **`h1 i`**. By clicking this icon the input field slides down.
```javascript
$('h1 i').on('click', function(){
    $('#inputContainer').slideToggle(700);
    $(this).fadeOut(500, function(){
        $(this).toggleClass("fas fa-plus-square fas fa-chevron-circle-up");
        $(this).fadeIn(100);
    })
})
```

This animation will also happen if the `To-Do List is empty` line is clicked. The query selector for this is **`#noList`**.
```javascript
$('#noList').on('click', function(){
    $('h1 i').click();
})
```

&nbsp;

> reading text from input feild  
 
There is a unordered list with id `#ulTodo`. To add a new To-Do the function **`addNewTodo()`** is called, which created a new `li` is add it to the unordered list. The `li` is created and append to the unordered list using this block of code:  
```javascript
var inp = "<li>"                                 +
              "<input type='checkbox'>"          +
              "<span></span>"                    +
              "<input type='text'>"              +
              "<button>Cancel</button>"          +
              "<i class='fas fa-trash-alt'></i>" +
              "<i class='fas fa-edit'></i>"      +
           "</li>";

$('#ulTodo').append(inp);
$('#ulTodo li:last-child span').text( $('#inputContainer input').val() );
```

&nbsp;

> Hiding empty list message  

After adding new todo, the message for empty list is made disappeared by calling **`checkEmptyTodo()`** function. 
```javascript
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
```  

&nbsp;


### 2. Marking a ToDo as completed  

When the checkbox is pressed, the ToDo is marked as completed.
```javascript
$('#ulTodo').on('click', "li input[type='checkbox']", function(){
    $(this).siblings("span").toggleClass('completedTodo');
})
```
The css class `completedTodo` contains some effects.  

&nbsp;

### 3. Edit a ToDo  

> Display an editable text field prefilled with the ToDo

Let's display an editable text filled **`input[type='text']`**, which will be prefilled with the existing todo.

```javascript
$('#ulTodo').on('click', 'li i:nth-last-child(1)', function(event){
    isEditOn = true;
    $(this).siblings("button").css({display: 'inline-block', width: '21%', opacity: '1.0'});
    $(this).siblings("input[type='text']").css({display: 'inline-block', width: '79%', opacity: '1.0'}).focus().val($(this).siblings("span").text());
    $(this).siblings("input[type='checkbox']").remove();
    $(this).siblings("span").css({display: 'none'});
    $(this).siblings("i").remove();
    _this = $(this).siblings("button");  // _this stores the selection for latter use on body click
    $(this).remove();  // this statement should be here, donot move up. Otherwise it will be deleted and selection will not work properly
    event.stopPropagation();  // this will stop Event Bubling
})
```  

&nbsp;

> Read edit data and update the todo

A new **`li`** is created using the text from **`input[type='text']`**, and then append to the **`ul`** at the same position where the li previously was.
```javascript
$('#ulTodo').on('click', 'li button', function(event){
    isEditOn = false;
    var inp = "<input type='checkbox'>";
    $(this).parent().prepend(inp);
    $(this).siblings("span").css({display: 'inline-block'});
    var inp = "<i class='fas fa-trash-alt'></i>" +
              "<i class='fas fa-edit'></i>";
    $(this).parent().append(inp);
    $(this).siblings("input[type='text']").css({display: 'none', width: '0', opacity: '0'});
    $(this).css({display: 'none', width: '0', opacity: '0'});
    $(this).siblings("span").text($(this).siblings("input[type='text']").val()).removeClass('completedTodo');
    event.stopPropagation();  // this will stop Event Bubling
})
```  

&nbsp;

### 4. Delete a ToDo  

This will remove the **`li`** from the unordered list and refresh the list.
```javascript
$('#ulTodo').on('click', 'li i:nth-last-child(2)', function(){
    $(this).parent().fadeOut(700, function(){
        $(this).remove();
        addScrollBar();
        checkEmptyTodo($('#ulTodo li').length == 0);
    })
})
```  

<br />
&nbsp;


#### Some functionality  

> doneMessage()  

This function will display flash message on different events.

```javascript
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
```

&nbsp;
  
> addScrollBar() 

This function will display a scrollbar when the `ul` has more than 5 list item. 
```javascript
function addScrollBar(){
    if( $('#ulTodo li').length >= 6 ){
        $('#ulTodo').addClass('scrolBar');
    }
    else{
        $('#ulTodo').removeClass('scrolBar');
    }
}
```

&nbsp;
<hr>
&nbsp;

## View the project Live
> [To-Do list app](http://github.com)

&nbsp;





