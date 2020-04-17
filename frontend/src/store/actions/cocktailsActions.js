import axiosOrders from "../../axiosOrders";
import {push} from 'connected-react-router';
import {toast} from "react-toastify";

export const FETCH_COCKTAILS_SUCCESS = 'FETCH_COCKTAILS_SUCCESS';
export const FETCH_SINGLE_COCKTAILS_SUCCESS = 'FETCH_SINGLE_COCKTAILS_SUCCESS';
export const CREATE_COCKTAIL_SUCCESS = 'CREATE_COCKTAIL_SUCCESS';

export const fetchCocktailsSuccess = cocktails => ({type: FETCH_COCKTAILS_SUCCESS, cocktails});
export const fetchSingleCocktailSuccess = cocktail => ({type: FETCH_SINGLE_COCKTAILS_SUCCESS, cocktail});
export const createCocktailSuccess = () => ({type: CREATE_COCKTAIL_SUCCESS});

export const createCocktail = cocktailData => {
  return async dispatch => {
    try{
      await axiosOrders.post('/cocktails', cocktailData);

      dispatch(createCocktailSuccess());
      toast.success('Your cocktail will be reviewed by a moderator.');
      dispatch(push('/'));
    }catch(error){
      console.log(error);
    }
  }
};

export const fetchSingleCocktail = (id) => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/cocktails/' + id);

      dispatch(fetchSingleCocktailSuccess(response.data))
    }catch(error){
      console.log(error)
    }
  }
};

export const fetchCocktails = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/cocktails');

      dispatch(fetchCocktailsSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const fetchPublishedCocktails = () => {
  return async dispatch => {
    try{
      const response = await axiosOrders.get('/cocktails/published');

      dispatch(fetchCocktailsSuccess(response.data));
    }catch(error){
      console.log(error);
    }
  }
};

export const publishCocktail = cocktailId => {
  return async dispatch => {
    try{
      await axiosOrders.post('/cocktails/publish/' + cocktailId);
      dispatch(fetchCocktails());
    }catch(error){
      console.log(error);
    }
  }
};

export const deleteCocktail = cocktailId => {
  return async dispatch => {
    try{
      await axiosOrders.delete('/cocktails/delete/' + cocktailId);
      dispatch(fetchCocktails());
    }catch(error){
      console.log(error);
    }
  }
};