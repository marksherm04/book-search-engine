<<<<<<< HEAD
import { gql } from 'graphql-tag';
=======
import gql from 'graphql-tag';
>>>>>>> develop

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const SAVE_BOOK = gql`
<<<<<<< HEAD
	mutation removeBook($bookId: String!) {
		removeBook(bookId: $bookId) {
=======
	mutation removeBook($book: SavedBookInput!) {
		saveBook(book: $book) {
>>>>>>> develop
			username
			email
			bookCount
			savedBooks {
				bookId
				authors
				description
				title
				image
				link
			}
		}
	}
`;

export const REMOVE_BOOK = gql`
	mutation removeBook($bookId: String!) {
		removeBook(bookId: $bookId) {
			username
			email
			bookCount
			savedBooks {
				bookId
				authors
				description
				title
				image
				link
			}
		}
	}
<<<<<<< HEAD
`;
=======
`;

>>>>>>> develop
