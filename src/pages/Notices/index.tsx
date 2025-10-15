import { IcoPinFilled, MaxWidthContainer } from "@/+shared";
import { IcoCalendarLined } from '@/+shared/assets';
import { IcoIndividualLined } from '@/+shared/assets/icons';
import { useNoticesPage } from "./index.hooks";

export function NoticesPage() {
  const { notices, loading, handleNoticeClick } = useNoticesPage();

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
          {loading ? (
            // 로딩 상태
            <div className="flex justify-center py-20">
              <div className="flex items-center gap-2 text-neutral-400">
                <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
                <span className="typo-body-small">Loading notices...</span>
              </div>
            </div>
          ) : notices.length === 0 ? (
            // 공지사항이 없을 때의 UI
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center">
                <IcoPinFilled className="w-8 h-8 text-neutral-500" />
              </div>
              <div className="text-center">
                <h3 className="typo-heading-small text-neutral-300 mb-2">No Notices Available</h3>
                <p className="typo-body-medium text-neutral-500">
                  There are no announcements at the moment.
                </p>
              </div>
            </div>
          ) : (
            // 공지사항 목록
            notices.map((notice, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 p-8 bg-neutral-800 border border-neutral-500 rounded-radius-md"
                onClick={() => handleNoticeClick(notice)}
              >
                <div className="flex items-center gap-4">
                  {notice.isPinned && (
                    <IcoPinFilled className="w-5 h-5 text-primary" />
                  )}
                  <div className="flex items-center gap-1 text-neutral-100 typo-body-xsmall">
                    <IcoCalendarLined className="w-4 h-4" />
                    <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-100 typo-body-xsmall">
                    <IcoIndividualLined className="w-4 h-4" />
                    <span>{notice.author}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="typo-heading-small">{notice.title}</h2>
                  <span className="text-neutral-100 typo-body-small">{notice.content}</span>
                </div>
              </div>
            ))
          )}
        </section>
      </MaxWidthContainer>
    </>
  )
}

export default NoticesPage;