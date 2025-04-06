
import { useState } from 'react';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const CourseFilters = ({ onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const categories = [
    'Web Development', 
    'Data Science', 
    'Mobile Development',
    'Business',
    'Marketing', 
    'Design'
  ];
  
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  
  const ratings = [4, 3, 2, 1];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleLevelChange = (level) => {
    setSelectedLevels(prev => {
      if (prev.includes(level)) {
        return prev.filter(l => l !== level);
      } else {
        return [...prev, level];
      }
    });
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(prev => prev === rating ? null : rating);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      priceRange,
      categories: selectedCategories,
      levels: selectedLevels,
      minRating: selectedRating,
    });
  };

  const handleClearFilters = () => {
    setPriceRange([0, 200]);
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedRating(null);
    onApplyFilters({});
  };

  return (
    <div className="bg-white rounded-lg border p-5 sticky top-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleClearFilters}
          className="text-gray-500 text-sm hover:text-red-500"
        >
          <X className="h-3 w-3 mr-1" />
          Clear all
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["price", "category", "level", "rating"]}>
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <Slider
                value={priceRange}
                min={0}
                max={200}
                step={5}
                onValueChange={setPriceRange}
                className="my-6"
              />
              <div className="flex items-center justify-between text-sm mt-2 text-gray-700">
                <div>${priceRange[0]}</div>
                <div>${priceRange[1]}</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger className="text-sm font-medium">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label 
                    htmlFor={`category-${category}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="level">
          <AccordionTrigger className="text-sm font-medium">Level</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {levels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`level-${level}`} 
                    checked={selectedLevels.includes(level)}
                    onCheckedChange={() => handleLevelChange(level)}
                  />
                  <label 
                    htmlFor={`level-${level}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger className="text-sm font-medium">Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`rating-${rating}`} 
                    checked={selectedRating === rating}
                    onCheckedChange={() => handleRatingChange(rating)}
                  />
                  <label 
                    htmlFor={`rating-${rating}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    {rating}+ stars
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button 
        className="w-full mt-6" 
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default CourseFilters;
