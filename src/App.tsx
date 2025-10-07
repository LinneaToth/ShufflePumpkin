import GameContext from "./context/GameContext.js";
import Game from "./components/Game";

function App() {
  return (
    <GameContext>
      <Game />
    </GameContext>
  );
}

export default App;
