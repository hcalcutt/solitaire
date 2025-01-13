from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# Card suits and ranks
suits = ['hearts', 'diamonds', 'clubs', 'spades']
ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']

# Function to generate a deck of cards
def generate_deck():
    deck = []
    for suit in suits:
        for rank in ranks:
            card = {'rank': rank, 'suit': suit, 'image': f'./static/images/card_fronts/{suit}{rank}.jpg'}
            deck.append(card)
    random.shuffle(deck)
    return deck

# Distribute the cards into tableau and stock
def setup_game():
    deck = generate_deck()
    
    # Tableau has 7 piles, each with a different number of cards
    tableau = [deck[i:i + n] for i, n in zip(range(0, 28, 1), [1, 2, 3, 4, 5, 6, 7])]
    # Remaining cards go into stock pile
    stock = deck[28:]

    game_state = {
        'tableau': tableau,
        'stock': stock,
        'foundations': {suit: [] for suit in suits}  # Empty foundations for each suit
    }
    return game_state

@app.route('/')
def index():
    # Setup a new game
    game_state = setup_game()
    return render_template('index.html', game_state=game_state)

@app.route('/new_game')
def new_game():
    # Setup a new game and return the initial game state
    game_state = setup_game()
    return jsonify(game_state)

if __name__ == '__main__':
    app.run(debug=True)
