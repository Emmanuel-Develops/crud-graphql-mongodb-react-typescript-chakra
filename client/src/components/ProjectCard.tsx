import { ProjectType } from "types"
import { Box, Button, Flex, Heading, HStack, Spacer, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

interface Props {
    project: ProjectType;
}



const ProjectCard = ({project}: Props) => {
  return (
    <>
      <Flex direction='column' flexGrow='1' border='2px' borderColor='gray.300' borderRadius={'md'} p={3}>
        <Flex align={'center'} justify='space-between' minW='max-content'>
          <Heading fontSize={{base:'16px', md:'20px'}} fontWeight='600' >{project.name}</Heading>
          <Link to={`project/${project.id}`} ><Button size='sm' ml={6} pt='0px'>view</Button></Link>
        </Flex>
        <HStack fontSize={{base:'12px', md:'14px'}} fontWeight='500' py={2}>
          <Text>Status:</Text> 
          <Text fontWeight='700'>{project.status}</Text>
        </HStack>
      </Flex>
    </>
  )
}

export default ProjectCard