import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "queries/projectQueries"
import { ProjectType } from "types"
import ProjectCard from "./ProjectCard"
import { SimpleGrid } from "@chakra-ui/react"

import { Spinner } from "@chakra-ui/react"


const Projects = () => {

    const { loading, error, data } = useQuery(GET_PROJECTS)

    return (
        <>
            <SimpleGrid minChildWidth={{sm: '250px', md: '300px'}} spacing={4} my={4}>
                {loading && <Spinner/>}
                {!loading && !error && (
                    data.projects.length > 0 ? 
                    data.projects.map((project: ProjectType) => (
                        <ProjectCard key={project.id} project={project} />
                    ))
                    : <p>No Projects</p>
                )} 
            </SimpleGrid>
        </>
    )
}

export default Projects