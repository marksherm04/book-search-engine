const { User, Book } = require('../models');
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
			throw new AuthenticationError('Please log in');
		}
	},
	// GraphQL mutataion - API that is modifying data for book users
	Mutation: {
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const userPassword = await User.isCorrectPassword(password);

			if (!userPassword) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const authToken = signToken(user);
			return { user, token }; 
		},
		addUser: async(parent, args) => {
			const user = await User.create(args);
			const authToken = signToken(user);

			return { user, token };
		},
		saveBook: async(parent, args, context) => {
			if (context.user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { saveBook: args.book } },
					{ new: true }
				);

				return updatedUser;
			}

			throw new AuthenticationError('You must login to save a book')
		},
		removeBook: async(parent, args, context) => {
			if (context.user) {
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { saveBook: { bookId: args.bookId } } },
					{ new: true }
				);

				return updatedUser;
			}

			throw new AuthenticationError('You must login to remove a book');
		}
	}
};

module.exports = resolvers;