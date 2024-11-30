import { models } from "@hypermode/modus-sdk-as"
import { JSON } from "json-as"
import {
   AnthropicMessagesModel, AnthropicMessagesInput, Message, AnthropicMessagesOutput 
} from "@hypermode/modus-sdk-as/models/anthropic/messages"

@json
class UserProfileInput {
  name: string
  age: string
  skinTone: string
  skinType: string

  constructor(name: string, age: string, skinTone: string, skinType: string) {
    this.name = name
    this.age = age
    this.skinTone = skinTone
    this.skinType = skinType
  }
}

function generateSkinAnalysis(
  userProfile: UserProfileInput,
  images: string[]
): AnthropicMessagesOutput {
  console.log("generating skin analysis...")
  const model = models.getModel<AnthropicMessagesModel>("text-generator")

  const input: AnthropicMessagesInput = model.createInput([
    new Message('user', 
      `[Image: ${images.join(', ')}] 
      \n Based on the images provided, and the user's profile, recommend skincare products that would be best for the user.
      \n[User Profile: ${JSON.stringify(userProfile)}]`)
  ])

  const output = model.invoke(input)

  console.log(output.content[0].text || '')

  return output
}

// function sayHello(name: string | null = null): string {
//   return `Hello, ${name || "World"}!`;
// }

export { generateSkinAnalysis };