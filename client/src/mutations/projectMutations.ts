import { gql } from "@apollo/client";

const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
            name
            description
            status
        }
    }
`

const ADD_PROJECT = gql`
    mutation addProject($name: NonEmptyString!, $description: String, $status: ProjectStatus, $clientId: ID, $userId: ID) {
        addProject(name: $name, description: $description, status: $status, clientId: $clientId, userId: $userId) {
            id
            name
            description
            status
            clientId
            userId
            user {
                firstName
                lastName
                picture
            }
            client {
                id
                name
                email
                phone
            }
        }
    }
`

const UPDATE_PROJECT = gql`
    mutation updateProject($id: ID!, $name: NonEmptyString!, $description: String, $status: ProjectStatus, $clientId: ID) {
        updateProject(id: $id, name: $name, description: $description, status: $status, clientId: $clientId) {
            id
            name
            description
            status
            clientId
            client {
                id
                name
                email
                phone
            }
        }
    }
`



export { DELETE_PROJECT, ADD_PROJECT, UPDATE_PROJECT }