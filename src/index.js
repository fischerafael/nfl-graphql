const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Team {
        _id: ID!
        name: String!
        city: String!        
    }
    type TeamTitles {
        _id: ID!
        year: Int! 
        winner: Team!       
    }

    type Query {
        hello: String
        teams: [Team!]!
        teamByName(name: String!): Team!
    }
    type Mutation {
        createTeam(name: String!, city: String!): Team!
    }
`

const teamsList = [
    { _id: 'huaheuahf', name: 'Green Bay Packers', city: 'Green Bay' },
    { _id: 'huaheuahf', name: 'Chicago Bears', city: 'Chicago' },
    { _id: 'huaheuahf', name: 'Minnesotta Vikings', city: 'Minneapolis' },
]

const resolvers = {
    Query: {
        hello: () => 'Hello world',
        teams: () => teamsList,
        teamByName: (_, args) => {
            return teamsList.find((team)=>team.name.includes(args.name))
        }
    },
    Mutation: {
        createTeam: (_, args) => {
            const newTeam = {
                _id: String(Math.random()),
                name: args.name,
                city: args.city
            }
            teamsList.push(newTeam)
            return newTeam
        }
    }
}

const app = new ApolloServer({ typeDefs, resolvers })

app.listen(3333, ()=>console.log('Server running on port 3333'))