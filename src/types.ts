export interface OnboardingData {
  industry: string;
  goal: string;
  targetAudience: string;
  toneOfVoice: string;
}

export interface PostIdea {
  id: string;
  headline: string;
  theme: string;
  imagePrompt: string;
  caption: string;
  hashtags: string[];
}

export type PlatformChannel = 'instagram-grid' | 'instagram-stories' | 'facebook';

export interface ScheduledPost {
  id: string;
  title: string;
  theme: string;
  imagePrompt: string;
  caption: string;
  hashtags: string[];
  scheduledTime: string; // ISO string or specific time representation
  platform: PlatformChannel;
  status: 'scheduled' | 'published' | 'failed';
  videoLoopUrl?: string;
  fontScale?: number; // visibility/size scale
  alignVector?: 'center' | 'top' | 'bottom';
  layoutSeed?: number;
}

export interface CommentData {
  id: string;
  platform: 'instagram' | 'facebook';
  username: string;
  avatarUrl: string;
  commentText: string;
  timestamp: string;
  aiSuggestedReply: string;
  status: 'pending' | 'replied';
  postId: string;
  postTitle: string;
}

export interface SystemStatus {
  instagramGraphApiConnected: boolean;
  metaGraphConnected: boolean;
  autopilotActive: boolean;
  pipelineHealth: number; // 0 to 100
}
