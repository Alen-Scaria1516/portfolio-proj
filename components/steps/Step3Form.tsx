import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import TechnologiesInput from '../ui/TechnologiesInput';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import formSchema from '@/lib/schema';
import { z } from 'zod';

type FormData = z.infer<typeof formSchema>;



const Step3Form = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <div className='flex flex-col justify-center items-center w-96'>
      <div className='text-2xl font-bold'>Project Details</div>
      <div className='m-4'>
        <label>Project Name</label>
        <Input {...register('step3.title', { required: 'Project name is required' })} placeholder='Netflix clone' />
        {errors.step3?.title && 
          <p>{typeof errors.step3.title.message === 'string' ? errors.step3.title.message : ''}</p>
        }
      </div>
      <div className='m-4'>
        <label>Project Link</label>
        <Input {...register('step3.url', { required: 'Project Link is required' })} type="url"/>
        {errors.step3?.url && 
          <p>
            {typeof errors.step3.url.message === 'string' ? errors.step3.url.message : ''}
          </p>
        }
    </div>
      <div className='m-4'>
        <TechnologiesInput />
        {errors.step3?.technologies && 
          <p>{typeof errors.step3.technologies.message === 'string' ? errors.step3.technologies.message : ''}</p>
        }
      </div>
      <div className='m-4'>
        <label>Description</label>
        <Textarea
          placeholder="Tell us a little bit about your Project"
          className="w-60"
          {...register('step3.project_description', { required: 'Project description is required' })}
        />
        {errors.step3?.project_description && 
          <p>
            {typeof errors.step3.project_description.message === 'string' ? errors.step3.project_description.message : ''}
          </p>
        }
      </div>
    </div>
  )
}

export default Step3Form