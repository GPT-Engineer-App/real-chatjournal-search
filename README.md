# RealChatJournal

RealChatJournal is an application that integrates the core functionalities of ChatJournal with conversation searching capabilities.

## Features

- User authentication and session management
- Creating, editing, and deleting journal entries
- Real-time chat functionality
- Advanced search functionality for conversations

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/RealChatJournal.git
   cd RealChatJournal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Supabase URL and Anon Key in the `.env` file

4. Run the development server:
   ```
   npm run dev
   ```

5. Build for production:
   ```
   npm run build
   ```

## Search Functionality

The search feature allows users to:
- Search through conversation history
- Filter results by date and user
- Paginate through search results

To use the search feature, navigate to the Search page and enter your query. You can refine your search using the date and user filters.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.