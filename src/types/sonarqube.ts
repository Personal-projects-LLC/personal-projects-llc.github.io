export type SonarQubeWebhookBody = {
  issue?: {
    message?: string;
    status?: string;
    resolution?: string;
  };
};

export type GitHubIssue = {
  title: string;
  body?: string;
  number?: number;
};
