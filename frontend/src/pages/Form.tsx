import StepOne from '@/components/StepOne';
import StepThree from '@/components/StepThree';
import StepTwo from '@/components/StepTwo';
// import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress"
import { useState } from 'react';
import {formType} from '@rakhshan90/levitation-validation';

export interface StepProps {
  formData: formType;
  onInputChange: (name: string, value: any) => void;
}


const Form = () => {

  const [step, setStep] = useState(1);

  const renderComponent = () => {
    switch (step) {
      case 1:
        return <StepOne onNext={nextHandler} step={step} />

      case 2:
        return <StepTwo onNext={nextHandler} onPrev={prevHandler} step={step} />

      case 3:
        return <StepThree onPrev={prevHandler} step={step} />

      default:
        return null;
    }
  }

  const prevHandler = () => {
    setStep(step - 1);
  }

  const nextHandler = () => {
    setStep(step + 1);
  }

  return (
    <div className='min-h-screen px-4 lg:px-0 flex flex-col justify-center max-w-lg mx-auto'>

      <Progress className='mt-6' value={(step / 3) * 100} />


      {renderComponent()}
    </div>
  )
}

export default Form