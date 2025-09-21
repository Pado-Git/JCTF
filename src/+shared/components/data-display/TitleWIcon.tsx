export function TitleWIcon({ title, icon, description }: { title: string, icon: React.ReactNode, description?: string }) {
  return(
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <span className="w-6 h-6 flex items-center justify-center text-primary">{icon}</span>
        <span className="typo-heading-medium text-primary-200">{title}</span>
      </div>
      {description && (
        <span className="text-primary-100 typo-body-medium">
          {description}
        </span>
      )}
    </div>
  )
};

export default TitleWIcon;