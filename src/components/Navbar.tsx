import { useState } from 'react';
import { Menu, X, Gift, Home, CreditCard, Banknote, CheckSquare, Users, LogOut, User, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUser } from '@/contexts/UserContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const navigationItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: Gift },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare, locked: !user?.hasDeposited },
    { name: 'Refer Friends', href: '/refer', icon: Users },
    { name: 'Deposit', href: '/deposit', icon: CreditCard },
    { name: 'Withdraw', href: '/withdraw', icon: Banknote },
  ];

  const isActivePage = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-50 shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-primary p-2 rounded-xl shadow-glow">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EasyEarn
              </h1>
              <p className="text-xs text-muted-foreground">Lucky Draw</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePage(item.href);
              const isLocked = item.locked;
              
              return (
                <Link
                  key={item.name}
                  to={isLocked ? '/deposit' : item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 shadow-soft'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  } ${isLocked ? 'opacity-60' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {isLocked && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      Locked
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-4">
            {/* Balance (Desktop) */}
            {user && (
              <div className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-success/5 to-primary/5 px-4 py-2 rounded-xl border border-success/20">
                <Wallet className="h-4 w-4 text-success" />
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Balance</div>
                  <div className="text-sm font-bold text-success">${user.balance.toFixed(2)}</div>
                </div>
              </div>
            )}

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                      <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/deposit" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Funds
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild className="text-sm">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="btn-primary text-sm">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-primary/10 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Balance (Mobile) */}
              {user && (
                <div className="flex items-center justify-between bg-gradient-to-r from-success/5 to-primary/5 px-4 py-3 rounded-xl border border-success/20 mb-4">
                  <div className="flex items-center space-x-2">
                    <Wallet className="h-4 w-4 text-success" />
                    <span className="text-sm font-medium">Balance</span>
                  </div>
                  <span className="text-lg font-bold text-success">${user.balance.toFixed(2)}</span>
                </div>
              )}

              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePage(item.href);
                const isLocked = item.locked;
                
                return (
                  <Link
                    key={item.name}
                    to={isLocked ? '/deposit' : item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    } ${isLocked ? 'opacity-60' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {isLocked && (
                      <Badge variant="secondary" className="text-xs px-1 py-0 ml-auto">
                        Locked
                      </Badge>
                    )}
                  </Link>
                );
              })}

              {/* Mobile Auth Actions */}
              {!user && (
                <div className="pt-4 space-y-2">
                  <Button variant="ghost" asChild className="w-full justify-start">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="w-full btn-primary">
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;