import React, {Component} from 'react';
import {fetchCocktails} from "../../store/actions/cocktailsActions";
import {connect} from "react-redux";
import CocktailInfoBlock from "../../components/CocktailInfoBlock/CocktailInfoBlock";

class CocktailListPage extends Component {
  async componentDidMount() {
    this.props.fetchCocktails();
  }

  render() {
    const cocktails = this.props.cocktails.map(cocktail =>
      <CocktailInfoBlock
        key={cocktail._id}
        id={cocktail._id}
        name={cocktail.name}
        displayName={cocktail.user.displayName}
        image={cocktail.image}
        user={this.props.user}
        isPublished={cocktail.isPublished}
      />
    );

    return (
      <div>
        <h3>Cocktails List</h3>
        <div className='d-flex justify-content-start'>
          {cocktails}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  cocktails: state.cocktails.cocktails,
});

const mapDispatchToProps = dispatch => ({
  fetchCocktails: () => dispatch(fetchCocktails())
});

export default connect(mapStateToProps, mapDispatchToProps)(CocktailListPage);