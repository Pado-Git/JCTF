import { useState } from 'react';
import { Button } from '@/components/form/button';
import { Input } from '@/components/form/input';
import { Label } from '@/components/form/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/data-display/card';
import { Checkbox } from '@/components/form/checkbox';
import { Shield, Eye, EyeOff, ArrowLeft, Check, X } from 'lucide-react';

interface RegisterPageProps {
  onRegister?: (email: string, password: string) => void;
  onBack?: () => void;
  onSwitchToLogin?: () => void;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    special: boolean;
  };
}

function getPasswordStrength(password: string): PasswordStrength {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  
  let label = '';
  let color = '';
  
  switch (score) {
    case 0:
    case 1:
      label = 'Very Weak';
      color = 'text-destructive';
      break;
    case 2:
      label = 'Weak';
      color = 'text-warning';
      break;
    case 3:
      label = 'Fair';
      color = 'text-warning';
      break;
    case 4:
      label = 'Strong';
      color = 'text-accent';
      break;
    case 5:
      label = 'Very Strong';
      color = 'text-success';
      break;
  }
  
  return { score, label, color, checks };
}

export function RegisterPage({ onRegister, onBack, onSwitchToLogin }: RegisterPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms || !acceptPrivacy) {
      alert('Please accept the terms and privacy policy');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (passwordStrength.score < 3) {
      alert('Please choose a stronger password');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (onRegister) {
      onRegister(email, password);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden py-8">
      {/* Matrix Rain Background - reusing from LoginPage */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* Back Button */}
      {onBack && (
        <Button
          variant="ghost"
          className="absolute top-6 left-6 text-muted-foreground hover:text-primary transition-colors z-20"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      )}
      
      {/* Register Card */}
      <Card className="w-full max-w-md mx-4 bg-card/80 backdrop-blur-md neon-border border-accent/50 relative z-10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-accent">JCTF</span>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Create <span className="text-primary">Account</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Join the elite community of ethical hackers
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
                placeholder="your-email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground placeholder:text-muted-foreground"
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
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground placeholder:text-muted-foreground pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground hover:text-accent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Password Strength:</span>
                    <span className={`text-sm font-semibold ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded ${
                          level <= passwordStrength.score
                            ? passwordStrength.score <= 2
                              ? 'bg-destructive'
                              : passwordStrength.score <= 3
                              ? 'bg-warning'
                              : passwordStrength.score <= 4
                              ? 'bg-accent'
                              : 'bg-success'
                            : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { key: 'length', label: '8+ characters' },
                      { key: 'uppercase', label: 'Uppercase' },
                      { key: 'lowercase', label: 'Lowercase' },
                      { key: 'numbers', label: 'Numbers' },
                      { key: 'special', label: 'Special chars' }
                    ].map(({ key, label }) => (
                      <div
                        key={key}
                        className={`flex items-center space-x-1 ${
                          passwordStrength.checks[key as keyof typeof passwordStrength.checks]
                            ? 'text-accent'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {passwordStrength.checks[key as keyof typeof passwordStrength.checks] ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`bg-input-background border-border focus:border-accent focus:ring-accent text-foreground placeholder:text-muted-foreground pr-10 ${
                    confirmPassword && !passwordsMatch ? 'border-destructive' : ''
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground hover:text-accent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-sm text-destructive">Passwords do not match</p>
              )}
              {confirmPassword && passwordsMatch && (
                <p className="text-sm text-accent flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  Passwords match
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  I agree to the{' '}
                  <Button variant="link" className="text-accent hover:text-accent/80 p-0 h-auto">
                    Terms of Service
                  </Button>
                </Label>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy"
                  checked={acceptPrivacy}
                  onCheckedChange={(checked) => setAcceptPrivacy(checked as boolean)}
                  className="border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent mt-1"
                />
                <Label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed">
                  I accept the{' '}
                  <Button variant="link" className="text-accent hover:text-accent/80 p-0 h-auto">
                    Privacy Policy
                  </Button>
                </Label>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/80 text-accent-foreground"
              disabled={isLoading || !acceptTerms || !acceptPrivacy || !passwordsMatch || passwordStrength.score < 3}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-foreground mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button
                type="button"
                variant="link"
                className="text-primary hover:text-primary/80 p-0 h-auto"
                onClick={onSwitchToLogin}
              >
                Login
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Terminal-style Footer */}
      <div className="absolute bottom-4 left-4 text-xs font-mono text-accent/60">
        <div>&gt; Registration system online</div>
        <div>&gt; Security level: MAXIMUM</div>
        <div>&gt; Encryption: <span className="text-primary animate-pulse">ACTIVE</span></div>
      </div>
    </div>
  );
}