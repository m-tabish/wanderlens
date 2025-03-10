import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import "./app/globals.css";
export function App() {
    const ctx = require.context("./app");
    return <ExpoRoot context={ctx} />;
}
registerRootComponent(App)