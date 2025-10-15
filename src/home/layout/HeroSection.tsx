import { MaxWidthContainer, Button } from '@/+shared/components';
import { useAuthStore } from '@/+shared/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import {Galaxy} from '@/home/components';
import { IcoTrophyFilled } from '@/+shared/assets';
import { LINKS } from '@/+shared/constants';

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
          size="medium" 
          onClick={() => navigate(isAuthenticated ? LINKS.dashboard : LINKS.login)}
          variant='primary'
          style={{
            boxShadow: '0px 0px 16px rgba(99, 102, 241, 1)',
          }}
        >
          <IcoTrophyFilled />
          {user ? 'My Competitions' : 'Join Competition'}
        </Button>
      </div>
    </MaxWidthContainer>
    </section>
  )
}

export default HeroSection;