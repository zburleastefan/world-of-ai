import axios from "axios";

export const rapidApiAiImgGenerator = async (prompt: string) => {
    const options = {
        method: 'POST',
        url: 'https://ai-image-generator3.p.rapidapi.com/generate',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
          'X-RapidAPI-Host': 'ai-image-generator3.p.rapidapi.com'
        },
        data: {
          prompt: prompt,
          page: 1
        }
      };
      
    let err = '';
    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        err = error;
        console.error(error);
    }
    return err ? err : 'rapid api GPT error!';
}