import { useAuthStore } from "@/+shared";
import { fetcher } from "@/+shared/libs";
import { useEffect, useState } from "react";

export function useNoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const competitionId = useAuthStore((state: any) => state.competitionId);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await fetcher({
          url: `/participant/competitions/${competitionId}/announcements`,
          method: 'get',
          query: {
            competitionId: competitionId
          }
        });
        
        if (response.resultCode === 200) {
          const noticesData = response.result?.data || [];
          // isPinned 정렬
          const sortedNotices = noticesData.sort((a: any, b: any) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          setNotices(sortedNotices);
        } else {
          throw new Error('Failed to fetch notices');
        }
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, [competitionId]);

  const handleNoticeClick = (notice: any) => {
    console.log(notice);
  }
  
  return {
    notices,
    loading,
    handleNoticeClick
  }
}