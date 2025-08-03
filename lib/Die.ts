import { countData, DieMaterial, Hand } from "./types";

export class Die {
  roll: number;
  value: number;
  maxValue: number;
  material: DieMaterial;

  constructor(maxValue?: number) {
    this.roll = 0;
    this.value = 0;
    this.maxValue = maxValue || 6;
    this.material = DieMaterial.Default;
    this.value = 1 + Math.round(Math.random() * (this.maxValue - 1));
  }

  flip() {}
}

export class Dice {
  static getCountArr(data: [string, number][]): countData[] {
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

  static getScoredDie(dice: Die[], ranks: number[]): number[] {
    const scored: number[] = [];

    dice.forEach((die, i) => {
      if (ranks.indexOf(die.value) >= 0) scored.push(i);
    });
    return scored;
  }

  static getFlipDie(rank: number) {
    return { 1: 6, 2: 5, 3: 4, 4: 3, 5: 2, 6: 1 }[rank];
  }

  static getHand(dice: Die[], isFirstRoll = false): Hand {
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
      return {
        name: `Knockout ${countArr[0].rank}!`,
        base: 48,
        mult: 7,
        scoredDie: Dice.getScoredDie(dice, [countArr[0].rank]),
      };
    }

    if (countArr[0].count === 4) {
      return {
        name: `Four of a Kind ${countArr[0].rank}`,
        base: 24,
        mult: 7,
        scoredDie: Dice.getScoredDie(dice, [countArr[0].rank]),
      };
    }

    if (countArr[0].count === 3) {
      if (countArr[1].count === 2) {
        return {
          name: `Full House ${Dice.ones(countArr[0].rank)}${countArr[1].rank}`,
          base: 16,
          mult: 4,
          scoredDie: Dice.getScoredDie(dice, [countArr[0].rank, countArr[1].rank]),
        };
      }

      return {
        name: `Three of a Kind ${countArr[0].rank}`,
        base: 12,
        mult: 3,
        scoredDie: Dice.getScoredDie(dice, [countArr[0].rank]),
      };
    }

    if (countArr[0].count === 2) {
      if (countArr[1].count === 2) {
        return {
          name: `Two Pairs ${Dice.ones(countArr[0].rank)}${countArr[1].rank}`,
          base: 8,
          mult: 2,
          scoredDie: Dice.getScoredDie(dice, [countArr[0].rank, countArr[1].rank]),
        };
      }

      return {
        name: `Pair of ${countArr[0].rank}`,
        base: 4,
        mult: 2,
        scoredDie: Dice.getScoredDie(dice, [countArr[0].rank]),
      };
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

    return isStraight
      ? { name: "Straight", base: 12, mult: 4, scoredDie: [0, 1, 2, 3, 4] }
      : { name: "???", base: 8, mult: 3, scoredDie: [0, 1, 2, 3, 4] }; // TODO: 5 die only?
  }
}
