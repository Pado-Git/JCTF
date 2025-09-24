import { Card } from '@/+shared/components/data-display/card';

interface StatCardProps {
  id: string;
  value: number;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function StatCard({ id, value, label, icon: IconComponent }: StatCardProps) {
  return (
    <Card key={id} className="bg-neutral-900/50 backdrop-blur-sm border border-primary-900 rounded-radius-lg p-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-primary typo-heading-large">
            {value}
          </p>
          <p className="text-primary-200 typo-heading-xsmall">
            {label}
          </p>
        </div>
        <div className="w-14 h-14 flex items-center justify-center">
        <IconComponent className="w-14 h-14 text-primary-800" />
        </div>
      </div>
    </Card>
  );
}

export default StatCard;