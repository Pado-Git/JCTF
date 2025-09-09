import React, { ComponentPropsWithRef, ElementType, Fragment, PropsWithChildren } from 'react';
import { cn } from '@/utils';

export type MaxWidthContainerProps<
  TOuter extends ElementType = 'div',
  TInner extends ElementType = 'div',
> = PropsWithChildren &
  ComponentPropsWithRef<TOuter> & {
    as?: TOuter;
    addonNodes?: {
      [key in
        | 'beforebegin'
        | 'afterbegin'
        | 'beforeend'
        | 'afterend'
        | 'beforechildren'
        | 'afterchildren']?: React.ReactNode;
    };
    innerProps?: ComponentPropsWithRef<TInner> & {
      as?: TInner;
    };
  };

export function MaxWidthContainer<TOuter extends ElementType = 'div', TInner extends ElementType = 'div'>({
  as,
  addonNodes,
  innerProps,
  className,
  children,
  ...props
}: MaxWidthContainerProps<TOuter, TInner>) {
  const { as: _n1, className: _n2, ...restInnerProps } = innerProps ?? {};
  const Wrapper = (as ?? 'div') as ElementType;
  const InnerWrapper = (innerProps?.as ?? 'div') as ElementType;

  return (
    <Fragment>
      {addonNodes?.beforebegin}
      <Wrapper 
        className={cn(
          'w-full flex flex-col items-center',
          className
        )} 
        {...props}
      >
        {addonNodes?.afterbegin}
        <InnerWrapper
          className={cn(
            'w-full max-w-[1520px] px-6',
            innerProps?.className
          )}
          {...restInnerProps}
        >
          {addonNodes?.beforechildren}
          {children}
          {addonNodes?.afterchildren}
        </InnerWrapper>
        {addonNodes?.beforeend}
      </Wrapper>
      {addonNodes?.afterend}
    </Fragment>
  );
}

export default MaxWidthContainer;
