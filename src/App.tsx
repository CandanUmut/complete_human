import { useEffect, useState } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { TodayView } from './components/today/TodayView';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { PracticeLibrary } from './components/practices/PracticeLibrary';
import { ToolsView } from './components/tools/ToolsView';
import { ProgressView } from './components/progress/ProgressView';
import { SettingsView } from './components/settings/SettingsView';
import { Onboarding } from './components/onboarding/Onboarding';

export type Route = 'today' | 'roadmap' | 'practices' | 'tools' | 'progress' | 'settings';

const parseHash = (): Route => {
  const h = window.location.hash.replace('#/', '').replace('#', '');
  const r = h as Route;
  if (['today', 'roadmap', 'practices', 'tools', 'progress', 'settings'].includes(r)) return r;
  return 'today';
};

export default function App() {
  const { state } = useApp();
  const [route, setRoute] = useState<Route>(parseHash());

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = (r: Route) => {
    window.location.hash = `/${r}`;
  };

  if (!state.settings.onboardingComplete) return <Onboarding />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header route={route} go={go} />
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-6 pb-28 md:pb-10 pt-4 fade-in" key={route}>
        {route === 'today' && <TodayView go={go} />}
        {route === 'roadmap' && <RoadmapView />}
        {route === 'practices' && <PracticeLibrary />}
        {route === 'tools' && <ToolsView />}
        {route === 'progress' && <ProgressView />}
        {route === 'settings' && <SettingsView />}
      </main>
      <BottomNav route={route} go={go} />
    </div>
  );
}
