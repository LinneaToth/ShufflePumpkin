import { useReducer, createContext, useContext } from "react";
import { gameReducer, initialState } from "../utils/gameReducer";

const StateContext = createContext(null);
export const DispatchContext = createContext(null);

export function useGameState() {
  const context = useContext(StateContext);
  return context;
}

export default function GameContext({ children }): React.ReactNode {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
