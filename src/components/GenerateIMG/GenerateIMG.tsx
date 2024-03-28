/* eslint-disable @typescript-eslint/no-unused-vars */
import { Progress } from "@/components/ui/progress"
import { useRef, useState } from "react";

function GenerateIMG() {
      const [image_url, setImage_url] = useState("/");
const inputRef = useRef<HTMLInputElement>(null);

const imageGenerator = async () => {
      if (inputRef.current && inputRef.current.value === "") {
            return alert("Please enter a valid text");
      }
      const API_KEY = process.env.API_KEY;
      const response = await fetch(`https://api.openai.com/v1/images/generations`,{
                    method: "POST",
                    headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${API_KEY}`,
                          "User-Agent": "Chrome"
                    },
                    body: JSON.stringify({
                          prompt: inputRef.current?.value,
                          n: 1,
                          size:"512x512",
                    }),
        
      });
      
      const data = await response.json();
      setImage_url(data.url);
      console.log(data);   
     

 };
  return (
   <>
      <div className=" flex flex-col justify-center items-center text-center border-2 bg-transparent min-h-svh rounded-lg">
         <h1 className="text-3xl font-bold">AI-IMGenerator AI</h1> 
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

export default GenerateIMG