import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Lorem,
} from '@chakra-ui/react';
import UserForm from "../../components/userForm";
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';




const Index = ()=> {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {userDetails} = useSelector(state => state.user);
    const toast = useToast()
  const statuses = ['success', 'error', 'warning', 'info']
 
  const [imageKey, setImageKey] = useState(0);

  // Function to refresh the image by updating the key
  const refreshImage = () => {
      setImageKey(prevKey => prevKey + 1);
  };
 

  return (
    
            <div>
            <Image 
            key= {imageKey}
            src={'http://localhost:3005/users-image/'+
             userDetails._id + '?key=' + Math.random()} alt='image descrip' width={200}  height={350}/> 
                <h1 onClick = {()=> router.push('/')}>HOME</h1>
                <h1>Account</h1>
                <h2>{userDetails.fullName}</h2>

                <h2>{userDetails.role}</h2>

                <h2>{userDetails.licenseDetail}</h2>

               
               




    <Button onClick={onOpen}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalHeader color='green'>{userDetails.role} mode</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <UserForm onImageRefresh={refreshImage}/>
                </ModalBody>

                
            </ModalContent>
            </Modal>

     </div>

  
)};
export default Index;


