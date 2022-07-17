const { GraphQLScalarType } = require('graphql')

function validateEmptyStrings(value) {
    if (typeof value !== 'string') {
        throw new Error('Value must be a string')
    }

    if (value === "") {
        throw new Error('Value cannot be empty')
    }

    return value
}


const NonEmptyString = new GraphQLScalarType({
    name: 'NonEmptyString',
    serialize: validateEmptyStrings,
    parseValue: validateEmptyStrings,
})

module.exports = { NonEmptyString }