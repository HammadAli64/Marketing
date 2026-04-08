/**
 * Force webpack-based `next dev` even if TURBOPACK / IS_TURBOPACK_TEST are set in the shell
 * (avoids Turbopack + webpack config warnings and Windows .next manifest races).
 */
const { spawn } = require("child_process");
const path = require("path");

const env = { ...process.env };
delete env.TURBOPACK;
delete env.IS_TURBOPACK_TEST;

const nextBin = path.join(__dirname, "..", "node_modules", "next", "dist", "bin", "next");
const args = ["dev", ...process.argv.slice(2)];

const child = spawn(process.execPath, [nextBin, ...args], {
  env,
  stdio: "inherit",
  cwd: path.join(__dirname, ".."),
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
