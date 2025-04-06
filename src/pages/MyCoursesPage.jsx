
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { PlayCircle, Search, BookOpen, Award } from 'lucide-react';
import { getUserCourses } from '@/services/courseService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserCourses = async () => {
      setIsLoading(true);
      try {
        const data = await getUserCourses(user?.id);
        
        // Add random progress to each course for demo purposes
        const coursesWithProgress = data.map(course => ({
          ...course,
          progress: Math.floor(Math.random() * 101), // 0-100
          lastAccessed: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)) // Random date within the last week
        }));
        
        setCourses(coursesWithProgress);
        setFilteredCourses(coursesWithProgress);
      } catch (error) {
        console.error('Error fetching user courses:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to load your courses',
          description: 'Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCourses();
  }, [user?.id]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses);
    }
  }, [searchTerm, courses]);

  // Format date for readability
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-gray-600">
          Continue learning where you left off
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-md">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search your courses..."
            className="pl-10 pr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>

      {/* Courses Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <Card key={course.id} className="overflow-hidden flex flex-col h-full">
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent text-white">
                  <Badge className="bg-brand-blue">
                    {course.category}
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="bg-white/90 rounded-md p-2 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Your Progress</span>
                      <span className="text-xs font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
              </div>
              <CardContent className="p-4 flex-1">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mb-3">By {course.instructor}</p>
                <p className="text-sm text-gray-700">
                  Last accessed: {formatDate(course.lastAccessed)}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0 border-t flex justify-between">
                {course.progress === 100 ? (
                  <span className="flex items-center text-sm text-brand-green">
                    <Award className="h-4 w-4 mr-1" />
                    <span>Completed</span>
                  </span>
                ) : (
                  <span className="flex items-center text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>Continue Learning</span>
                  </span>
                )}
                <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                  <PlayCircle className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <BookOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            {searchTerm 
              ? "We couldn't find any courses matching your search."
              : "You haven't purchased any courses yet. Browse our course catalog to get started."}
          </p>
          <Button asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
