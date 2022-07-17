import React from 'react'
import { GET_PROJECT } from 'queries/projectQueries'
import { ApolloError, useQuery } from '@apollo/client'
import { Button, Flex, Heading, Skeleton, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { ProjectType } from 'types'

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
        <>
            {data && !error && (
                <Flex direction='column' p={5} mt={20} border='1px' borderColor="blackAlpha.300" borderRadius="lg" >
                    <Button ml="auto">
                        <Link to="/">
                            Back
                        </Link>
                    </Button>
                    <Heading size='lg' textAlign={'center'} fontFamily='roboto' color='purple.700' >
                        {data.project.name}
                    </Heading>
                    <Text>
                        {data.project.status}
                    </Text>
                </Flex>
            )}
        </>
    )
}

export default ProjectPage