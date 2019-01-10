$(function(){

$('#searchField').on('keypress', (e)=>{
        if (e.which === 13){
        e.preventDefault();
        let userInput = trimUserinput(e.target.value);
        console.log(e.target.value);
        console.log(userInput);
        $('#meaningsDiv').html("");
        $('#examplesDiv').html("");
        fetchData(userInput);
        fetchSwedishDefinition(userInput);
    }
})
$('#search-button').on('click', (e)=>{
    let userInput = $('#searchField').val();
    userInput = trimUserinput(userInput);
    $('#meaningsDiv').html("");
    $('#examplesDiv').html("");
    fetchData(userInput);
    fetchSwedishDefinition(userInput);
})

function trimUserinput (input){
    newInput = input.toLowerCase().trim().replace(/\s\s+/g, ' ');
    return newInput;
}
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
    console.log(data);
    let meanings = data.tuc;
    let examples = data.examples;
    let mapedMeanings = meanings.filter(item => item.phrase != null).map(item=> item.phrase.text);
    console.log(mapedMeanings);
    console.log(examples);
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

function fetchSwedishDefinition (userInput){
    // request swedish definitions only if the user input is in swedish
    if (/[\u0000-\u007F]+/g.test(userInput)){
        $.ajax({
            method: 'GET',
            url: "https://glosbe.com/gapi/translate?from=swe&dest=swe&format=json&phrase=" + userInput + "&pretty=true&tm=true",
            dataType: 'jsonp'
        }).then(data=>{
        let meanings = data.tuc;
        let mapedMeanings = meanings.filter(item => item.phrase != null).map(item=> item.phrase.text);
        console.log(mapedMeanings);
        mapedMeanings.forEach(word => {
            $('#meaningsDiv').append(createSwedishMeaning(word));
        })
        })
    }
    
}
function createSwedishMeaning(word){
    return `<li class="list-group-item bg-success">${word}</li>`
}


// contact form
$('#contact-button').on('click', (e)=>{
    $('#contact-form').css({'display':'block'});
})

}); //jQuery ready

