import React from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';
import type { ScheduledPost, PlatformChannel } from '../types';
import { spaceVideoLoops } from '../mockData';

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

interface DesignStudioProps {
  activePost: Omit<ScheduledPost, 'id' | 'scheduledTime' | 'status'> & { id?: string };
  onSchedule: (post: Omit<ScheduledPost, 'id' | 'status'> & { id?: string; scheduledTime: string }) => void;
  onCancel?: () => void;
}

export const DesignStudio: React.FC<DesignStudioProps> = ({
  activePost,
  onSchedule,
  onCancel,
}) => {
  // Studio variables state
  const [brandingText, setBrandingText] = React.useState(activePost.title);
  const [videoLoopId, setVideoLoopId] = React.useState(activePost.videoLoopUrl || 'neon-orbit');
  const [fontScale, setFontScale] = React.useState(activePost.fontScale || 1.1);
  const [alignVector, setAlignVector] = React.useState< 'top' | 'center' | 'bottom' >(activePost.alignVector || 'bottom');
  const [layoutSeed, setLayoutSeed] = React.useState(activePost.layoutSeed || 1234);
  const [fontFamily, setFontFamily] = React.useState<'anton' | 'condiment' | 'mono'>('anton');
  const [platform, setPlatform] = React.useState<PlatformChannel>('instagram-grid');
  
  const [caption, setCaption] = React.useState(activePost.caption);
  const [hashtagsText, setHashtagsText] = React.useState(activePost.hashtags.join(', '));
  const [scheduledTime, setScheduledTime] = React.useState('');
  
  // Keep form in sync when active post changes
  React.useEffect(() => {
    setBrandingText(activePost.title);
    setCaption(activePost.caption);
    setHashtagsText(activePost.hashtags.join(', '));
    if (activePost.videoLoopUrl) setVideoLoopId(activePost.videoLoopUrl);
    if (activePost.fontScale) setFontScale(activePost.fontScale);
    if (activePost.alignVector) setAlignVector(activePost.alignVector);
    if (activePost.layoutSeed) setLayoutSeed(activePost.layoutSeed);
  }, [activePost]);

  const activeLoop = spaceVideoLoops.find(l => l.id === videoLoopId) || spaceVideoLoops[0];

  const handleRefreshSeed = () => {
    setLayoutSeed(Math.floor(Math.random() * 9000) + 1000);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduledTime) {
      alert('Please select a release timestamp for dispatch.');
      return;
    }
    const tags = hashtagsText.split(',').map(t => t.trim()).filter(Boolean);
    onSchedule({
      id: activePost.id,
      title: brandingText,
      theme: activePost.theme,
      imagePrompt: activePost.imagePrompt,
      caption,
      hashtags: tags,
      scheduledTime: new Date(scheduledTime).toISOString(),
      platform,
      videoLoopUrl: videoLoopId,
      fontScale,
      alignVector,
      layoutSeed,
    });
  };

  // Build styling based on state variables
  const alignmentClass = {
    top: 'justify-start pt-8',
    center: 'justify-center',
    bottom: 'justify-end pb-8',
  }[alignVector];

  const fontClass = {
    anton: 'font-anton text-cream tracking-wide drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]',
    condiment: 'font-condiment text-neon text-5xl tracking-normal leading-normal drop-shadow-[0_0_12px_rgba(111,255,0,0.8)]',
    mono: 'font-mono text-cream uppercase border border-white/20 p-2 bg-black/60',
  }[fontFamily];

  // Helper to draw random decorative vectors inside canvas based on the layoutSeed
  const renderVectorStars = () => {
    const starsCount = (layoutSeed % 8) + 4;
    const vectors = [];
    for (let i = 0; i < starsCount; i++) {
      const top = ((layoutSeed * (i + 1) * 31) % 90) + 5;
      const left = ((layoutSeed * (i + 1) * 73) % 90) + 5;
      const size = ((layoutSeed * (i + 1) * 17) % 3) + 1;
      const opacity = (((layoutSeed * (i + 1) * 47) % 50) + 30) / 100;
      vectors.push(
        <div 
          key={i}
          className="absolute bg-neon rounded-full"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity,
            boxShadow: size > 2 ? '0 0 6px #6FFF00' : 'none',
          }}
        />
      );
    }
    return vectors;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* LEFT: Canvas Studio Preview (5 cols) */}
      <div className="lg:col-span-5 flex flex-col items-center">
        <div className="w-full max-w-sm sticky top-6 space-y-4">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] text-cream/40 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Layers size={12} className="text-neon" /> Real-time Mock Canvas
            </span>
            <span className="text-[10px] text-neon uppercase font-mono tracking-wider">
              {platform.replace('-', ' ')}
            </span>
          </div>

          {/* Visual Canvas aspect container (1:1 standard mockup) */}
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,4,20,0.8)] border border-white/10 group">
            {/* Dynamic simulated high-resolution video stream layer */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${activeLoop.color} bg-size-200 animate-pulse-slow z-0`} />
            
            {/* Ambient vector stars overlay */}
            <div className="absolute inset-0 space-stars opacity-40 z-0" />
            {renderVectorStars()}

            {/* Glowing neon planet vector overlay */}
            <div 
              className="absolute rounded-full border border-neon/20 bg-gradient-to-br from-neon/10 to-transparent blur-[1px] animate-spin-slow"
              style={{
                width: '120px',
                height: '120px',
                top: `${(layoutSeed % 30) + 10}%`,
                left: `${((layoutSeed + 50) % 55) + 15}%`,
                boxShadow: 'inset 0 0 15px rgba(111, 255, 0, 0.2), 0 0 10px rgba(111, 255, 0, 0.1)',
                animationDuration: '40s',
              }}
            />

            {/* Editable superimposed branding text preview layer */}
            <div className={`absolute inset-0 flex flex-col p-6 z-10 ${alignmentClass} text-center`}>
              <h4 
                className={`${fontClass} select-none transition-all duration-300 break-words max-w-full px-2`}
                style={{ fontSize: `${fontScale}rem`, lineHeight: '1.2' }}
              >
                {brandingText || 'BRANDING OVERLAY'}
              </h4>
            </div>

            {/* Canvas overlay footer metadata */}
            <div className="absolute bottom-2 right-3 font-mono text-[8px] text-cream/30 z-10 select-none">
              seed: {layoutSeed} • loop: {activeLoop.name}
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <button 
              onClick={handleRefreshSeed}
              className="px-3 py-1.5 rounded bg-white/5 border border-white/10 hover:bg-neon hover:text-navy text-cream font-mono text-xs flex items-center gap-1.5 transition-all duration-200 active:scale-95"
            >
              <RefreshCw size={12} />
              Re-seed Layout
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Studio Control Panel (7 cols) */}
      <div className="lg:col-span-7">
        <form onSubmit={handleScheduleSubmit} className="liquid-glass p-6 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-xl font-anton text-cream tracking-wide flex items-center gap-2">
              <Sparkles size={20} className="text-neon" /> Automated Design Studio
            </h2>
            <p className="text-xs text-cream/40 font-mono mt-1">
              Finetune details, layout vectors, and finalize autopilot scheduling
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {/* Platform Dispatcher Selection */}
            <div>
              <label className="block text-cream/50 uppercase tracking-wider text-[10px] mb-2">Dispatcher Channel</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'instagram-grid', name: 'IG Grid', icon: Instagram },
                  { id: 'instagram-stories', name: 'IG Stories', icon: Instagram },
                  { id: 'facebook', name: 'FB Feed', icon: Facebook },
                ].map((ch) => {
                  const Icon = ch.icon;
                  const selected = platform === ch.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setPlatform(ch.id as PlatformChannel)}
                      className={`
                        py-2.5 px-2 rounded-lg border text-center flex flex-col items-center justify-center gap-1 transition-all duration-200
                        ${selected 
                          ? 'bg-neon/10 border-neon text-neon font-bold' 
                          : 'bg-white/5 border-white/10 text-cream/60 hover:text-cream hover:bg-white/10'
                        }
                      `}
                    >
                      <Icon size={14} />
                      <span className="text-[10px]">{ch.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Branding Overlay Text Input */}
            <div>
              <label className="block text-cream/50 uppercase tracking-wider text-[10px] mb-1.5">Branding Header Text</label>
              <input 
                type="text"
                value={brandingText}
                onChange={(e) => setBrandingText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 focus:border-neon focus:ring-1 focus:ring-neon rounded px-3 py-2.5 outline-none text-cream"
                placeholder="Enter custom branding text..."
              />
            </div>

            {/* Typography Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-cream/50 uppercase tracking-wider text-[10px] mb-1.5">Active Font Family</label>
                <div className="flex bg-white/5 rounded border border-white/10 overflow-hidden">
                  {(['anton', 'condiment', 'mono'] as const).map((font) => (
                    <button
                      key={font}
                      type="button"
                      onClick={() => setFontFamily(font)}
                      className={`
                        flex-1 py-2 text-center text-[10px] transition-colors
                        ${fontFamily === font ? 'bg-neon text-navy font-bold' : 'hover:bg-white/5 text-cream/60'}
                      `}
                    >
                      {font.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-cream/50 uppercase tracking-wider text-[10px] mb-1.5">Alignment Vector</label>
                <div className="flex bg-white/5 rounded border border-white/10 overflow-hidden">
                  {[
                    { id: 'top', icon: AlignLeft },
                    { id: 'center', icon: AlignCenter },
                    { id: 'bottom', icon: AlignRight },
                  ].map((align) => {
                    const Icon = align.icon;
                    return (
                      <button
                        key={align.id}
                        type="button"
                        onClick={() => setAlignVector(align.id as 'top' | 'center' | 'bottom')}
                        className={`
                          flex-1 py-2 flex justify-center text-center transition-colors
                          ${alignVector === align.id ? 'bg-neon text-navy font-bold' : 'hover:bg-white/5 text-cream/60'}
                        `}
                      >
                        <Icon size={14} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Slider for Font Scale */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-cream/50 uppercase tracking-wider text-[10px]">Font Visibility Scale</label>
                <span className="text-neon text-[10px] font-bold">{fontScale}x</span>
              </div>
              <input 
                type="range" 
                min="0.8" 
                max="2.0" 
                step="0.05"
                value={fontScale}
                onChange={(e) => setFontScale(parseFloat(e.target.value))}
                className="w-full accent-neon cursor-pointer"
              />
            </div>

            {/* Video Loop Swap */}
            <div>
              <label className="block text-cream/50 uppercase tracking-wider text-[10px] mb-1.5">Background Loop Stream</label>
              <div className="relative">
                <select
                  value={videoLoopId}
                  onChange={(e) => setVideoLoopId(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-neon rounded px-3 py-2.5 outline-none text-cream appearance-none cursor-pointer"
                >
                  {spaceVideoLoops.map((loop) => (
                    <option key={loop.id} value={loop.id} className="bg-navy-dark text-cream">
                      {loop.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3.5 text-cream/50 pointer-events-none" />
              </div>
            </div>

            {/* Caption & Hashtag Optimization */}
            <div className="space-y-4 pt-2 border-t border-white/5">
              <div>
                <label className="block text-cream/50 uppercase tracking-wider text-[10px] mb-1.5">Optimized Caption Script</label>
                <textarea 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 focus:border-neon rounded px-3 py-2 outline-none text-cream text-[11px] font-mono leading-relaxed"
                  placeholder="Caption script..."
                />
              </div>

              <div>
                <label className="block text-cream/50 uppercase tracking-wider text-[10px] mb-1.5">Hashtags (Comma Separated)</label>
                <input 
                  type="text"
                  value={hashtagsText}
                  onChange={(e) => setHashtagsText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-neon focus:ring-1 focus:ring-neon rounded px-3 py-2 outline-none text-cream text-[11px] font-mono"
                  placeholder="space, voyage, orbit"
                />
              </div>
            </div>

            {/* Scheduler Dispatch Time */}
            <div className="pt-2 border-t border-white/5">
              <label className="block text-amber-400 uppercase tracking-wider text-[10px] mb-1.5 flex items-center gap-1">
                <Calendar size={12} /> Autopilot Release Timestamp
              </label>
              <input 
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full bg-white/5 border border-amber-500/20 focus:border-neon focus:ring-1 focus:ring-neon rounded px-3 py-2.5 outline-none text-cream text-xs font-mono"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/5 font-mono text-xs">
            {onCancel && (
              <button 
                type="button"
                onClick={onCancel}
                className="flex-1 py-3 rounded bg-white/5 hover:bg-white/10 text-cream border border-white/10 transition-colors active:scale-[0.98]"
              >
                Discard Edits
              </button>
            )}
            <button 
              type="submit"
              className="flex-[2] py-3 rounded bg-neon hover:bg-neon-dark text-navy font-bold shadow-[0_0_15px_rgba(111,255,0,0.3)] hover:shadow-[0_0_25px_rgba(111,255,0,0.5)] transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              <Calendar size={14} /> Commit to Autopilot Scheduler
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
