// redux-token-auth-config.js
import { generateAuthActions } from 'redux-token-auth'

const authUrl = 'http://localhost:3000/auth'

const config = {
  authUrl,
  userAttributes: {
    name: 'name',
    image: 'image',
    age: 'age',
    location: 'location',
    reputation: 'reputation'
  },
  userRegistrationAttributes: {
    name: 'name',
    image: 'image',
    age: 'age',
    location: 'location',
    reputation: 'reputation'
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