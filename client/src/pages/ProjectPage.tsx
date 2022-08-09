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


    if (loading) {
        return (
            <Skeleton>

            </Skeleton>
        )
    }

    if (error) {
        <Text>
            Something went wrong
        </Text>
    }

    return (
        <Container maxW={"container.sm"}>
            {data && !error && (
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
                            {data.project.name}
                        </Heading>

                        <Text >
                            {data.project.description || 'N/A'}
                        </Text>
                    </Box>

                    <Box >
                        <Heading mb={1} size='md' color='gray.500'>
                            Status
                        </Heading>
                        <Text >
                            {data.project.status}
                        </Text>
                    </Box>

                    {data.project.client && <ClientInfo client={data.project.client} />}

                    <EditProjectForm project={data.project} />
                    <DeleteProjectButton projectId={data.project.id} />
                    
                </Flex>
            )}
        </Container>
    )
}

export default ProjectPage