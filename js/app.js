'use strict'

const quoteContainer = document.querySelector('.quote-container')
const quoteText = document.querySelector('.quote-text')
const quoteAuthor = document.querySelector('.quote-author')
const quoteGenre = document.querySelector('.quote-genre')
const quoteByAuthorBtn = document.querySelector('.author')
const byAuthor = document.querySelector('.by-author')

//Function used to generate the ramdon quote at the loading of the page
//And when the random buttom is pressed
const quoteGenerator = async () => {
    const url = 'https://quote-garden.herokuapp.com/api/v2/quotes/random'

    await fetch(url)
    .then((response) => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error('Something went wrong')
        }
    })
    .then((data) => {

        quoteText.innerHTML = data.quote.quoteText
        quoteAuthor.innerHTML = data.quote.quoteAuthor

        if(data.quote.quoteGenre != undefined){
            quoteGenre.innerHTML = data.quote.quoteGenre
        } else {
            quoteGenre.innerHTML = 'unknow genre'
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

quoteGenerator()

//Function used to get quotes by author
const quoteByAuthor = async () => {
    const author = document.querySelector('.quote-author').textContent
    const authorName = author.replace(' ', '%20')
    const url = `https://quote-garden.herokuapp.com/api/v2/authors/${authorName}?page=1&limit=10`

    await fetch(url)
    .then((response) => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error('Something went wrong')
        }
    })
    .then((data) => {
        const quotes = data.quotes

        quoteByAuthorBtn.style.display = 'none'
        const authorQuoteContainer = document.querySelector('.author-quotes')

        quotes.forEach(quote => {
            authorQuoteContainer.innerHTML = `${quote.quoteAuthor}`

            byAuthor.innerHTML += `
            <blockquote>
                <button class="copy-btn" data-clipboard-target=".quote-text">
                    <i class="material-icons">content_copy</i>
                </button>
                <q class="quote-text">${quote.quoteText}</q>
            </blockquote>
            `
        })
    })
    .catch((error) => {
        console.log(error)
    })
}

//Reload the window

document.querySelector('.quote-btn').addEventListener('click', function(){
    document.location.reload()
})


//Functions to coy the quotes and using toast.js to alert the user

const clipboard = new ClipboardJS('.copy-btn', {
    text: function(quoteText){
        return quoteText.nextElementSibling.textContent
    }
})

clipboard.on('success', function(e) {
    console.info('Text:', e.text);

    const options = {
        settings: {
            duration: 3000
        },
        style: {
            main: {
                background: '#333',
                color: '#fff'
            }
        }
    }
    iqwerty.toast.toast('Quote copied!!', options)

    e.clearSelection()
})




