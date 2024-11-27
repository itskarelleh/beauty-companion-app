import { getAnalysis } from "./analysis";

function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}

export { getAnalysis, sayHello };