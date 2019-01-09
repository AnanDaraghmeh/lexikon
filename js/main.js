$(function(){

$('#searchField').on('keypress', (e)=>{
        if (e.which === 13){
        let userInput = e.target.value;
        e.preventDefault();
        $('#meaningsDiv').html("");
        $('#examplesDiv').html("");
        fetchData(userInput);
    }
})
$('#search-button').on('click', (e)=>{
    let userInput = $('#searchField').val();
    $('#meaningsDiv').html("");
    $('#examplesDiv').html("");
    fetchData(userInput);
})


function fetchData (userInput){
let request = $.ajax();
 //test if the string matches a regex, if arabic or latin to call the proper ajax
if (/[\u0600-\u06FF]+/g.test(userInput)){
    request = $.ajax({
        method: "GET",
        url: "https://glosbe.com/gapi/translate?from=ara&dest=swe&format=json&phrase=" + userInput + "&pretty=true&tm=true",
        dataType: "jsonp"
    });
} else if (/[\u0000-\u007F]+/g.test(userInput)){
    request = $.ajax({
        method: "GET",
        url: "https://glosbe.com/gapi/translate?from=swe&dest=ara&format=json&phrase=" + userInput + "&pretty=true&tm=true",
        dataType: "jsonp"
    });
}
          
request.then(data => {
    let meanings = data.tuc;
    let examples = data.examples;
    let mapedMeanings = meanings.filter(item => item.phrase != null).map(item=> item.phrase.text);
    mapedMeanings.forEach(word => {
        $('#meaningsDiv').append(createMeanings(word));
    })
    examples.forEach(example => {
            $('#examplesDiv').append(createExamples(example));
    })
}); 
}

function createMeanings(word){
    return `<li class="list-group-item bg-primary">${word}</li>`
}

function createExamples (example){
    return `<ul class="list-group mt-1">
                <li class="list-group-item bg-secondary">${example.first}</li>
                <li class="list-group-item">${example.second}</li>
            </ul>`
}

});
