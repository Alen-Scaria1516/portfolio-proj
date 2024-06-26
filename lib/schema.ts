import { z } from 'zod'
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const educationSchema = z.object({
    institution: z.string().min(1, { message: 'Enter Name of Institution' }),
    degree: z.string().min(1),
    start_date: z.string().datetime(),
    end_date: z.string().datetime(),
    description: z.string(),
});

const projectSchema = z.object({
    title: z.string().min(1),
    project_description: z.string(),
    start_date: z.string().datetime(),
    end_date: z.string().datetime(),
    technologies: z.array(z.string()).min(1, 'At least one technology is required'),
    url: z.string().url(),
});

const workSchema = z.object({
    company_name: z.string(),
    role: z.string(),
    work_start_date: z.string().datetime(),
    work_end_date: z.string().datetime(),
    work_description: z.string(),
});

const formSchema = z.object({
    step1: z.object({
        username: z.string().min(1, { message: 'username is required' }),
        email: z.string().email('Enter valid email'),
        password: z.string().min(8, 'Password must be at least 8 character')
            .regex(
                passwordRegex,
                'Password must be contains at least one uppercase and one lowercase and one digit and one special character'
            ),
        profile_pic: z.string().url().refine(url => {
            return ['.jpeg', '.jpg', '.png'].some(extension => url.toLowerCase());
          }, { message: 'Image URL must end with .jpeg, .jpg, or .png' })
    }),
    step2: z.array(educationSchema).min(1, { message: 'At least one education entry is required' }),
    step3: z.array(projectSchema).min(1, { message: 'At least one education entry is required' }),
    step4: z.array(workSchema).min(1, { message: 'At least one education entry is required' }),
    step5: z.array(z.string()).min(1, 'At least one skill is required')
  });

export default formSchema;