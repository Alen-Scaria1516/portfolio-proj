"use client"
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import formSchema from '@/lib/schema';
import { z } from 'zod';

type FormData = z.infer<typeof formSchema>;

const SkillsInput: React.FC = () => {
  const { register, setValue, watch } = useFormContext<FormData>();
  const [skill, setSkill] = useState<string>('');
  const Skills: string[] = watch('step5') || [];

  const addSkill = () => {
    if (skill && !Skills.includes(skill)) {
      setValue('step5', [...Skills, skill]);
      setSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setValue('step5', Skills.filter(t => t !== skillToRemove));
  };

  return (
    <div className="flex flex-col items-start">
      <label>Skills:</label>
      <div className="flex items-center">
        <Input 
          value={skill} 
          onChange={(e) => setSkill(e.target.value)} 
          placeholder="Add Skill"
        />
        <Button onClick={addSkill}>Add</Button>
      </div>
      <div className="flex flex-wrap mt-2">
        {Skills.map((skill, index) => (
          <div key={index} className="m-1 p-2 bg-gray-200 rounded flex items-center">
            {skill} 
            <button 
              onClick={() => removeSkill(skill)} 
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

export default SkillsInput;
