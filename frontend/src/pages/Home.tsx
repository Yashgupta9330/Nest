import { useState } from 'react';
import SearchBar from '../components/search';

const Home = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearchResult = (results: any[]) => {
    setSearchResults(results);
  };

  return (
    <div className="container mx-auto mt-4">
      <SearchBar
        placeholder="Search for a committee..."
        searchEndpoint="http://localhost:8000/api/v1/owasp/search/committee?q=yash"
        onSearchResult={handleSearchResult}
      />
    </div>
  )
};

export default Home;
