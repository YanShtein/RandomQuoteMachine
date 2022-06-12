var colors = [
    '#c0392b',
    '#1abc9c',
    '#884ea0',
    '#f1c40f',
    '#3498db',
    '#c591b9',
    '#1f548c',
    '#595bc5',
    '#51c2f3',
    '#8e0b12'
];

let json_quotes;

function changeColors() {
    let color = Math.floor(Math.random() * colors.length);
    $('.container').css("background-color", colors[color]);
    $('.button').css("background-color", colors[color]);
    $('#text').css("color", colors[color]);
    $('#author').css("color", colors[color]);
};

function getQuotes() {
    return $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "/db.json",
        success: function (jsonQuotes) {
            json_quotes = jsonQuotes.data;
            return json_quotes;
        }
    });
};

function Quote() {
    let randomQuote = Math.floor(Math.random() * json_quotes.length);
    let quoteText = json_quotes[randomQuote].quote;
    let quoteAuthor = '- ' + json_quotes[randomQuote].author;
    $('#quoteText').text(quoteText);
    $('#quoteAuthor').text(quoteAuthor);
    $('#tweet-quote').attr("href", 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + quoteText + '"'));
    $('#tumblr-quote').on('click', function() {
        window.open('https://www.tumblr.com/widgets/share/tool?posttype=' + encodeURIComponent('"' + quoteText + '"'))
    });
};

$(document).ready(function () {
    getQuotes().then(() => {
        changeColors();
        Quote();
    });

    $('#new-quote').on('click', function() {
        changeColors();
        Quote();
    });
});    
