import { ClientType } from "types"
import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa"
import { Box, Divider, Heading, List, ListIcon, ListItem, Skeleton } from "@chakra-ui/react"


const ClientInfo = ({client, loading}: {client: ClientType | null | undefined, loading: boolean}) => {
  return (
    <Box>
        <Heading size={'md'} color='gray.500'>
            Client Information
        </Heading>

        <Box mt={2} p={3} border='1px' borderColor="blackAlpha.300" borderRadius="lg">
            <List spacing={2} >
                <ListItem>
                    <ListIcon as={FaIdBadge} color='blue.400' />
                    {loading ? <Skeleton /> : client?.name || 'N/A'}
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListIcon as={FaEnvelope} color='blue.400' />
                    {loading ? <Skeleton /> : client?.email || 'N/A'}
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListIcon as={FaPhone} color='blue.400' />
                    {loading ? <Skeleton /> : client?.phone || 'N/A'}
                </ListItem>
            </List>
        </Box>
    </Box>
  )
}

export default ClientInfo