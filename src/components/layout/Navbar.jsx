
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Menu,
  X,
  User,
  BookOpen,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-brand-blue text-white font-bold rounded p-2">
              <span className="text-xl">Edu</span>
              <span className="text-xl text-brand-amber">Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-brand-blue transition-colors">
              Home
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-brand-blue transition-colors">
              Courses
            </Link>
            {isAdmin && (
              <Link to="/dashboard" className="text-gray-700 hover:text-brand-blue transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search for courses..."
                className="w-full pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </form>
          </div>

          {/* Desktop Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-10 w-10 p-0">
                    <Avatar>
                      <AvatarFallback className="bg-brand-purple text-white">
                        {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/my-courses')}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>My Courses</span>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="p-4 space-y-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="search"
                placeholder="Search for courses..."
                className="w-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </form>

            <Link 
              to="/" 
              className="block py-2 hover:text-brand-blue transition-colors" 
              onClick={closeMenu}
            >
              Home
            </Link>
            
            <Link 
              to="/courses" 
              className="block py-2 hover:text-brand-blue transition-colors" 
              onClick={closeMenu}
            >
              Courses
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/my-courses" 
                  className="block py-2 hover:text-brand-blue transition-colors"
                  onClick={closeMenu}
                >
                  My Courses
                </Link>
                
                {isAdmin && (
                  <Link 
                    to="/dashboard" 
                    className="block py-2 hover:text-brand-blue transition-colors"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                )}
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-0 hover:bg-transparent"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  <span className="flex items-center py-2 text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </span>
                </Button>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link to="/login" onClick={closeMenu}>Log in</Link>
                </Button>
                <Button
                  className="w-full"
                  asChild
                >
                  <Link to="/signup" onClick={closeMenu}>Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
