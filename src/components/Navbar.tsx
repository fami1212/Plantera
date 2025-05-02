
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  Sprout, 
  Package, 
  Wallet, 
  BarChart2, 
  Menu, 
  X,
  Sun,
  Moon,
  ChevronRight,
  Settings,
  Users,
  FileText,
  UserCircle,
  Bell
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useAppSettings } from '@/contexts/AppSettingsContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<number>(3);
  const location = useLocation();
  const { settings, toggleDarkMode } = useAppSettings();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const toggleSidebar = () => setIsOpen(!isOpen);

  const navItems = [
    { title: 'Tableau de bord', path: '/', icon: Home },
    { title: 'Parcelles', path: '/parcelles', icon: MapPin },
    { title: 'Cultures', path: '/cultures', icon: Sprout },
    { title: 'Inventaire', path: '/inventaire', icon: Package },
    { title: 'Finances', path: '/finances', icon: Wallet },
    { title: 'Statistiques', path: '/statistiques', icon: BarChart2 },
    { title: 'Rapports', path: '/rapports', icon: FileText },
    { title: 'Paramètres', path: '/parametres', icon: UserCircle },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Navigation Toggle with improved animation */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button 
          onClick={toggleSidebar} 
          className="p-2 bg-sidebar rounded-full shadow-md hover:bg-sidebar/90 transition-all active:scale-95"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation with improved animation and transitions */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } md:relative md:translate-x-0 flex flex-col h-full overflow-y-auto`}
      >
        <div className="p-5 border-b border-sidebar-border flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-sidebar-primary to-agri-primary-light flex items-center justify-center text-white font-bold">
              <Sprout className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-sidebar-foreground bg-gradient-to-r from-sidebar-primary to-agri-primary-dark bg-clip-text text-transparent">Agri Dom</span>
          </Link>
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-sidebar-accent transition-colors"
              aria-label="Toggle theme"
            >
              {settings.darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-sidebar-accent transition-colors">
                <Bell size={18} />
                {notifications > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {notifications}
                  </Badge>
                )}
              </button>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link flex items-center space-x-3 py-3 px-4 rounded-xl transition-colors ${
                isActive(item.path) 
                  ? 'bg-sidebar-primary/10 text-sidebar-primary font-medium' 
                  : 'hover:bg-sidebar-accent text-sidebar-foreground'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className={`h-5 w-5 ${isActive(item.path) ? 'text-sidebar-primary' : ''}`} />
              <span className="font-medium">{item.title}</span>
              
              {isActive(item.path) && (
                <div className="ml-auto flex items-center">
                  <span className="h-2 w-2 rounded-full bg-sidebar-primary animate-pulse-slow"></span>
                  <ChevronRight className="h-4 w-4 text-sidebar-primary ml-1" />
                </div>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border mt-auto">
          <div className="flex items-center space-x-3 px-3 py-3 bg-sidebar-accent/50 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback className="bg-sidebar-primary text-white">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Jean Dupont</p>
              <p className="text-xs text-muted-foreground truncate">agriculteur@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile with improved transition */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
