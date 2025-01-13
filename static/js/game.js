document.addEventListener('DOMContentLoaded', function() {
    const deckContainer = document.getElementById('deck');
    const newGameBtn = document.getElementById('new-game-btn');

    function loadDeck(deck) {
        deckContainer.innerHTML = '';  // Clear previous deck

        deck.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.rank = card.rank;
            cardElement.dataset.suit = card.suit;

            const cardFront = document.createElement('img');
            cardFront.src = card.image;
            cardElement.appendChild(cardFront);

            cardElement.addEventListener('click', function() {
                flipCard(cardElement);
            });

            deckContainer.appendChild(cardElement);
        });
    }

    function flipCard(cardElement) {
        const img = cardElement.querySelector('img');
        if (img.src.includes('back2.jpg')) {
            img.src = `./static/images/card_fronts/${cardElement.dataset.suit}${cardElement.dataset.rank}.jpg`;
        } else {
            img.src = './static/images/card_backs/back2.jpg';
        }
    }

    newGameBtn.addEventListener('click', function() {
        fetch('/new_game')
            .then(response => response.json())
            .then(data => {
                loadDeck(data.deck);
            });
    });

    // Initialize with a shuffled deck
    fetch('/')
        .then(response => response.text())
        .then(html => {
            const deck = JSON.parse(html).deck;
            loadDeck(deck);
        });
});
