import { GraphQLID } from "graphql";

export type ClientType = {
    id: string;
    name: string;
    email: string;
    phone: string;
}

export type ProjectType = {
    id: string;
    name: string;
    description: string;
    status: string;
    clientId: number;
    client: ClientType;
}

export type Projects = {

}