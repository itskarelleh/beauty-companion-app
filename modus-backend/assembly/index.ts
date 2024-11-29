import { models } from "@hypermode/modus-sdk-as"
import { JSON } from "json-as"
// import { 
//   OpenAIChatModel, 
//   OpenAIChatOutput, 
//   SystemMessage, 
//   UserMessage
// } 
// from "@hypermode/modus-sdk-as/models/openai/chat"
import { AnthropicMessagesModel, AnthropicMessagesInput, UserMessage, Message, AnthropicMessagesOutput } from "@hypermode/modus-sdk-as/models/anthropic/messages"


function generateSkinAnalysis(
  // role: string = 'You are an esthetician and you have to recommend products either by brand or ingredients so that the client can treat their skin ailments and conditions.', 
  // prompt: string = 'What skincare products would you recommend based on the user\'s image?', 
  // images: string[] = ['https://a-ap.storyblok.com/f/3000428/768x630/28a81ba4b5/acne-awareness_blog-images3.jpg']
): AnthropicMessagesOutput {
  console.log("generating skin analysis...")
  const model = models.getModel<AnthropicMessagesModel>("text-generator")

  const input: AnthropicMessagesInput = model.createInput([
    new Message('user', 
      `[Image: 'https://a-ap.storyblok.com/f/3000428/768x630/28a81ba4b5/acne-awareness_blog-images3.jpg'}] 
      \nhttps://a-ap.storyblok.com/f/3000428/768x630/28a81ba4b5/acne-awareness_blog-images3.jpg`)
  ])

  const output = model.invoke(input)

  console.log(output.content[0].text || '')

  return output
}

function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}

export { generateSkinAnalysis, sayHello };