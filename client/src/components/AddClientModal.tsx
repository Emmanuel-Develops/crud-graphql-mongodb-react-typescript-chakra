import { useState } from "react"
import { useMutation } from "@apollo/client"
import { Box, Button, Center, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { FaUser } from "react-icons/fa"

import { ADD_CLIENT } from "mutations/clientMutations"


const AddClientModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()

    const [userData, setUserData] = useState({
      userName: '',
      email: '',
      phone: ''
    })

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      let name = e.target.name
      let value = e.target.value
      setUserData(prev => ({...prev, [name]: value}))
    }

    const [addClient, {loading, error, data}] = useMutation(ADD_CLIENT, {
      onCompleted({ addClient }) {
        // call onCLose to close the modal
        onClose()
        // open toast
        toast({
            title: `Successfuly added ${addClient.name}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
      },

      onError(error) {
         // call onCLose to close the modal
        onClose()
        // open toast
        toast({
            title: `Unable to add`,
            status: 'error',
            description: error.message,
            duration: 5000,
            isClosable: true,
        })
      },

      refetchQueries: [
        'getClients'
      ]
    })

    const handleSubmit = () => {
      const {userName, email, phone} = userData
      if (userName === '' || email === '' || phone === '') {
        toast({
          title: `Unable to add client`,
          status: 'error',
          description: 'ensure all inputs are filled',
          position: 'top',
          duration: 5000,
          isClosable: true,
        })
        return
      }
      addClient({
        variables: {
          name: userName,
          email,
          phone
        }
      })

      setUserData({
        userName: '',
        email: '',
        phone: ''
      })
    }

    return (
      <>
        <Box display='flex'>
            <Button onClick={onOpen} ml='auto' colorScheme='purple' >
                <Icon as={FaUser} mr="2" fontSize='md' color='white' />
                Add
            </Button>
        </Box>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader py={2} fontWeight='600' textAlign='center' >
                Add Client
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody >
                <VStack spacing={4} pb={4}>
                  <FormControl>
                      <FormLabel htmlFor='userName'>Name</FormLabel>
                      <Input id='userName' name="userName" type='text' onChange={handleInput} value={userData.userName} />
                  </FormControl>
                  <FormControl>
                      <FormLabel htmlFor='email'>Email address</FormLabel>
                      <Input id='email' name="email" type='email' onChange={handleInput} value={userData.email} />
                  </FormControl>
                  <FormControl>
                      <FormLabel htmlFor='phone'>Phone Number</FormLabel>
                      <Input id='phone' name="phone" type='number' onChange={handleInput} value={userData.phone} />
                  </FormControl>
                  <Button colorScheme='purple' size='lg' onClick={handleSubmit} >
                    Add
                  </Button>
                </VStack>
                {error && (
                  <Box py='4'>
                    An error occured, ${error.message}
                  </Box>
                )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}

export default AddClientModal