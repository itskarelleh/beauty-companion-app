

// import torch
// from janus.janusflow.models import MultiModalityCausalLM, VLChatProcessor
// from janus.utils.io import load_pil_images


// const model_path = "deepseek-ai/JanusFlow-1.3B"

// specify the path to the model
// const vl_chat_processor: VLChatProcessor = VLChatProcessor.from_pretrained(model_path)
// const tokenizer = vl_chat_processor.tokenizer

// vl_gpt = MultiModalityCausalLM.from_pretrained(
//     model_path, trust_remote_code=True
// )
// vl_gpt = vl_gpt.to(torch.bfloat16).cuda().eval()

// conversation = [
//     {
//         "role": "User",
//         "content": "<image_placeholder>\nConvert the formula into latex code.",
//         "images": ["images/equation.png"],
//     },
//     {"role": "Assistant", "content": ""},
// ]

// # load images and prepare for inputs
// pil_images = load_pil_images(conversation)
// prepare_inputs = vl_chat_processor(
//     conversations=conversation, images=pil_images, force_batchify=True
// ).to(vl_gpt.device)

// # # run image encoder to get the image embeddings
// inputs_embeds = vl_gpt.prepare_inputs_embeds(**prepare_inputs)

// # # run the model to get the response
// outputs = vl_gpt.language_model.generate(
//     inputs_embeds=inputs_embeds,
//     attention_mask=prepare_inputs.attention_mask,
//     pad_token_id=tokenizer.eos_token_id,
//     bos_token_id=tokenizer.bos_token_id,
//     eos_token_id=tokenizer.eos_token_id,
//     max_new_tokens=512,
//     do_sample=False,
//     use_cache=True,
// )

// answer = tokenizer.decode(outputs[0].cpu().tolist(), skip_special_tokens=True)
// print(f"{prepare_inputs['sft_format'][0]}", answer)

// example query
// query {
//     analysis(conversations: [{role: "User", 
//                               content: "What is this an image of?", 
//                               images: ["https://images.pexels.com/photos/19797390/pexels-photo-19797390/free-photo-of-beautiful-model-in-oregon-wearing-a-forest-green-linen-dress-portrait-taken-by-portland-photographer-lance-reis-on-my-sonya7iii-on-location.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"]
//                              }
//              ] 
//       )
//   }

// query {
//     analysis(conversation: {
//         role: "User", 
//         content: "What is this an image of?", 
//         images: ["https://images.pexels.com/photos/19797390/pexels-photo-19797390/free-photo-of-beautiful-model-in-oregon-wearing-a-forest-green-linen-dress-portrait-taken-by-portland-photographer-lance-reis-on-my-sonya7iii-on-location.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"]
//     })
// }