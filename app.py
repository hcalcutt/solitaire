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

@app.route('/')
def index():
    # Create and shuffle a deck of cards
    deck = generate_deck()
    return render_template('index.html', deck=deck)

@app.route('/new_game')
def new_game():
    # Create and shuffle a new deck of cards
    deck = generate_deck()
    return jsonify({'deck': deck})

if __name__ == '__main__':
    app.run(debug=True)
