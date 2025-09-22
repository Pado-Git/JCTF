import { IcoSettingLined, IcoLockLined, IcoEyeLined } from '@/+shared/assets';
import { TitleWIcon } from '@/+shared/components';
import { SettingBox } from '@/profile/components';
import { Bell } from 'lucide-react';

interface AccountSettingsProps {
  onNavigate?: (path: string) => void;
}

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  path: string;
}

export function AccountSettings({ onNavigate }: AccountSettingsProps) {
  const settingsData: SettingItem[] = [
    {
      id: 'change-password',
      title: 'Change Password',
      description: 'Update your login credentials',
      icon: <IcoLockLined className="w-8 h-8 text-primary-200" />,
      buttonText: 'Change',
      path: '/change-password'
    },
    {
      id: 'email-notifications',
      title: 'Email Notifications',
      description: 'Competition updates and announcements',
      icon: <Bell className="w-8 h-8 text-primary-200" />,
      buttonText: 'Configure',
      path: '/notifications'
    },
    {
      id: 'profile-visibility',
      title: 'Profile Visibility',
      description: 'Control who can see your profile',
      icon: <IcoEyeLined className="w-8 h-8 text-primary-200" />,
      buttonText: 'Public',
      path: '/privacy'
    }
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <TitleWIcon
        title="Account Settings"
        icon={<IcoSettingLined />}
        description="Manage your account preferences and security"
      />

      {/* Settings Cards */}
      <div className="grid grid-cols-1 gap-6">
        {settingsData.map((setting) => (
          <SettingBox
            key={setting.id}
            title={setting.title}
            description={setting.description}
            icon={setting.icon}
            onClick={() => onNavigate?.(setting.path)}
            buttonText={setting.buttonText}
          />
        ))}
      </div>
    </div>
  );
}

export default AccountSettings;
