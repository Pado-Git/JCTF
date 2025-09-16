import { ElementType, PropsWithChildren } from 'react';
import { cn } from '@/+shared/utils';

export interface DividerProps extends PropsWithChildren {
  as?: ElementType;
  width?: string | number;
  height?: string | number;
  dashed?: boolean;
  vertical?: boolean;
  className?: string; // 커스텀 색상: className="border-primary-300" 등으로 사용
}

export function Divider({
  as: Component = 'div',
  width = '1px',
  height,
  dashed = false,
  vertical = false,
  className,
  children,
  ...props
}: DividerProps) {
  const finalWidth = typeof width === 'number' ? `${width}px` : width;
  const finalHeight = typeof height === 'number' ? `${height}px` : height;

  const baseClasses = cn(
    'flex items-center border-neutral-500', // 기본 색상: neutral-500
    vertical ? 'flex-col' : 'flex-row',
    className // 커스텀 색상 오버라이드 가능
  );

  const lineClasses = cn(
    'flex-1 border-neutral-500', // 기본 색상: neutral-500
    dashed ? 'border-dashed' : 'border-solid',
    vertical ? 'border-l' : 'border-t',
    'min-w-8',
    vertical ? 'min-h-8' : 'min-w-8'
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
