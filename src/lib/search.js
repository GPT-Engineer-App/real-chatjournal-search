import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function searchConversations(query, filters = {}, page = 1, pageSize = 10) {
  try {
    let supabaseQuery = supabase
      .from('conversations')
      .select('*', { count: 'exact' })
      .textSearch('content', query)

    // Apply filters
    if (filters.date) {
      supabaseQuery = supabaseQuery.gte('created_at', filters.date).lt('created_at', new Date(new Date(filters.date).getTime() + 86400000).toISOString())
    }
    if (filters.user) {
      supabaseQuery = supabaseQuery.eq('user_id', filters.user)
    }

    // Apply pagination
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    supabaseQuery = supabaseQuery.range(from, to)

    const { data, error, count } = await supabaseQuery

    if (error) {
      throw error
    }

    return { 
      results: data || [], 
      totalCount: count || 0,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / pageSize)
    }
  } catch (error) {
    console.error('Error searching conversations:', error)
    throw error
  }
}