function SearchBar(props) {
    return (
      <section id="searchBar">
        <label htmlFor="searchBar">
          Search:
          <input
            type="text"
            placeholder="Search Products"
            onChange={(event) => props.setSearchParameter(event.target.value)}
          ></input>
        </label>
      </section>
    );
  }
  
  export default SearchBar