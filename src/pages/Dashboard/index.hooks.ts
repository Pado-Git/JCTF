import { useAuthStore } from '@/+shared/stores/useAuthStore';
import { dashboardMocks, mockCompetitions, mockActivities } from '@/dashboard/data/mockData';

export function useDashboard() {
  const { user } = useAuthStore();

  return {
    user,
    dashboardMocks,
    mockCompetitions,
    mockActivities,
  };
}
