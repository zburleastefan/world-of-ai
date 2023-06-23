import GenerateBirdImageComponent from "../../components/GenerateBirdImageComponent";

function GenerateBirdImage() {
  return (
     <div className="flex flex-col w-screen bg-black h-screen object-scale-down bg-center bg-cover place-items-center">
        <GenerateBirdImageComponent />
    </div>
  )
}

export default GenerateBirdImage;