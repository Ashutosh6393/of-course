
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pt-12 pb-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-brand-blue text-white font-bold rounded p-2">
                <span className="text-xl">Edu</span>
                <span className="text-xl text-brand-amber">Hub</span>
              </div>
            </Link>
            <p className="text-gray-600">
              Empowering learners worldwide with high-quality courses from expert instructors.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-brand-blue">About Us</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-brand-blue">Careers</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-brand-blue">Blog</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-brand-blue">Partners</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-600 hover:text-brand-blue">Help Center</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-brand-blue">Tutorials</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-brand-blue">Privacy</Link></li>
              <li><Link to="/" className="text-gray-600 hover:text-brand-blue">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4">Subscribe to our newsletter</h4>
            <form className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="border border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
                <button
                  type="submit"
                  className="bg-brand-blue hover:bg-blue-700 text-white px-4 py-2 rounded-r"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {currentYear} EduHub. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-brand-blue">Privacy Policy</a>
              <a href="#" className="hover:text-brand-blue">Terms of Service</a>
              <a href="#" className="hover:text-brand-blue">Cookie Settings</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
