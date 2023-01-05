import {
    Box,
    Button,
    Flex,
    Image,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import { userAuth } from "context/authContext";

const UserProfile = ({ user, onLogout }: { user: userAuth, onLogout: () => void }) => {
    return (
      <Popover placement="bottom-end">
        {({onClose}) => (
            <>
                <PopoverTrigger >
                <Button
                    variant={"outlined"}
                    height="auto"
                    py={2}
                    bgColor="purple.600"
                    borderRadius="md"
                >
                    <Flex gap={"5%"} alignItems="center">
                    <Image
                        src={user?.picture ? user.picture : ""}
                        width={{ base: 8, md: 10 }}
                        // height={10}
                        bgSize="cover"
                        borderRadius="full"
                    />
        
                    <VStack align="left" color="white">
                        <Text fontSize={{ base: "8px", md: "12px" }} textAlign="left">
                        Signed In as
                        </Text>
                        <Text fontSize="clamp(0.8rem, 0.5vw, 2rem)" fontWeight="bold">
                        {user.firstName || ""} {user.lastName || ""}
                        </Text>
                    </VStack>
                    </Flex>
                </Button>
                </PopoverTrigger>
                <PopoverContent width={"auto"} px={"0 !important"}>
                <PopoverBody>
                    <Box p={0} w="200px">
                        <Button size={"sm"} width="full" variant={"outlined"} _hover={{bgColor: "purple.200"}}
                            onClick={() => {
                                onLogout()
                                onClose()
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </PopoverBody>
                </PopoverContent>
            </>
        )}
      </Popover>
    );
  };

export default UserProfile