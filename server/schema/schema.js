// const {projects, clients} = require('../sampleData')

const { GraphQLID, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLEnumType} = require('graphql')

// Mongoose models
const Project = require('../models/Project')
const Client = require('../models/Client')


// Client Type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    clientId: { type: GraphQLID},
    client: { 
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId)
      }
    }
  }),
});

// Status Type
const StatusType = new GraphQLEnumType({
  name: 'ProjectStatus',
  values: {
    'new': {value: "Not Started"},
    'progress': {value: 'In Progress'},
    'completed': {value: 'Completed'},
  }
})



const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      }
    },
    project: {
      type: ProjectType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Project.findById(args.id)
      }
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      }
    },
    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Client.find(args.id)
      }
    }
  }
});


// Mutations

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // add a client
    addClient: {
      type: ClientType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        phone: {type: GraphQLNonNull(GraphQLString)},
      },
      resolve(parent, args) {
        const client = new Client ({
          name: args.name,
          email: args.email,
          phone: args.phone,
        })

        return client.save()
      }
    },
    // delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        return Client.findByIdAndRemove(args.id)
      }
    },

    // update a client
    updateClient: {
      type: ClientType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)},
        name: { type: GraphQLString},
        email: { type: GraphQLString},
        phone: { type: GraphQLString},
        test: { type: GraphQLString},
      },
      resolve: (parent, args) => {
        return Client.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              phone: args.phone,
              test: args.test
            }
          }
        )
      },
    },

    // add a project
    addProject: {
      type: ProjectType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        status: {
          type: StatusType,
          defaultValue: 'Not Started'
        },
        clientId: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const project = new Project ({
          name: args.name,
          description:args.description,
          status: args.status,
          clientId: args.clientId 
        })

        return project.save() 
      }
    },

    // delete a project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Project.findByIdAndRemove(args.id)
      }
    },

    // update a project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        status: { type: StatusType },
        clientId: { type: GraphQLID},
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
              clientId: args.clientId,
            }
          },
          { new: true }
        )
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
