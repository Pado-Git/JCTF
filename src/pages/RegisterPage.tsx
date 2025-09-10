import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/+shared/components/form/button';
import { useAuthStore } from '@/+shared/stores/authStore';
import { Input } from '@/+shared/components/form/input';
import { Label } from '@/+shared/components/form/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/+shared/components/data-display/card';
import { Checkbox } from '@/+shared/components/form/checkbox';
import { Shield, Eye, EyeOff, ArrowLeft, Check, X } from 'lucide-react';

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
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;
  
  let label = 'Very Weak';
  let color = 'text-red-500';
  
  if (score >= 4) {
    label = 'Strong';
    color = 'text-green-500';
  } else if (score >= 3) {
    label = 'Good';
    color = 'text-yellow-500';
  } else if (score >= 2) {
    label = 'Fair';
    color = 'text-orange-500';
  }

  return { score, label, color, checks };
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    agreeToTerms: false,
    subscribeNewsletter: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  
  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== '';

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.agreeToTerms) {
      setError('이용약관에 동의해주세요.');
      return;
    }
    
    if (!passwordsMatch) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    try {
      await register({
        email: formData.email,
        password: formData.password,
        nickname: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      navigate('/dashboard');
    } catch (err) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden py-8">
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>

      {/* Back Button */}
      <Button
        variant="text"
        className="absolute top-6 left-6 text-muted-foreground hover:text-primary transition-colors z-10"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      {/* Registration Form */}
      <Card className="w-full max-w-2xl mx-4 relative z-10 bg-card/80 backdrop-blur-sm border-primary/30">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary-50">
            Join JCTF
          </CardTitle>
          <CardDescription className="text-primary-200">
            Create your account and start your cybersecurity journey
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-primary-100">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  className="bg-input-background border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-primary-100">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  className="bg-input-background border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-100">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="bg-input-background border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-primary-100">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                required
                className="bg-input-background border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary-100">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary-200">Password Strength:</span>
                    <span className={passwordStrength.color}>{passwordStrength.label}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 rounded ${
                          level <= passwordStrength.score
                            ? passwordStrength.score >= 4
                              ? 'bg-green-500'
                              : passwordStrength.score >= 3
                              ? 'bg-yellow-500'
                              : 'bg-orange-500'
                            : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="space-y-1 text-xs text-primary-300">
                    {Object.entries(passwordStrength.checks).map(([key, passed]) => (
                      <div key={key} className="flex items-center gap-2">
                        {passed ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <X className="h-3 w-3 text-red-500" />
                        )}
                        <span className={passed ? 'text-green-500' : 'text-red-500'}>
                          {key === 'length' && 'At least 8 characters'}
                          {key === 'uppercase' && 'One uppercase letter'}
                          {key === 'lowercase' && 'One lowercase letter'}
                          {key === 'numbers' && 'One number'}
                          {key === 'special' && 'One special character'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-primary-100">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  className={`bg-input-background border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground pr-10 ${
                    formData.confirmPassword && !passwordsMatch ? 'border-red-500' : ''
                  }`}
                />
                <Button
                  type="button"
                  variant="text"
                  size="small"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground hover:text-primary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
              {formData.confirmPassword && passwordsMatch && (
                <p className="text-sm text-green-500">Passwords match</p>
              )}
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                  required
                />
                <Label htmlFor="terms" className="text-sm text-primary-200 leading-relaxed">
                  I agree to the{' '}
                  <Button
                    type="button"
                    variant="text"
                    className="text-primary hover:text-primary-600 p-0 h-auto text-sm underline"
                  >
                    Terms of Service
                  </Button>{' '}
                  and{' '}
                  <Button
                    type="button"
                    variant="text"
                    className="text-primary hover:text-primary-600 p-0 h-auto text-sm underline"
                  >
                    Privacy Policy
                  </Button>
                </Label>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.subscribeNewsletter}
                  onCheckedChange={(checked) => handleInputChange('subscribeNewsletter', checked as boolean)}
                />
                <Label htmlFor="newsletter" className="text-sm text-primary-200 leading-relaxed">
                  Subscribe to our newsletter for updates and new challenges
                </Label>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-600 text-primary-50"
              disabled={isLoading || !formData.agreeToTerms || !passwordsMatch}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-primary-200">
              Already have an account?{' '}
              <Button
                type="button"
                variant="text"
                className="text-primary hover:text-primary-600 p-0 h-auto"
                onClick={() => navigate('/login')}
              >
                Sign in here
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}