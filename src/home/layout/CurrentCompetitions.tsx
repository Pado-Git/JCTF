import { Button, MaxWidthContainer } from '@/+shared/components';
import { IcoArrowRightSLined } from '@/+shared/assets/icons';
import { useNavigate } from "react-router-dom";
import { SquareBg } from '@/home/assets/images';
import { mockCompetitions } from '@/dashboard/data/mockData';
import { CompetitionCard } from '@/home/components';

export function CurrentCompetitions() {

  const navigate = useNavigate();

  return(
    <section className="py-20 relative">
      <div className="absolute inset-0 z-0">
        <img 
          src={SquareBg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
    <div className="relative z-10">
      <MaxWidthContainer>
        <div className="mb-12">
          <h2 className="typo-heading-large text-primary-200 mb-4">
            Current Competitions
          </h2>
          <p className="typo-body-medium text-primary-50">
            Join ongoing competitions and test your skills
          </p>
        </div>
      </MaxWidthContainer>

      {/* Carousel - Left aligned with MaxWidthContainer, right overflow */}
      {/* <div className="relative overflow-x-hidden">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1260px] h-[35rem] relative">
            <div className="absolute w-full left-6 top-0">
              <EmblaCarousel
                options={{
                  align: "start",
                  dragFree: true,
                  containScroll: "trimSnaps",
                }}
              >
                {mockCompetitions.map((comp) => (
                  <CompetitionCard key={comp.id} competition={comp} />
                ))}
              </EmblaCarousel>
            </div>
          </div>
        </div>
      </div> */}

      <MaxWidthContainer>
        <div className='flex gap-4'>
          {mockCompetitions.slice(0,3).map((comp) => (
            <CompetitionCard key={comp.id} competition={comp} />
          ))}
        </div>
      </MaxWidthContainer>
    </div>

    <MaxWidthContainer className="relative z-10 mt-14">
      <Button 
        variant="secondary" 
        className="w-fit h-12 px-6 text-primary"
        onClick={() => navigate('/competitions')}
      >
        View All Competitions
        <IcoArrowRightSLined />
      </Button>
    </MaxWidthContainer>
  </section>
  )
}

export default CurrentCompetitions;