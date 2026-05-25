import React from 'react';
import { 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Radio,
  Cpu,
  Move
} from 'lucide-react';
import type { ScheduledPost, PlatformChannel, SystemStatus } from '../types';

interface BrandIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Instagram = ({ size = 16, ...props }: BrandIconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Facebook = ({ size = 16, ...props }: BrandIconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

interface SchedulerProps {
  scheduledPosts: ScheduledPost[];
  systemStatus: SystemStatus;
  setScheduledPosts: React.Dispatch<React.SetStateAction<ScheduledPost[]>>;
}

export const Scheduler: React.FC<SchedulerProps> = ({
  scheduledPosts,
  systemStatus,
  setScheduledPosts,
}) => {
  const [viewMode, setViewMode] = React.useState<'month' | 'week'>('month');
  const [selectedChannel, setSelectedChannel] = React.useState<PlatformChannel | 'all'>('all');

  // Filtering scheduled posts
  const filteredPosts = scheduledPosts.filter(p => {
    if (selectedChannel === 'all') return true;
    return p.platform === selectedChannel;
  });
  
  // Let's build a grid of 35 days representing May 2026
  const calendarCells = [];
  // Days from previous month (April) - 26, 27, 28, 29, 30 (5 days)
  for (let i = 26; i <= 30; i++) {
    calendarCells.push({ dayNumber: i, month: 'April', isCurrentMonth: false, dateString: `2026-04-${i}` });
  }
  // Days in May - 1 to 31
  for (let i = 1; i <= 31; i++) {
    const paddedDay = i < 10 ? `0${i}` : `${i}`;
    calendarCells.push({ dayNumber: i, month: 'May', isCurrentMonth: true, dateString: `2026-05-${paddedDay}` });
  }
  // Days from next month (June) - 1 to 6
  for (let i = 1; i <= 6; i++) {
    calendarCells.push({ dayNumber: i, month: 'June', isCurrentMonth: false, dateString: `2026-06-0${i}` });
  }

  // Get posts scheduled on a specific date (YYYY-MM-DD)
  const getPostsForDate = (dateString: string) => {
    return filteredPosts.filter(post => {
      const postDateStr = post.scheduledTime.split('T')[0];
      return postDateStr === dateString;
    });
  };

  // Simulate Drag-and-Drop / Reschedule action by moving a post 1 day forward
  const handleMovePost = (postId: string, direction: 'forward' | 'backward') => {
    setScheduledPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const currentDate = new Date(post.scheduledTime);
        const dayDiff = direction === 'forward' ? 1 : -1;
        currentDate.setDate(currentDate.getDate() + dayDiff);
        return {
          ...post,
          scheduledTime: currentDate.toISOString()
        };
      }
      return post;
    }));
  };

  const getPlatformIcon = (platform: PlatformChannel) => {
    switch (platform) {
      case 'instagram-grid':
        return <Instagram size={10} className="text-neon" />;
      case 'instagram-stories':
        return <Instagram size={10} className="text-purple-400" />;
      case 'facebook':
        return <Facebook size={10} className="text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/5 gap-4">
        <div>
          <h1 className="text-3xl font-anton text-cream tracking-wide flex items-center gap-2">
            Automation Calendar
          </h1>
          <p className="text-xs text-cream/50 font-mono">
            Orchestrate content timelines, filter channels, and override schedules
          </p>
        </div>

        {/* View Controls */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <div className="flex bg-white/5 rounded border border-white/10 overflow-hidden">
            <button 
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 transition-colors ${viewMode === 'month' ? 'bg-neon text-navy font-bold' : 'hover:bg-white/5 text-cream/60'}`}
            >
              MONTH
            </button>
            <button 
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 transition-colors ${viewMode === 'week' ? 'bg-neon text-navy font-bold' : 'hover:bg-white/5 text-cream/60'}`}
            >
              WEEK
            </button>
          </div>

          <div className="flex bg-white/5 rounded border border-white/10 overflow-hidden">
            <button 
              onClick={() => setSelectedChannel('all')}
              className={`px-3 py-1.5 transition-colors ${selectedChannel === 'all' ? 'bg-white/10 text-cream font-bold' : 'hover:bg-white/5 text-cream/60'}`}
            >
              ALL
            </button>
            <button 
              onClick={() => setSelectedChannel('instagram-grid')}
              className={`px-3 py-1.5 transition-colors flex items-center gap-1 ${selectedChannel === 'instagram-grid' ? 'bg-neon/20 text-neon font-bold border-l-2 border-neon' : 'hover:bg-white/5 text-cream/60'}`}
            >
              <Instagram size={12} /> Grid
            </button>
            <button 
              onClick={() => setSelectedChannel('instagram-stories')}
              className={`px-3 py-1.5 transition-colors flex items-center gap-1 ${selectedChannel === 'instagram-stories' ? 'bg-purple-500/20 text-purple-400 font-bold border-l-2 border-purple-500' : 'hover:bg-white/5 text-cream/60'}`}
            >
              <Instagram size={12} /> Story
            </button>
            <button 
              onClick={() => setSelectedChannel('facebook')}
              className={`px-3 py-1.5 transition-colors flex items-center gap-1 ${selectedChannel === 'facebook' ? 'bg-blue-500/20 text-blue-400 font-bold border-l-2 border-blue-500' : 'hover:bg-white/5 text-cream/60'}`}
            >
              <Facebook size={12} /> FB
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar left (8 cols), Autopilot status right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Calendar Matrix (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="liquid-glass p-5">
            {/* Calendar Month Header */}
            <div className="flex justify-between items-center mb-4 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-neon" />
                <span className="text-cream font-bold uppercase tracking-wider text-sm">May 2026</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded hover:bg-white/5 text-cream/60 hover:text-cream"><ChevronLeft size={16} /></button>
                <button className="px-2 py-1 rounded hover:bg-white/5 text-cream font-bold">Today</button>
                <button className="p-1 rounded hover:bg-white/5 text-cream/60 hover:text-cream"><ChevronRight size={16} /></button>
              </div>
            </div>

            {/* Calendar Weekday Names */}
            <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase text-cream/40 mb-2 border-b border-white/5 pb-2">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>

            {/* Calendar Day Cells */}
            <div className="grid grid-cols-7 gap-1 h-[450px]">
              {calendarCells.map((cell, idx) => {
                const posts = getPostsForDate(cell.dateString);
                const isToday = cell.dateString === '2026-05-25'; // Mock today date May 25, 2026
                
                // For week view, we can filter to only show the week containing today (May 25 is index 29 in May cells)
                // Sun May 24 (idx 28) to Sat May 30 (idx 34)
                if (viewMode === 'week' && (idx < 28 || idx > 34)) {
                  return null;
                }

                return (
                  <div 
                    key={idx}
                    className={`
                      relative p-1.5 rounded bg-navy-dark/30 border flex flex-col justify-between overflow-hidden group
                      ${cell.isCurrentMonth ? 'text-cream/90' : 'text-cream/25'}
                      ${isToday 
                        ? 'border-neon/50 bg-neon/[0.02] shadow-[inset_0_0_8px_rgba(111,255,0,0.05)]' 
                        : 'border-white/5 hover:border-white/10'
                      }
                    `}
                  >
                    <div className="flex justify-between items-start font-mono">
                      <span className={`text-[10px] px-1 py-0.5 rounded ${isToday ? 'bg-neon text-navy font-bold shadow-[0_0_6px_#6FFF00]' : ''}`}>
                        {cell.dayNumber}
                      </span>
                      {isToday && (
                        <span className="text-[7px] text-neon uppercase tracking-wider font-bold">today</span>
                      )}
                    </div>

                    {/* Cell posts list */}
                    <div className="flex-1 space-y-1 mt-1 overflow-y-auto max-h-[64px] scrollbar-thin">
                      {posts.map((post) => (
                        <div 
                          key={post.id}
                          className={`
                            p-1 rounded text-[8px] font-mono leading-normal border flex flex-col justify-between
                            ${post.status === 'published' 
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
                              : 'bg-neon/5 border-neon/10 text-cream/90'
                            }
                          `}
                        >
                          <div className="flex justify-between items-center gap-0.5">
                            <span className="font-semibold truncate flex-1">{post.title}</span>
                            {getPlatformIcon(post.platform)}
                          </div>
                          
                          {/* Simulated Drag & Drop tools */}
                          {post.status === 'scheduled' && (
                            <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                              <button 
                                title="Move 1 day back"
                                onClick={(e) => { e.stopPropagation(); handleMovePost(post.id, 'backward'); }}
                                className="p-0.5 rounded bg-white/5 border border-white/10 hover:bg-neon hover:text-navy text-[7px]"
                              >
                                ◀
                              </button>
                              <button 
                                title="Move 1 day forward"
                                onClick={(e) => { e.stopPropagation(); handleMovePost(post.id, 'forward'); }}
                                className="p-0.5 rounded bg-white/5 border border-white/10 hover:bg-neon hover:text-navy text-[7px]"
                              >
                                ▶
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Drag hint footer */}
            <div className="mt-3 text-[9px] text-cream/40 font-mono flex items-center gap-1.5">
              <Move size={10} className="text-neon" />
              <span>Hover post cards to trigger quick scheduling vectors (moves items by ±1 day increments dynamically).</span>
            </div>
          </div>
        </div>

        {/* Autopilot Engine Status (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Autopilot status dials */}
          <div className="liquid-glass p-5 space-y-6">
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] text-cream/40 uppercase tracking-widest font-mono">Real-time Dials</span>
              <h2 className="text-sm font-anton text-cream tracking-wider uppercase flex items-center gap-1.5 mt-0.5">
                <Cpu size={16} className="text-neon" /> Autopilot Health Status
              </h2>
            </div>

            <div className="space-y-4 font-mono text-xs">
              
              {/* Pipeline health circular dial mockup */}
              <div className="flex flex-col items-center justify-center py-2">
                <div className="relative h-28 w-28 rounded-full border border-white/5 flex items-center justify-center shadow-[inset_0_0_12px_rgba(255,255,255,0.02)]">
                  {/* Glowing progress ring background */}
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="42" 
                      stroke="rgba(255,255,255,0.03)" strokeWidth="6" 
                      fill="transparent" 
                    />
                    <circle 
                      cx="50" cy="50" r="42" 
                      stroke="#6FFF00" strokeWidth="6" 
                      fill="transparent" 
                      strokeDasharray="264" 
                      strokeDashoffset={264 - (264 * systemStatus.pipelineHealth) / 100}
                      className="transition-all duration-1000 shadow-[0_0_10px_#6FFF00]"
                    />
                  </svg>
                  
                  <div className="text-center">
                    <span className="text-2xl font-anton tracking-wider text-cream">{systemStatus.pipelineHealth}%</span>
                    <p className="text-[8px] text-cream/40 uppercase tracking-widest -mt-1">Pipeline Health</p>
                  </div>
                </div>
              </div>

              {/* Status checkboxes */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Globe2 size={14} className="text-cream/40" />
                    <span>Meta Graph Core</span>
                  </div>
                  <span className="text-neon font-bold text-[10px]">CONNECTED</span>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Radio size={14} className="text-cream/40" />
                    <span>Instagram Graph API</span>
                  </div>
                  <span className="text-neon font-bold text-[10px]">CONNECTED</span>
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <div className="flex items-center gap-2">
                    <Cpu size={14} className="text-cream/40" />
                    <span>Scheduler Loops</span>
                  </div>
                  <span className={systemStatus.autopilotActive ? 'text-neon font-bold text-[10px] animate-pulse' : 'text-cream/50 text-[10px]'}>
                    {systemStatus.autopilotActive ? 'ACTIVE DISPATCH' : 'IDLE/ARMED'}
                  </span>
                </div>
              </div>

              {/* Quick dispatcher prompt */}
              <div className="bg-white/5 rounded p-3 border border-white/10 space-y-2">
                <span className="text-[9px] uppercase tracking-wider text-cream/40">Quick Queue Release</span>
                <p className="text-[10px] text-cream/70">Force immediate autopilot run to dispatch any scheduled items within latency parameters.</p>
                <button 
                  onClick={() => alert('Autopilot run triggered! No pending items match immediate cron delay.')}
                  className="w-full py-1.5 rounded bg-neon hover:bg-neon-dark text-navy font-bold font-mono text-[10px] uppercase transition-colors"
                >
                  Force Release Dispatch
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
