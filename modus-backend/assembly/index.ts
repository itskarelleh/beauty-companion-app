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
      \n[User Profile: ${JSON.stringify(userProfile)}]
      \nProduce recommendations based on this format:
      \n[if (no images provided) { I apologize, but I don't see any images attached to your message. Without being able to view specific images, I can't make recommendations based on visual information. However, I can provide some general skincare advice based on your profile:}]
      \nFor [user's name], a [user's age] with [user's skin type] and a [user's skin tone]:
      \n
      1. [product/ingredient/technique]: Short sentence
      …: [product/ingredient/technique]: Short sentence
      N. [product/ingredient/technique]: Short sentence
      \nRemember, it's always best to introduce new products gradually and to patch test before full application. If you have specific skin concerns or if you can provide images in the future, I'd be happy to offer more tailored advice.`)
  ])

  const output = model.invoke(input)

  console.log(output.content[0].text || '')

  return output
}

// function sayHello(name: string | null = null): string {
//   return `Hello, ${name || "World"}!`;
// }

export { generateSkinAnalysis };