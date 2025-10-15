import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Checkbox, Input, Label, MatrixRain } from '@/+shared/components';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useLogin } from './index.hooks'; 

export function LoginPage() {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    error,
    isLoading,
    handleSubmit,
  } = useLogin();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      <MatrixRain />
      {/* Login Form */}
      <Card className="w-full max-w-md py-8 relative z-10 bg-card/80 backdrop-blur-sm border-primary/30">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center gap-8">
            <div className="flex justify-center">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <CardTitle className="text-2xl font-bold text-primary-50">
                {/* Welcome Back */}
                Welcome!
              </CardTitle>
              <CardDescription className="text-primary-200">
                {/* Sign in to your JCTF account */}
                Sign in to your ACDC account
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col gap-6">
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
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
              
              <div className="flex flex-col gap-2">
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
              
              {/* <div className="flex items-center justify-between">
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
              </div> */}
              
              <Button
                type="submit"
                variant="primary"
                size="medium"
                disabled={isLoading}
                className="mt-8"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            
            {/* <div className="text-center">
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
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}