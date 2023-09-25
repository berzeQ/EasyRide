import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from '../../styles/register.module.css';
import { useToast } from '@chakra-ui/react';
import { Montserrat} from 'next/font/google';
// import { handleLogin } from '../index';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {changeUserDetails} from '../../redux/reducerSlices/userSlice';
import { useRef } from 'react';


function userForm() {
  const {userDetails} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const uploadImageRef = useRef(null);


  const uploadImage = async (file) =>{
    const formData =  new FormData();
    formData.append('avatar', file);
    const res =  await fetch("http://localhost:3005/users-image/" + userDetails._id,
    { method: 'POST',
    body: formData,
   
     })
    console.log(res)
    const data  = await res.json();
    console.log(data.msg);
  }

  
  const toast = useToast();
  const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phoneNumber: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });




    const fetchUserDetails = async () =>{
        const res = await fetch("http://localhost:3005/account/" + userDetails._id);
          console.log(res); // Log the response to the console
          const data = await res.json();
          console.log(data.userDetails, " no");
          
          if(data){
            dispatch(changeUserDetails(
              data));
          }
        }

    

      const editUserDetails = async (values)=>{
        const res =  await fetch("http://localhost:3005/account/" + userDetails._id,
        { method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(values)
         }
    
        )
        console.log(res)
        const data  = await res.json();
        console.log(data, data.status);

        // if(data){
        //   isOpen = {isClose};
        // }
        toast({
          title: data.msg,
          // description: "We've created your account for you.",
          status: res.status === 409 ? 'error' : 'success',
          duration: 9000,
          isClosable: true,
        })
        if(res.status === 200 ){

          fetchUserDetails();
        }
        
   
      }
      

  return (
    <div>
    <div >
         
    <Formik
            initialValues={{
              fullName: userDetails.fullName,
              phoneNumber: userDetails.phoneNumber,
              email: userDetails.email,
              // role:userDetails.role,
             

              }}
      validationSchema={SignupSchema}
      onSubmit={(values,{resetForm}) => {
        // same shape as initial values
        const selectedFile = uploadImageRef.current.files[0];
        editUserDetails(values);
        uploadImage(selectedFile);


        resetForm();
        console.log(values);
     
      }}
        >
      {({ errors, touched }) => (
        <Form>
          <Field className={styles.formInput} name="fullName" placeholder='Full Name' />
          {errors.fullName && touched.fullName ? (
            <div className = {styles.errorMsg}>{errors.fullName}</div>
          ) : null}
          <br />
          <Field  className={styles.formInput} name="phoneNumber"  placeholder = 'Phone Number'/>
          {errors.phoneNumber && touched.phoneNumber ? (
            <div className = {styles.errorMsg}>{errors.phoneNumber}</div>
          ) : null}
          <br />
          <Field 
          className={styles.formInput}
          placeholder='Email'
          name="email"
           type="email" 
            />
          {errors.email && touched.email ? <div className = {styles.errorMsg}>{errors.email}</div> : null}
          <br />
          {/* <Field
                className={styles.formInput}
                name="password"
                type="password" // Use the "password" type to hide the entered characters
                placeholder="Password"
                />
                {errors.password && touched.password ? (
                <div className = {styles.errorMsg}>{errors.password}</div>
                ) : null}
                <br />
          <Field
                className={styles.formInput}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                <div className = {styles.errorMsg}>{errors.confirmPassword}</div>
                ) : null}
<br />
                  <div className={styles.noAccount}>
                    <Link href='/login'>Already have an Account? Click here</Link>
                  </div> */}
                  <input type="file" name="" id=""  ref={uploadImageRef} />
                <br/>
          <button className={styles.submitBtn} type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
  </div>
 
  )
}


export default userForm;