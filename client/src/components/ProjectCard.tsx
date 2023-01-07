import { ProjectType, UserType } from "types";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  project: ProjectType;
}

const ProjectCard = ({ project }: Props) => {

  const ConcatenatedName = ({user} : {user: UserType}) => {
    const firstStringVal = (name: string | null) => {
      return name?.length ? name[0] : ""
    }

    return (
      <Text fontWeight="700" fontSize="14px" >
        {firstStringVal(user.firstName)} {firstStringVal(user.lastName)}
      </Text>
    )
  }

  return (
    <>
      <Flex
        direction="column"
        flexGrow="1"
        border="1px solid"
        borderColor="gray.100"
        borderRadius={"md"}
        p={3}
        gap={3}
        boxShadow="md"
      >
        <Flex
          align={"flex-start"}
          justify="space-between"
          gap="10px"
        >
          <Heading fontSize={{ base: "16px", md: "20px" }} fontWeight="600">
            {project.name}
          </Heading>
          <Link to={`project/${project.id}`}>
            <Button size="sm" ml={6} pt="0px">
              view
            </Button>
          </Link>
        </Flex>
        <HStack fontSize={{ base: "12px", md: "14px" }}>
          <Text color="gray.400" fontWeight="500">
            Status:
          </Text>
          <Text fontWeight="700" color="orange.400">
            {project.status}
          </Text>
        </HStack>
        {project.user ? (
          <Flex ml="auto" alignItems="center" gap="6px">
            <Text color="gray.400" fontWeight="500" fontSize="12px" pr="4px">author</Text>
            {/* <Text color="gray.600" lineHeight="1" fontWeight="500" fontSize="14px" >{project.user?.firstName}</Text> */}
            <Tooltip label={`${project.user.firstName ?? ""} ${project.user.lastName ?? ""}`} placement="top" openDelay={200} >
              <Box bgColor="purple.200" borderRadius="full" p="4px">
                <AspectRatio w={{ base: 6, md: 8 }} ratio={1} bgColor="purple.400" borderRadius="full" >
                  {project.user.picture ? (
                    <Image
                    src={project.user.picture}
                    referrerPolicy="no-referrer"
                    width="full"
                    bgSize="cover"
                    borderRadius="full"
                  />
                  ): (
                    <ConcatenatedName user={project.user} />
                  )}
                </AspectRatio>
              </Box>
            </Tooltip>
          </Flex>
        ) : null}
      </Flex>
    </>
  );
};

export default ProjectCard;
