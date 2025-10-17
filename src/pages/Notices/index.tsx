import { Badge, IcoPinFilled, MaxWidthContainer } from "@/+shared";
import { IcoCalendarLined } from '@/+shared/assets';
import { IcoIndividualLined, IcoCloseFilled, IcoExitFilled } from '@/+shared/assets/icons';
import { useNoticesPage } from "./index.hooks";

export function NoticesPage() {
  const { notices, loading, selectedNotice, isModalOpen, handleNoticeClick, closeModal } = useNoticesPage();

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
                className="flex flex-col gap-4 p-8 bg-neutral-800 border hover:bg-neutral-700 border-neutral-500 rounded-radius-md cursor-pointer hover:bg-neutral-750 hover:border-neutral-400 transition-all duration-200"
                onClick={() => handleNoticeClick(notice)}
              >
                <div className="flex items-center gap-4">
                  {notice.isPinned && (
                    <IcoPinFilled className="w-5 h-5 text-primary" />
                  )}
                  {notice.category && (
                    <Badge variant="tag">
                      {notice.category}
                    </Badge>
                  )}
                  <div className="flex items-center gap-1 text-neutral-100 typo-body-xsmall">
                    <IcoCalendarLined className="w-4 h-4" />
                    <span>{new Date(notice.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-100 typo-body-xsmall">
                    <IcoIndividualLined className="w-4 h-4" />
                    <span>{notice.admin.name}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="typo-heading-small">{notice.title}</h2>
                  <span className="text-neutral-100 typo-body-small line-clamp-3">{notice.content}</span>
                </div>
              </div>
            ))
          )}
        </section>
      </MaxWidthContainer>

      {/* 공지사항 상세 모달 */}
      {isModalOpen && selectedNotice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-800 border-2 border-neutral-500 rounded-radius-md max-w-2xl w-full max-h-[80vh] overflow-hidden p-10">
            {/* 모달 헤더 */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  {selectedNotice.isPinned && (
                    <IcoPinFilled className="w-5 h-5 text-primary" />
                  )}
                  <h2 className="typo-heading-medium break-all">{selectedNotice.title}</h2>
                </div>
                <div className="flex flex-col gap-2 mb-4 text-neutral-100 typo-body-small">
                  <div className="flex items-center gap-2">
                    <IcoCalendarLined className="w-4 h-4" />
                    <span>{new Date(selectedNotice.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IcoIndividualLined className="w-4 h-4" />
                    <span>{selectedNotice.admin.name}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="p-2 hover:bg-neutral-800 rounded-radius-sm transition-colors"
              >
                <IcoExitFilled className="w-5 h-5 text-neutral-100" />
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="overflow-y-auto max-h-[60vh] bg-neutral-700 rounded-radius-md p-6">
              <div className="prose prose-invert max-w-none">
                <p className="typo-body-medium whitespace-pre-wrap leading-relaxed">
                  {selectedNotice.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NoticesPage;