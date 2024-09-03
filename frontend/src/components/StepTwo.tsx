import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { useState } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import { backendURL } from '@/lib/backendURL';
import Loading from './Loading';
import AlertBox from './AlertBox';

interface StepTwoProps {
    onNext: () => void;
    onPrev: () => void;
    step: number;
}


const StepTwo: React.FC<StepTwoProps> = ({ step, onNext, onPrev }) => {

    const [formData, setFormData] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFormData(files);
    };



    const handleSubmit = async () => {
        try {
            setLoading(true);
            // Create a FormData instance
            const formDataToSend = new FormData();
            formDataToSend.append('step', step.toString());
            console.log(formDataToSend.get('step'));

            formData.forEach((file) => {
                formDataToSend.append('photos', file); // 'photos' is the name you used in your formRouter middleware
            });
            await axios.post(`${backendURL}/api/form/submit`, formDataToSend, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            onNext();
        } catch (error: any) {
            setLoading(false);
            setErrMsg(error.response.data.message);
        }
    }


    return (
        <div className="flex flex-col gap-10 justify-center my-10">
            <div className="flex justify-center">
                <div className="flex flex-col gap-2 items-center justify-center">
                    {loading ? (
                        <Loading />
                    ) : errMsg ? (
                        <AlertBox errMsg={errMsg} />
                    ) : null}
                    <div className="text-4xl font-bold text-center">
                        Step 2
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="flex flex-col gap-4 w-96">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Select images</Label>
                        <Input
                            multiple
                            type="file"
                            id="name"
                            onChange={handleFileChange} />
                    </div>

                    <div className="w-full flex justify-between items-center">
                        <Button onClick={onPrev} className='bg-blue-600 text-white'>
                            Prev
                        </Button>
                        <Button onClick={handleSubmit} className='bg-blue-600 text-white'>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepTwo