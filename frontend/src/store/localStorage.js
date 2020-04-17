import {LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS} from "./actions/usersActions";

export const saveToLocalStorage = state => {
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
    console.log('Saved to Local Storage')
  }catch(error){
    console.log('Could not save state')
  }
};

export const loadFromLocalStorage = () => {
  try{
    const serializedState = localStorage.getItem('state');
    console.log('State loaded');
    if(serializedState === null){
      return undefined;
    }
    return JSON.parse(serializedState)
  }catch(error){
    return undefined;
  }
};

const actionsList = [LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS];

export const localStorageMiddleware = store => next => action => {
  let result = next(action);

  if(actionsList.includes(action.type)){
    saveToLocalStorage({
      users: {
        user: store.getState().users.user,
      }
    })
  }
  return result;
};

