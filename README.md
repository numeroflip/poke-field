# Story

It's a pokemon-listing coding challenge, with a 4-hour time limit.

## Brief

The application should provide us basic browsing and discovering features. It’s all about the function. Design is not the highest priority in this part.

### List All Pokemons

Please list all Pokemon with a short summary of each on the root page of the application. Display at least the image of the Pokemon and its name.

### Show Details of a Pokemon

When a user clicks on a Pokemon we’d like to display the sufficient details of each Pokemon. Please list next to name and image at least the following attributes:

Species; Stats; Types; Weight; Moves

### Pagination

Display at a maximum of 16 Pokemon at once.

### Optional – Text Search

Add a search field on the main page that enables the user to search for the name of a Pokemon. The search should only begin to process when the minimum of three characters are given. The search results are displayed in the main list.

### Technologies

- `React`
- `TypeScript`

### API

- https://pokeapi.co

## My approach

### TL;DR

Time to "finish": 4h:30m

I ran out of time. I should have focused more on the core functionality, instead of preparing the search, and losing time on details, like a favicon, prettier config, and layout components. The data fetching and caching logic took more time than necessary, because of deciding on using a package I wasn't familiar with.

Overall it was a great experience, I really enjoyed the process, and that I had a reason to try out the react-query package, although there is a lot of left to improve on, like:

- Namings,
- Fix the pagination bug (The 0 and 1 based page numbers aren't aligned well, so if you click on the 1st page button, it will show you the 2nd in reality)
- Finishing the search, making it debounced, (Already prepared)
- Adding a header and a footer (Already prepared)
- Tweaking the list layout
- Cleaning up and testing the code (There are some dangling console.logs around)
- Making a proper pokemon detail popup

### Initialization ~40m

0th step: Checking out the poke API documentation

I started to initialize the app with create-react-app on typescript template, added layout components, a prettier config, a pokemon favicon, and some additional packages:

- `lodash` (Did not end up using it at the end...)
- `fuse.js`, (For searching, but I ran out of time before I could use it)
- `material UI`
- `react-query` (I really like the idea of separating server state and UI state, and always wanted to try out Tanner Linsley's [React-query](https://react-query.tanstack.com/) for that. Now it was the best opportunity to do that :)

Note: Here is a [talk](https://www.youtube.com/watch?v=seU46c6Jz7E) and a [blog post](https://dev.to/rootstrap/react-query-and-management-of-server-state-8ol) I recommend checking out about react-query

I also generated typings for the Pokemon request from a sample JSON with [JsonFormatter](https://jsonformatter.org/json-to-typescript)

### Data fetching + caching + hooks ~2h

Well, as it turns out, the API does not have a search functionality... Okay, no problem.
It means we have to do client-side search, so it needs to be a 2 part process.

#### 1. Get the names of all the >1000 pokemons.

I started by making a hook ( `usePokemonNameList` ) for that 1st part, integrating the data into react-query, so it is cached.

#### 2. Get paginated pokemon data.

We should display the pictures too on a paginated list, so we really have to query the individual pokemons on a page, which is 16 parallel GET requests.  
So I made a hook for that paginated data, which is dependent on the full pokemon name list, and automatically fetches it if it isn't cached yet. It can be used like:
`const {detailedPokemons, isLoading} = useDetailedPokemonDataList({page: 1, itemsPerPage: 16})`
and one for the individual data too:
`const {data, isLoading, error} = useDetailedPokemonData(pokemonName)`
The good thing is the data is cached, and if the given pokemon was already fetched, it will give it back from the cache immediately.
I feel the naming is weird, and could be totally improved :).

#### Conclusion on data caching

I really like how this came out in the end. The bad thing is, it took me some extra time to figure out an easy-to-use hook structure, while just getting familiar with the package react-query.

### Preparing a Search Box component ~ 20m

It was meant to be used on the main page, but haven't got time left to properly implement it at the end, so I just commented it out later.

### Implementing the pagination ~ 30m

After having those hooks, it was pretty easy to implement, using the MaterialUI component for that. Some debugging was needed on the hooks, though.

### Actually adding the pokemon cards to the list ~ 25m

Okay, here I became somewhat worried of my performance, it's 3h 30m already passed, and I just started to make the list work... Because of that, this part was quite a bit rushed, and it shows. It's responsible, though, with CSS Grid.

Also added the "species" to display below the pokemon's name, but it seems, they are the same... I don't really get it TBH.

### The pokemon detail dialog ~ 35m

Have I mentioned I was worried during the last step? It became exponentially so this time. As I calculate now, I only had 5 mins left at this point, but back then I thought I have more like 15. I was so close... But so far away...

Quickly, I shoveled together an ugly popup that displays only the extra data as a list. I just realized it does not even show the "stats" which would be a pretty major info I assume. Well... that happens when we are rushing things, isn't it so?

### Final notes

After finishing/ran out of time, I realized 2 important things:

1. I did not configure git properly, so the commits were not based on my official email address.
2. I also totally misunderstood the requirement for a pull request based commit history...

So...

Thankfully I used some feature branches, and I'm the only contributor, so I can change the history. And it's also a great opportunity to familiarize more with git rebase.

As a solution, I force reset the main branch to the initial commit, corrected the authors on the feature branches, and made pull requests from them. This is the final version that you see.
