import type { Card } from "../types/types";

type ACTIONTYPE = { type: "shuffle" } | { type: "match"; payload: string[] };

function sortRandomly(a, b) {
  // if (a.flipped) return 0;

  const verdict = Math.random() * 10;
  if (verdict < 5) {
    return -1;
  } else return 1;
}

const generateCards = () => {
  const cards: Card[] = [];
  const availablePositions = [...Array(15).keys()];

  const randomAvailablePosition = (): number => {
    return availablePositions[
      Math.floor(Math.random() * availablePositions.length)
    ];
  };

  for (let i = 0; i <= 14; i += 2) {
    if (i !== 14) {
      for (let j = 0; j < 2; j++) {
        const card: Card = {
          id: j === 0 ? i : i + 1,
          matched: false,
          role: "regular",
          img: `/img/img${i / 2}.png`,
          flipped: false,
        };

        cards.push(card);
      }
    } else if (i === 14) {
      const card: Card = {
        id: 14,
        matched: false,
        role: "shufflePumpkin",
        img: `/img/shufflePumpkin.png`,
        flipped: false,
      };

      cards.push(card);
    }
  }
  cards.sort(sortRandomly);
  return cards;
};

export const initialState = {
  cards: generateCards(),
  pairedCards: [],
  gameOver: false,
  clickable: true,
  flippedUnmatched: 0,
};

export function gameReducer(state, action: ACTIONTYPE) {
  switch (action.type) {
    case "shuffle": {
      const shuffledCards = state.cards.sort(sortRandomly);
      shuffledCards.map((card) =>
        card.role === "shufflePumpkin" ? { ...card, flipped: true } : card
      );
      return { ...state, cards: shuffledCards };
    }
    // case "checkGameOver": {
    // }
    case "flipCard": {
      let cardFlipped = false;

      if (state.flippedUnmatched > 2) {
        return {
          ...state,
          cards: state.cards.map((card: Card) => {
            if (!card.matched && card.role !== "shufflePumpkin") {
              return { ...card, flipped: false };
            }
            return card;
          }),
          flippedUnmatched: 0,
        };
      }

      const updatedCards = state.cards.map((card) => {
        if (card.id === action.payload) {
          cardFlipped = true;
          return { ...card, flipped: true };
        } else {
          return card;
        }
      });
      return {
        ...state,
        cards: updatedCards,
        flippedUnmatched: cardFlipped
          ? state.flippedUnmatched++
          : state.flippedUnmatched,
      };
    }

    case "checkMatch": {
      let foundMatch = false;
      // const flippedUnmatchedCards = state.cards.reduce(
      //   (count, card) =>
      //     card.flipped && !card.matched && card.role !== "shufflePumpkin"
      //       ? count + 1
      //       : count,
      //   0
      // );

      const updatedWithMatch = state.cards.map((card) => {
        if (
          card.flipped &&
          card.img === action.payload.img &&
          card.id !== action.payload.id
        ) {
          const foundMatched = { ...card, matched: true };
          foundMatch = true;
          return foundMatched;
        }
        return card;
      });

      if (!foundMatch)
        return {
          ...state,
        };

      const updatedCards = updatedWithMatch.map((card: Card) => {
        if (card.id === action.payload.id) return { ...card, matched: true };
        return card;
      });

      console.log("MATCH FOUND!!!!!!!!!");
      return { ...state, cards: updatedCards, flippedUnmatched: 0 };
    }
    default:
      throw new Error();
  }
}
