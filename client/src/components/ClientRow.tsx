import { Button, Td, Tr } from '@chakra-ui/react';
import { ClientType } from 'types'
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from 'queries/clientQueries';
import { DELETE_CLIENT } from 'mutations/clientMutations';

import { DeleteIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react';

type Props = {
    client: ClientType;
}

const ClientRow = ({ client }: Props) => {

    const toast = useToast()

    const [deleteClient, { loading: deleteLoading }] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        onCompleted({ deleteClient }) {
            toast({
                title: `Successfuly deleted ${deleteClient.name}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        },

        onError(error) {
            // open toast
            toast({
                title: 'Delete Failed',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        },
        // COMM: refetchQueries make the queries to the server and uses the data to update the cache
        refetchQueries: [
            // { query: GET_CLIENTS},
            'getClients', 'getProjects'
        ],
        // COMM: using the update callback we update the cache locally using the returned data from calling the mutate fnc (in this case deleteClient)
        // update(cache, { data: { deleteClient } }) {
        //     const cacheData: any = cache.readQuery({ query: GET_CLIENTS})
        //     const clients = cacheData.clients
        //     cache.writeQuery({
        //         query: GET_CLIENTS,
        //         data: { clients: clients.filter((client: ClientType) => client.id !== deleteClient.id)}
        //     })
        // }
        // COMM: cache.modify which is similar to cache.writeQuery. Check docs for differences
        // update(cache, { data: { deleteClient } }) {
        //     cache.modify({
        //         fields: {
        //             clients() {
        //                 const cacheData: any = cache.readQuery({ query: GET_CLIENTS})
        //                 const newClientData = cacheData.clients.filter((client: ClientType) => client.id !== deleteClient.id )
        //                 return newClientData
        //             }
        //         }
        //     })
        // }
    })

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        deleteClient()
    }

    return (
        <Tr>
            <Td>{client.name}</Td>
            <Td>{client.email}</Td>
            <Td>{client.phone}</Td>
            <Td>
                <Button isLoading={deleteLoading} variant='delete' onClick={handleDelete} >
                    <DeleteIcon />
                </Button>
            </Td>
        </Tr>
    )
}

export default ClientRow