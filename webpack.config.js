const path = require("path");

const ENTRY_FILE = path.join(__dirname, "src", "assets", "js", "main.ts");
const OUTPUT_DIR = path.join(__dirname, "src", "static");

module.exports = {
  entry: {
    main: ENTRY_FILE
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  output: {
    filename: "main.js",
    path: OUTPUT_DIR
  }
};
