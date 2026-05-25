import React from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ContentLab } from './components/ContentLab';
import { Scheduler } from './components/Scheduler';
import { InteractivityStream } from './components/InteractivityStream';

import { 
  defaultOnboarding, 
  defaultSystemStatus, 
  initialScheduledPosts, 
  initialComments 
} from './mockData';
import type { OnboardingData, ScheduledPost, CommentData, SystemStatus } from './types';

function App() {
  const [currentView, setView] = React.useState<string>('dashboard');
  const [onboarding, setOnboarding] = React.useState<OnboardingData>(defaultOnboarding);
  const [scheduledPosts, setScheduledPosts] = React.useState<ScheduledPost[]>(initialScheduledPosts);
  const [comments, setComments] = React.useState<CommentData[]>(initialComments);
  const [systemStatus, setSystemStatus] = React.useState<SystemStatus>(defaultSystemStatus);

  // Scheduling a post from Design Studio
  const handleSchedulePost = (newPostData: Omit<ScheduledPost, 'id' | 'status'> & { id?: string; scheduledTime: string }) => {
    // If it's a regenerated design of an existing post, replace it
    if (newPostData.id && scheduledPosts.some(p => p.id === newPostData.id)) {
      setScheduledPosts(prev => prev.map(post => {
        if (post.id === newPostData.id) {
          return {
            ...post,
            ...newPostData,
            status: 'scheduled', // Reset status to scheduled when edited
          } as ScheduledPost;
        }
        return post;
      }));
    } else {
      // Add a brand new post
      const newPost: ScheduledPost = {
        ...newPostData,
        id: `post-gen-${Date.now()}`,
        status: 'scheduled',
      };
      setScheduledPosts(prev => [newPost, ...prev]);
    }
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            scheduledPosts={scheduledPosts}
            comments={comments}
            systemStatus={systemStatus}
            setView={setView}
          />
        );
      case 'content-lab':
        return (
          <ContentLab 
            onboarding={onboarding}
            setOnboarding={setOnboarding}
            onSchedulePost={handleSchedulePost}
          />
        );
      case 'scheduler':
        return (
          <Scheduler 
            scheduledPosts={scheduledPosts}
            systemStatus={systemStatus}
            setScheduledPosts={setScheduledPosts}
          />
        );
      case 'interactivity':
        return (
          <InteractivityStream 
            comments={comments}
            setComments={setComments}
            systemStatus={systemStatus}
            setSystemStatus={setSystemStatus}
          />
        );
      default:
        return (
          <Dashboard 
            scheduledPosts={scheduledPosts}
            comments={comments}
            systemStatus={systemStatus}
            setView={setView}
          />
        );
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      setView={setView} 
      systemStatus={systemStatus}
    >
      {renderActiveView()}
    </Layout>
  );
}

export default App;
