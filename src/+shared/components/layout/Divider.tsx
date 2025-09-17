import { ElementType, PropsWithChildren } from 'react';
import { cn } from '@/+shared/utils';

export interface DividerProps extends PropsWithChildren {
  as?: ElementType;
  width?: string | number;
  height?: string | number;
  dashed?: boolean;
  dotted?: boolean;
  vertical?: boolean;
  className?: string;
}

export function Divider({
  as: Component = 'div',
  width = '1px',
  height,
  dashed = false,
  dotted = false,
  vertical = false,
  className,
  children,
  ...props
}: DividerProps) {
  const finalWidth = typeof width === 'number' ? `${width}px` : width;
  const finalHeight = typeof height === 'number' ? `${height}px` : height;

  // 색상 클래스 추출 - border-로 시작하는 클래스를 찾음
  const borderColorClass = className?.split(' ').find(cls => cls.startsWith('border-')) || 'border-neutral-500';
  const otherClasses = className?.split(' ').filter(cls => !cls.startsWith('border-')).join(' ') || '';

  const baseClasses = cn(
    'flex items-center',
    vertical ? 'flex-col' : 'flex-row',
    otherClasses
  );

  const lineClasses = cn(
    'flex-1',
    dashed ? 'border-dashed' : dotted ? 'border-dotted' : 'border-solid',
    vertical ? 'border-l' : 'border-t',
    'min-w-8',
    vertical ? 'min-h-8' : 'min-w-8',
    borderColorClass
  );

  const contentClasses = cn(
    'flex-shrink-0 px-4 text-center',
    vertical ? 'py-4' : 'px-4'
  );

  const lineStyle = {
    [vertical ? 'borderLeftWidth' : 'borderTopWidth']: finalWidth,
    ...(finalHeight && vertical ? { height: finalHeight } : {}),
  };

  return (
    <Component className={baseClasses} {...props}>
      <div className={lineClasses} style={lineStyle} />
      {children && <div className={contentClasses}>{children}</div>}
      <div className={lineClasses} style={lineStyle} />
    </Component>
  );
}

export default Divider;