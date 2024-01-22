import fs from "fs";

const getEngineParts = (grid: string[], row: number) => {
  const height = grid.length;
  const matches = [...grid[row].matchAll(/\d+/g)];

  return matches
    .map((match) => {
      const part = Number.parseInt(match[0], 10);
      const searchStart = Math.max(0, match.index! - 1);
      const searchEnd = match.index! + match[0].length;

      const aboveIndex = Math.max(0, row - 1);
      const belowIndex = Math.min(height - 1, row + 1);

      const above = grid[aboveIndex].slice(searchStart, searchEnd + 1);
      const below = grid[belowIndex].slice(searchStart, searchEnd + 1);
      const current = grid[row].slice(searchStart, searchEnd + 1);

      const isEnginePart = [above, current, below].some((r) =>
        /[^0-9\.]/.test(r)
      );

      return isEnginePart ? part : 0;
    })
    .filter((part) => part);
};

const part1 = (grid: string[]) =>
  grid
    .flatMap((_, row) => getEngineParts(grid, row))
    .reduce((a, b) => a + b, 0);

export default function main(inputPath: string) {
  const grid = fs
    .readFileSync(inputPath, "utf-8")
    .trim()
    .split("\n")
    .map((line) => line.trim());

  console.log(part1(grid));
}
