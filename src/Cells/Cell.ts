export interface Cell {
  picture: string;
  position: { x: number; y: number };
  didAction: boolean;

  action(): void;
}
