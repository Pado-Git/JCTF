import { MaxWidthContainer, Button } from '@/+shared/components';
import { useAuthStore } from '@/+shared/stores/authStore';
import { Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {Galaxy} from '@/home/components';

export function HeroSection() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-neutral-900">
    <div className="absolute inset-0">
      <Galaxy
        mouseInteraction={false}
        mouseRepulsion={true}
        density={0.5}
        glowIntensity={0.1}
        saturation={0.2}
        hueShift={250}
        twinkleIntensity={0.2}
        rotationSpeed={0.05}
        repulsionStrength={1.5}
        autoCenterRepulsion={0}
        starSpeed={0.3}
        speed={0.6}
        transparent={false}
      />
    </div>
    <MaxWidthContainer className="relative z-20 text-center">
      <div className="mb-8">
        <h2 className="text-[80px] font-bold mb-4" style={{
          background: 'linear-gradient(180deg, #6366F1 2%, #1E1B4B 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0px 0px 24px rgba(30, 27, 75, 1)',
          lineHeight: '1.3em'
        }}>
          Capture The Flag!
        </h2>
        <p className="text-[24px] font-bold text-primary-50 mb-8 max-w-2xl mx-auto" style={{
          lineHeight: '1.5em'
        }}>
          Test Your Hacking Skills<br />in the Ultimate Cybersecurity Challenge
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
        <Button 
          size="large" 
          onClick={() => navigate(isAuthenticated ? '/competitions' : '/login')}
          className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 text-[17px] font-bold h-12"
          style={{
            boxShadow: '0px 0px 16px rgba(99, 102, 241, 1)',
            lineHeight: '1.3em'
          }}
        >
          <Trophy className="mr-2 h-6 w-6" fill="currentColor" />
          {user ? 'My Competitions' : 'Join Competition'}
        </Button>
      </div>
    </MaxWidthContainer>
    </section>
  )
}

export default HeroSection;