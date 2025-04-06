
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllCourses } from '@/services/courseService';
import CourseCard from '@/components/courses/CourseCard';
import CourseFilters from '@/components/courses/CourseFilters';
import { Search, Filter, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get('search');
    const categoryParam = queryParams.get('category');
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    const filters = {};
    if (searchParam) {
      filters.search = searchParam;
    }
    if (categoryParam) {
      filters.categories = [categoryParam];
      setActiveFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
    
    fetchCourses(filters);
  }, [location.search]);

  const fetchCourses = async (filters = {}) => {
    setIsLoading(true);
    try {
      const data = await getAllCourses(filters);
      setCourses(data);
      setFilteredCourses(data);
      if (Object.keys(filters).length > 0) {
        setActiveFilters(filters);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast({
        variant: "destructive",
        title: "Failed to load courses",
        description: "Please try again later"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    }
    
    // Preserve category if exists
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    if (categoryParam) {
      params.set('category', categoryParam);
    }
    
    navigate(`/courses?${params.toString()}`);
  };

  const handleApplyFilters = (filters) => {
    // Preserve search query if exists
    if (searchQuery) {
      filters.search = searchQuery;
    }
    
    fetchCourses(filters);
    
    // Close mobile filters if open
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
    navigate('/courses');
    fetchCourses();
  };

  const hasActiveFilters = Object.keys(activeFilters).some(key => {
    if (Array.isArray(activeFilters[key])) {
      return activeFilters[key].length > 0;
    }
    return activeFilters[key] !== undefined;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Courses</h1>
        <p className="text-gray-600">
          Discover our wide range of courses taught by expert instructors
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <form onSubmit={handleSearch} className="relative w-full md:w-auto md:min-w-[320px]">
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-10 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            size="sm"
            className="md:hidden flex-1"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>
          
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearFilters}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filters (Collapsible) */}
        {showFilters && (
          <div className="md:hidden w-full p-4 bg-white rounded-lg shadow mb-6">
            <CourseFilters onApplyFilters={handleApplyFilters} />
          </div>
        )}

        {/* Desktop Sidebar (Fixed) */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <CourseFilters onApplyFilters={handleApplyFilters} />
        </div>

        {/* Course Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any courses matching your criteria.
              </p>
              <Button onClick={clearFilters}>Clear filters and try again</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCoursesPage;
