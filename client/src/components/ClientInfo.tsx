import { ClientType } from "types"
import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa"
import { Box, Divider, Heading, List, ListIcon, ListItem } from "@chakra-ui/react"


const ClientInfo = ({client}: {client: ClientType}) => {
  return (
    <>
        <Heading size={'md'} mt={8} color='gray.500'>
            Client Information
        </Heading>

        <Box  p={3} border='1px' borderColor="blackAlpha.300" borderRadius="lg">
            <List spacing={2} >
                <ListItem>
                    <ListIcon as={FaIdBadge} color='blue.400' />
                    {client.name || 'N/A'}
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListIcon as={FaEnvelope} color='blue.400' />
                    {client.email || 'N/A'}
                </ListItem>
                <Divider/>
                <ListItem>
                    <ListIcon as={FaPhone} color='blue.400' />
                    {client.phone || 'N/A'}
                </ListItem>
            </List>
        </Box>
    </>
  )
}

export default ClientInfo