import Card from "./Card";
import { useGameState } from "../context/GameContext";

export default function Game() {
  const { cards } = useGameState();

  return (
    <main>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </main>
  );
}
