const { curry, compose, replace, map, prop } = require('ramda')
const { mconcat } = require('pointfree-fantasy')
const { getJSON} = require('jquery')
const Task = require('data.task')
const daggy = require('daggy')
const { indexOf } = require('./utils')

const Http = {
  get:(url) => new Task((rej,res) => getJSON(url).error(rej).done(res))
}

const Photo = daggy.tagged('src','x','y')

const newPhtot = url => Photo(url,0,0)

const baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=14c4ebab40155d8c54dacb0642f46d68&tags={TAGS}&extras=url_s&format=json&jsoncallback=?'

const makeUrl = (t) => replace("{TAGS}",t,baseUrl)

const extractUrl = compose(map(prop('url_s')),prop('photo'),prop('photos'))

const flickrSearch = compose(map(extractUrl),Http.get, makeUrl)

const indexOfPhoto = curry((p,ps) => indexOf(p.src, ps.map(prop('src'))))

const replacePhoto = curry((p, ps)=>compose((m)=>m.cata({Just:()=>,Noting:()=>append(p,ps)}),map(i => remove(i,1,ps)),indexOfPhoto(p))(ps))

module.exports = { flickrSearch }
