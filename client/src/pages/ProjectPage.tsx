import React from 'react'
import { GET_PROJECT } from 'queries/projectQueries'
import { ApolloError, useMutation, useQuery } from '@apollo/client'
import { Box, Button, Container, Flex, Heading, Skeleton, Spacer, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { ProjectType } from 'types'
import ClientInfo from 'components/ClientInfo'
import DeleteProjectButton from 'components/DeleteProjectButton'
import EditProjectForm from 'components/EditProjectForm'
import { UPDATE_PROJECT } from 'mutations/projectMutations'

const ProjectPage = () => {

    interface QueryData {
        data: {
            project: ProjectType
        } | undefined,
        loading: boolean,
        error?: ApolloError | undefined
    }

    const { id } = useParams()
    const { data, loading, error } : QueryData = useQuery(GET_PROJECT, {
        variables: {
            id
        }
    })

    if (error) {
        <Text>
            Something went wrong
        </Text>
    }

    return (
        <Container maxW={"container.sm"}>
                <Flex direction='column' p={8} mt={20} gap={6} border='1px' borderColor="blackAlpha.300" borderRadius="lg" color='gray.700' fontWeight={500} >
                    <Box ml='auto' mb='-6'>
                        <Link to='/'>
                            <Button>
                                Back
                            </Button>
                        </Link>
                    </Box>

                    <Box>
                        <Heading size='xl' fontFamily='roboto' >
                            {loading ? <Skeleton height="20px" my="10px" /> : data && !error ? data.project.name : "N/A"}
                        </Heading>

                        <Text >
                            {loading ? <Skeleton height="10px" my="5px" /> : data && !error ? data.project.description : 'N/A'}
                        </Text>
                    </Box>

                    <Box >
                        <Heading mb={1} size='md' color='gray.500'>
                            Status
                        </Heading>
                        <Text >
                            {loading ? <Skeleton height="16px" my="5px" /> : data && !error ? data.project.status : 'N/A'}
                        </Text>
                    </Box>

                    <ClientInfo client={data?.project?.client} loading={loading} />

                    {
                        data?.project && !error && (
                            <>
                                <EditProjectForm project={data.project} />
                                <DeleteProjectButton projectId={data.project.id} />
                            </>
                        )
                    }
                    
                </Flex>
        </Container>
    )
}

export default ProjectPage