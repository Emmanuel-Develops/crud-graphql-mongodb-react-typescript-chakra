import React from 'react'
import { GET_PROJECT } from 'queries/projectQueries'
import { ApolloError, useQuery } from '@apollo/client'
import { Box, Button, Container, Flex, Heading, Skeleton, Spacer, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { ProjectType } from 'types'
import ClientInfo from 'components/ClientInfo'

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
                <Flex direction='column' p={8} mt={20} gap={2} border='1px' borderColor="blackAlpha.300" borderRadius="lg" color='gray.700' fontWeight={500} >
                    <Link to='/' style={{marginLeft: 'auto'}}>
                        <Button ml="auto">
                                Back
                        </Button>
                    </Link>

                    <Heading size='xl' fontFamily='roboto' >
                        {data.project.name}
                    </Heading>

                    <Text >
                        {data.project.description || 'N/A'}
                    </Text>

                    <Box mt={8}>
                        <Heading mb={2} size='md' color='gray.500'>
                            Status
                        </Heading>
                        <Text >
                            {data.project.status}
                        </Text>
                    </Box>

                    {data.project.client && <ClientInfo client={data.project.client} />}
                </Flex>
            )}
        </Container>
    )
}

export default ProjectPage