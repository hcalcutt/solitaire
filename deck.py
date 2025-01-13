import random

class Deck:
    def __init__(self):
        """
        Creates a standard deck of 52 cards.
        """
        ranks = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]
        suits = ["hearts", "diamonds", "clubs", "spades"]
        self.cards = [(rank, suit) for suit in suits for rank in ranks]

    def shuffle(self):
        """
        Shuffles the deck in place.
        """
        random.shuffle(self.cards)

    def deal(self, num_hands, cards_per_hand):
        """
        Deals cards into specified hands and returns the leftover cards.
        :param num_hands: Number of hands to deal.
        :param cards_per_hand: Number of cards per hand.
        :return: A list of lists (hands) and remaining cards.
        """
        hands = [self.cards[i * cards_per_hand:(i + 1) * cards_per_hand] for i in range(num_hands)]
        leftover_cards = self.cards[num_hands * cards_per_hand:]
        return hands + [leftover_cards]
