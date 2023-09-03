import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from '../../styles/register.module.css' ;
import { useToast } from '@chakra-ui/react';

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
 
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, "Password must include at least one digit")
    .matches(/[a-z]/, "Password must include at least one lowercase letter")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter"),
    });

const Login = () => {
  const toast = useToast()
  const statuses = ['success', 'error', 'warning', 'info']

  const handleLogin = async (values)=>{
    const res =  await fetch("http://localhost:3005/login",
    { method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(values)
  }

    )
    const data  = await res.json();
    console.log(data);
    // if()
    toast({
      title: data.msg,
      // description: "We've created your account for you.",
      status: res.status === 404 ? 'error' : 'success',
      duration: 9000,
      isClosable: true,
    })
    
  }


  return(
    <div className = {styles.container}>
  <div className={styles.form}>
    <h1 className={styles.header}>Sign In</h1>
    <Formik
      initialValues={{
  
        phoneNumber: '',
     
        password:'',
      

      }}
      validationSchema={LoginSchema}
      onSubmit={(values,{resetForm}) => {
        // same shape as initial values
        handleLogin(values);
        resetForm();
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          
          <Field  className={styles.formInput} name="phoneNumber"  placeholder = 'Phone Number'/>
          {errors.phoneNumber && touched.phoneNumber ? (
            <div>{errors.phoneNumber}</div>
          ) : null}
          <br />
          
          <Field
                className={styles.formInput}
                name="password"
                type="password" // Use the "password" type to hide the entered characters
                placeholder="Password"
                />
                {errors.password && touched.password ? (
                <div>{errors.password}</div>
                ) : null}
                <br />
         
          <button className={styles.submitBtn} type="submit">Login</button>
        </Form>
      )}
    </Formik>
  </div>
  </div>
)};

export default Login;