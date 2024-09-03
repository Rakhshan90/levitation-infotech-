import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInType } from '@rakhshan90/levitation-validation';
import AlertBox from '@/components/AlertBox';
import Loading from '@/components/Loading';
import { backendURL } from '@/lib/backendURL';
import axios from 'axios';

const Signin = () => {

  const [signInInputs, setSignInInputs] = React.useState<signInType>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${backendURL}/api/user/signin`, signInInputs, {withCredentials: true})
      setLoading(false);
      navigate('/');
    } catch (error: any) {
      setLoading(false);
      setErrMsg(error.response.data.message);
    }
  }

  return (
    <div className="h-screen flex flex-col gap-10 justify-center">
      <div className="flex justify-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          {loading ? (
            <Loading />
          ) : errMsg ? (
            <AlertBox errMsg={errMsg} />
          ) : null}
          <div className="text-4xl font-bold text-center">
            Enter your credentials
          </div>
          <div className="text-lg text-slate-600 text-center font-semibold">
            Don't have an account?  <Link className="ml-2 underline font-semibold"
              to={'/signup'}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <form onSubmit={submitHandler} className="flex flex-col gap-4 w-96">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="john@gmail.com"
              onChange={(e) => {
                setSignInInputs(c => (
                  {
                    ...c,
                    email: e.target.value
                  }
                ))
              }} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password"
              onChange={(e) => {
                setSignInInputs(c => (
                  {
                    ...c,
                    password: e.target.value
                  }
                ))
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button>Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin