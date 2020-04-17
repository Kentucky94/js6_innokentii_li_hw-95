import React from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

import './CocktailInfoBlock.css';
import {useDispatch} from "react-redux";
import {deleteCocktail, publishCocktail} from "../../store/actions/cocktailsActions";

const CocktailInfoBlock = props => {
  const dispatch = useDispatch();

  return (
  <div>
    <Card className='CocktailInfoBlock'>
      <CardImg top style={{width: '300px'}} src={"http://localhost:8080/uploads/" + props.image} alt="Card image cap" />
      <CardBody>
        <CardTitle>{props.name}</CardTitle>
        <CardText>Posted by {props.displayName}</CardText>
        {props.user && props.user.role === 'admin' ? (
          <div>
            <Button color='success' disabled={props.isPublished} onClick={(() => dispatch(publishCocktail(props.id)))}>Publish</Button>
            <Button color='danger' onClick={() => dispatch(deleteCocktail(props.id))}>Delete</Button>
          </div>
        ): (
          <Button tag={RouterNavLink} to={'/cocktails/' + props.id}>To Full Recipe</Button>
        )}
      </CardBody>
    </Card>
  </div>
  );
};

export default CocktailInfoBlock;