import { useState } from "react"
import { useMutation } from "@apollo/client"
import { Box, Button, Center, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { FaUser } from "react-icons/fa"


const AddClientModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

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
            <ModalHeader fontWeight='600' textAlign='center' >
                Add Client
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl>
                    <FormLabel htmlFor='name'>Name</FormLabel>
                    <Input id='name' type='text' variant='filled' />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='email'>Email address</FormLabel>
                    <Input id='email' type='email' variant='filled' />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='phone'>Phone Number</FormLabel>
                    <Input id='phone' type='number' />
                </FormControl>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}

export default AddClientModal