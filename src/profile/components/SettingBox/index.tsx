import { Button } from "@/+shared/components";
import { IcoArrowRightSLined } from "@/+shared/assets";

interface SettingBoxProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  buttonText: string;
}

export function SettingBox({ title, description, icon, onClick, buttonText }: SettingBoxProps) {
  return (
    <section className="bg-neutral-700 rounded-2xl p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {icon}
          <div className="space-y-1">
            <h3 className="typo-heading-xsmall">{title}</h3>
            <p className="typo-body-xsmall text-primary-300">{description}</p>
          </div>
        </div>
        <Button
          variant="primary"
          size="small"
          onClick={() => {
            console.log('SettingBox button clicked:', title);
            onClick();
          }}
        >
          {buttonText}
          <IcoArrowRightSLined className="w-4 h-4" />
        </Button>
      </div>
    </section>
  )
}
