import { now, measure } from '@/analytics';
import { log } from '@/utils';

const start = now();

export function onAppLaunched() {
  const end = now();
  log(`🔥 App launched in ${end - start}ms!`);
  measure('🔥 App launch', start, end);
}
