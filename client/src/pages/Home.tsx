import AddClientModal from "components/AddClientModal";
import Projects from "components/Projects";
import Clients from "components/Clients";
import AddProjectModal from "components/AddProjectModal";
import { Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Box my={6}>
        <AddClientModal />
        <AddProjectModal />
      </Box>
      <Projects />
      <Clients />
    </>
  );
};

export default Home;
