import { Button, TitleWIcon } from '@/+shared/components';
import { FormField } from '@/+shared/components/form/FormField';
import { IcoSettingLined } from '@/+shared/assets';

interface EditProfileProps {
  profile: {
    firstName: string;
    lastName: string;
    nickname: string;
    email: string;
    country: string;
    university?: string;
    bio: string;
  };
  onProfileChange: (field: string, value: string) => void;
  onSave?: () => void;
}

export function EditProfile({ profile, onProfileChange, onSave }: EditProfileProps) {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <TitleWIcon 
        title="Edit Profile"
        icon={<IcoSettingLined />}
        description="Update your personal details and contact information"
      />

      {/* Form Card */}
      <div className='flex gap-6 flex-col bg-neutral-800 border border-neutral-700 rounded-radius-lg p-6'>
          {/* First Name & Last Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormField
              label="First Name"
              id="firstName"
              value={profile.firstName}
              onChange={(value) => onProfileChange('firstName', value)}
              placeholder="Enter first name"
            />
            <FormField
              label="Last Name"
              id="lastName"
              value={profile.lastName}
              onChange={(value) => onProfileChange('lastName', value)}
              placeholder="Enter last name"
            />
          </div>

          {/* Nickname & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormField
              label="Nickname"
              id="nickname"
              value={profile.nickname}
              onChange={(value) => onProfileChange('nickname', value)}
              placeholder="Enter nickname"
            />
            <FormField
              label="Email"
              id="email"
              type="email"
              value={profile.email}
              onChange={() => {}}
              disabled
              placeholder="Email address"
              helperText="Email cannot be changed"
            />
          </div>

          {/* Country & University Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormField
              label="Country"
              id="country"
              value={profile.country}
              onChange={(value) => onProfileChange('country', value)}
              placeholder="Enter country"
            />
            <FormField
              label="University"
              id="university"
              value={profile.university || ''}
              onChange={(value) => onProfileChange('university', value)}
              placeholder="Enter university (optional)"
            />
          </div>

          {/* Bio */}
          <FormField
            label="Bio"
            id="bio"
            value={profile.bio}
            onChange={(value) => onProfileChange('bio', value)}
            placeholder="Tell us about yourself..."
            variant="textarea"
            helperText="Share a brief description about yourself"
          />  
          <Button
            onClick={onSave}
            variant="secondary"
            size="small"
            className='self-end'
          >
            Update
          </Button>
      </div>
    </div>
  );
}

export default EditProfile;