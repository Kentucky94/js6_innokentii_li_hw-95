import React, {Component, Fragment} from 'react';
import {fetchSingleCocktail} from "../../store/actions/cocktailsActions";
import {connect} from "react-redux";

class CocktailSinglePage extends Component {
  async componentDidMount() {
    await this.props.fetchCocktail(this.props.match.params.id);
  }

  render() {
    let ingredients = [];

    if(this.props.cocktail._id){
      ingredients = this.props.cocktail.ingredients.map(ingredient => (
        <li key={this.props.cocktail.ingredients.indexOf(ingredient)}><b>{ingredient.name}</b>: {ingredient.amount}</li>
      ));
    }

    return (
      <Fragment>
        <h2>Cocktail Info</h2>
        <div className='d-flex justify-content-between'>

          <img style={{width: '30vw'}} src={"http://localhost:8080/uploads/" + this.props.cocktail.image} alt="cock"/>
          <div style={{width: '60vw'}}>
            <h4>Ingredients:</h4>
            <ul>
              {ingredients}
            </ul>
          </div>
        </div>
        <div>
          <h4>Recipe:</h4>
          <div>
            {this.props.cocktail.recipe}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cocktail: state.cocktails.cocktail,
});

const mapDispatchToProps = dispatch => ({
  fetchCocktail: cocktailId => dispatch(fetchSingleCocktail(cocktailId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CocktailSinglePage);