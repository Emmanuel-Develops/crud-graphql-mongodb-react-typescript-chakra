import { useNavigate } from "react-router-dom"
import { DELETE_PROJECT } from "mutations/projectMutations"
import { useMutation } from "@apollo/client"
import { Button, Icon, useToast } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"


const DeleteProjectButton = ({ projectId }: { projectId: string }) => {

    const toast = useToast();
    const navigate = useNavigate()

    const [deleteProject, { loading, error, data }] = useMutation(DELETE_PROJECT, {
        variables: { id: projectId },
        onCompleted({ deleteProject }) {
            // navigate to home
            navigate('/')
            // open toast
            toast({
                title: `Successfuly deleted ${deleteProject.name}`,
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
        refetchQueries: ['getProjects']
    })

    return (
        <>
            <Button isLoading={loading} onClick={() => deleteProject()} variant='delete' w={'fit-content'} ml='auto'>
                <Icon as={DeleteIcon} />
                Delete Project
            </Button>
        </>
    )
}

export default DeleteProjectButton