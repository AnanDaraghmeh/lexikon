$(function(){
    
    // render the last searched word when the page is ready
    if (sessionStorage.getItem('userInput') !== null){
     let userInput = JSON.parse(sessionStorage.getItem('userInput'));
     $('#searchField').val(userInput);
     fetchData(userInput);
     fetchSwedishDefinition(userInput);
    }

});