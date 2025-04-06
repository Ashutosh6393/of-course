
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft,
  Lock,
} from 'lucide-react';
import { getCourseById } from '@/services/courseService';

const formSchema = z.object({
  cardName: z.string().min(2, { message: 'Cardholder name is required' }),
  cardNumber: z
    .string()
    .min(16, { message: 'Card number must be 16 digits' })
    .max(19, { message: 'Card number is too long' })
    .refine((val) => /^[\d\s-]+$/.test(val), { message: 'Invalid card number' }),
  expiryDate: z
    .string()
    .min(5, { message: 'Expiry date is required' })
    .refine((val) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), { message: 'Invalid format. Use MM/YY' }),
  cvv: z
    .string()
    .min(3, { message: 'CVV must be 3 digits' })
    .max(4, { message: 'CVV must be 3-4 digits' })
    .refine((val) => /^\d+$/.test(val), { message: 'CVV must contain only numbers' }),
  paymentMethod: z.enum(['credit', 'paypal']),
});

const PaymentPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      paymentMethod: 'credit',
    },
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(courseId);
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course:', error);
        toast({
          variant: 'destructive',
          title: 'Course not found',
          description: 'The course you are trying to purchase could not be found.',
        });
        navigate('/courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate]);

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const v = value.replace(/\D/g, '');
    // Add a space after every 4 digits
    const formatted = v.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted;
  };

  const formatExpiryDate = (value) => {
    // Remove all non-digit characters
    const v = value.replace(/\D/g, '');
    // Format as MM/YY
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    form.setValue('cardNumber', formattedValue);
  };

  const handleExpiryDateChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    form.setValue('expiryDate', formattedValue);
  };

  const onSubmit = async (data) => {
    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      try {
        // In a real app, you would call your payment processing API here
        toast({
          title: 'Payment Successful!',
          description: `You have successfully purchased ${course.title}`,
        });
        
        // Redirect to my courses page
        navigate('/my-courses');
      } catch (error) {
        console.error('Payment error:', error);
        toast({
          variant: 'destructive',
          title: 'Payment Failed',
          description: 'There was an error processing your payment. Please try again.',
        });
      } finally {
        setIsProcessing(false);
      }
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(`/courses/${courseId}`)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to course
      </Button>
      
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Payment Form */}
        <div className="flex-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:border-brand-blue">
                              <RadioGroupItem value="credit" id="credit" />
                              <label htmlFor="credit" className="flex items-center cursor-pointer">
                                <CreditCard className="h-4 w-4 mr-2" />
                                Credit / Debit Card
                              </label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-md p-3 opacity-50 cursor-not-allowed">
                              <RadioGroupItem value="paypal" id="paypal" disabled />
                              <label htmlFor="paypal" className="flex items-center">
                                <span className="font-bold text-blue-600 mr-1">Pay</span>
                                <span className="font-bold text-blue-800">Pal</span>
                                <span className="ml-2 text-xs">(Coming Soon)</span>
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch('paymentMethod') === 'credit' && (
                    <>
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cardholder Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="1234 5678 9012 3456" 
                                maxLength={19}
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleCardNumberChange(e);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="MM/YY" 
                                  maxLength={5}
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleExpiryDateChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="123" 
                                  maxLength={4}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-center text-sm text-gray-500 mt-6">
                    <Lock className="h-4 w-4 mr-2" />
                    <span>All payments are secure and encrypted</span>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin mr-2">⊚</span>
                        Processing...
                      </>
                    ) : (
                      `Pay $${course.price.toFixed(2)}`
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div className="w-full md:w-96">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="flex items-start mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded shrink-0 mr-4">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-500">By {course.instructor}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Original Price</span>
                  <span>${course.originalPrice ? course.originalPrice.toFixed(2) : course.price.toFixed(2)}</span>
                </div>
                
                {course.originalPrice && (
                  <div className="flex justify-between text-brand-green">
                    <span>Discount</span>
                    <span>-${(course.originalPrice - course.price).toFixed(2)}</span>
                  </div>
                )}
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${course.price.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-6 pt-0">
              <div className="w-full">
                <div className="flex items-start text-sm text-gray-600 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-brand-green mr-2 shrink-0 mt-0.5" />
                  <span>
                    30-day money-back guarantee
                  </span>
                </div>
                
                <div className="flex items-start text-sm text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-brand-green mr-2 shrink-0 mt-0.5" />
                  <span>
                    Full lifetime access to course content
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
