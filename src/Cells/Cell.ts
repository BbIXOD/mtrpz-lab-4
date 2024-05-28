import Field from '../Field';

export interface Cell {
  picture: string;
  field: Field<Cell>;

  action(x: number, y: number): void;
}
