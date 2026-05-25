import React from 'react';
import { 
  Bot, 
  MessageSquare, 
  Send, 
  Zap, 
  Check, 
  Plus,
  Loader2,
  AlertCircle
} from 'lucide-react';
import type { CommentData, SystemStatus } from '../types';

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

interface InteractivityStreamProps {
  comments: CommentData[];
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
  systemStatus: SystemStatus;
  setSystemStatus: React.Dispatch<React.SetStateAction<SystemStatus>>;
}

export const InteractivityStream: React.FC<InteractivityStreamProps> = ({
  comments,
  setComments,
  systemStatus,
  setSystemStatus,
}) => {
  const [manualInputs, setManualInputs] = React.useState<Record<string, string>>({});
  const [processingId, setProcessingId] = React.useState<string | null>(null);

  // Trigger Autopilot effect when enabled
  React.useEffect(() => {
    let interval: any;
    if (systemStatus.autopilotActive) {
      // Find first pending comment
      const processPendingComments = () => {
        const nextPending = comments.find(c => c.status === 'pending');
        if (nextPending) {
          setProcessingId(nextPending.id);
          
          // Simulate AI dispatch processing lag
          setTimeout(() => {
            setComments(prev => prev.map(c => {
              if (c.id === nextPending.id) {
                return { ...c, status: 'replied' };
              }
              return c;
            }));
            setProcessingId(null);
          }, 1500);
        }
      };

      // Process immediately then poll every 3 seconds
      processPendingComments();
      interval = setInterval(processPendingComments, 3500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [systemStatus.autopilotActive, comments]);

  const handleToggleAutopilot = () => {
    setSystemStatus(prev => ({
      ...prev,
      autopilotActive: !prev.autopilotActive,
      // Boost health if autopilot handles things
      pipelineHealth: prev.autopilotActive ? 95 : 100
    }));
  };

  const handleManualInput = (commentId: string, val: string) => {
    setManualInputs(prev => ({
      ...prev,
      [commentId]: val,
    }));
  };

  const handleManualReply = (commentId: string, replyText: string) => {
    if (!replyText.trim()) return;
    setProcessingId(commentId);
    
    // Simulate API dispatch time
    setTimeout(() => {
      setComments(prev => prev.map(c => {
        if (c.id === commentId) {
          return { 
            ...c, 
            status: 'replied',
            aiSuggestedReply: replyText // Override with custom text if typed
          };
        }
        return c;
      }));
      setProcessingId(null);
      // Clean input
      setManualInputs(prev => {
        const updated = { ...prev };
        delete updated[commentId];
        return updated;
      });
    }, 1000);
  };

  // Simulate new comment incoming from social channels
  const handleSimulateComment = () => {
    const spaceUsernames = ['luna_cruiser', 'mars_settler', 'orbital_fanatic', 'stargazer_eli', 'cosmos_investor'];
    const commentsList = [
      'Is there space wifi in the suites? I need to check my portfolios.',
      'What fuel does the propulsion module use? Hope it is eco-friendly!',
      'Signed up for the waitlist! When will we get confirmation emails?',
      'Can kids join the flight? Or is it age-restricted?',
      'Tell me more about the centrifugal gravity levels in the sleeping lounge!'
    ];
    const aiReplies = [
      'Yes! High-speed Starlink broadband is available in all suites and workspaces.',
      'Our engines use carbon-neutral liquid methane/oxygen. Very eco-friendly!',
      'Confirmation emails are dispatched within 24 hours of onboarding checks. Welcome!',
      'For safety, passengers must be at least 12 years of age and pass basic physical evaluations.',
      'The quarters rotate to provide 0.3G, which is perfect for comfortable sleeping and digestion.'
    ];

    const randomIdx = Math.floor(Math.random() * commentsList.length);
    const newComment: CommentData = {
      id: `comm-sim-${Date.now()}`,
      platform: Math.random() > 0.5 ? 'instagram' : 'facebook',
      username: spaceUsernames[Math.floor(Math.random() * spaceUsernames.length)],
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?auto=format&fit=crop&w=100&q=80`,
      commentText: commentsList[randomIdx],
      timestamp: new Date().toISOString(),
      aiSuggestedReply: aiReplies[randomIdx],
      status: 'pending',
      postId: 'post-1',
      postTitle: 'Simulated Campaign Element',
    };

    setComments(prev => [newComment, ...prev]);
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/5 gap-4">
        <div>
          <h1 className="text-3xl font-anton text-cream tracking-wide flex items-center gap-2">
            Real-Time Interactivity Stream
          </h1>
          <p className="text-xs text-cream/50 font-mono">
            Track user conversations, trigger AI response cards, and arm full autopilot replies
          </p>
        </div>

        {/* Master Autopilot Toggle */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2.5 rounded-lg font-mono text-xs">
          <div className="flex items-center gap-2">
            <Bot size={18} className={systemStatus.autopilotActive ? 'text-neon animate-pulse' : 'text-cream/50'} />
            <span className="font-semibold uppercase tracking-wider">
              Replies Autopilot
            </span>
          </div>

          <button
            onClick={handleToggleAutopilot}
            className={`
              w-16 h-8 rounded-full p-1 transition-all duration-300 relative outline-none
              ${systemStatus.autopilotActive 
                ? 'bg-neon shadow-[0_0_12px_#6FFF00]' 
                : 'bg-white/10 border border-white/15'
              }
            `}
          >
            <div className={`
              w-6 h-6 rounded-full transition-transform duration-300 absolute top-1 left-1
              ${systemStatus.autopilotActive 
                ? 'translate-x-8 bg-navy' 
                : 'bg-cream/60'
              }
            `} />
          </button>
        </div>
      </div>

      {/* Main Grid: Comment stream left (8 cols), metrics/simulation rules right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Unified Engagement Stream (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center px-1 font-mono text-xs">
            <span className="text-cream/40 uppercase tracking-widest flex items-center gap-1">
              <MessageSquare size={12} className="text-neon" /> Conversations Log
            </span>
            <button 
              onClick={handleSimulateComment}
              className="text-neon hover:underline flex items-center gap-1 bg-white/5 px-3 py-1.5 border border-white/10 rounded hover:bg-neon hover:text-navy transition-colors active:scale-95"
            >
              <Plus size={12} /> Simulate Incoming Comment
            </button>
          </div>

          <div className="space-y-4">
            {comments.map((comment) => {
              const isPending = comment.status === 'pending';
              const isProcessing = processingId === comment.id;
              const inputVal = manualInputs[comment.id] || '';
              
              return (
                <div 
                  key={comment.id}
                  className={`
                    liquid-glass p-5 transition-all border-l-2
                    ${isPending 
                      ? 'border-l-amber-500/50 bg-amber-500/[0.005]' 
                      : 'border-l-neon/50 bg-neon/[0.002]'
                    }
                  `}
                >
                  {/* Comment Sender Metadata Header */}
                  <div className="flex justify-between items-start font-mono text-xs mb-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={comment.avatarUrl} 
                        alt={comment.username} 
                        className="w-8 h-8 rounded-full border border-white/10 object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-cream font-bold">{comment.username}</span>
                          {comment.platform === 'instagram' 
                            ? <Instagram size={12} className="text-purple-400" />
                            : <Facebook size={12} className="text-blue-400" />
                          }
                        </div>
                        <span className="text-[9px] text-cream/40">
                          on post: <strong className="text-cream/60">{comment.postTitle}</strong>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[9px] text-cream/30">
                        {new Date(comment.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                      {isPending ? (
                        <span className="px-2 py-0.5 rounded text-[8px] font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400 animate-pulse">
                          PENDING DISPATCH
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[8px] font-semibold bg-neon/10 border border-neon/30 text-neon flex items-center gap-1 shadow-[0_0_6px_rgba(111,255,0,0.1)]">
                          <Check size={8} /> DISPATCHED VIA AI
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Comment Content Text */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 font-mono text-xs text-cream/90 leading-relaxed pl-4 mb-4">
                    {comment.commentText}
                  </div>

                  {/* AI Response Card Section */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="bg-neon/[0.02] border border-neon/20 rounded-lg p-4 relative overflow-hidden">
                      {/* Ambient background badge */}
                      <div className="absolute top-2 right-3 text-[8px] uppercase tracking-widest text-neon/40 flex items-center gap-1 font-bold">
                        <Bot size={10} /> suggested response
                      </div>

                      <div className="text-[10px] text-neon uppercase tracking-wider mb-1 font-semibold flex items-center gap-1">
                        <Bot size={12} className="text-neon" /> AI Draft suggestion
                      </div>

                      {/* Display Suggested text */}
                      <p className="text-cream/90 italic leading-relaxed text-xs">
                        "{comment.aiSuggestedReply}"
                      </p>

                      {/* Custom override text input if pending */}
                      {isPending && !systemStatus.autopilotActive && (
                        <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
                          <label className="block text-[9px] uppercase tracking-wider text-cream/40">Override response text</label>
                          <textarea 
                            value={inputVal}
                            onChange={(e) => handleManualInput(comment.id, e.target.value)}
                            className="w-full bg-white/5 border border-white/10 focus:border-neon focus:ring-1 focus:ring-neon rounded px-3 py-2 outline-none text-cream text-[11px] font-mono leading-relaxed"
                            placeholder="Type a custom reply to override suggested script..."
                            rows={2}
                          />
                        </div>
                      )}
                    </div>

                    {/* Manual controls if Autopilot is OFF and comment is pending */}
                    {isPending && !systemStatus.autopilotActive && (
                      <div className="flex gap-2 justify-end pt-1">
                        <button 
                          onClick={() => handleManualReply(comment.id, comment.aiSuggestedReply)}
                          disabled={isProcessing}
                          className="px-4 py-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-cream text-xs flex items-center gap-1.5 transition-colors active:scale-95 disabled:opacity-50"
                        >
                          <Bot size={12} />
                          Approve Suggested Draft
                        </button>
                        
                        <button 
                          onClick={() => handleManualReply(comment.id, inputVal || comment.aiSuggestedReply)}
                          disabled={isProcessing || !inputVal.trim()}
                          className="px-4 py-2 rounded bg-neon text-navy font-bold text-xs flex items-center gap-1.5 shadow-[0_0_10px_rgba(111,255,0,0.15)] hover:bg-neon-dark transition-all active:scale-95 disabled:opacity-50"
                        >
                          {isProcessing ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <Send size={12} />
                          )}
                          Override & Dispatch
                        </button>
                      </div>
                    )}

                    {/* Loader overlay if currently being dispatched under Autopilot */}
                    {isPending && systemStatus.autopilotActive && isProcessing && (
                      <div className="flex items-center gap-2 text-neon text-[10px] uppercase font-bold py-1">
                        <Loader2 size={12} className="animate-spin" />
                        <span>Autopilot loop processing reply...</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {comments.length === 0 && (
              <div className="text-center py-12 text-cream/40 border border-dashed border-white/10 rounded-lg">
                No active conversations or comment threads recorded. Click 'Simulate Incoming Comment' to begin!
              </div>
            )}
          </div>
        </div>

        {/* Studio parameters / Autopilot configuration rules (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="liquid-glass p-5 space-y-4 font-mono text-xs">
            <div className="border-b border-white/5 pb-2">
              <span className="text-[10px] text-cream/40 uppercase tracking-widest">Control Panel</span>
              <h2 className="text-sm font-anton text-cream tracking-wider uppercase mt-0.5">Autopilot Configuration</h2>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded border border-white/10 space-y-1.5">
                <span className="text-[9px] uppercase tracking-wider text-cream/40 flex items-center gap-1">
                  <Bot size={12} className="text-neon" /> AI Moderation rules
                </span>
                <p className="text-[10px] text-cream/70 leading-normal">
                  Suggested responses align to the **Luxurious and Visionary** voice rules, answering price questions, refund policies, and training procedures.
                </p>
              </div>

              <div className="p-3 bg-white/5 rounded border border-white/10 space-y-1.5">
                <span className="text-[9px] uppercase tracking-wider text-cream/40 flex items-center gap-1">
                  <Zap size={12} className="text-purple-400" /> Dispatch trigger latency
                </span>
                <p className="text-[10px] text-cream/70">
                  Autopilot applies reply delays of **1.5 seconds** to mimic organic user replies in Facebook/Instagram APIs.
                </p>
              </div>

              {systemStatus.autopilotActive && (
                <div className="p-3 bg-neon/10 rounded border border-neon/30 space-y-1.5 animate-pulse">
                  <span className="text-[9px] uppercase tracking-wider text-neon flex items-center gap-1 font-bold">
                    <Check size={12} /> Loop Monitoring Armed
                  </span>
                  <p className="text-[10px] text-cream/80 leading-normal">
                    Autopilot is active and checking inbox loops for incoming streams every 3.5 seconds.
                  </p>
                </div>
              )}

              {!systemStatus.autopilotActive && (
                <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded space-y-1.5 flex gap-2">
                  <AlertCircle size={16} className="text-amber-400 flex-shrink-0" />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-amber-400 font-bold block">Manual Approval Required</span>
                    <p className="text-[10px] text-cream/70 leading-normal">
                      Toggle Autopilot ON or click "Approve Suggested Draft" to release replies.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
