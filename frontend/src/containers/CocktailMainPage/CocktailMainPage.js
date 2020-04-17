import React, {Fragment, Component} from 'react';
import {connect} from "react-redux";

import {fetchPublishedCocktails} from "../../store/actions/cocktailsActions";
import CocktailInfoBlock from "../../components/CocktailInfoBlock/CocktailInfoBlock";

class CocktailMainPage extends Component {
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
      />
    );

    return (
      <Fragment>
        <div className='d-flex justify-content-start'>
          {cocktails}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cocktails: state.cocktails.cocktails,
  user: state.users.user
});

const mapDispatchToProps = dispatch => ({
  fetchCocktails: () => dispatch(fetchPublishedCocktails())
});

export default connect(mapStateToProps, mapDispatchToProps)(CocktailMainPage);