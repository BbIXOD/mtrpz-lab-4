export interface Cell {
  picture: string;
  position: { x: number; y: number };

  action(): void;
}
