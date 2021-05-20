let game = {

    techs: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],
    cards: null,
    lockMode: null,
    firstCard: null,
    secundCard: null,

    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secundCard = card;
            this.secundCard.flipped = true;
            this.lockMode = true;
            return true;
        }

    },

    checkMatch: function () {

        if (!this.secundCard) {
            return false;
        }
        return this.firstCard.icon === this.secundCard.icon;

    },

    clearCards: function () {

        this.lockMode = null;
        this.firstCard = null;
        this.secundCard = null;

    },

    unflipedCard: function () {

        this.firstCard.flipped = false;
        this.secundCard.flipped = false;
        this.clearCards();

    },

    checkGameOver: function () {

        return this.cards.filter(card => !card.flipped).length === 0;

    },
    createCardsFromTechs: function () {
        this.cards = [];
        this.techs.forEach(tech => {
            this.cards.push(this.createPairFromCards(tech));
        });
        this.cards = this.cards.flatMap(card => card);
        this.shuffleCards();
        return this.cards;
    },

    createPairFromCards: function (tech) {
        return [{
            id: this.generateId(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.generateId(tech),
            icon: tech,
            flipped: false,
        }];
    },

    generateId: tech => {
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
        }
    },

    flipCard: function (cardId, gameOverCallBack, noMatchCallBack) {
        if (this.setCard(cardId)) {
            if (this.secundCard) {
                if (this.checkMatch()) {
                    this.clearCards();
                    if (this.checkGameOver()) {
                        gameOverCallBack();
                    }
                } else {
                    setTimeout(() => {
                        this.unflipedCard();
                        noMatchCallBack();
                    }, 1000);
                }
            }
        }
    }


};

export default game;