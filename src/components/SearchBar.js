import { useSearch } from '../providers/SearchProvider'

function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch()

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <form action='' className='search-form'>
      <input
        type='search'
        name='search-bar'
        className='search-input'
        value={searchQuery}
        onChange={handleChange}
      />
    </form>
  )
}
export default SearchBar
