import fs from "fs";

class Position {
  constructor(public x: number, public y: number) {}
}

const isSymbol = (char: string) => !"0123456789".includes(char) && char !== ".";

const getSurroundingSymbolPositions = (
  grid: string[],
  row: number,
  start: number,
  length: number
) => {
  const cells = [];
  const height = grid.length;
  const width = grid[0].length;

  // above
  for (let col = start - 1; col <= start + length; ++col) {
    cells.push(new Position(col, row - 1));
  }

  // below
  for (let col = start - 1; col <= start + length; ++col) {
    cells.push(new Position(col, row + 1));
  }

  // left
  cells.push(new Position(start - 1, row));

  // right
  cells.push(new Position(start + length, row));

  return cells.filter((p) => {
    return (
      p.x >= 0 &&
      p.x < width &&
      p.y >= 0 &&
      p.y < height &&
      isSymbol(grid[p.y][p.x])
    );
  });
};

const getEngineParts = (grid: string[], row: number) => {
  const matches = [...grid[row].matchAll(/\d+/g)];

  return matches.map((match) => {
    const part = Number.parseInt(match[0], 10);
    const start = match.index!;
    const symbolPositions = getSurroundingSymbolPositions(
      grid,
      row,
      start,
      match[0].length
    );

    const isEnginePart = symbolPositions.length > 0;
    return isEnginePart ? part : 0;
  });
};

const part1 = (grid: string[]) =>
  grid
    .flatMap((_, row) => getEngineParts(grid, row))
    .reduce((a, b) => a + b, 0);

const part2 = (grid: string[]) => {
  const height = grid.length;
  const width = grid[0].length;

  // make 2d array of candidates
  type CandidateList = number[];
  const candidates: CandidateList[][] = [];
  for (let row = 0; row < height; ++row) {
    candidates.push([]);
    for (let col = 0; col < width; ++col) {
      candidates[row].push([]);
    }
  }

  for (let row = 0; row < height; ++row) {
    const matches = [...grid[row].matchAll(/\d+/g)];
    for (const match of matches) {
      const part = Number.parseInt(match[0], 10);
      const start = match.index!;
      const symbolPositions = getSurroundingSymbolPositions(
        grid,
        row,
        start,
        match[0].length
      );

      for (const p of symbolPositions) {
        candidates[p.y][p.x].push(part);
      }
    }
  }

  const gears = candidates.flat(1).filter((parts) => parts.length === 2);
  const gearRatios = gears.map((parts) => parts[0] * parts[1]);

  return gearRatios.reduce((a, b) => a + b, 0);
};

export default function main(inputPath: string) {
  const grid = fs
    .readFileSync(inputPath, "utf-8")
    .trim()
    .split("\n")
    .map((line) => line.trim());

  console.log(part1(grid));
  console.log(part2(grid));
}
