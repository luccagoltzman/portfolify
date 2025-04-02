import Home from '@/app/page';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function AppPage() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
} 