import GenerateSpeechFromText from '../../components/GenerateSpeechFromText'

type Props = {}

function TextToSpeech({}: Props) {
  return (
    <div className="flex flex-col w-screen bg-black h-screen object-scale-down bg-center bg-cover place-items-center">
        <GenerateSpeechFromText />
    </div>
  )
}

export default TextToSpeech