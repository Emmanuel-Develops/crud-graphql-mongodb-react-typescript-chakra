import { useMutation, useQuery } from "@apollo/client";
import { Badge, Box, Button, FormControl, FormLabel, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Spinner, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { UPDATE_PROJECT } from "mutations/projectMutations";
import { GET_CLIENTS } from "queries/clientQueries";
import { useState } from "react";
import { ClientType, ProjectType } from "types";
import { FaEdit } from "react-icons/fa";
import { GET_PROJECT } from "queries/projectQueries";

const EditProjectForm = ({ project }: { project: ProjectType }) => {
    interface UserData {
        name: string,
        description: string,
        status: string,
        clientId?: string
    }

    const projectStatusOptions = [
        { value: 'new', desc: "Not Started" },
        { value: 'progress', desc: "In progress" },
        { value: 'completed', desc: "Completed" },
    ]

    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();

    const defaultState: UserData = {
        name: project.name,
        description: project.description,
        status: project.status,
        clientId: project?.client?.id
    }

    const [userData, setUserData] = useState<UserData>(defaultState);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const { loading: clientsLoading, error: clientsError, data: clientsData } = useQuery(GET_CLIENTS);

    const [updateProject, { loading, data }] = useMutation(UPDATE_PROJECT, {
        
        onCompleted({ updateProject }) {
            // call onClose to close the modal
            onClose();
            // open toast
            toast({
                title: `Successfuly added ${updateProject.name}`,
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
        },

        refetchQueries: [{query: GET_PROJECT, variables: {id: project.id}}],
    });

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = projectStatusOptions[e.target.selectedIndex].value
        setUserData(prev => ({ ...prev, status }))
    }

    const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let clientId: UserData['clientId'] = e.target.value
        setUserData(prev => ({ ...prev, clientId }))
    }

    const handleSubmit = () => {
        const { name, description, status, clientId } = userData;
        if (userData == defaultState) {
            toast({
                title: `Unable to edit project`,
                status: "error",
                description: "You made no changes",
                position: "top",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        if (name === "") {
            toast({
                title: `Unable to edit project`,
                status: "error",
                description: "Name cannot be blank",
                position: "top",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        // send clientId to the server as null if clientId = ""
        const clientIdOnSave = (clientId || null)
        // console.log({ name, description, status, clientId, clientIdOnSave })
        updateProject({
            variables: {
                id: project.id,
                name,
                description,
                status,
                clientId
            },
        });

        setUserData(defaultState);
    };

    return (
        <>
            <Box display='inline-flex' mx={4}>
                <Button onClick={onOpen} ml="auto" colorScheme="purple">
                    <Icon as={FaEdit} mr="2" fontSize="md" color="white" />
                    Update Project Details
                </Button>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader py={2} fontWeight="600" textAlign="center">
                        Edit Project
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
                                Save Edit
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EditProjectForm