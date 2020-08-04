module.exports = {
  rootDir: `./src`,
  transform: {
    "^.+\\.js?$": `babel-jest`,
    "^.+\\.tsx?$": `ts-jest`
  },
  testRegex: `.test.(js?|jsx?|tsx?)$`,
  moduleFileExtensions: [`js`, `jsx`, `ts`, `tsx`, `json`, `node`]
};
