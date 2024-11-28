// import { getAnalysis } from "./analysis";
import { models } from "@hypermode/modus-sdk-as"
import { EmbeddingsModel } from "@hypermode/modus-sdk-as/models/experimental/embeddings"
import { JSON } from "json-as"

interface Conversation {
    role: string,
    content: string,
    images: string[]
}

function getAnalysis(conversation: Conversation):void {
    const model = models.getModel<EmbeddingsModel>("janus-flow")
    const input = model.createInput([`${conversation.role}\n${conversation.content}\n${conversation.images.join("\n")}`])
    const output = model.invoke(input)

    const prediction: string[] = output.predictions.map((p: f32[]) => p.map((d: f32) => d.toString()).join("\n"))
    console.log(JSON.stringify(prediction))

    // return prediction;
}

function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}

export { getAnalysis, sayHello };