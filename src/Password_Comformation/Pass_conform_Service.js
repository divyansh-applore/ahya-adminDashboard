import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import styles from '../login/login.module.css'
import axios from "axios"
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
function Pass_conform_Service() {
  
    const [result, setresult] = useState();
    const { register, handleSubmit, formState: { errors }, } = useForm();
   
        const onSubmit = (data) => {
            if(data.Password1==data.Password2){
                console.log(data);
                axios.put('http://localhost:5000/ServicePartnerData/Password_Comformation', data)
                .then((data) => { console.log(data);alert(`Your Password has been recorded, You can now leave this page and Login now`)})
                .catch((err) => { console.log(err);alert('Due to some error password has not recorded') });       
            }
            else{ 
                alert('Passwords are mismatching ,Please enter passwords again')
            }
             
        }
        
    
    return (
        <div className={styles.container}>
            <div className={styles.content}>

                <div>
                    <div className={styles.header}>

                        <h1 className={styles.head}>Welcome to Ahya Team (Service)</h1>
                    </div>
                </div>
                <div className={styles.loginContainer}>
                    <div className={styles.loginContent}>


                    <h1 className={styles.loginHead}>Password Conformation</h1>

                    <label>Enter your Email  <EmailIcon color="primary" /></label>
                        <input type='text'  {...register('Email', { required: true })} className={styles.textField}  />
                        {errors.Email && <p>Email is required.</p>}

                    <label>Enter your Password <LockIcon color="primary"/></label>
                        <input type='password'  {...register('Password1', { required: true  ,minLength:8})} className={styles.textField} />
                        {errors.Password1 && <p className="text-muted">Password is required and min length is 8</p>}
                        <label>Confirm Password</label>
                        <input type='password'  {...register('Password2', { required: true,minLength:8 })} className={styles.textField}  />
                        {errors.Password2 && <p className="text-muted">Confirmation Password is required and min length is 8</p>}
                       
                        <p>{result}</p>
                        <input type='submit' onClick={handleSubmit(onSubmit)} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pass_conform_Service;
