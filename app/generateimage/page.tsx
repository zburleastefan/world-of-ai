import GenerateImageFromInput from '../../components/GenerateImageFromInput';

const GenerateImage = async () =>  {
  return (
    <div className="flex flex-col w-screen bg-black h-screen object-scale-down bg-center bg-cover place-items-center">
        <GenerateImageFromInput />
    </div>
  )
};

export default GenerateImage;