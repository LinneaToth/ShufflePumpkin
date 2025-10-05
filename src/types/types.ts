export interface Card {
  id: number;
  matched: boolean;
  role: "shufflePumpkin" | "winnerPumpkin" | "regular";
  img: string;
  position: number;
}
