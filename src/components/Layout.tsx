import React from 'react';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  CalendarRange, 
  MessageSquareCode,
  Radio,
  Cpu,
  Globe2,
  Menu,
  X
} from 'lucide-react';
import type { SystemStatus } from '../types';

interface LayoutProps {
  currentView: string;
  setView: (view: string) => void;
  systemStatus: SystemStatus;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ 
  currentView, 
  setView, 
  systemStatus, 
  children 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', name: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'content-lab', name: 'Brain & Content Lab', icon: BrainCircuit },
    { id: 'scheduler', name: 'Automation Calendar', icon: CalendarRange },
    { id: 'interactivity', name: 'Interactivity Stream', icon: MessageSquareCode },
  ];

  return (
    <div className="min-h-screen bg-navy text-cream flex flex-col md:flex-row relative selection:bg-neon selection:text-navy">
      {/* Full screen Space texture overlay */}
      <div className="space-texture" />

      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between p-4 bg-navy-dark border-b border-white/5 z-50">
        <div className="flex flex-col">
          <span className="font-anton text-2xl text-neon tracking-wider drop-shadow-[0_0_8px_rgba(111,255,0,0.5)]">
            BIGIL
          </span>
          <span className="font-condiment text-xs text-cream/70 -mt-1 pl-1">
            social intelligence engine
          </span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-cream/80 hover:text-neon transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-navy-dark/95 border-r border-white/5 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:bg-navy-dark/40
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Identity Header */}
        <div className="p-6 border-b border-white/5">
          <div className="hidden md:flex flex-col mb-2">
            <span className="font-anton text-5xl text-neon tracking-widest leading-none drop-shadow-[0_0_12px_rgba(111,255,0,0.6)]">
              BIGIL
            </span>
            <span className="font-condiment text-lg text-cream/80 pl-2 mt-1">
              social intelligence engine
            </span>
          </div>
          
          <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-2 rounded-lg mt-4">
            <Cpu size={16} className={systemStatus.autopilotActive ? 'text-neon animate-pulse' : 'text-cream/40'} />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-cream/40 font-mono tracking-wider">Engine Status</span>
              <span className="text-xs font-semibold font-mono">
                {systemStatus.autopilotActive ? (
                  <span className="text-neon">AUTOPILOT ARMED</span>
                ) : (
                  <span className="text-cream/60">MANUAL OVERRIDE</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-4 px-4 py-3 rounded-lg text-left font-mono text-sm transition-all duration-200 group
                  ${isActive 
                    ? 'bg-neon/10 text-neon border-l-2 border-neon font-bold drop-shadow-[0_0_6px_rgba(111,255,0,0.2)]' 
                    : 'text-cream/70 hover:text-cream hover:bg-white/5 border-l-2 border-transparent'
                  }
                `}
              >
                <Icon size={18} className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-neon' : 'text-cream/50'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* System Connections and Health Checkpoints */}
        <div className="p-6 border-t border-white/5 bg-navy-dark/60 space-y-4">
          <div className="space-y-2 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-wider text-cream/40">Real-time Pipelines</span>
            
            <div className="flex items-center justify-between py-1 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <Globe2 size={12} className="text-cream/40" />
                <span className="text-cream/80">Meta Graph Core</span>
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon"></span>
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <Radio size={12} className="text-cream/40" />
                <span className="text-cream/80">Instagram Graph API</span>
              </div>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon"></span>
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-cream/80">Pipeline Health</span>
              <span className="text-neon font-semibold">{systemStatus.pipelineHealth}%</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-neon h-full transition-all duration-500 shadow-[0_0_8px_#6FFF00]"
                style={{ width: `${systemStatus.pipelineHealth}%` }}
              />
            </div>
          </div>

          <div className="text-[10px] text-cream/30 text-center font-mono">
            BIGIL v1.0.0 • Space liquid-glass
          </div>
        </div>
      </aside>

      {/* Main Workspace container */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto px-4 md:px-8 py-6 relative z-10">
        {children}
      </main>
    </div>
  );
};
