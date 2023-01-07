// const {projects, clients} = require('../sampleData')

const { GraphQLID, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLScalarType} = require('graphql')
const { NonEmptyString } = require('../scalars/scalars' )


// Mongoose models
const Project = require('../models/Project')
const Client = require('../models/Client');
const User = require('../models/User');
const { resolve } = require('path');


// Client Type
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    picture: { type: GraphQLString },
    projects: {
      type: GraphQLList(ProjectType),
      resolve: (parent, args) => {
        return Project.find()
      }
    },
  }),
});
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
    },
    userId: { type: GraphQLID},
    user: { 
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      }
    },
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
    // test: {
    //   type: GraphQLString,
    //   resolve: (source, args, context) => {
    //     console.log(context.auth.userId)
    //     return "testing"
    //   }
    // },
    profile: {
      type: UserType,
      resolve(parent, args, context) {
        if (context?.auth?.userId) {
          return User.findById(context.auth.userId);
        }
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      args: {userId: {type: GraphQLID}},
      resolve(parent, args, context) {
        if (args?.userId) {
          if (context?.auth?.userId && (args.userId === context?.auth?.userId)) {
            return Project.find({userId: context.auth.userId})
          }
          else {
            return null
          }
        }
        return Project.find();
      }
    },
    // myProjects: {
    //   type: new GraphQLList(ProjectType),
    //   resolve(parent, args, context) {
    //     if (context?.auth?.userId) {
    //       return User.findById(context.auth.userId);
    //     }
    //   },
    // },
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
        name: {type: GraphQLNonNull(NonEmptyString), required: true},
        email: {type: GraphQLNonNull(NonEmptyString), required: true},
        phone: {type: GraphQLNonNull(NonEmptyString), required: true},
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
        Project.find({clientId: args.id}).then((projects) => {
          projects.forEach(project => {
            project.remove()
          })
        })
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
          },
          { new: true }
        )
      },
    },
    // update a user
    updateProfile: {
      type: UserType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)},
        firstName: { type: GraphQLString},
        lastName: { type: GraphQLString},
        picture: { type: GraphQLString},
      },
      resolve: (parent, args) => {
        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              firstName: args.firstName,
              lastName: args.lastName,
              picture: args.picture,
            }
          },
          { new: true }
        )
      },
    },

    // add a project
    addProject: {
      type: ProjectType,
      args: {
        name: {type: GraphQLNonNull(NonEmptyString)},
        description: {type: GraphQLString},
        status: {
          type: StatusType,
          defaultValue: 'Not Started'
        },
        clientId: { type: GraphQLID },
        userId: { type: GraphQLID },
      },
      resolve(parent, args, context) {
        let authUserId = null
        if (args?.userId) {
          if (context?.auth?.userId && (args.userId === context?.auth?.userId)) {
            authUserId = args.userId
          }
        }

        const project = new Project ({
          name: args.name,
          description:args.description,
          status: args.status,
          clientId: args.clientId,
          userId: authUserId, 
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
        name: { type: GraphQLNonNull(NonEmptyString)},
        description: { type: GraphQLString},
        status: { type: StatusType },
        clientId: { type: GraphQLID},
        userId: { type: GraphQLID},
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
              userId: args.userId,
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
