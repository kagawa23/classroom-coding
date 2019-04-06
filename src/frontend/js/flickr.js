const React = require('react')

module.exports = React.createClass({
  displayName: 'Flickr',


  termChange({currentTarget:t}){
    this.setState({ term: t.value  });
  },

    onSearchClicked(){
        console.log(this.state.term);
    },

  render() {
    return (
        <div id="flickr">
                    <input type="text" onChange={this.termChange}/>
                    <button onClick={this.onSearchClicked}>
                        search
                    </button>
                    <div id="results"></div>
        </div> 
    );
  }
});
