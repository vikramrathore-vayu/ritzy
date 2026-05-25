import React from 'react';
import { 
  BrainCircuit, 
  Settings, 
  Sparkles, 
  ArrowRight, 
  Loader2,
  CheckCircle,
  Lightbulb
} from 'lucide-react';
import type { OnboardingData, ScheduledPost } from '../types';
import { sampleGeneratedIdeas } from '../mockData';
import { DesignStudio } from './DesignStudio';

interface ContentLabProps {
  onboarding: OnboardingData;
  setOnboarding: React.Dispatch<React.SetStateAction<OnboardingData>>;
  onSchedulePost: (post: Omit<ScheduledPost, 'id' | 'status'> & { id?: string; scheduledTime: string }) => void;
}

export const ContentLab: React.FC<ContentLabProps> = ({
  onboarding,
  setOnboarding,
  onSchedulePost,
}) => {
  const [ideas, setIdeas] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingStep, setLoadingStep] = React.useState(0);
  const [selectedIdea, setSelectedIdea] = React.useState<any | null>(null);

  // Editable onboarding values in local state to allow saving on click
  const [industry, setIndustry] = React.useState(onboarding.industry);
  const [goal, setGoal] = React.useState(onboarding.goal);
  const [targetAudience, setTargetAudience] = React.useState(onboarding.targetAudience);
  const [toneOfVoice, setToneOfVoice] = React.useState(onboarding.toneOfVoice);

  const loadingSteps = [
    'Synthesizing brand identity vectors...',
    'Analyzing target demographic psychographics...',
    'Querying LLM prompt arrays for concept angles...',
    'Refining visual composition guidelines & caption scripts...',
    'Compiling strategy hooks...'
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setOnboarding({
      industry,
      goal,
      targetAudience,
      toneOfVoice,
    });
    alert('Onboarding brand profile updated in active state!');
  };

  const handleGenerateHooks = () => {
    setLoading(true);
    setLoadingStep(0);
    setIdeas([]);
    setSelectedIdea(null);

    // Simulate structural prompt loop over several seconds
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            // Spit out 5 distinct high-concept ideas
            const loadedIdeas = sampleGeneratedIdeas.map((idea, index) => ({
              ...idea,
              id: `gen-idea-${Date.now()}-${index}`,
            }));
            setIdeas(loadedIdeas);
            setLoading(false);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 900);
  };

  const handleScheduleFromStudio = (studioData: Omit<ScheduledPost, 'id' | 'status'> & { id?: string; scheduledTime: string }) => {
    onSchedulePost(studioData);
    // Reset selected idea to close studio
    setSelectedIdea(null);
    alert('Successfully scheduled and queued post on dispatcher!');
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-3xl font-anton text-cream tracking-wide flex items-center gap-2">
          Strategic Brain & Content Lab
        </h1>
        <p className="text-xs text-cream/50 font-mono">
          Feed brand attributes, generate concept loops, and compile mock visual layouts
        </p>
      </div>

      {/* Onboarding and Prompt Generator Row */}
      {!selectedIdea && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Brand Onboarding Workspace (5 cols) */}
          <form onSubmit={handleSaveProfile} className="liquid-glass p-5 lg:col-span-5 space-y-4">
            <div className="border-b border-white/5 pb-3 flex items-center gap-2">
              <Settings size={16} className="text-cream/50" />
              <h2 className="text-sm font-anton text-cream tracking-wider uppercase">Onboarding Brand Profile</h2>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-cream/40 text-[9px] uppercase tracking-wider mb-1">Brand Industry / Sector</label>
                <input 
                  type="text" 
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-2 outline-none text-cream"
                />
              </div>

              <div>
                <label className="block text-cream/40 text-[9px] uppercase tracking-wider mb-1">Primary Campaign Goal</label>
                <textarea 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-2 outline-none text-cream text-[11px] leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-cream/40 text-[9px] uppercase tracking-wider mb-1">Target Audience Profile</label>
                <textarea 
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-2 outline-none text-cream text-[11px] leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-cream/40 text-[9px] uppercase tracking-wider mb-1">Brand Voice / Persona</label>
                <input 
                  type="text" 
                  value={toneOfVoice}
                  onChange={(e) => setToneOfVoice(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-2 outline-none text-cream"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                type="submit"
                className="flex-1 py-2 text-center text-xs font-mono rounded bg-white/5 border border-white/10 hover:bg-white/10 text-cream transition-colors"
              >
                Update Attributes
              </button>
              
              <button 
                type="button" 
                onClick={handleGenerateHooks}
                disabled={loading}
                className="flex-[1.5] py-2 text-center text-xs font-mono rounded bg-neon hover:bg-neon-dark text-navy font-bold shadow-[0_0_12px_rgba(111,255,0,0.2)] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BrainCircuit size={14} className={loading ? "animate-spin" : ""} />
                Generate Strategy Hooks
              </button>
            </div>
          </form>

          {/* AI Generator Interface output (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Loading Loop */}
            {loading && (
              <div className="liquid-glass p-8 flex flex-col items-center justify-center min-h-[350px] space-y-4">
                <Loader2 size={36} className="text-neon animate-spin" />
                <div className="space-y-1.5 text-center font-mono">
                  <h3 className="text-cream text-sm font-bold">Synthesizing Prompt Array</h3>
                  <div className="text-[10px] text-neon animate-pulse">
                    {loadingSteps[loadingStep]}
                  </div>
                </div>
                <div className="w-48 bg-white/5 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-neon h-full transition-all duration-300"
                    style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Default state: No generated ideas yet */}
            {!loading && ideas.length === 0 && (
              <div className="liquid-glass p-8 flex flex-col items-center justify-center min-h-[350px] text-center space-y-4 border border-dashed border-white/10">
                <Lightbulb size={40} className="text-cream/20" />
                <div className="space-y-1">
                  <h3 className="text-cream font-anton text-lg tracking-wider">Strategic Generator Idle</h3>
                  <p className="text-xs text-cream/40 max-w-sm font-mono">
                    Click "Generate Strategy Hooks" to trigger the active LLM ideation sequence and compile 5 customized social post blueprints.
                  </p>
                </div>
              </div>
            )}

            {/* Output List */}
            {!loading && ideas.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] text-cream/40 uppercase tracking-widest font-mono flex items-center gap-1">
                    <Sparkles size={12} className="text-neon" /> 5 Concepts Ready
                  </span>
                  <span className="text-[10px] text-neon uppercase font-mono">
                    Click concept to load Studio Canvas
                  </span>
                </div>

                <div className="space-y-3">
                  {ideas.map((idea, index) => (
                    <div 
                      key={idea.id}
                      onClick={() => setSelectedIdea(idea)}
                      className="liquid-glass p-4 hover:bg-white/[0.04] transition-all cursor-pointer border-l-2 border-transparent hover:border-neon font-mono group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="h-5 w-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-neon font-bold">
                            {index + 1}
                          </span>
                          <h3 className="text-cream font-bold text-sm tracking-wide group-hover:text-neon transition-colors">
                            {idea.title}
                          </h3>
                        </div>
                        <span className="text-[9px] text-cream/30 border border-white/10 px-2 py-0.5 rounded uppercase">
                          Blueprint
                        </span>
                      </div>
                      
                      <p className="text-xs text-cream/60 line-clamp-2 pl-7">
                        {idea.theme}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3 pl-7">
                        <div className="flex gap-1.5">
                          {idea.hashtags.slice(0, 3).map((tag: string, i: number) => (
                            <span key={i} className="text-[9px] text-cream/40">#{tag}</span>
                          ))}
                        </div>
                        <span className="text-[10px] text-neon flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Open Canvas Studio <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Selected Idea - Open Design Studio Canvas */}
      {selectedIdea && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white/5 border border-white/10 p-3 rounded-lg font-mono text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-neon" />
              <span>Loaded Idea: <strong>{selectedIdea.title}</strong></span>
            </div>
            <button 
              onClick={() => setSelectedIdea(null)}
              className="text-cream/50 hover:text-cream underline"
            >
              Back to Lab
            </button>
          </div>

          <DesignStudio 
            activePost={selectedIdea}
            onSchedule={handleScheduleFromStudio}
            onCancel={() => setSelectedIdea(null)}
          />
        </div>
      )}

    </div>
  );
};
