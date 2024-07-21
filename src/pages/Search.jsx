import React, { useState } from 'react';
import { searchConversations } from '../lib/search';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  const handleSearch = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const filters = {
        date: dateFilter,
        user: userFilter
      };
      const result = await searchConversations(searchQuery, filters, page, pageSize);
      setSearchResults(result.results);
      setTotalCount(result.totalCount);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error('Search failed:', err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handleSearch(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handleSearch(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Conversations</h1>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query"
          className="input input-bordered w-full max-w-xs"
        />
        <input 
          type="date" 
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <input 
          type="text" 
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          placeholder="Filter by user"
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={() => handleSearch(1)} className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="search-results">
        {isLoading ? (
          <p>Loading results...</p>
        ) : searchResults.length > 0 ? (
          <>
            <p className="mb-4">Showing {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalCount)} of {totalCount} results</p>
            <ul className="space-y-4">
              {searchResults.map((result) => (
                <li key={result.id} className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-xl font-semibold mb-2">{result.title}</h3>
                  <p className="mb-2">{result.content}</p>
                  <small className="text-gray-500">Date: {new Date(result.created_at).toLocaleString()}</small>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-6">
              <button className="btn btn-secondary" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button className="btn btn-secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          </>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;