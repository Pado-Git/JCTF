import { IcoPinFilled, MaxWidthContainer } from "@/+shared";
import { IcoCalendarLined } from '@/+shared/assets';
import { IcoIndividualLined } from '@/+shared/assets/icons';
import { useNoticesPage } from "./index.hooks";

export function NoticesPage() {
  const { notices } = useNoticesPage();

  return (
    <>
      <section className="flex flex-col gap-2 py-16 gradient-3-deg">
        <MaxWidthContainer>
          <span className="typo-heading-large text-primary-50">Notice</span>
          <span className="typo-body-medium text-primary-100">Check out the latest updates and important announcements from the CTF platform.</span>
        </MaxWidthContainer>
      </section>
      <MaxWidthContainer>
        <section className="flex flex-col gap-4">
          {notices.map((notice, index) => (
            <div key={index} className="flex flex-col gap-4 p-8 bg-neutral-800 border border-neutral-500 rounded-radius-md">
              <div className="flex items-center gap-4">
                <IcoPinFilled className="w-5 h-5 text-primary" />
                <div className="flex items-center gap-1 text-neutral-100 typo-body-xsmall">
                  <IcoCalendarLined className="w-4 h-4" />
                  <span>{notice.date}</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-100 typo-body-xsmall">
                  <IcoIndividualLined className="w-4 h-4" />
                  <span>{notice.author}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="typo-heading-small">{notice.title}</h2>
                <span className="text-neutral-100 typo-body-small">{notice.description}</span>
              </div>
            </div>
          ))}
        </section>
      </MaxWidthContainer>
    </>
  )
}

export default NoticesPage;