import GenerateImageFromInput from '../../components/GenerateImageFromInput';
import fs from 'fs/promises';
import path from 'path';

const GenerateImage = async () =>  {
  // const dirs: string[] = await fs.readdir(path.join(process.cwd(), "/public/images"));
  // console.log(JSON.stringify(dirs));

  return (
    <div className="flex flex-col w-screen bg-black h-screen object-scale-down bg-center bg-cover place-items-center">
        {/* <GenerateImageFromInput dirs={dirs} /> */}
        <GenerateImageFromInput />
    </div>
  )
};

export default GenerateImage;