import { useState, useEffect } from 'react';
import { Button } from '@/components/form/button';
import { Input } from '@/components/form/input';
import { Label } from '@/components/form/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/data-display/card';
import { Checkbox } from '@/components/form/checkbox';
import { Shield, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface MatrixRainProps {
  className?: string;
}

function MatrixRain({ className = '' }: MatrixRainProps) {
  const [chars, setChars] = useState<string[]>([]);
  
  useEffect(() => {
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = [];
    
    for (let i = 0; i < 100; i++) {
      charArray.push(characters[Math.floor(Math.random() * characters.length)]);
    }
    
    setChars(charArray);
    
    const interval = setInterval(() => {
      setChars(prev => 
        prev.map(() => characters[Math.floor(Math.random() * characters.length)])
      );
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="flex justify-between h-full">
        {chars.map((char, i) => (
          <div
            key={i}
            className="text-primary/20 text-sm font-mono animate-pulse"
            style={{
              animationDelay: `${Math.random() * 2}s`,
              transform: `translateY(${Math.random() * 100}vh)`
            }}
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  );
}

interface LoginPageProps {
  onLogin?: (email: string, password: string) => void;
  onBack?: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginPage({ onLogin, onBack, onSwitchToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (onLogin) {
      onLogin(email, password);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>

      {/* Back Button */}
      {onBack && (
        <Button
          variant="link"
          className="absolute top-6 left-6 text-muted-foreground hover:text-primary transition-colors"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      )}
      
      {/* Login Card */}
      <Card className="w-full max-w-md mx-4 bg-card/80 backdrop-blur-md neon-border border-primary/50 relative z-10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">JCTF</span>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Access <span className="text-primary-300">Terminal</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to join the competition
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="hacker@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input-background border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-input-background border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="remember" className="text-sm text-muted-foreground">
                Remember me
              </Label>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                  Authenticating...
                </div>
              ) : (
                'Login'
              )}
            </Button>
            
            <div className="text-center">
              <Button
                type="button"
                variant="link"
                className="text-primary-600 hover:text-primary-300/80"
              >
                Forgot Password?
              </Button>
            </div>
          </form>
          
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button
                type="button"
                variant="link"
                className="text-primary-600 hover:text-primary-300/80 p-0 h-auto"
                onClick={onSwitchToRegister}
              >
                Register
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Terminal-style Footer */}
      <div className="absolute bottom-4 left-4 text-xs font-mono text-primary/60">
        <div>&gt; Secure connection established</div>
        <div>&gt; Encryption: AES-256</div>
        <div>&gt; Status: <span className="text-accent animate-pulse">READY</span></div>
      </div>
      
      <div className="absolute bottom-4 right-4 text-xs font-mono text-primary/60">
        <div>System: JCTF v2.0.1</div>
        <div>Uptime: 99.8%</div>
        <div>Users: <span className="text-accent">15,670</span> online</div>
      </div>
    </div>
  );
}