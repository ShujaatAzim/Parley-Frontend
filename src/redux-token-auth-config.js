// redux-token-auth-config.js
import { generateAuthActions } from 'redux-token-auth'

const authUrl = 'http://localhost:3000/auth'

const config = {
  authUrl,
  userAttributes: {
    firstName: 'first_name',
    imageUrl: 'image',
  },
  userRegistrationAttributes: {
    firstName: 'first_name',
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}