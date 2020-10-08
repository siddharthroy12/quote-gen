let colorSchemes = [
    ["#FF004E", "#FFFFFF"], 
    ["#FF028E", "#FFFFFF"], 
    ["#9700BC", "#E8E6F6"], 
    ["#E9E7F2", "#4E4761"], 
    ["#282725", "#E8DF0B"], 
    ["#E8DF0B", "#282725"], 
    ["#EEE23E", "#322554"], 
    ["#302750", "#33E275"],
    ["#222529", "#66D90D"],
]

let primaryColor = "#333333"
let secondaryColor = "#FFFFFF"

let previousQuote = null;

let quotesData = {};

function getQuotes() { 
    let origin = window.origin
    return $.getJSON(origin+'/quotes.json', (data) => {
        quotesData = data
    })
}

function generateQuote() {
	let index = 0;
    
	do {
        index = Math.floor(Math.random() * quotesData.quotes.length)
    } while(index == previousQuote)

	previousQuote = index

    return quotesData.quotes[index]
}

function generateScheme() {
    let index = Math.floor(Math.random() * colorSchemes.length)
    primaryColor = colorSchemes[index][0]
    secondaryColor = colorSchemes[index][1]

}

function applyColorAndQuote() {
    let quote = generateQuote()
    let tweetLink = encodeURI(quote.quote + " - " + quote.author)
    generateScheme()
    $('body').css('background', primaryColor);
    $('#quote-box').css('background', secondaryColor);
    $('#quote').text(quote.quote)
    $('#text').css('color', primaryColor)
    $('#author').text("- " + quote.author)
    $('#author').css('color', primaryColor)
    $('#tweet-quote').css('background',primaryColor)
    $('#tweet-quote').css('color', secondaryColor)
    $('#tweet-quote').attr("href","https://twitter.com/intent/tweet/?text="+tweetLink)
    $('#new-quote').css('background',primaryColor)
    $('#new-quote').css('border-color', primaryColor)
    $('#new-quote').css('color', secondaryColor)
    $('#credit').css('color', secondaryColor)
}

function newQuote() { // When new quote button is pressed
    applyColorAndQuote()
}

$(document).ready(() => {
    getQuotes().then(() => {
        applyColorAndQuote()
    })
})
