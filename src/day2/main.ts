import fs from "fs";
import { max } from "itertools";

class Round {
  constructor(
    public readonly red: number,
    public readonly green: number,
    public readonly blue: number
  ) {}

  public static parse(input: string) {
    const matches = input.matchAll(/(\d+) (red|green|blue)/g);

    let red = 0;
    let green = 0;
    let blue = 0;

    for (const match of matches) {
      const value = Number.parseInt(match[1], 10);
      const color = match[2];

      switch (color) {
        case "red":
          red += value;
          break;
        case "green":
          green += value;
          break;
        case "blue":
          blue += value;
          break;
      }
    }

    return new Round(red, green, blue);
  }
}

class Game {
  constructor(public readonly id: number, public readonly rounds: Round[]) {}

  public static parse(input: string) {
    const match = input.match(/^Game (\d+): (.*)$/);
    if (!match) {
      throw new Error(`Invalid input: ${input}`);
    }

    const id = Number.parseInt(match[1], 10);
    const rounds = match[2]
      .split(";")
      .map((round) => Round.parse(round.trim()));

    return new Game(id, rounds);
  }
}

const part1 = (games: Game[]) => {
  const maxRed = 12;
  const maxGreen = 13;
  const maxBlue = 14;

  return games
    .filter((game) =>
      game.rounds.every(
        (round) =>
          round.red <= maxRed &&
          round.green <= maxGreen &&
          round.blue <= maxBlue
      )
    )
    .reduce((acc, game) => acc + game.id, 0);
};

const part2 = (games: Game[]) => {
  return games
    .map((game) => {
      const red = max(game.rounds.map((round) => round.red))!;
      const green = max(game.rounds.map((round) => round.green))!;
      const blue = max(game.rounds.map((round) => round.blue))!;

      return red * green * blue;
    })
    .reduce((acc, value) => acc + value, 0);
};

export default function main(inputPath: string) {
  const games = fs
    .readFileSync(inputPath, "utf-8")
    .trim()
    .split("\n")
    .map((line) => Game.parse(line.trim()));

  console.log(`Part 1: ${part1(games)}`);
  console.log(`Part 2: ${part2(games)}`);
}
