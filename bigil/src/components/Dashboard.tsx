import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  MessageSquare,
  AlertCircle,
  ArrowUpRight,
  Flame,
  CalendarDays
} from 'lucide-react';
import type { ScheduledPost, CommentData, SystemStatus } from '../types';

interface DashboardProps {
  scheduledPosts: ScheduledPost[];
  comments: CommentData[];
  systemStatus: SystemStatus;
  setView: (view: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  scheduledPosts,
  comments,
  systemStatus,
  setView,
}) => {
  // Compute metrics
  const pendingCommentsCount = comments.filter(c => c.status === 'pending').length;
  const activeQueuedPosts = scheduledPosts.filter(p => p.status === 'scheduled');
  const publishedPostsCount = scheduledPosts.filter(p => p.status === 'published').length;

  // Static/Calculated metrics for visual appeal
  const totalAudienceReach = 142850;
  const reachDelta = '+18.4%';
  const engagementMultiplier = 4.2; // 4.2x
  const engagementDelta = '+34.8%';
  
  // Custom dummy chart points representing 7 days of reach
  const chartData = [12, 18, 15, 25, 34, 45, 52];
  const chartLabels = ['May 19', 'May 20', 'May 21', 'May 22', 'May 23', 'May 24', 'May 25'];
  const chartPath = chartData.map((val, idx) => `${idx === 0 ? 'M' : 'L'} ${idx * 80},${200 - (val/60)*180}`).join(' ');
  const chartFillPath = `${chartPath} L ${(chartData.length - 1) * 80},220 L 0,220 Z`;

  return (
    <div className="space-y-6">
      {/* View Header with Condiment Cursive Overlay */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/5 gap-4">
        <div>
          <h1 className="text-3xl font-anton text-cream tracking-wide flex items-center gap-2">
            Executive Command Dashboard
          </h1>
          <p className="text-xs text-cream/50 font-mono">
            System uptime: 100% • Agent latency: 124ms • Workspace: Active
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded bg-neon/10 border border-neon/30 text-neon font-semibold flex items-center gap-1.5 shadow-[0_0_8px_rgba(111,255,0,0.1)]">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-ping"></span>
            SYS-ONLINE
          </span>
          {systemStatus.autopilotActive && (
            <span className="px-3 py-1.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 font-semibold animate-pulse">
              AUTOPILOT ARMED
            </span>
          )}
        </div>
      </div>

      {/* Grid of Metric Cards (Liquid Glass) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="liquid-glass p-5 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-cream/40 uppercase tracking-widest font-mono">Audience Reach</span>
              <h3 className="text-3xl font-anton text-cream tracking-wider">
                {totalAudienceReach.toLocaleString()}
              </h3>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-neon">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs text-neon">
            <ArrowUpRight size={14} />
            <span>{reachDelta} this week</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="liquid-glass p-5 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-cream/40 uppercase tracking-widest font-mono">Engagement Mult.</span>
              <div className="flex items-baseline gap-1.5">
                <h3 className="text-3xl font-anton text-cream tracking-wider">
                  {engagementMultiplier}x
                </h3>
                <span className="font-condiment text-neon text-lg">liquid</span>
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-purple-400">
              <Flame size={18} className="animate-bounce" style={{ animationDuration: '3s' }} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-xs text-neon">
            <ArrowUpRight size={14} />
            <span>{engagementDelta} vs manual baseline</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="liquid-glass p-5 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-cream/40 uppercase tracking-widest font-mono">Active Queues</span>
              <h3 className="text-3xl font-anton text-cream tracking-wider">
                {activeQueuedPosts.length} <span className="text-xs text-cream/40">posts</span>
              </h3>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-blue-400">
              <Clock size={18} />
            </div>
          </div>
          <div className="font-mono text-xs text-cream/50">
            {publishedPostsCount} dispatched via autopilot
          </div>
        </div>

        {/* Metric 4 */}
        <div className="liquid-glass p-5 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-cream/40 uppercase tracking-widest font-mono">Inbox Pending</span>
              <h3 className="text-3xl font-anton text-cream tracking-wider">
                {pendingCommentsCount} <span className="text-xs text-cream/40">threads</span>
              </h3>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-amber-400">
              <MessageSquare size={18} />
            </div>
          </div>
          <div className={`font-mono text-xs ${pendingCommentsCount > 0 ? 'text-amber-400 animate-pulse' : 'text-cream/50'}`}>
            {pendingCommentsCount > 0 ? 'Requires immediate action' : 'All clear'}
          </div>
        </div>
      </div>

      {/* Main Grid: Charts & System Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trajectory Analytics Chart */}
        <div className="liquid-glass p-6 lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] text-cream/40 uppercase tracking-widest font-mono">Organic Engagement</span>
              <h2 className="text-lg font-anton text-cream tracking-wide">
                Reach Trajectory
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-cream/50">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-neon"></span> Reach</span>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="w-full h-64 relative border border-white/5 bg-navy-dark/40 rounded-lg p-4 flex items-end">
            <div className="absolute inset-0 grid grid-rows-4 pointer-events-none p-4">
              <div className="border-b border-white/5 w-full"></div>
              <div className="border-b border-white/5 w-full"></div>
              <div className="border-b border-white/5 w-full"></div>
              <div className="border-b border-white/5 w-full"></div>
            </div>

            {/* SVG line and gradient fill */}
            <svg className="w-full h-full absolute inset-0 p-4 overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6FFF00" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#6FFF00" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              {/* Path calculation based on data points */}
              <path
                d={chartPath}
                fill="none"
                stroke="#6FFF00"
                strokeWidth="3"
                className="transition-all duration-500"
              />
              <path
                d={chartFillPath}
                fill="url(#chart-grad)"
                className="transition-all duration-500"
              />
              {/* Node points */}
              {[12, 18, 15, 25, 34, 45, 52].map((val, idx) => (
                <circle
                  key={idx}
                  cx={idx * 80}
                  cy={200 - (val/60)*180}
                  r="4"
                  fill="#010828"
                  stroke="#6FFF00"
                  strokeWidth="2"
                  className="hover:scale-150 transition-transform cursor-pointer"
                />
              ))}
            </svg>

            {/* X-axis labels */}
            <div className="absolute bottom-1 inset-x-0 flex justify-between px-4 text-[9px] font-mono text-cream/40">
              {chartLabels.map((lbl, idx) => (
                <span key={idx}>{lbl}</span>
              ))}
            </div>
          </div>
        </div>

        {/* System Queue Status Dials / Controls */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Dispatch Alerts */}
          <div className="liquid-glass p-5 flex-1 space-y-4">
            <span className="text-[10px] text-cream/40 uppercase tracking-widest font-mono">System Alerts & Logs</span>
            <h2 className="text-base font-anton text-cream tracking-wide">
              Intelligence Stream
            </h2>
            
            <div className="space-y-3 font-mono text-xs">
              <div className="flex gap-2.5 items-start p-2.5 bg-white/5 rounded border border-white/5">
                <CalendarDays size={16} className="text-neon flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-cream font-semibold">Queue Alert</span>
                  <p className="text-[10px] text-cream/50 mt-0.5">Post 'Earth Rise from Room 304' is ready and scheduled for May 26, 09:00 UTC.</p>
                </div>
              </div>

              {pendingCommentsCount > 0 && (
                <div className="flex gap-2.5 items-start p-2.5 bg-amber-500/5 rounded border border-amber-500/10">
                  <AlertCircle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-amber-400 font-semibold">{pendingCommentsCount} Pending Responses</span>
                    <p className="text-[10px] text-cream/50 mt-0.5">Automated comments await dispatch confirmation or autopilot switch override.</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2.5 items-start p-2.5 bg-white/5 rounded border border-white/5">
                <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-cream font-semibold">Autopilot Status</span>
                  <p className="text-[10px] text-cream/50 mt-0.5">Currently running in {systemStatus.autopilotActive ? 'ARMED' : 'MANUAL'} mode. AI suggested replies computed.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setView('interactivity')}
              className="w-full py-2.5 rounded bg-white/5 border border-white/10 hover:bg-white/15 text-cream text-xs font-mono transition-colors"
            >
              Open Live Interaction Stream
            </button>
          </div>
        </div>
      </div>

      {/* Bottom section: Pending Scheduler Queue Preview */}
      <div className="liquid-glass p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[10px] text-cream/40 uppercase tracking-widest font-mono">Dispatcher Schedule</span>
            <h2 className="text-lg font-anton text-cream tracking-wide">
              Active Dispatch Queue
            </h2>
          </div>
          <button 
            onClick={() => setView('scheduler')}
            className="text-xs font-mono text-neon hover:underline flex items-center gap-1"
          >
            Manage Calendar <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {activeQueuedPosts.slice(0, 3).map((post) => (
            <div 
              key={post.id} 
              className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between h-40"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cream/80">
                    {post.platform.replace('-', ' ')}
                  </span>
                  <span className="text-[10px] text-cream/40">
                    {new Date(post.scheduledTime).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-cream font-bold truncate">{post.title}</h4>
                <p className="text-[10px] text-cream/50 line-clamp-3 mt-1.5">{post.caption}</p>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {post.hashtags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-[9px] text-neon">#{tag}</span>
                ))}
              </div>
            </div>
          ))}
          {activeQueuedPosts.length === 0 && (
            <div className="col-span-3 text-center py-6 text-cream/40 border border-dashed border-white/10 rounded-lg">
              No pending posts in queue. Head to the Brain & Content Lab to generate ideas!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
