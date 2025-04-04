module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: [
        // add any other plugins you have here
        "react-native-reanimated/plugin", // This must be the last plugin
      ],
    };
  };
  