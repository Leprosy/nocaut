export class Die {
  value: number;
  maxValue: number;
  material: DieMaterial;

  constructor() {
    this.value = 0;
    this.maxValue = 6;
    this.material = DieMaterial.Default;
  }

  roll() {
    this.value = 1 + Math.round(Math.random() * (this.maxValue - 1));
  }
}

export class Dice {
  dice: Die[];

  constructor(totalDice: number) {
    this.dice = [];
    for (let i = 0; i < totalDice; ++i) this.dice.push(new Die());
    console.log(this.dice);
  }

  roll() {
    this.dice.forEach((die) => die.roll());
    console.log(this.dice);
  }

  getGroups() {}
}

export enum DieMaterial {
  Default,
  Gold,
  Silver,
  Bronze,
}
