import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/+shared/components/form/button';
import { useAuthStore } from '@/+shared/stores/useAuthStore';
import { Input } from '@/+shared/components/form/input';
import { Label } from '@/+shared/components/form/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/+shared/components/data-display/card';
import { Checkbox } from '@/+shared/components/form/checkbox';
import { Shield, Eye, EyeOff } from 'lucide-react';

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

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <MatrixRain />
      {/* Login Form */}
      <Card className="w-full max-w-md mx-4 relative z-10 bg-card/80 backdrop-blur-sm border-primary/30">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary-50">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-primary-200">
            Sign in to your JCTF account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-100">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input-background border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary-100">
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
                  variant="text"
                  size="small"
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
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-primary-200">
                  Remember me
                </Label>
              </div>
              <Button
                type="button"
                variant="text"
                className="text-sm text-primary hover:text-primary-600"
              >
                Forgot password?
              </Button>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-600 text-primary-50"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-primary-200">
              Don't have an account?{' '}
              <Button
                type="button"
                variant="text"
                className="text-primary hover:text-primary-600 p-0 h-auto"
                onClick={() => navigate('/register')}
              >
                Sign up here
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}