import React from 'react'
import { GET_PROJECT } from 'queries/projectQueries'
import { useQuery } from '@apollo/client'
import { Flex, Heading, Skeleton, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'

const ProjectPage = () => {

    const { id } = useParams()
    const { data, loading, error } = useQuery(GET_PROJECT, {
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
                <Flex direction='column' p={5} mt={20} border='2px solid gray' >

                    <Heading size='lx' textAlign={'center'} fontWeight='600'>
                        {data.project.name}
                    </Heading>

                </Flex>
            )}
        </>
    )
}

export default ProjectPage