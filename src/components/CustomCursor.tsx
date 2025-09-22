import { useCursor } from '@/hooks/use-cursor';

export function CustomCursor() {
  const { CursorComponent } = useCursor();
  return <CursorComponent />;
}