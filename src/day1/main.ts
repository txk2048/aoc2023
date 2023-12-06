import fs from "fs";

const part1 = (lines: string[]) =>
  lines
    .map((line) => {
      const digits = line
        .split("")
        .filter((c) => "0123456789".includes(c))
        .map((c) => Number.parseInt(c, 10));

      const first = digits[0];
      const last = digits[digits.length - 1];

      return first * 10 + last;
    })
    .reduce((a, b) => a + b, 0);

export default function main(inputPath: string) {
  const lines = fs.readFileSync(inputPath, "utf8").trim().split("\n");

  console.log("Part 1:", part1(lines));
}
