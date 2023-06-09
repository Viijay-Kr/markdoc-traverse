import dts from "rollup-plugin-dts";
import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "src/index.ts",
    output: {
      format: "cjs",
      dir: "dist",
      compact: true,
    },
    plugins: [typescript()],
  },

  {
    input: ["src/index.ts"],
    output: {
      format: "es",
      dir: "dist",
    },
    plugins: [dts()],
  },
];
