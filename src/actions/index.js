import axios from 'axios';
import {
  PAGINATION,
  TOKEN,
  USER_IDENTITY,
  USER_DATA,
  APPEND_USER_DATA
} from './types'

export const storeInitialData = (token) => {
  return async (dispatch) => {

    const userIdentityObject = await axios.get ('https://oauth.reddit.com/api/v1/me', {
      headers: { 'Authorization': `bearer ${token}` }
    })
    const userSavesObject = await axios.get (`https://oauth.reddit.com/user/${userIdentityObject.data.name}/saved/.json?limit=100`, {
      headers: { 'Authorization': `bearer ${token}` }
    })
    const username = userIdentityObject.data.name
    const userSaves = userSavesObject.data.data.children
    dispatch(storeUserHistory(userSaves))
    dispatch(appendUserHistory(userSaves))
    dispatch(runAutoPagination(true))
    dispatch(storeUserIdentity(username))
  }
}

export const storeToken = token => {
  return {
    type: TOKEN,
    payload: token
  }
}

export const runAutoPagination = boolean => {
  return {
    type: PAGINATION,
    payload: boolean
  }
}

export const storeUserIdentity = username => {
  return {
    type: USER_IDENTITY,
    payload: username
  }
}

export const storeUserHistory = userData => {
  return {
    type: USER_DATA,
    payload: userData
  }
}

export const appendUserHistory = userData => {
  return {
    type: APPEND_USER_DATA,
    payload: userData
  }
}