
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ArrowRight, CheckCircle, BookOpen, Award, Users } from 'lucide-react';
import { getFeaturedCourses, getCategories } from '@/services/courseService';
import CourseCard from '@/components/courses/CourseCard';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesData, categoriesData] = await Promise.all([
          getFeaturedCourses(),
          getCategories()
        ]);
        setFeaturedCourses(coursesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-blue to-brand-purple text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Elevate Your Skills with Expert-Led Courses
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Learn from industry professionals and transform your career with our comprehensive online courses.
              </p>
              <form onSubmit={handleSearch} className="relative max-w-md">
                <Input
                  type="search"
                  placeholder="What do you want to learn today?"
                  className="w-full pl-10 pr-4 py-6 bg-white text-gray-800 rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  Search
                </Button>
              </form>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600" 
                  alt="Students learning"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg text-black">
                  <div className="flex items-center space-x-2">
                    <div className="bg-brand-green rounded-full p-2">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Join 50,000+</div>
                      <div className="text-xs text-gray-500">Satisfied Learners</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EduHub?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="bg-brand-blue/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <BookOpen className="h-7 w-7 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                <p className="text-gray-600">
                  Learn from industry professionals with years of real-world experience and passion for teaching.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="bg-brand-purple/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Award className="h-7 w-7 text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Certification</h3>
                <p className="text-gray-600">
                  Earn certificates upon completion to showcase your new skills to employers and clients.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="bg-brand-amber/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <CheckCircle className="h-7 w-7 text-brand-amber" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
                <p className="text-gray-600">
                  Study at your own pace with lifetime access to courses on any device, anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Button variant="outline" asChild>
              <Link to="/courses" className="flex items-center">
                View all courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="h-96 animate-pulse">
                  <div className="bg-gray-200 h-48"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {categories.map(category => (
                <Link 
                  key={category}
                  to={`/courses?category=${encodeURIComponent(category)}`}
                  className="bg-white shadow-md hover:shadow-lg rounded-lg p-6 text-center transition-all hover:translate-y-[-5px]"
                >
                  <h3 className="font-medium">{category}</h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="tab1">John</TabsTrigger>
              <TabsTrigger value="tab2">Sarah</TabsTrigger>
              <TabsTrigger value="tab3">Michael</TabsTrigger>
            </TabsList>
            
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
              <TabsContent value="tab1">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200" 
                      alt="John Smith"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">John Smith</h3>
                  <p className="text-sm text-gray-500 mb-4">Web Developer</p>
                  <p className="text-gray-600 italic">
                    "The Web Development Bootcamp completely transformed my career. After just 3 months of studying, 
                    I landed my first developer job. The instructors are amazing and the course content is cutting edge."
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="tab2">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200" 
                      alt="Sarah Johnson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">Sarah Johnson</h3>
                  <p className="text-sm text-gray-500 mb-4">UX Designer</p>
                  <p className="text-gray-600 italic">
                    "The UI/UX Design course helped me transition from graphic design to UX design. 
                    The projects were practical and I built a portfolio that impressed employers."
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="tab3">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200" 
                      alt="Michael Brown"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">Michael Brown</h3>
                  <p className="text-sm text-gray-500 mb-4">Data Analyst</p>
                  <p className="text-gray-600 italic">
                    "The Data Science course was exactly what I needed to upskill. 
                    The instructor explained complex concepts in simple terms and the hands-on 
                    projects gave me confidence to apply these skills in my job."
                  </p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-blue text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students already learning on EduHub. Find the right course for you.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/courses" className="text-lg px-8">
              Explore Courses
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
