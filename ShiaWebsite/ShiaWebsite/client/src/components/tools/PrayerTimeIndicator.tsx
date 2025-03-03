import { useMemo } from 'react';
import { Progress } from "@/components/ui/progress";

interface PrayerTimeIndicatorProps {
  times: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
}

export function PrayerTimeIndicator({ times }: PrayerTimeIndicatorProps) {
  const getCurrentPrayer = useMemo(() => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const timeToMinutes = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const prayerTimes = [
      { name: 'Fajr', time: timeToMinutes(times.fajr) },
      { name: 'Dhuhr', time: timeToMinutes(times.dhuhr) },
      { name: 'Asr', time: timeToMinutes(times.asr) },
      { name: 'Maghrib', time: timeToMinutes(times.maghrib) },
      { name: 'Isha', time: timeToMinutes(times.isha) }
    ];

    let currentPrayer = 'Night';
    let nextPrayer = prayerTimes[0];
    let progress = 0;

    for (let i = 0; i < prayerTimes.length; i++) {
      if (currentTime < prayerTimes[i].time) {
        if (i === 0) {
          currentPrayer = 'Night';
          nextPrayer = prayerTimes[i];
        } else {
          currentPrayer = prayerTimes[i - 1].name;
          nextPrayer = prayerTimes[i];
        }
        const duration = nextPrayer.time - (i === 0 ? 0 : prayerTimes[i - 1].time);
        const elapsed = currentTime - (i === 0 ? 0 : prayerTimes[i - 1].time);
        progress = (elapsed / duration) * 100;
        break;
      }
    }

    if (currentTime >= prayerTimes[prayerTimes.length - 1].time) {
      currentPrayer = 'Night';
      nextPrayer = { name: 'Fajr', time: prayerTimes[0].time + 24 * 60 };
      const duration = (nextPrayer.time - prayerTimes[prayerTimes.length - 1].time);
      const elapsed = currentTime - prayerTimes[prayerTimes.length - 1].time;
      progress = (elapsed / duration) * 100;
    }

    return { currentPrayer, nextPrayer, progress };
  }, [times]);

  const { currentPrayer, nextPrayer, progress } = getCurrentPrayer;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Current: {currentPrayer}</span>
        <span>Next: {nextPrayer.name}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}