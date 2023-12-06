import path from "path";
import url from "url";

interface Module {
  default: (inputPath: string) => void;
}

async function loadEntryPoint(module: string) {
  const modulePath = path.join(
    path.dirname(url.fileURLToPath(import.meta.url)),
    module,
    "main.js"
  );

  return import(url.pathToFileURL(modulePath).href).then(
    (m: Module) => m.default
  );
}

async function main() {
  const argv = process.argv.slice(2);

  if (argv.length !== 2) {
    console.log("Please provide module and input file path");
    process.exit(1);
  }

  const module: string = argv[0];
  const inputPath: string = argv[1];

  const entryPoint = await loadEntryPoint(module);
  entryPoint(inputPath);
}

main();
