export interface WorkItem {
  latest: LatestVersionInfo;
  title: string;
  short: string;
  category: string[];
  id: string;
  links: Link[];
  icon: string;
}

export interface LatestVersionInfo {
  dateiso: string;
  version: string;
}

export interface Link {
  url: string;
  text?: string;
  label?: string;
  main?: boolean;
}
