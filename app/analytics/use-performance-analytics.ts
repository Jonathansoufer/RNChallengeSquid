import React, { ProfilerOnRenderCallback, useEffect } from 'react';

import performance, {
  setResourceLoggingEnabled,
  PerformanceObserver,
} from 'react-native-performance';
import type { PerformanceReactNativeMark } from 'react-native-performance';

import { log } from '@/utils/console';

import { Events, track } from '../analytics';

setResourceLoggingEnabled(true);

export const traceRender: ProfilerOnRenderCallback = (
  id, // the "id" prop of the Profiler tree that has just committed
  _phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  _baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  _commitTime, // when React committed this update
  _interactions, // the Set of interactions belonging to this update
) =>
  performance.measure(id, {
    start: performance.timeOrigin + startTime,
    duration: actualDuration,
  });

const formatValue = (value: number, unit?: string) => {
  switch (unit) {
    case 'ms':
      return `${value.toFixed(1)}ms`;
    case 'byte':
      return `${(value / 1024 / 1024).toFixed(1)}MB`;
    default:
      return value.toFixed(1);
  }
};

export const now = () => performance.now();
export const measure = (metric: string, start: number, end: number) => {
  performance.metric(metric, end - start);
  performance.measure(metric, {
    start,
    end,
  });

  log(`🏎  ${metric}: ${(end - start).toFixed()}ms`);
};

type PerfMetrics = {
  bundleSize?: string; // Size of the JS bundle
  appLaunchTime?: string; // Time from native app launch to initial component mounted and presented to the user
  nativeLaunch?: string; // Native process initialization time
  runJsBundle?: string; // Parse and execution time of the JS bundle
};

export function usePerformanceAnalytics() {
  const [bundleSize, setBundleSize] = React.useState<string>('');
  const [perfMetrics, setPerfMetrics] = React.useState<PerfMetrics>({});
  const [tracked, setTracked] = React.useState<boolean>(false);

  useEffect(() => {
    new PerformanceObserver(() => {
      let nativeLaunchStart: number,
        contentAppeared: number,
        nativeLaunch: number,
        runJsBundle: number;

      setPerfMetrics(
        performance
          .getEntriesByType('react-native-mark')
          .sort(
            (a: PerformanceReactNativeMark, b: PerformanceReactNativeMark) =>
              a.startTime - b.startTime,
          )
          .reduce(
            (acc: PerfMetrics, { name, startTime }) => {
              // Native process initialization
              if (name.startsWith('nativeLaunchStart')) {
                nativeLaunchStart = startTime - performance.timeOrigin;
              }
              if (name.startsWith('contentAppeared')) {
                contentAppeared = startTime - performance.timeOrigin;
                acc.appLaunchTime = `${(
                  nativeLaunchStart * -1 +
                  contentAppeared
                ).toFixed(1)}ms`;
              }
              if (name.startsWith('nativeLaunchEnd')) {
                nativeLaunch =
                  (nativeLaunchStart - (startTime - performance.timeOrigin)) *
                  -1;
                acc.nativeLaunch = `${nativeLaunch.toFixed(1)}ms`;
              }

              // Parse and execution of the bundle
              if (name.startsWith('runJsBundleStart')) {
                runJsBundle = startTime - performance.timeOrigin;
              }
              if (name.startsWith('runJsBundleEnd')) {
                runJsBundle =
                  (runJsBundle - (startTime - performance.timeOrigin)) * -1;
                acc.runJsBundle = `${runJsBundle.toFixed(1)}ms`;
              }

              return acc;
            },
            {
              appLaunchTime: '',
              nativeLaunch: '',
              runJsBundle: '',
            },
          ),
      );
    }).observe({ type: 'react-native-mark', buffered: true });

    new PerformanceObserver(() => {
      setBundleSize(
        formatValue(
          (performance
            .getEntriesByType('metric')
            .find(({ name }) => name === 'bundleSize')?.value as number) || 0,
          'byte',
        ),
      );
    }).observe({ type: 'metric', buffered: true });
  }, []);

  useEffect(() => {
    if (tracked) return;
    if (!bundleSize || !perfMetrics.runJsBundle) return;

    track(Events.PERFORMANCE_METRICS, { ...perfMetrics, bundleSize });
    setTracked(true);
  }, [tracked, bundleSize, perfMetrics]);
}
