export enum DieMaterial {
  Default,
  Gold,
  Silver,
  Bronze,
}

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
  }

  static getCountArr(data: [string, number][]) {
    const formatted = data.map((item) => {
      return { rank: parseInt(item[0]), count: item[1] };
    });

    // Sort by count, then by rank
    return formatted.sort((a, b) => {
      const countDiff = b.count - a.count;

      if (countDiff !== 0) {
        return countDiff;
      } else {
        return b.rank - a.rank;
      }
    });
  }

  roll() {
    this.dice.forEach((die) => die.roll());
    console.log(
      "roll",
      this.dice.map((i) => i.value)
    );
  }

  getHand() {
    const counts = this.dice.reduce((acc: Record<number, number>, cur: Die) => {
      if (!acc[cur.value]) acc[cur.value] = 0;
      acc[cur.value] += 1;
      return acc;
    }, {});

    // Sort by count, then by rank
    console.log(Object.entries(counts));
    const countArr = Dice.getCountArr(Object.entries(counts));
    console.log("countArr", countArr);

    if (countArr[0].count >= 5) {
      return `nocaut ${countArr[0].rank}`;
    }

    if (countArr[0].count === 4) {
      return `four of a kind ${countArr[0].rank}`;
    }

    if (countArr[0].count === 3) {
      if (countArr[1].count === 2) {
        return `full house ${countArr[0].count}/${countArr[1].count}`;
      }
      return `three of a kind ${countArr[0].rank}`;
    }

    if (countArr[0].count === 2) {
      if (countArr[1].count === 2) {
        return `two pairs ${countArr[0].rank}/${countArr[1].rank}`;
      }
      return `pair ${countArr[0].rank}`;
    }

    return "none";
  }
}
