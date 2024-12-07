import { models } from "@hypermode/modus-sdk-as"
import { JSON } from "json-as"
import {
   AnthropicMessagesModel, AnthropicMessagesInput, Message, AnthropicMessagesOutput, 
   Tool
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
      \n[User Profile: ${JSON.stringify(userProfile)}]
      \n Based on the images provided, and the user's profile, identify skin imperfections(dark spots, sun spots, uneven skintone, cysts, pimples, and other surface level skin conditions) recommend skincare products that would be best for the user to maintain and improve their skin care:
      \n 
      \nProduce recommendations based on this format:
      \n[if (no images provided) { I apologize, but I don't see any images attached to your message. Without being able to view specific images, I can't make recommendations based on visual information. However, I can provide some general skincare advice based on your profile:}]
      \nFor [user's name], a [user's age] with [user's skin type] and a [user's skin tone]:
      \n
      1. [product/ingredient/technique]: Short sentence
      \n
      … [product/ingredient/technique]: Short sentence
      \n
      N. [product/ingredient/technique]: Short sentence
      \n
      \nRemember, it's always best to introduce new products gradually and to patch test before full application. If you have specific skin concerns or if you can provide images in the future, I'd be happy to offer more tailored advice.`)
    ]
  )

  // \n Then based on the scans done from the images, on a scale from 1 to 10(1 being not healthy and 10 being very healthy), rate the following areas of surface level skin health


  const output = model.invoke(input)

  console.log(output.content[0]. || '')

  return output
}

export { generateSkinAnalysis };