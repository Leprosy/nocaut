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

  constructor(maxValue?: number) {
    this.value = 0;
    this.maxValue = maxValue || 6;
    this.material = DieMaterial.Default;
    this.value = 1 + Math.round(Math.random() * (this.maxValue - 1));
  }
}

export class Dice {
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

  static ones(value: number) {
    return value === 1 ? 10 : value;
  }

  static generate(values: number[]): Die[] {
    const dice: Die[] = [];

    values.forEach((val: number) => {
      const die = new Die();
      die.value = val;
      dice.push(die);
    });

    return dice;
  }

  static getHand(dice: Die[]) {
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
    const counts = dice.reduce((acc: Record<number, number>, cur: Die) => {
      if (!acc[cur.value]) {
        acc[cur.value] = 0;
      }

      acc[cur.value] += 1;
      return acc;
    }, {});

    const countArr = Dice.getCountArr(Object.entries(counts));

    // TODO: this algorithm works for 5 dice
    if (countArr[0].count === dice.length) {
      return `Knockout ${countArr[0].rank}!`;
    }

    if (countArr[0].count === 4) {
      return `Four of a Kind ${countArr[0].rank}`;
    }

    if (countArr[0].count === 3) {
      if (countArr[1].count === 2) {
        return `Full House ${Dice.ones(countArr[0].rank)}${countArr[1].rank}`;
      }

      return `Three of a Kind ${countArr[0].rank}`;
    }

    if (countArr[0].count === 2) {
      if (countArr[1].count === 2) {
        return `Two Pairs ${Dice.ones(countArr[0].rank)}${countArr[1].rank}`;
      }

      return `Pair of ${countArr[0].rank}`;
    }

    let isStraight = true;
    let ranks = countArr.map((item: { rank: number; count: number }) => item.rank);
    ranks.sort();

    ranks.forEach((item: number, i: number) => {
      if (i > 0) {
        if (item !== ranks[i - 1] + 1) {
          isStraight = false;
        }
      }
    });

    return isStraight ? "Straight" : "???";
  }
}
