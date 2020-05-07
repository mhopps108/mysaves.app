import React from 'react';
import { connect } from 'react-redux';
import MapAndSort from '../containers/MapAndSort';
import Header from './Header';
import Search from '../containers/Search';

class Render extends React.Component {
  savesGridContainer = React.createRef();
  savesGrid = React.createRef();

  componentDidMount = () => {
    if (this.props.token === null) {
      // window.location.replace(`https://www.reddit.com/api/v1/authorize?client_id=qsNICd60jP8Cvg&response_type=token&state=${Math.random().toString(36).substring(2)}&redirect_uri=http://localhost:3000/authorize_callback&duration=temporary&scope=history identity`);
        window.location.replace(`https://www.reddit.com/api/v1/authorize?client_id=qsNICd60jP8Cvg&response_type=token&state=${Math.random().toString(36).substring(2)}&redirect_uri=https://mhsaves.netlify.app/authorize_callback&duration=temporary&scope=history identity`);
    }
    return null
  }

  render () {
    return (
      <div>
        <MapAndSort />
        <Header savesGridContainer={this.savesGridContainer} savesGrid={this.savesGrid}/>
        <div className="saves-grid-container" ref={this.savesGridContainer}>
          <div className="saves-grid" ref={this.savesGrid}>
            <Search />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return { 
    token: state.userData.token,
   }
}

export default connect(mapStateToProps)(Render);