
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="overflow-hidden course-card h-full flex flex-col">
        <div className="relative h-48 bg-gray-100">
          <img 
            src={course.thumbnail || 'https://images.unsplash.com/photo-1516397281156-ca03cf0c7c3e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500'} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
          {course.featured && (
            <Badge className="absolute top-2 right-2 bg-brand-amber">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
          </div>
          <div className="mt-1">
            <p className="text-sm text-gray-500">{course.instructor}</p>
          </div>
          <div className="flex items-center mt-2">
            <div className="flex text-yellow-500">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  className="h-4 w-4"
                  fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              ({course.reviewCount || 0})
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{course.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-lg font-bold">${course.price.toFixed(2)}</span>
            {course.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${course.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Badge variant="outline" className="text-xs border-brand-blue text-brand-blue">
            {course.category}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
