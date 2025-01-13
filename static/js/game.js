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
    document.addEventListener('DOMContentLoaded', function() {
        const stockPile = document.getElementById('stock-pile');
        const tableau = document.querySelectorAll('.tableau-pile .pile');
    
        // Draw a card from the stock
        stockPile.addEventListener('click', function() {
            // Simulate drawing a card from stock (for simplicity, just pick the top card)
            const cardToDraw = stockPile.querySelector('img');
    
            // Check if there are cards left in the stock
            if (cardToDraw) {
                const cardImage = cardToDraw.cloneNode(true);
                tableau[0].appendChild(cardImage); // For now, place it in the first tableau pile
            }
        });
    });
    
// Function to allow drop on tableau piles
function allowDrop(event) {
    event.preventDefault(); // Prevent default behavior (required for drop)
}

// Function to handle the start of a drag
function drag(event) {
    // Store the card that is being dragged in the event's dataTransfer
    event.dataTransfer.setData("cardId", event.target.id);
}

// Function to handle the drop event
function drop(event) {
    event.preventDefault();
    
    // Get the id of the dragged card
    const cardId = event.dataTransfer.getData("cardId");
    const draggedCard = document.getElementById(cardId);
    
    // Get the card's rank and suit from the dragged card's data attributes
    const rank = draggedCard.getAttribute('data-rank');
    const suit = draggedCard.getAttribute('data-suit');
    
    // Append the card to the new pile (if this is a valid move based on the rules)
    const targetPile = event.target.closest('.tableau-pile').querySelector('.pile');
    targetPile.appendChild(draggedCard);

    // Optionally: You can check here whether the move is valid and update the game state accordingly
}

    // Initialize the game
    fetch('/')
        .then(response => response.json())
        .then(data => {
            loadGame(data);
        });
});
