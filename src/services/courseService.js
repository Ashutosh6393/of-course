
// Mock data service for courses

const courses = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Become a full-stack web developer with this comprehensive course covering HTML, CSS, JavaScript, React, Node.js, and more.',
    instructor: 'Sarah Johnson',
    price: 89.99,
    originalPrice: 199.99,
    thumbnail: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    category: 'Web Development',
    level: 'Beginner',
    rating: 4.8,
    reviewCount: 2547,
    featured: true,
    duration: '52 hours',
    modules: [
      {
        title: 'Introduction to HTML & CSS',
        lessons: ['HTML Basics', 'CSS Fundamentals', 'Building Your First Webpage']
      },
      {
        title: 'JavaScript Essentials',
        lessons: ['JavaScript Syntax', 'DOM Manipulation', 'Event Handling']
      },
      {
        title: 'React Fundamentals',
        lessons: ['React Components', 'State & Props', 'Hooks']
      },
      {
        title: 'Backend with Node.js',
        lessons: ['Node.js Basics', 'Express Framework', 'RESTful APIs']
      }
    ]
  },
  {
    id: '2',
    title: 'Data Science and Machine Learning with Python',
    description: 'Learn data science, data analysis, machine learning, and Python in this comprehensive course with real-world projects.',
    instructor: 'David Chen',
    price: 94.99,
    originalPrice: 189.99,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    category: 'Data Science',
    level: 'Intermediate',
    rating: 4.7,
    reviewCount: 1842,
    featured: true,
    duration: '48 hours',
    modules: [
      {
        title: 'Python for Data Science',
        lessons: ['Python Fundamentals', 'NumPy & Pandas', 'Data Visualization']
      },
      {
        title: 'Statistical Analysis',
        lessons: ['Descriptive Statistics', 'Inferential Statistics', 'Hypothesis Testing']
      },
      {
        title: 'Machine Learning Basics',
        lessons: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation']
      }
    ]
  },
  {
    id: '3',
    title: 'Mobile App Development with React Native',
    description: 'Create iOS and Android apps with React Native. Build a portfolio of real-world mobile applications.',
    instructor: 'Michael Rodriguez',
    price: 79.99,
    originalPrice: 149.99,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    category: 'Mobile Development',
    level: 'Intermediate',
    rating: 4.6,
    reviewCount: 1253,
    duration: '38 hours',
    modules: [
      {
        title: 'React Native Foundations',
        lessons: ['Setting Up Environment', 'React Native Components', 'Styling']
      },
      {
        title: 'Navigation and State Management',
        lessons: ['React Navigation', 'State Management with Redux', 'Context API']
      },
      {
        title: 'Building Real Apps',
        lessons: ['Social Media App', 'E-commerce App', 'Publishing to App Stores']
      }
    ]
  },
  {
    id: '4',
    title: 'Digital Marketing Masterclass',
    description: 'Learn SEO, social media marketing, email campaigns, and PPC advertising strategies for business growth.',
    instructor: 'Emma Williams',
    price: 59.99,
    originalPrice: 129.99,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    category: 'Marketing',
    level: 'Beginner',
    rating: 4.5,
    reviewCount: 1876,
    duration: '32 hours',
    modules: [
      {
        title: 'SEO Fundamentals',
        lessons: ['Keyword Research', 'On-Page SEO', 'Link Building']
      },
      {
        title: 'Social Media Marketing',
        lessons: ['Platform Strategy', 'Content Creation', 'Analytics']
      },
      {
        title: 'Email Marketing',
        lessons: ['Building Lists', 'Campaign Design', 'A/B Testing']
      }
    ]
  },
  {
    id: '5',
    title: 'UI/UX Design Essentials',
    description: 'Master the principles of UI/UX design using Figma and build a professional portfolio of design projects.',
    instructor: 'Alex Thompson',
    price: 69.99,
    originalPrice: 139.99,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    category: 'Design',
    level: 'Beginner',
    rating: 4.9,
    reviewCount: 2102,
    featured: true,
    duration: '40 hours',
    modules: [
      {
        title: 'Design Principles',
        lessons: ['Color Theory', 'Typography', 'Layout Design']
      },
      {
        title: 'User Experience Design',
        lessons: ['User Research', 'Information Architecture', 'Usability Testing']
      },
      {
        title: 'Figma Masterclass',
        lessons: ['Interface Design', 'Prototyping', 'Design Systems']
      }
    ]
  },
  {
    id: '6',
    title: 'Business Analytics and Intelligence',
    description: 'Learn how to analyze business data, create reports, and make data-driven decisions for organizational growth.',
    instructor: 'Robert Lewis',
    price: 84.99,
    originalPrice: 169.99,
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    category: 'Business',
    level: 'Advanced',
    rating: 4.6,
    reviewCount: 987,
    duration: '45 hours',
    modules: [
      {
        title: 'Data Analysis Fundamentals',
        lessons: ['Business Metrics', 'Excel for Analysis', 'Data Visualization']
      },
      {
        title: 'Business Intelligence Tools',
        lessons: ['Power BI', 'Tableau', 'Google Analytics']
      },
      {
        title: 'Strategic Decision Making',
        lessons: ['Forecasting', 'Risk Analysis', 'ROI Calculation']
      }
    ]
  },
  {
    id: '7',
    title: 'Advanced JavaScript: From Fundamentals to Front-end Frameworks',
    description: 'Dive deep into JavaScript from core concepts to building applications with modern frameworks like React, Vue, and Angular.',
    instructor: 'Thomas Nguyen',
    price: 79.99,
    originalPrice: 159.99,
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    category: 'Web Development',
    level: 'Advanced',
    rating: 4.7,
    reviewCount: 1458,
    duration: '56 hours',
    modules: [
      {
        title: 'JavaScript Deep Dive',
        lessons: ['Closures & Scope', 'Prototypes & Inheritance', 'Async JavaScript']
      },
      {
        title: 'Modern JavaScript',
        lessons: ['ES6+ Features', 'Modules', 'Tooling & Bundlers']
      },
      {
        title: 'Framework Comparison',
        lessons: ['React', 'Vue', 'Angular']
      }
    ]
  },
  {
    id: '8',
    title: 'Cloud Computing with AWS',
    description: 'Master Amazon Web Services and learn to deploy scalable cloud applications and manage cloud infrastructure.',
    instructor: 'Lisa Kumar',
    price: 99.99,
    originalPrice: 199.99,
    thumbnail: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    category: 'Web Development',
    level: 'Advanced',
    rating: 4.8,
    reviewCount: 1096,
    duration: '50 hours',
    modules: [
      {
        title: 'AWS Fundamentals',
        lessons: ['EC2', 'S3', 'RDS']
      },
      {
        title: 'Serverless Architecture',
        lessons: ['Lambda Functions', 'API Gateway', 'DynamoDB']
      },
      {
        title: 'DevOps on AWS',
        lessons: ['CI/CD Pipelines', 'CloudFormation', 'Monitoring & Logging']
      }
    ]
  }
];

// Simulate API calls with delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAllCourses = async (filters = {}) => {
  await delay(800);
  
  let filteredCourses = [...courses];
  
  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredCourses = filteredCourses.filter(course => 
      course.title.toLowerCase().includes(searchTerm) || 
      course.description.toLowerCase().includes(searchTerm) ||
      course.instructor.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply category filter
  if (filters.categories && filters.categories.length) {
    filteredCourses = filteredCourses.filter(course => 
      filters.categories.includes(course.category)
    );
  }
  
  // Apply level filter
  if (filters.levels && filters.levels.length) {
    filteredCourses = filteredCourses.filter(course => 
      filters.levels.includes(course.level)
    );
  }
  
  // Apply price range filter
  if (filters.priceRange) {
    filteredCourses = filteredCourses.filter(course => 
      course.price >= filters.priceRange[0] && course.price <= filters.priceRange[1]
    );
  }
  
  // Apply rating filter
  if (filters.minRating) {
    filteredCourses = filteredCourses.filter(course => 
      course.rating >= filters.minRating
    );
  }
  
  return filteredCourses;
};

export const getFeaturedCourses = async () => {
  await delay(500);
  return courses.filter(course => course.featured);
};

export const getCourseById = async (id) => {
  await delay(300);
  const course = courses.find(course => course.id === id);
  
  if (!course) {
    throw new Error('Course not found');
  }
  
  return course;
};

export const getUserCourses = async (userId) => {
  // In a real app, this would fetch from an API based on the user's purchased courses
  await delay(800);
  
  // For demo, return 3 random courses as "purchased"
  return courses
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
};

export const getCategories = async () => {
  await delay(200);
  return [...new Set(courses.map(course => course.category))];
};

export const searchCourses = async (query) => {
  await delay(400);
  
  const searchTerm = query.toLowerCase();
  return courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm) || 
    course.description.toLowerCase().includes(searchTerm)
  );
};

// For admin dashboard
export const createCourse = async (courseData) => {
  await delay(1000);
  const newCourse = {
    id: String(courses.length + 1),
    ...courseData,
    rating: 0,
    reviewCount: 0,
    featured: false,
  };
  
  courses.push(newCourse);
  return newCourse;
};

export const updateCourse = async (id, courseData) => {
  await delay(800);
  const index = courses.findIndex(course => course.id === id);
  
  if (index === -1) {
    throw new Error('Course not found');
  }
  
  courses[index] = { ...courses[index], ...courseData };
  return courses[index];
};

export const deleteCourse = async (id) => {
  await delay(600);
  const index = courses.findIndex(course => course.id === id);
  
  if (index === -1) {
    throw new Error('Course not found');
  }
  
  const deleted = courses.splice(index, 1)[0];
  return deleted;
};
