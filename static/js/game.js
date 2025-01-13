document.addEventListener('DOMContentLoaded', function() {
    const newGameBtn = document.getElementById('new-game-btn');
    const stockPile = document.getElementById('stock-pile');

    // Load game state and render tableau
    function loadGame(gameState) {
        const tableau = gameState.tableau;
        const foundations = gameState.foundations;

        // Render tableau
        tableau.forEach((pile, index) => {
            const pileElement = document.getElementById(`tableau-pile-${index}`);
            pileElement.innerHTML = ''; // Clear previous pile
            pile.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.dataset.rank = card.rank;
                cardElement.dataset.suit = card.suit;
                const img = document.createElement('img');
                img.src = card.image;
                cardElement.appendChild(img);
                pileElement.appendChild(cardElement);
            });
        });

        // Render foundations
        Object.keys(foundations).forEach(suit => {
            const foundationElement = document.getElementById(`foundation-${suit}`);
            foundationElement.querySelector('.pile').innerHTML = ''; // Clear previous pile
        });

        // Render stock pile (display the back of the cards)
        stockPile.querySelector('img').src = './static/images/card_backs/back2.jpg';
    }

    // Start a new game
    newGameBtn.addEventListener('click', function() {
        fetch('/new_game')
            .then(response => response.json())
            .then(data => {
                loadGame(data);
            });
    });

    // Initialize the game
    fetch('/')
        .then(response => response.json())
        .then(data => {
            loadGame(data);
        });
});
