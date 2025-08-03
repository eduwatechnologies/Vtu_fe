import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export  function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Almaleek TopUp</h3>
            <p className="text-gray-400 mb-4">
              Your reliable partner for all virtual top-up services. Fast, secure, and affordable.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-white">+234 800 123 4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-white">support@almaleek.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-white">Kwara, Nigeria</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-300 hover:text-purple-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter to receive updates and special offers.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 text-white rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button className="bg-green-600 hover:bg-purple-700 rounded-r-lg px-4 py-2 transition-colors">
                Subscribe
              </button>
            </div>
            
            {/* Social Media */}
            <div className="mt-6">
              <p className="text-gray-300 mb-2">Follow us:</p>
              <div className="flex space-x-4">
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Almaleek. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <img 
                src="https://images.pexels.com/photos/6863185/pexels-photo-6863185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Payment Methods" 
                className="h-8 rounded opacity-70"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}