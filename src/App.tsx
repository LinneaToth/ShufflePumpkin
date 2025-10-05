import GameContext from "./context/GameContext.jsx";
import Game from "./components/Game";

function App() {
  return (
    <GameContext>
      <Game />
    </GameContext>
  );
}

export default App;
