import React from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'

let renderCount: number = 0

interface FormValues {
    username: string,
    email: string,
    channel: string, 
    socail: {
        twitter: string, 
        facebook: string, 
    },
    phoneNumbers: string[]
}
const Youtube: React.FC = () => {

    const form = useForm<FormValues>({
        defaultValues: {
            username: "Batman",
            email: "",
            channel: "",
            socail : {
                twitter: '', 
                facebook: '', 
            },
            phoneNumbers: ["",""]
        }
    });
    // const form = useForm<FormValues>({
    //     defaultValues: async () => {
    //         const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    //         const data = await response.json();
    //         return {
    //             username: "Batman",
    //             email: data.email,
    //             channel: "",
    //         }
    //     }
    // });

    const { register, control, handleSubmit, formState } = form;

    const { errors } = formState;


    const onSubmitHandler = (data: FormValues) => {
        console.log(data)
    }


    renderCount++;
    return (
        <>
            <h1>Youtube Form ({renderCount/2})</h1>
            <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
                <div>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' {...register("username", {
                        required: {
                            value: true,
                            message: 'Username is required'
                        }
                    })} />
                </div>
                <p className='error'>{errors.username?.message}</p>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' {...register("email", {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email'
                        },
                        validate: {
                            noAdmin: (fieldValue) => {
                                return (
                                    fieldValue !== 'admin@ex.co' || 
                                    "Enter different email address" 
                                )
                            },
                            notBlackListed: (fieldValue) => {
                                return (
                                    !fieldValue.endsWith('baddomain.com') || 
                                    "This domain is not supported" 
                                )
                            }
                        }
                    })}/>
                </div>
                <p className='error'>{errors.email?.message}</p>

                <div>
                    <label htmlFor='channel'>Channel</label>
                    <input type='text' id='channel' {...register("channel", {
                        required: 'Channel name is required'
                    })}/>
                </div>
                <p className='error'>{errors.channel?.message}</p>
                <div>
                    <label htmlFor='twitter'>Twitter</label>
                    <input type='text' id='twitter' {...register("socail.twitter")}/>
                </div>
                <div>
                    <label htmlFor='facebook'>Facebook</label>
                    <input type='text' id='facebook' {...register("socail.facebook")}/>
                </div>
                <div>
                    <label htmlFor='primaryNo'>Primary No</label>
                    <input type='text' id='primaryNo' {...register("phoneNumbers.0")}/>
                </div>
                <div>
                    <label htmlFor='secondaryNo'>Secondary No</label>
                    <input type='text' id='secondaryNo' {...register("phoneNumbers.1")}/>
                </div>
                <button>Submit</button>
            </form>
            <DevTool control={control}/>
        </>
    )
}

export default Youtube