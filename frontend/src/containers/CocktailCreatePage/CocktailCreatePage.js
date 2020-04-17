import React, {Fragment, Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../../components/UI/FormElement/FormElement";
import {createCocktail} from "../../store/actions/cocktailsActions";
import {connect} from "react-redux";

class CocktailCreatePage extends Component {
  state = {
    name: '',
    image: '',
    recipe: '',
    ingredients: [],
  };

  inputChangeHandler = event => {
    this.setState({[event.target.name]: event.target.value})
  };

  fileChangeHandler = event => {
    this.setState({[event.target.name]: event.target.files[0]})
  };

  onSubmitHandler = event => {
    event.preventDefault();

    const formData = new FormData();

    Object.keys(this.state).forEach(key => {
      let value = this.state[key];

      if(key === 'ingredients'){
        value = JSON.stringify(value)
      }

      formData.append(key, value);
    });

    this.props.createCocktail(formData);
  };

  addIngredient = () => {
    const newIngredients = [...this.state.ingredients];

    newIngredients.push({name: '', amount: ''});

    this.setState({ingredients: newIngredients})
  };

  removeIngredient = index => {
    const newIngredients = [...this.state.ingredients];

    newIngredients.splice(index, 1);

    this.setState({ingredients: newIngredients});
  };

  onIngredientChange = (event, index, name) => {
    const newIngredients = [...this.state.ingredients];

    const ingredient = newIngredients[index];

    ingredient[name] = event.target.value;

    this.setState({ingredients: newIngredients});
  };

  render() {
    const ingredientInputs = this.state.ingredients.map((ingredient, index) => (
      <div key={index}>
        <FormElement
          propertyName="ingredientName"
          title="Ingredient Name"
          type='text'
          placeholder='Ingredient name'
          value={ingredient.name}
          onChange={(event) => this.onIngredientChange(event, index, 'name')}
        />
        <FormElement
          propertyName="ingredientAmount"
          title="Ingredient Amount"
          type='text'
          placeholder='Amount'
          value={ingredient.amount}
          onChange={(event) => this.onIngredientChange(event, index, 'amount')}
        />
        <Button onClick={() => this.removeIngredient(index)}>Remove</Button>
      </div>
    ));

    return (
      <Fragment>
        <h2>Create new cocktail</h2>
        <Form onSubmit={this.onSubmitHandler}>
          <FormElement
            propertyName="name"
            title="Cocktail Name"
            type="text"
            value={this.state.name}
            onChange={this.inputChangeHandler}
            required
          />
          <FormElement
            propertyName="recipe"
            title="Recipe"
            type="textarea"
            value={this.state.recipe}
            onChange={this.inputChangeHandler}
            required
          />
          <FormElement
            propertyName="image"
            title="Image"
            type="file"
            onChange={this.fileChangeHandler}
          />
          <div>
            {ingredientInputs}
            <Button onClick={this.addIngredient}>Add ingredient</Button>
          </div>
          <FormGroup row>
            <Col sm={{offset: 2, size: 10}}>
              <Button type="submit" color="primary">
                Create
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createCocktail: cocktailData => dispatch(createCocktail(cocktailData)),
});

export default connect(null, mapDispatchToProps)(CocktailCreatePage);