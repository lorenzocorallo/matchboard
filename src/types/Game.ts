export type Game = {
  readonly id: string;
  readonly name: string;
  readonly hasNegativePoints: boolean;
  readonly defaultPoints: readonly number[];
  readonly deltaPoints?: number;
  readonly mode: "lose" | "win";
  readonly addType: "points" | "wins";
}
