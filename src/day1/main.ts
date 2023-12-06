import fs from "fs";
import { chain, filter, first, map, max, min, range } from "itertools";

const NUMBERS = new Map([
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
]);

const isDigit = (c: string) => "0123456789".includes(c);

const part1 = (lines: string[]) =>
  lines
    .map((line) => {
      const digits = line
        .split("")
        .filter((c) => isDigit(c))
        .map((c) => Number.parseInt(c, 10));

      const first = digits[0];
      const last = digits[digits.length - 1];

      return first * 10 + last;
    })
    .reduce((a, b) => a + b, 0);

const part2 = (lines: string[]) =>
  lines
    .map((line) => {
      let first = null;
      let firstIndex = Number.MAX_SAFE_INTEGER;

      // check for digits
      for (let n = 0; n < 10; ++n) {
        const index = line.indexOf(n.toString());
        if (index !== -1 && index < firstIndex) {
          first = n;
          firstIndex = index;
        }
      }

      // check for words
      for (const [word, value] of NUMBERS) {
        const index = line.indexOf(word);
        if (index !== -1 && index < firstIndex) {
          first = value;
          firstIndex = index;
        }
      }

      let last = null;
      let lastIndex = Number.MIN_SAFE_INTEGER;

      // check for digits
      for (let n = 0; n < 10; ++n) {
        const index = line.lastIndexOf(n.toString());
        if (index !== -1 && index > lastIndex) {
          last = n;
          lastIndex = index;
        }
      }

      // check for words
      for (const [word, value] of NUMBERS) {
        const index = line.lastIndexOf(word);
        if (index !== -1 && index > lastIndex) {
          last = value;
          lastIndex = index;
        }
      }

      if (!first || !last) {
        throw new Error(`No result found`);
      }

      return first * 10 + last;
    })
    .reduce((a, b) => a + b, 0);

export default function main(inputPath: string) {
  const lines = fs
    .readFileSync(inputPath, "utf8")
    .trim()
    .split("\n")
    .map((line) => line.trim());

  console.log("Part 1:", part1(lines));
  console.log("Part 2:", part2(lines));
}
