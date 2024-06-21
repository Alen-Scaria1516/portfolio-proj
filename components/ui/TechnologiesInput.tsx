"use client"
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import formSchema from '@/lib/schema';
import { z } from 'zod';

type FormData = z.infer<typeof formSchema>;

const TechnologiesInput: React.FC = () => {
  const { register, setValue, watch } = useFormContext<FormData>();
  const [tech, setTech] = useState<string>('');
  const technologies: string[] = watch('step3.technologies') || [];

  const addTechnology = () => {
    if (tech && !technologies.includes(tech)) {
      setValue('step3.technologies', [...technologies, tech]);
      setTech('');
    }
  };

  const removeTechnology = (techToRemove: string) => {
    setValue('step3.technologies', technologies.filter(t => t !== techToRemove));
  };

  return (
    <div className="flex flex-col items-start">
      <label>Technologies:</label>
      <div className="flex items-center">
        <Input 
          value={tech} 
          onChange={(e) => setTech(e.target.value)} 
          placeholder="Add technology"
        />
        <Button onClick={addTechnology}>Add</Button>
      </div>
      <div className="flex flex-wrap mt-2">
        {technologies.map((tech, index) => (
          <div key={index} className="m-1 p-2 bg-gray-200 rounded flex items-center">
            {tech} 
            <button 
              onClick={() => removeTechnology(tech)} 
              className="ml-2 text-red-500"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologiesInput;
