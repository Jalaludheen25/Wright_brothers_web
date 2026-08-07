import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * eslint-config-next v16 ships native flat configs, so no FlatCompat wrapper.
 */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [".next/**", "node_modules/**", "out/**", "_shots/**", "_*.mjs"],
  },
];

export default eslintConfig;
