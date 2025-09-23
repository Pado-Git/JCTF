import { useAuthStore } from '@/+shared/stores/authStore';
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
