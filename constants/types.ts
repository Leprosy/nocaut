export interface Die {
  value: number;
  maxValue: number;
  material: DieMaterial;
}

export enum DieMaterial {
  Gold,
  Silver,
  Bronze,
}
