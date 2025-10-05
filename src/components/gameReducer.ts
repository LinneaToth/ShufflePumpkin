import type { Card } from "../types/types";

type ACTIONTYPE = { type: "shuffle" } | { type: "match"; payload: string[] };

const generateCards = () => {
  const cards: Card[] = [];
  const availablePositions = [...Array(15).keys()];

  const randomAvailablePosition = (): number => {
    return availablePositions[
      Math.floor(Math.random() * availablePositions.length)
    ];
  };

  for (let i = 0; i <= 14; i + 2) {
    if (i !== 14) {
      for (let j = 0; j < 2; j++) {
        const card: Card = {
          id: j === 0 ? i : i + 1,
          matched: false,
          role: "regular",
          position: randomAvailablePosition(),
          img: `card${i}.png`,
        };
        cards.push(card);
      }
    } else if (i === 14) {
      const card: Card = {
        id: 14,
        matched: false,
        role: "shufflePumpkin",
        position: randomAvailablePosition(),
        img: `shufflePumpkin.png`,
      };
      cards.push(card);
    }
    return cards;
  }

  const initialState = {
    cards: generateCards(),
    pairedCards: [],
  };

  function gameReducer(state, action: ACTIONTYPE) {
    switch (action.type) {
      case "shuffle": {
        return {};
      }

      case "match":
        return {};
      default:
        throw new Error();
    }
  }
};
