export enum DieMaterial {
  Default,
  Gold,
  Silver,
  Bronze,
}

export type Hand = {
  name: string;
  base: number;
  mult: number;
};

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
        // TODO: will be higher than 10 die?
        return (b.rank === 1 ? 10 : b.rank) - (a.rank === 1 ? 10 : a.rank); // aces are higher
      }
    });
  }

  constructor(totalDice: number) {
    this.dice = [];
    for (let i = 0; i < totalDice; ++i) this.dice.push(new Die());
  }

  setDice(arr: number[]) {
    arr.forEach((value, i) => (this.dice[i].value = arr[i]));
  }

  roll() {
    this.dice.forEach((die) => die.roll());
    return JSON.stringify(this.dice.map((i) => i.value)); // debug
  }

  getHand() {
    /*
    pair
    2 pairs
    3 of a kind
    pichanga
    straight
    full house
    4 of a kind
    nocaut
    */
    const counts = this.dice.reduce((acc: Record<number, number>, cur: Die) => {
      if (!acc[cur.value]) acc[cur.value] = 0;
      acc[cur.value] += 1;
      return acc;
    }, {});

    const countArr = Dice.getCountArr(Object.entries(counts));

    // TODO: this algorithm works for 5 dice
    if (countArr[0].count === this.dice.length) {
      return `nocaut ${countArr[0].rank}`;
    }

    if (countArr[0].count === 4) {
      return `four of a kind ${countArr[0].rank}`;
    }

    if (countArr[0].count === 3) {
      if (countArr[1].count === 2) {
        return `full house ${countArr[0].rank}/${countArr[1].rank}`;
      }
      return `three of a kind ${countArr[0].rank}`;
    }

    if (countArr[0].count === 2) {
      if (countArr[1].count === 2) {
        return `two pairs ${countArr[0].rank}/${countArr[1].rank}`;
      }
      return `pair ${countArr[0].rank}`;
    }

    let isStraight = true;
    countArr.forEach((item: { rank: number; count: number }, i: number) => {
      if (i > 0 && item.rank !== countArr[i - 1].rank - 1) {
        isStraight = false;
      }
    });

    return isStraight ? "straight" : "???";
  }
}
