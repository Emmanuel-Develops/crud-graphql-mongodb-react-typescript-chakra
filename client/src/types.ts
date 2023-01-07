import { GraphQLID } from "graphql";

export type UserType = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    picture: string | null;
}
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
    status: "Not Started" | "In Progress" | "Completed";
    clientId?: string | null;
    client?: ClientType | null;
    userId?: string | null;
    user?: UserType | null;
}

export type Projects = {

}