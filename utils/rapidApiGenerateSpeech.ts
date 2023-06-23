import axios from "axios";

export const rapidApiGenerateSpeech = async (prompt: string) => {
  const options = {
    method: 'GET',
    url: 'https://text-to-speech-api3.p.rapidapi.com/speak',
    params: {
      text: prompt,
      lang: 'en'
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'text-to-speech-api3.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}