<<<<<<< HEAD
import { gql } from 'graphql-tag';
=======
import gql from 'graphql-tag';
>>>>>>> develop

export const GET_ME = gql`
	{
		me {
			_id
			username
			email
			bookCount
			savedBooks {
				authors
				description
				bookId
				image
				link
				title
			}
		}
	}
`;