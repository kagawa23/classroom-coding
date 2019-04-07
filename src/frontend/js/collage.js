const React = require('react')
const DragImage = require('./drag_image')
const append = require('ramda')
const { preventDefault } = requie('./utils')
const { Photo, replacePhoto } = require('./model')
const { preventDefault } = require('./utils')

module.exports = React.createClass({
	displayName:'Collage',
	getInitialState(){
	 return {photo:[]}
	},
	updatePhotos(xs){
		this.setState({photos: xs})
	},
	onDrop({dataTransfer:dt, clientX:x,clientY:y, currentTarget:t }){
		const offset = t.getBoundingClientRect().top
		const src = dt.getData('text')
		const photo = Photo(src,x,(y-offset))
		this.updatePhotos(replacePhoto(photo, this.state.photos))
	},
	render(){
 	const imgs = this.state.photos.map(src=><DragImage src={src} key={src}/>)
  	return (
  		<div>
  		 <div id="phtos">{imgs}</div> 	
  		</div>
  	)
	}
})
