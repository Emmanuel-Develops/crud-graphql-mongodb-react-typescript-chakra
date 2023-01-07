import { useState } from "react";
import { ApolloCache, ApolloError, useMutation, useQuery } from "@apollo/client";
import {
    Badge,
  Box,
  Button,
  Center,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import { FaList } from "react-icons/fa";

import { GET_CLIENTS } from "queries/clientQueries";
import { GET_PROJECTS } from "queries/projectQueries";
import { ADD_PROJECT } from "mutations/projectMutations";
import { ClientType, ProjectType } from "types";
import useAuth from "hooks/useAuth";

const AddProjectModal = () => {

  const { auth } = useAuth();
  interface UserData {
    name: string,
    description: string,
    status: string,
    clientId: string,
  }
  // enum Status {
  //   new = "Not Started",
  //   progress = "In Progress",
  //   completed = "Completed",
  // }

  const projectStatusOptions = [
    {value: 'new', desc: "Not Started"},
    {value: 'progress', desc: "In progress"},
    {value: 'completed', desc: "Completed"},
  ]

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const [userData, setUserData] = useState<UserData>({
    name: "",
    description: "",
    status: "new",
    clientId: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const { loading: clientsLoading, error: clientsError, data: clientsData } = useQuery(GET_CLIENTS);

  const [addProject, { loading, data }] = useMutation(ADD_PROJECT, {
    onCompleted({ addProject }) {
      // call onClose to close the modal
      onClose();
      // open toast
      toast({
        title: `Successfuly added ${addProject.name}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },

    onError(error) {
      // open toast
      toast({
        title: `Unable to add`,
        status: "error",
        description: error.message,
        duration: 5000,
        isClosable: true,
      });
      console.log(error)
    },

    // refetchQueries: ["getProjects"],
    update(cache, {data: {addProject}}) {
      const { projects }: any = cache.readQuery({ query: GET_PROJECTS})
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {projects: projects.concat([addProject])}
      })
    }
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const status: Status = [Status.new, Status.progress, Status.completed][e.target.selectedIndex]
    const status = projectStatusOptions[e.target.selectedIndex].value
    setUserData(prev => ({...prev, status }))
  }

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      let clientId: UserData['clientId'] = e.target.value
    //   let clientId: UserData['clientId'] = e.target.value
      // if (e.target.value === "") {
      //   clientId = null as any
      // }
    setUserData(prev => ({...prev, clientId }))
  }

  const handleSubmit = () => {
    const { name, description, status, clientId } = userData;
    if (name === "") {
      toast({
        title: `Unable to add client`,
        status: "error",
        description: "ensure all inputs are filled",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // send clientId to the server as null if clientId = ""
    const clientIdOnSave = (clientId || null) 
    const userIdOnSave = (auth.userId || null) 
    addProject({
      variables: {
        name,
        description,
        status,
        clientId: clientIdOnSave,
        userId: userIdOnSave,
      },
    });

    setUserData({
      name: "",
      description: "",
      status: "new",
      clientId: "",
    });
  };

  return (
    <>
      <Box display='inline-flex' mx={4}>
        <Button onClick={onOpen} ml="auto" colorScheme="purple">
          <Icon as={FaList} mr="2" fontSize="md" color="white" />
          Add Project
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader py={2} fontWeight="600" textAlign="center">
            Add Project
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} pb={4}>
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleInput}
                  value={userData.name}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="description">
                    <Text>
                        Description
                        <Badge ml={2} variant={"solid"} fontSize='12px' fontWeight={400}>optional</Badge>
                    </Text>
                </FormLabel>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  onChange={handleInput}
                  value={userData.description}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select value={userData.status} onChange={handleStatusChange}>
                    {projectStatusOptions.map((item, index) => (
                      <option key={index} value={item.value}>{item.desc}</option>
                    ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Assign to:</FormLabel>
                <Select value={userData.clientId} placeholder="None" onChange={handleClientChange}>
                    {clientsLoading && <Spinner />}
                    {clientsData && clientsData.clients.map((client: ClientType) => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </Select>
              </FormControl>
              <Button isLoading={loading} colorScheme="purple" size="lg" onClick={handleSubmit}>
                Add
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProjectModal;
