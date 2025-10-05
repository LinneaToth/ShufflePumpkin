import { useState } from "react";

export default function Card() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMatched, setIsMatched] = useState(false);

  const flipHandler = () => {
    if (isMatched) return;
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flip-card" onClick={flipHandler}>
      <div className={`flip-card-inner ${isFlipped && "flipped"}`}>
        <div className="flip-card-front">
          <h1>🎃</h1>
        </div>
        <div className="flip-card-back">
          <img
            src="img_avatar.png"
            alt="RYSLIG BILD 👻"
            style={{ width: "300px", height: "300px" }}
          />
        </div>
      </div>
    </div>
  );
}
