import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
// import { useNavigate } from 'react-router-dom';
// import { signUpType } from '@rakhshan90/levitation-validation';
import AlertBox from '@/components/AlertBox';
import Loading from '@/components/Loading';
import { backendURL } from '@/lib/backendURL';
import axios from 'axios';
import { formType } from '@rakhshan90/levitation-validation';
import { useState } from 'react';
import { Button } from './ui/button';


interface StepOneProps {
    onNext: () => void;
    step: number;
  }

  const StepOne: React.FC<StepOneProps> = ({ onNext, step }) => {

    const [formData, setFormData] = useState<formType>({
        name: '',
        email: '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
    });

    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await axios.post(`${backendURL}/api/form/submit`, {...formData, step}, {withCredentials: true});
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
                        Step 1
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="flex flex-col gap-4 w-96">
                    <div className="flex gap-4 justify-center">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" placeholder="Your name" className='w-60'
                                onChange={(e) => {
                                    setFormData(c => (
                                        {
                                            ...c,
                                            name: e.target.value
                                        }
                                    ))
                                }} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="john@gmail.com" className='w-60'
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData(c => (
                                        {
                                            ...c,
                                            email: e.target.value
                                        }
                                    ))
                                }} />
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input type="text" id="phone" placeholder='Enter your phone number' className='w-60'
                                value={formData.phoneNumber}
                                onChange={(e) => {
                                    setFormData(c => (
                                        {
                                            ...c,
                                            phoneNumber: e.target.value
                                        }
                                    ))
                                }} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="addressLine1">Address Line 1</Label>
                            <Input type="text" id="addressLine1" placeholder='Enter your address 1' className='w-60'
                                value={formData.addressLine1}
                                onChange={(e) => {
                                    setFormData(c => (
                                        {
                                            ...c,
                                            addressLine1: e.target.value
                                        }
                                    ))
                                }} />
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="addressLine2">Address Line 2</Label>
                            <Input type="text" id="addressLine2" placeholder='Enter your address 2'
                                className='w-60'
                                onChange={(e) => {
                                    setFormData(c => (
                                        {
                                            ...c,
                                            addressLine2: e.target.value
                                        }
                                    ))
                                }} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input type="text" id="city" placeholder='Enter your city'
                                className='w-60'
                                onChange={(e) => {
                                    setFormData(c => (
                                        {
                                            ...c,
                                            city: e.target.value
                                        }
                                    ))
                                }} />
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="state">State</Label>
                            <Input type="text" id="state" placeholder='Enter your state'
                                className='w-60'
                                onChange={(e) => {
                                    setFormData(c => (
                                        {
                                            ...c,
                                            state: e.target.value
                                        }
                                    ))
                                }} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="pincode">Pincode</Label>
                            <Input type="text" id="pincode" placeholder='Enter your pincode'
                                className='w-60'
                                onChange={(e) => {
                                    setFormData(c => (
                                        {
                                            ...c,
                                            pincode: e.target.value
                                        }
                                    ))
                                }} />
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="country">Country</Label>
                            <Input type="text" id="country" placeholder='Enter your country'
                                className='w-60'
                                onChange={(e) => {
                                    setFormData(c => (
                                        {
                                            ...c,
                                            country: e.target.value
                                        }
                                    ))
                                }} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                    <Button onClick={handleSubmit} className='bg-blue-600 text-white'>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepOne