import { useContext } from "react";
import { DispatchContext } from "../context/GameContext";
import type { Card } from "../types/types";

export default function Card({ card }) {
  const dispatch = useContext(DispatchContext);

  const flipHandler = () => {
    if (card.matched) return;
    if (card.flipped) return;

    if (card.role === "shufflePumpkin") {
      alert("oh no. SHUFFLEPUMPKIN");
      dispatch({ type: "flipCard", payload: card.id });
      dispatch({ type: "shuffle" });
      return;
    }
    dispatch({ type: "flipCard", payload: card.id });
    dispatch({ type: "checkMatch", payload: card });
  };

  return (
    <div className="flip-card" onClick={flipHandler}>
      <div className={`flip-card-inner ${card.flipped && "flipped"}`}>
        <div className="flip-card-front">
          <h1>🎃</h1>
        </div>
        <div className="flip-card-back">
          <img
            src={card.img}
            alt={`Card no ${card.id} - ${card.role} 👻 ${
              card.role === "shufflePumpkin"
                ? "🎃🧹🌪️"
                : `matches by: ${card.img}`
            }`}
          />
        </div>
      </div>
    </div>
  );
}
