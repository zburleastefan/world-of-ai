import axios from "axios";

export const rapidApiGenerateBirdAiImg = async (prompt: string) => {
  // console.log(prompt + ' = prompt .... ; ' + process.env.NEXT_PUBLIC_RAPID_API_KEY)
  const options = {
    method: 'POST',
    url: 'https://dall-e-bird-images-from-text.p.rapidapi.com/0.5.0',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'dall-e-bird-images-from-text.p.rapidapi.com'
    },
    data: {
      text: prompt
    }
  };
    
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return error;
  }
}