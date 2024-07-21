<script>
  import { onMount } from 'svelte'
  import { searchConversations } from '$lib/search'

  let searchQuery = ''
  let searchResults = []
  let dateFilter = ''
  let userFilter = ''
  let isLoading = false
  let error = null
  let currentPage = 1
  let totalPages = 1
  let totalCount = 0
  const pageSize = 10

  async function handleSearch(page = 1) {
    isLoading = true
    error = null
    try {
      const filters = {
        date: dateFilter,
        user: userFilter
      }
      const result = await searchConversations(searchQuery, filters, page, pageSize)
      searchResults = result.results
      totalCount = result.totalCount
      currentPage = result.currentPage
      totalPages = result.totalPages
    } catch (err) {
      console.error('Search failed:', err)
      error = 'An error occurred while searching. Please try again.'
    } finally {
      isLoading = false
    }
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      handleSearch(currentPage - 1)
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      handleSearch(currentPage + 1)
    }
  }

  onMount(() => {
    // Any initialization code if needed
  })
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Search Conversations</h1>
  
  <div class="flex flex-wrap gap-4 mb-6">
    <input 
      type="text" 
      bind:value={searchQuery} 
      placeholder="Enter search query"
      class="input input-bordered w-full max-w-xs"
    />
    <input 
      type="date" 
      bind:value={dateFilter} 
      class="input input-bordered w-full max-w-xs"
    />
    <input 
      type="text" 
      bind:value={userFilter} 
      placeholder="Filter by user"
      class="input input-bordered w-full max-w-xs"
    />
    <button on:click={() => handleSearch(1)} class="btn btn-primary" disabled={isLoading}>
      {#if isLoading}
        Searching...
      {:else}
        Search
      {/if}
    </button>
  </div>

  {#if error}
    <div class="alert alert-error mb-4">
      <p>{error}</p>
    </div>
  {/if}

  <div class="search-results">
    {#if isLoading}
      <p>Loading results...</p>
    {:else if searchResults.length > 0}
      <p class="mb-4">Showing {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalCount)} of {totalCount} results</p>
      <ul class="space-y-4">
        {#each searchResults as result}
          <li class="bg-white shadow rounded-lg p-4">
            <h3 class="text-xl font-semibold mb-2">{result.title}</h3>
            <p class="mb-2">{result.content}</p>
            <small class="text-gray-500">Date: {new Date(result.created_at).toLocaleString()}</small>
          </li>
        {/each}
      </ul>
      <div class="flex justify-between mt-6">
        <button class="btn btn-secondary" on:click={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button class="btn btn-secondary" on:click={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    {:else}
      <p>No results found.</p>
    {/if}
  </div>
</div>