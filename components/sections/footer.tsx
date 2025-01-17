import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#features" className="hover:underline">
                Features
              </Link>
            </li>
            <li>
              <Link href="#benefits" className="hover:underline">
                Benefits
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="hover:underline">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#faq" className="hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#careers" className="hover:underline">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#press" className="hover:underline">
                Press
              </Link>
            </li>
            <li>
              <Link href="#blog" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#help" className="hover:underline">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#feedback" className="hover:underline">
                Feedback
              </Link>
            </li>
            <li>
              <Link href="#status" className="hover:underline">
                System Status
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Connect</h3>
          <div className="flex space-x-4 mb-4">
            <Link href="#" className="hover:text-primary">
              <Facebook size={24} />
            </Link>
            <Link href="#" className="hover:text-primary">
              <Twitter size={24} />
            </Link>
            <Link href="#" className="hover:text-primary">
              <Instagram size={24} />
            </Link>
            <Link href="#" className="hover:text-primary">
              <Linkedin size={24} />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 CWS. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
