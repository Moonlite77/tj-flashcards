'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Home, BookOpen, Award, ShoppingBag, ClipboardList, Heart } from 'lucide-react'

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  isExpanded: boolean;
  subItems?: { href: string; text: string }[];
}

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav 
      className={`bg-red-600 text-white h-screen ${
        isExpanded ? 'w-64' : 'w-16'
      } transition-all duration-300 ease-in-out flex flex-col`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Button
        className="p-2 m-2 bg-transparent hover:bg-red-700"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <X size={24} /> : <Menu size={24} />}
      </Button>
      <div className="flex flex-col space-y-4 mt-8">
        <NavItem href="/" icon={<Home size={24} />} text="Home" isExpanded={isExpanded} />
        <NavItem href="/flashcards" icon={<BookOpen size={24} />} text="Fruit and Veggie Flashcards" isExpanded={isExpanded} />
        <NavItem href="/fruit-veggie-quiz" icon={<ClipboardList size={24} />} text="Fruit and Veggie Quiz" isExpanded={isExpanded} />
        <NavItem href="/operations-quiz" icon={<ClipboardList size={24} />} text="Advanced Operations Quiz" isExpanded={isExpanded} />
        <NavItem href="/leaderboards" icon={<Award size={24} />} text="Leaderboards" isExpanded={isExpanded} />
        <NavItem href="/gear" icon={<ShoppingBag size={24} />} text="Gear" isExpanded={isExpanded} />
        <NavItem href="/donations" icon={<Heart size={24} />} text="Donations" isExpanded={isExpanded} />
      </div>
    </nav>
  )
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, text, isExpanded, subItems }) => (
  <div>
    <Link href={href} className="flex items-center p-2 hover:bg-red-700 transition-colors duration-200">
      {icon}
      {isExpanded && <span className="ml-2">{text}</span>}
    </Link>
    {isExpanded && subItems && (
      <div className="ml-4">
        {subItems.map((item, index) => (
          <Link key={index} href={item.href} className="block p-2 hover:bg-red-700 transition-colors duration-200">
            {item.text}
          </Link>
        ))}
      </div>
    )}
  </div>
)

export default Navbar

