import React from 'react';
import { Card, Divider } from '@/+shared/components';

interface StatItem {
  label: string;
  value: string | number;
  labelColor?: string;
  valueColor?: string;
}

interface StatsCardProps {
  stats: StatItem[];
  className?: string;
  children?: React.ReactNode;
}

export function StatsCard({ stats, className, children }: StatsCardProps) {
  return (
    <Card className={`bg-neutral-800 border border-neutral-700 rounded-radius-md p-8 gap-14 ${className || ''}`}>
      <div className="flex flex-col gap-10">
        {/* Statistics List */}
        <div className="flex">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <div className="flex-1 flex flex-col gap-2">
                <span className={`typo-heading-xxsmall ${stat.labelColor || 'text-neutral-400'}`}>
                  {stat.label}
                </span>
                <span className={`typo-heading-small ${stat.valueColor || 'text-primary-300'}`}>
                  {stat.value}
                </span>
              </div>
              {index < stats.length - 1 && <Divider vertical />}
            </React.Fragment>
          ))}
        </div>

        {/* Additional Content */}
        {children}
      </div>
    </Card>
  );
}

export default StatsCard;