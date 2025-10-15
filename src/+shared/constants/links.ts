export const LINK_KEYS = [
  'home',
  'login',
  'register',
  'profile',
  'challenges',
  'dashboard',
  'competitions',
  'teams',
  'leaderboard',
  'notices',
] as const;

export type LinkKey = (typeof LINK_KEYS)[number];

export const GUEST_LINK_KEYS: LinkKey[] = [
  'home',
  'login',
  'register',
];

export const LINKS: Record<LinkKey, string> = (() => {
  const result: Record<LinkKey, string> = {
    home: `/`,

    // [AUTH]
    login: `/login`,
    register: `/register`,

    // [USER - 로그인 후 메인 페이지들]
    profile: `/profile`,
    // challenges: `/competition/:competitionId`,
    challenges: `/challenges`,
    dashboard: `/dashboard`,
    competitions: `/competitions`,
    // teams: `/teams/:competitionId`,
    teams: `/teams`,
    // leaderboard: `/leaderboard/:competitionId`,
    leaderboard: `/leaderboard`,
    notices: `/notices`,
  };
  
  if (import.meta.env.MODE === 'development') {
    return result;
  }
  
  const PROD_BASE_URL = import.meta.env.VITE_BASE_URL === '/' ? '' : import.meta.env.VITE_BASE_URL;
  return Object.fromEntries(
    Object.entries(result).map(([key, value]) => [key, `${PROD_BASE_URL}${value}`]),
  ) as Record<LinkKey, string>;
})();
