import { forwardRef, useImperativeHandle } from 'react';
import { Button, MaxWidthContainer, Switch } from '@/+shared/components';
import { IcoReset } from '@/+shared/assets/icons';
import { useControlsSection, ControlsSectionRef } from './index.hooks';

export interface ControlsSectionProps {
  autoRefresh: boolean;
  setAutoRefresh: (value: boolean) => void;
  onRefresh: () => void;
  loading: boolean;
}

export const ControlsSection = forwardRef<ControlsSectionRef, ControlsSectionProps>(({ 
  autoRefresh, 
  setAutoRefresh, 
  onRefresh, 
  loading
}, ref) => {
  const { formattedLastUpdated, updateLastUpdated } = useControlsSection({ 
    autoRefresh
  });

  // ref를 통해 외부에서 updateLastUpdated 함수를 호출할 수 있도록 노출
  useImperativeHandle(ref, () => ({
    updateLastUpdated
  }));

  return (
    <MaxWidthContainer className='py-5 border-b border-neutral-700'>
      <div className='flex items-center justify-between gap-4 typo-body-small'>
        <div className='flex items-center gap-4'>
          <span className='text-primary-200'>Auto - refresh (30s)</span>
          <Switch
            checked={autoRefresh}
            onCheckedChange={setAutoRefresh}
          />
        </div>
        <div className='flex items-center gap-4'>
          <span className='text-neutral-200'>
            Last updated: {formattedLastUpdated}
          </span>
          <Button 
            onClick={onRefresh} 
            variant="primary" 
            size="xsmall"
            disabled={loading}
          >
            <IcoReset className='w-4 h-4' />
            {loading ? '새로고침 중...' : '새로고침'}
          </Button>
        </div>
      </div>
    </MaxWidthContainer>
  );
});
