const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userInput = await User.findOne({ _id: context.user._id })
					.select('-__v -password')

				return userInput;
			}
			throw new AuthenticationError('Please log in!');
		}
	},

	Mutation: {

	}


};


module.exports = resolvers;