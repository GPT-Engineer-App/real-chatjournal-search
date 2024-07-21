import { Home, MessageSquare, Book, Search } from "lucide-react";
import Index from "./pages/Index.jsx";
import Chat from "./pages/Chat.jsx";
import Journal from "./pages/Journal.jsx";
import Search from "./routes/search/+page.svelte";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Chat",
    to: "/chat",
    icon: <MessageSquare className="h-4 w-4" />,
    page: <Chat />,
  },
  {
    title: "Journal",
    to: "/journal",
    icon: <Book className="h-4 w-4" />,
    page: <Journal />,
  },
  {
    title: "Search",
    to: "/search",
    icon: <Search className="h-4 w-4" />,
    page: <Search />,
  },
];