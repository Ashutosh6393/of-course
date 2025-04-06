
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  Award, 
  Users, 
  Star,
  PlayCircle,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { getCourseById } from '@/services/courseService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
        setError(null);
      } catch (err) {
        setError('Course not found');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load course details"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please log in to purchase this course",
        variant: "default"
      });
      navigate(`/login?redirect=/courses/${courseId}`);
    } else {
      navigate(`/payment/${courseId}`);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Course Not Found</h2>
        <p className="text-gray-600 mb-8">
          We couldn't find the course you're looking for.
        </p>
        <Button onClick={() => navigate('/courses')}>
          Browse All Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Course Info */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-brand-blue">{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              
              <p className="text-lg text-gray-700 mb-6">{course.description}</p>
              
              <div className="flex items-center mb-6">
                <div className="flex mr-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5 text-yellow-500 mr-0.5"
                      fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="font-medium">{course.rating.toFixed(1)}</span>
                <span className="text-gray-500 mx-1">({course.reviewCount} reviews)</span>
              </div>
              
              <div className="mb-8">
                <p className="text-gray-700">
                  Created by <span className="font-medium">{course.instructor}</span>
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-brand-blue mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-brand-blue mr-2" />
                  <span>{course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} lessons</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-brand-blue mr-2" />
                  <span>Certificate</span>
                </div>
              </div>
              
              <div className="md:hidden mb-8">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold">${course.price.toFixed(2)}</span>
                      {course.originalPrice && (
                        <span className="text-gray-400 line-through ml-2">
                          ${course.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button 
                      className="w-full mb-4" 
                      size="lg"
                      onClick={handleEnroll}
                    >
                      Enroll Now
                    </Button>
                    <p className="text-sm text-center text-gray-500">
                      30-Day Money-Back Guarantee
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Purchase Card (Desktop) */}
            <div className="hidden md:block w-80">
              <div className="sticky top-24">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold">${course.price.toFixed(2)}</span>
                      {course.originalPrice && (
                        <span className="text-gray-400 line-through ml-2">
                          ${course.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Button 
                      className="w-full mb-4" 
                      size="lg"
                      onClick={handleEnroll}
                    >
                      Enroll Now
                    </Button>
                    <p className="text-sm text-center text-gray-500 mb-6">
                      30-Day Money-Back Guarantee
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-brand-green mr-2" />
                        <span className="text-sm">Full lifetime access</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-brand-green mr-2" />
                        <span className="text-sm">Access on mobile and desktop</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-brand-green mr-2" />
                        <span className="text-sm">Certificate of completion</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>
            
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{course.modules.length} sections</span>
                  <span className="text-sm text-gray-500">
                    {course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} lessons
                  </span>
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {course.modules.map((module, index) => (
                  <AccordionItem key={index} value={`module-${index}`}>
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="text-left">
                        <div className="font-medium">{module.title}</div>
                        <div className="text-sm text-gray-500">
                          {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-0 pb-3">
                      <ul className="space-y-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex items-center py-2 pl-4 border-b last:border-0">
                            <PlayCircle className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm">{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Instructor Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Instructor</h2>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarFallback className="text-xl bg-brand-blue text-white">
                      {course.instructor.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="text-xl font-semibold">{course.instructor}</h3>
                    <p className="text-gray-500 mb-4">Expert {course.category} Instructor</p>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-brand-amber mr-1" fill="currentColor" />
                        <span>4.8 Instructor Rating</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-brand-blue mr-1" />
                        <span>12,000+ Students</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-brand-blue mr-1" />
                        <span>15 Courses</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700">
                      Professional instructor with years of real-world experience in {course.category}. 
                      Passionate about teaching and helping students achieve their goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetailsPage;
