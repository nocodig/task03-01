import { init} from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'
import { classModule } from 'snabbdom/build/package/modules/class'
import { propsModule } from 'snabbdom/build/package/modules/props'
import { styleModule } from 'snabbdom/build/package/modules/style'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventlisteners'

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule
])

let vnode = null;
let nextKey = 11;
let sortBy = 'rank';

let data = [
  { rank: 1, title: 'The Shawshank Redemption', desc: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},
  { rank: 2, title: 'The Godfather', desc: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'},
  { rank: 3, title: 'The Godfather: Part II', desc: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.'},
  { rank: 4, title: 'The Dark Knight', desc: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.'},
  { rank: 5, title: 'Pulp Fiction', desc: 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'},
  { rank: 6, title: 'Schindler\'s List', desc: 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.'},
  { rank: 7, title: '12 Angry Men', desc: 'A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.'},
  { rank: 8, title: 'The Good, the Bad and the Ugly', desc: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.'},
  { rank: 9, title: 'The Lord of the Rings: The Return of the King', desc: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.'},
  { rank: 10, title: 'Fight Club', desc: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...'},
]

function changeSort(prop) {
  sortBy = prop
  data.sort((a, b) => {
    if (a[prop] > b[prop]) {
      return 1
    }
    if (a[prop] < b[prop]) {
      return -1
    }
    return 0
  })
  render()
}

function add() {
  var n = data[Math.floor(Math.random() * 10)]
  data = [{ rank: nextKey++, title: n.title, desc: n.desc }, ...data]
  changeSort(sortBy);
}

function remove(movie) {
  data = data.filter(m => m !== movie)
  changeSort(sortBy);
}

function movieItemView(movie) {
  return h('div.row', {
    key: movie.rank,
  }, [
    h('div', { style: { fontWeight: 'bold' } }, movie.rank),
    h('div', movie.title),
    h('div', movie.desc),
    h('div.btn.rm-btn', { on: { click: () => remove(movie) } }, 'x'),
  ])
}

function render() {
  vnode = patch(vnode, view(data))
}

function view(data) {
  return h('div#container', [
    h('h1', 'Top 10 movies'),
    h('div', [
      h('a.btn.add', { on: { click: add } }, 'Add'),
      'Sort by: ',
      h('span.btn-group', [
        h('a.btn.rank', { class: { active: sortBy === 'rank' }, on: { click: () => changeSort('rank') } }, 'Rank'),
        h('a.btn.title', { class: { active: sortBy === 'title' }, on: { click: () => changeSort('title') } }, 'Title'),
        h('a.btn.desc', { class: { active: sortBy === 'desc' }, on: { click: () => changeSort('desc') } }, 'Description'),
      ])
    ]),
    h('div.list', data.map(movieItemView))
  ])
}

window.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app')
  vnode = patch(app, view(data))
})