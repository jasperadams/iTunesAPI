/*
 * iTunes - Jasper Adams - 12/8/17
 */
var results = "";

$(document).ready(function(){
    $("#submit").click(function () {
        var searchTerm = deleteSpace($("#search").val());
        $.ajax({
            url: 'https://itunes.apple.com/search?term=' + searchTerm,
            type: 'GET',
            crossDomain: true,
            dataType: 'jsonp',
            success: function(result) {
                console.log(result);
                displayInfo(result) },
            error: function() { alert('Failed!'); }
        });
    })
});

function deleteSpace(term){
    var returnTerm = "";
    for(var i = 0; i < term.length; i++){
        if(term[i] === " "){
            returnTerm += "+";
        }
        else{
            returnTerm += term[i];
        }
    }
    return returnTerm;
}

function displayInfo(res){
    var num = $("#num").val();
    var $table = $("#displayTable");
    results = res;
    $(".data").remove();
    if(res.resultCount === 0){
        $table.append('<tr class="data"><td colspan="4">NO RESULTS</td></tr>');
    }else {
        for (var i = 0; i < num; i++) {
            var artwork = "<img src='" + res.results[i].artworkUrl100 + "'>";
            var trackName = res.results[i].trackName;
            var artist = res.results[i].artistName;
            var album = res.results[i].collectionName;
            var cell = ('<td>' + artwork + '</td><td id="' + i + '"><button class="button" onclick=getDetails(' + i + ')>' + trackName + '</button></td><td>' + artist + '</td><td>' + album + '</td>');
            var row = ('<tr class="data">' + cell + '</tr>');
            $table.append(row);
        }
    }
    $table.hide();
    $table.show(1000);
}

function getDetails(x){
    var name = "song-" + x;
    var trackName = results.results[x].trackName;
    var trackNumber = results.results[x].trackNumber;
    var trackPrice = results.results[x].trackPrice;
    var genre = results.results[x].primaryGenreName;
    document.getElementById(x).innerHTML = "SONG: " + trackName + " <br>NUMBER: " + trackNumber + " <br>PRICE: $" + trackPrice + " <br>GENRE: " + genre;
}