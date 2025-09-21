import { IcoChatQuoteFilled } from '@/+shared/assets';
import { MaxWidthContainer } from '@/+shared/components';
import { dashboardMocks } from '@/dashboard/data/mockData';

export function ProfileHeader({ title, coloredTitle, description }: { title: string, coloredTitle: string, description: string }) {
  
  return (
    <MaxWidthContainer className="relative z-10 pt-20 pb-14">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 gradient-3"></div>
      
      {/* Profile Section */}
      <div className="relative z-10 flex flex-col gap-12">
        {/* Profile Info */}
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-900 border border-indigo-500 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-indigo-50">CY</span>
          </div>
          
          {/* Profile Details */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-1">
              <h1 className="typo-heading-large text-primary-50">
                {title}
              </h1>
              <p className="text-neutral-300 typo-body-medium">
                {coloredTitle}
              </p>
            </div>
            
            {/* Divider */}
            <div className="w-full h-px bg-neutral-500"></div>
            
            {/* Bio */}
            <div className="flex items-center gap-2 text-primary-200">
              <IcoChatQuoteFilled className='w-4 h-4' />
              <p className="typo-body-small">
                {description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardMocks.map((stat) => (
            <div key={stat.id} className="bg-neutral-900 rounded-radius-lg px-4 py-6 flex flex-col items-center justify-center">
              <div className="typo-heading-large text-primary mb-2">
                {stat.value}
              </div>
              <div className="typo-heading-xxsmall text-primary-200 text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MaxWidthContainer>
  );
}

export default ProfileHeader;