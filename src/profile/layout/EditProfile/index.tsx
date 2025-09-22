import { Button, TitleWIcon } from '@/+shared/components';
import { Input, Textarea, Label } from '@/+shared/components';
import { IcoSettingLined } from '@/+shared/assets';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect } from 'react';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  country: string;
  university?: string;
  bio: string;
}

interface EditProfileProps {
  profile: ProfileFormData;
  onSave?: (data: ProfileFormData) => void;
}

// Mock data for nickname validation (API가 없으므로 시뮬레이션)
const existingNicknames = ['john_doe', 'jane_smith', 'hacker123', 'coder_pro', 'tech_guru', 'dev_master'];

// 비동기 닉네임 중복 검사 함수
const checkNicknameAvailability = async (nickname: string, currentNickname: string): Promise<boolean> => {
  // 현재 닉네임과 같으면 통과
  if (nickname === currentNickname) {
    return true;
  }
  
  // API 호출 시뮬레이션 (실제로는 API 호출)
  return new Promise((resolve) => {
    setTimeout(() => {
      const isAvailable = !existingNicknames.includes(nickname.toLowerCase());
      resolve(isAvailable);
    }, 500); // 500ms 딜레이로 API 호출 시뮬레이션
  });
};

// Yup validation schema with async nickname validation
const createProfileSchema = (currentNickname: string) => yup.object({
  firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  nickname: yup.string()
    .required('Nickname is required')
    .min(2, 'Nickname must be at least 2 characters')
    .test('nickname-availability', 'This nickname is already taken', async function(value) {
      if (!value) return true;
      const isAvailable = await checkNicknameAvailability(value, currentNickname);
      return isAvailable;
    }),
  email: yup.string().email('Invalid email address').required('Email is required'),
  country: yup.string().required('Country is required'),
  university: yup.string().optional().default(''),
  bio: yup.string().optional().default(''),
});

export function EditProfile({ profile, onSave }: EditProfileProps) {
  const [nicknameStatus, setNicknameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
    clearErrors,
    reset
  } = useForm({
    resolver: yupResolver(createProfileSchema(profile.nickname)),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      nickname: profile.nickname,
      email: profile.email,
      country: profile.country,
      university: profile.university || '',
      bio: profile.bio || ''
    },
    mode: 'onChange'
  });

  // 프로필 데이터가 변경될 때 폼 값 업데이트
  useEffect(() => {
    reset({
      firstName: profile.firstName,
      lastName: profile.lastName,
      nickname: profile.nickname,
      email: profile.email,
      country: profile.country,
      university: profile.university || '',
      bio: profile.bio || ''
    });
  }, [profile, reset]);

  const watchedNickname = watch('nickname');

  // 닉네임 변경 시 중복 검사
  useEffect(() => {
    if (watchedNickname && watchedNickname !== profile.nickname) {
      const timeoutId = setTimeout(async () => {
        setNicknameStatus('checking');
        
        try {
          const isAvailable = await checkNicknameAvailability(watchedNickname, profile.nickname);
          if (isAvailable) {
            setNicknameStatus('available');
            clearErrors('nickname');
          } else {
            setNicknameStatus('taken');
            setError('nickname', {
              type: 'manual',
              message: 'This nickname is already taken'
            });
          }
        } catch (error) {
          setNicknameStatus('idle');
        }
      }, 1000); // 1초 딜레이로 타이핑 완료 후 검사

      return () => clearTimeout(timeoutId);
    } else if (watchedNickname === profile.nickname) {
      setNicknameStatus('idle');
      clearErrors('nickname');
    }
  }, [watchedNickname, profile.nickname, setError, clearErrors]);

  const onSubmit = handleSubmit((data: any) => {
    // 원본 데이터와 비교하여 변경된 필드만 추출
    const changes: Partial<ProfileFormData> = {};
    
    if (data.firstName !== profile.firstName) changes.firstName = data.firstName;
    if (data.lastName !== profile.lastName) changes.lastName = data.lastName;
    if (data.nickname !== profile.nickname) changes.nickname = data.nickname;
    if (data.country !== profile.country) changes.country = data.country;
    if (data.university !== (profile.university || '')) changes.university = data.university;
    if (data.bio !== (profile.bio || '')) changes.bio = data.bio;
    
    console.log('Original profile:', profile);
    console.log('Form data:', data);
    console.log('Changes detected:', changes);
    
    // 변경사항이 있으면 저장
    if (Object.keys(changes).length > 0) {
      const updatedProfile = { ...profile, ...changes };
      onSave?.(updatedProfile);
    } else {
      console.log('No changes detected');
      // 변경사항이 없으면 토스트 메시지 등을 표시할 수 있음
    }
  });

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <TitleWIcon 
        title="Edit Profile"
        icon={<IcoSettingLined />}
        description="Update your personal details and contact information"
      />

      {/* Form Card */}
      <form onSubmit={onSubmit} className='flex gap-6 flex-col bg-neutral-800 border border-neutral-700 rounded-radius-lg p-6'>
          {/* First Name & Last Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="typo-body-xsmall">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="Enter first name"
                {...register('firstName')}
                className={errors.firstName ? 'border-error' : ''}
              />
              {errors.firstName && (
                <p className="text-error typo-body-xsmall">{errors.firstName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="typo-body-xsmall">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Enter last name"
                {...register('lastName')}
                className={errors.lastName ? 'border-error' : ''}
              />
              {errors.lastName && (
                <p className="text-error typo-body-xsmall">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Nickname & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <Label htmlFor="nickname" className="typo-body-xsmall">
                Nickname
              </Label>
              <div className="relative">
                <Input
                  id="nickname"
                  placeholder="Enter nickname"
                  {...register('nickname')}
                  className={errors.nickname ? 'border-error' : ''}
                />
                {/* 닉네임 검증 상태 표시 */}
                {nicknameStatus === 'checking' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {nicknameStatus === 'available' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                    ✓
                  </div>
                )}
                {nicknameStatus === 'taken' && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500">
                    ✗
                  </div>
                )}
              </div>
              {errors.nickname && (
                <p className="text-error typo-body-xsmall">{errors.nickname.message}</p>
              )}
              {nicknameStatus === 'available' && !errors.nickname && (
                <p className="text-green-500 typo-body-xsmall">✓ Nickname is available</p>
              )}
              {nicknameStatus === 'taken' && (
                <p className="text-error typo-body-xsmall">✗ This nickname is already taken</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="typo-body-xsmall">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                disabled
                placeholder="Email address"
                {...register('email')}
              />
              <p className="text-neutral-400 typo-body-xsmall">Email cannot be changed</p>
            </div>
          </div>

          {/* Country & University Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <Label htmlFor="country" className="typo-body-xsmall">
                Country
              </Label>
              <Input
                id="country"
                placeholder="Enter country"
                {...register('country')}
                className={errors.country ? 'border-error' : ''}
              />
              {errors.country && (
                <p className="text-error typo-body-xsmall">{errors.country.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="university" className="typo-body-xsmall">
                University
              </Label>
              <Input
                id="university"
                placeholder="Enter university (optional)"
                {...register('university')}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="typo-body-xsmall">
              Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              className="min-h-[100px] resize-none"
              {...register('bio')}
            />
            <p className="text-neutral-400 typo-body-xsmall">Share a brief description about yourself</p>
          </div>
          
          <Button
            type="submit"
            variant="secondary"
            size="small"
            className='self-end'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </Button>
      </form>
    </div>
  );
}

export default EditProfile;