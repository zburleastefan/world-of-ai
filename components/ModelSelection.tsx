'use client'
import Select from "react-select";
import useSWR from "swr";

const fetchModels = () => fetch('/api/getEngines').then( res => res.json());

function ModelSelection() {
    const {data: models, isLoading} = useSWR("models", fetchModels);
    const {data: model, mutate: setModel} = useSWR("model", {
        // fallbackData:"gpt-4",
        fallbackData:"text-davinci-003",
    });

  return (
    <div>
        <Select 
            defaultValue={model}
            placeholder={model}
            isSearchable
            isLoading={isLoading} 
            menuPosition="fixed"
            classNames={{
                control: (state) => "model bg-[white] border-[#11A37F] "
            }}
            options={models?.modelOptions}
            onChange={(e) => setModel(e.value)}
        />    
    </div>
  )
};

export default ModelSelection;