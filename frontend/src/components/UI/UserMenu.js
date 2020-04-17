import React, {Fragment} from 'react';
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import {NavLink as RouterNavLink} from "react-router-dom";

import {logoutUser} from "../../store/actions/usersActions";

const UserMenu = props => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <b>Welcome, {props.displayName}!</b>
      {props.role === 'admin' ? (
        <Button color="success" tag={RouterNavLink} to='/cocktails/all'>Cocktail moderation page</Button>
      ): (
        <Button color="success" tag={RouterNavLink} to='/cocktails/all'>MyCocktails</Button>
      )}
      <Button color='info' tag={RouterNavLink} to='/cocktails/create'>Create new cocktail</Button>
      <Button color="danger" onClick={() => dispatch(logoutUser())}>Logout</Button>
    </Fragment>
  );
};

export default UserMenu;