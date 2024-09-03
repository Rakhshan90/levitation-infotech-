import { useState } from 'react';
import MultiSelectDropdown from './MultiSelectDropdown';
import { Button } from './ui/button';
import axios from 'axios';
import { backendURL } from '@/lib/backendURL';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import AlertBox from './AlertBox';

interface StepThreeProps {
  onPrev: () => void;
  step: number;
}

const StepThree: React.FC<StepThreeProps> = ({ step, onPrev }) => {
  // State to manage form data, including multiSelect options
  const [formData, setFormData] = useState({
    step: step,
    multiSelect: [] as string[], // Ensure this is a number array to match MultiSelectDropdown
  });

  // Handler for updating the selected options
  const handleMultiSelectChange = (selectedOptions: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      multiSelect: selectedOptions, // Update the multiSelect with new options
    }));
  };

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(`${backendURL}/api/form/submit`, formData, {withCredentials: true});
      setLoading(false);
      navigate('/my-forms');
    } catch (error: any) {
      setLoading(false);
      setErrMsg(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-10 justify-center my-10">
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          {loading ? (
            <Loading />
          ) : errMsg ? (
            <AlertBox errMsg={errMsg} />
          ) : null}
          <div className="text-4xl font-bold text-center">Step 3</div>
        </div>
      </div>

      {/* Pass the selected options and change handler to MultiSelectDropdown */}
      <MultiSelectDropdown
        selectedOptions={formData.multiSelect} // Pass the current selected options
        onChange={handleMultiSelectChange} // Pass the handler to update state
      />

      <div className="w-full flex justify-between items-center">
        <Button onClick={onPrev} className="bg-blue-600 text-white">Prev</Button>
        <Button onClick={handleSubmit} className="bg-green-600 text-white">Submit</Button>
      </div>
    </div>
  );
};

export default StepThree;
