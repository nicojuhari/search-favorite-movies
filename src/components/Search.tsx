const Search = ({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: (term: string) => void; }) => {
    return ( 
    <div className="flex justify-center items-center px-2 mt-6 max-w-xl mx-auto bg-gray-800 rounded-lg">
      <img src="/search.svg" alt="Search Icon" className="inline-block w-6 h-6 mr-2"/>
      <input  className="font-medium w-full h-12 px-2 text-white outline-0"
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Search through thousands of movies..."
      />
    </div> );
}
 
export default Search;