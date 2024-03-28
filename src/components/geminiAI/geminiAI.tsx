/* eslint-disable @typescript-eslint/no-unused-vars */
// import { DiscussServiceClient } from "@google-ai/generativelanguage";
// import { GoogleAuth } from "google-auth-library";

// const MODEL_NAME = "models/chat-bison-001";
// const API_KEY = "AIzaSyARC44853fGBcglpZYkycY6IXWo85vdmyQ";

// const client = new DiscussServiceClient({
//   authClient: new GoogleAuth().fromAPIKey(API_KEY),
// });
// const context = " ";
// const examples: never[] = [];
// const messages = [
//       {
//         "content": "hii"
//       },
//       {
//         "content": "Hello, how can I assist you today?"
//       }
//     ];
// messages.push({ "content": "NEXT REQUEST" });

// client.generateMessage({
//   // required, which model to use to generate the result
//   model: MODEL_NAME,
//   // optional, 0.0 always uses the highest-probability result
//   temperature: 0.25,
//   // optional, how many candidate results to generate
//   candidateCount: 1,
//   // optional, number of most probable tokens to consider for generation
//   topK: 40,
//   // optional, for nucleus sampling decoding strategy
//   topP: 0.95,
//   prompt: {
//     // optional, sent on every request and prioritized over history
//     context: context,
//     // optional, examples to further finetune responses
//     examples: examples,
//     // required, alternating prompt/response messages
//     messages: messages,
//   },
// }).then(result => {
//   console.log(JSON.stringify(result, null, 2));
// });

// curl \
//   -X POST https://generativelanguage.googleapis.com/v1beta3/models/chat-bison-001:generateMessage?key=${API_KEY} \
//   -H 'Content-Type: application/json' \
//   -d '{"prompt":{"context":"","examples":[],"messages":[{"content":"hii"},{"content":"Hello, how can I assist you today?"},{"content":"NEXT REQUEST"}]},"temperature":0.25,"top_k":40,"top_p":0.95,"candidate_count":1}'


import { Progress } from "@/components/ui/progress"
import { useRef, useState } from "react";

const GeminiAI = () => {

const [image_url, setImage_url] = useState("/");
const inputRef = useRef<HTMLInputElement>(null);

const imageGenerator = async () => {
      if (inputRef.current && inputRef.current.value === "") {
            return alert("Please enter a valid text");
      }
      const API_KEY = "AIzaSyARC44853fGBcglpZYkycY6IXWo85vdmyQ";
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta3/models/chat-bison-001:generateMessage?key=${API_KEY}`,{
            method: "POST",
            headers: {
                  "Content-Type": "application/json"
            },
            body: JSON.stringify({
                  prompt: {
                        context: "",
                        examples: [],
                        messages: [
                              {
                                    content: inputRef.current?.value
                              }
                        ]
                  },
                  temperature: 0.25,
                  top_k: 40,
                  top_p: 0.95,
                  candidate_count: 1
            })

      });
      const data = await response.json();
      console.log(data);
      setImage_url(data);    
     

 };
    
  return (
   <>
      <div className=" flex flex-col justify-center items-center text-center border-2 bg-transparent min-h-svh rounded-lg">
         <h1 className="text-3xl font-bold">Gemini AI</h1> 
         <img src={image_url==="/"?"/vite.svg":"image_url"} className="p-1 h-[400px] w-[400px] border-2 m-6" alt="fff" />
        {/* lodding  */}
        
         <div className="w-[500px]">
         <Progress value={10} />
         </div>

          <div className=" border-2 p-1 m-2 rounded-full">
          <div className="">
            <input type="text" ref={inputRef} className="rounded-full border-2 p-2 m-2 px-3 w-[500px]" placeholder="Describe about image..." name="text" id="text" />
            <button className="border-2 p-2 m-2 rounded-full bg-blue-600 shadow-sm hover:bg-sky-800 font-medium " onClick={()=>imageGenerator()}>Generate</button>
          </div>
          </div>
         
              
      </div>


   </>
  )
}

export default GeminiAI