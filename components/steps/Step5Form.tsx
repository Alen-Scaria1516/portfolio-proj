import React, { useEffect } from 'react'
import SkillsInput from '../ui/SkillsInput';
import { useFormContext } from 'react-hook-form';
import formSchema from '@/lib/schema';
import { z } from 'zod';

type FormData = z.infer<typeof formSchema>;

const Step5Form = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <div className='flex flex-col justify-center items-center w-96'>
      <div className='text-2xl font-bold'>Skills</div>
      <div className='m-4'>
        <SkillsInput />
        {errors.step5 && 
          <p>{typeof errors.step5.message === 'string' ? errors.step5.message : ''}</p>
        }
      </div>
    </div>
  )
}

export default Step5Form