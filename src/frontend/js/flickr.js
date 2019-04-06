const React = require('react')
const { flickrSearch } = require('./model')

module.exports = React.createClass({
  displayName: 'Flickr',

	getInitialState(){
		return {term:"",result:[]}
	},
  termChange({currentTarget:t}){
    this.setState({ term: t.value  });
  },
	updateResult(xs){
		this.setState({result:xs})
   },
    onSearchClicked(){
    	console.log(this.state.term);
	    flickrSearch(this.state.term).fork(this.props.showError,this.updateResult)
    },

	render() {
		const imgs = this.state.result.map(src => <img src={src} key={src}/>)
    return (
        <div id="flickr">
                    <input type="text" onChange={this.termChange}/>
                    <button onClick={this.onSearchClicked}>
                        search
                    </button>
                    <div id="results">{imgs}</div>
        </div> 
    );
  }
});
