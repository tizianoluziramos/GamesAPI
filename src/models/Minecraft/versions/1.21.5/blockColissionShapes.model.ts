export interface BlockCollisionShapes {
  blocks: { [key: string]: number[] | number };
  shapes: { [key: string]: Array<number[]> };
}
