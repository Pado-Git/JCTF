import { IcoSettingLined, IcoKeyLined } from '@/+shared/assets';
import { TitleWIcon } from '@/+shared/components';
import { SettingBox } from '@/profile/components';
import ChangePasswordModal from '@/profile/components/ChangePasswordModal';
import { useState, useCallback } from 'react';

interface AccountSettingsProps {}

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  onClick: () => void;
}

export function AccountSettings({}: AccountSettingsProps) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  
  // Debug log
  console.log('AccountSettings rendered:', { showChangePassword });

  // Handler functions with useCallback
  const handleChangePassword = useCallback(() => {
    console.log('Change Password button clicked');
    setShowChangePassword(true);
  }, []);

  const settingsData: SettingItem[] = [
    {
      id: 'change-password',
      title: 'Change Password',
      description: 'Update your login credentials',
      icon: <IcoKeyLined className="w-8 h-8 text-primary-200" />,
      buttonText: 'Change',
      onClick: handleChangePassword
    }
  ];

  return (
    <>
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
              onClick={setting.onClick}
              buttonText={setting.buttonText}
            />
          ))}
        </div>
      </div>
      {showChangePassword && <ChangePasswordModal show={showChangePassword} onClose={() => setShowChangePassword(false)} />}
    </>
  );
}

export default AccountSettings;
