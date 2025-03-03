import { ReadingLayout } from "@/components/layout/ReadingLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Compass, Timer, Calculator } from "lucide-react";
import { useState, useEffect } from "react";
import { QiblaCompass } from "@/components/tools/QiblaCompass";
import { PrayerTimeIndicator } from "@/components/tools/PrayerTimeIndicator";

type TasbeehType = "zehra" | "custom";

interface TasbeehState {
  count: number;
  target: number;
  type: TasbeehType;
  dhikr: string;
}

interface QiblaState {
  direction: number | null;
  status: "loading" | "error" | "ready";
  errorMessage?: string;
}

interface PrayerTimesState {
  status: "loading" | "error" | "ready";
  errorMessage?: string;
  times?: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
}

export default function Tools() {
  const [tasbeeh, setTasbeeh] = useState<TasbeehState>({
    count: 0,
    target: 34,
    type: "zehra",
    dhikr: "Allahu Akbar"
  });

  const [qibla, setQibla] = useState<QiblaState>({
    direction: null,
    status: "loading"
  });

  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesState>({
    status: "loading"
  });

  useEffect(() => {
    if (tasbeeh.count > 0) {
      // Vibrate on each count if supported
      if ("vibrate" in navigator) {
        navigator.vibrate(50);
      }
    }
  }, [tasbeeh.count]);

  const handleCount = () => {
    const newCount = tasbeeh.count + 1;
    if (newCount > tasbeeh.target) {
      // Move to next dhikr in Tasbeeh Zehra sequence
      if (tasbeeh.type === "zehra") {
        switch (tasbeeh.dhikr) {
          case "Allahu Akbar":
            setTasbeeh({
              count: 1,
              target: 33,
              type: "zehra",
              dhikr: "Alhamdulillah"
            });
            break;
          case "Alhamdulillah":
            setTasbeeh({
              count: 1,
              target: 33,
              type: "zehra",
              dhikr: "Subhanallah"
            });
            break;
          default:
            setTasbeeh({
              count: 0,
              target: 34,
              type: "zehra",
              dhikr: "Allahu Akbar"
            });
        }
      } else {
        setTasbeeh({ ...tasbeeh, count: 0 });
      }
    } else {
      setTasbeeh({ ...tasbeeh, count: newCount });
    }
  };

  const resetTasbeeh = () => {
    setTasbeeh({
      count: 0,
      target: 34,
      type: "zehra",
      dhikr: "Allahu Akbar"
    });
  };

  const initQiblaCompass = () => {
    if (!("DeviceOrientationEvent" in window)) {
      setQibla({
        direction: null,
        status: "error",
        errorMessage: "Device orientation not supported"
      });
      return;
    }

    setQibla({ ...qibla, status: "ready" });
    // Request permission for device orientation
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            setQibla({
              direction: null,
              status: "error",
              errorMessage: "Permission denied"
            });
          }
        })
        .catch(() => {
          setQibla({
            direction: null,
            status: "error",
            errorMessage: "Permission denied"
          });
        });
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.alpha !== null) {
      setQibla({
        direction: event.alpha,
        status: "ready"
      });
    }
  };

  const getPrayerTimes = () => {
    if (!("geolocation" in navigator)) {
      setPrayerTimes({
        status: "error",
        errorMessage: "Geolocation is not supported"
      });
      return;
    }

    setPrayerTimes({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // For now, we'll use placeholder times
        // In a real app, we would calculate these based on location
        setPrayerTimes({
          status: "ready",
          times: {
            fajr: "05:30",
            dhuhr: "12:30",
            asr: "15:45",
            maghrib: "18:15",
            isha: "19:45"
          }
        });
      },
      (error) => {
        setPrayerTimes({
          status: "error",
          errorMessage: "Could not get location. Please enable location services."
        });
      }
    );
  };

  return (
    <ReadingLayout title="Islamic Tools" arabicTitle="الأدوات الإسلامية">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:bg-accent/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              Tasbeeh Counter (Tasbeeh-e-Zehra)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <div className="text-4xl font-bold">{tasbeeh.count}</div>
                <div className="text-lg font-arabic">{tasbeeh.dhikr}</div>
                <div className="text-sm text-muted-foreground">
                  Target: {tasbeeh.target}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleCount}
                >
                  Count
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={resetTasbeeh}
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-accent/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="h-6 w-6" />
              Qibla Compass
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qibla.status === "loading" && (
                <p className="text-muted-foreground text-center">
                  Click below to initialize the Qibla compass
                </p>
              )}
              {qibla.status === "error" && (
                <p className="text-red-500 text-center">
                  {qibla.errorMessage || "Error initializing compass"}
                </p>
              )}
              {qibla.status === "ready" && qibla.direction !== null && (
                <>
                  <QiblaCompass direction={qibla.direction} />
                  <p className="text-sm text-muted-foreground text-center">
                    Point your device's top edge towards the displayed direction
                  </p>
                </>
              )}
              <Button
                variant="outline"
                className="w-full"
                onClick={initQiblaCompass}
                disabled={qibla.status === "ready"}
              >
                {qibla.status === "ready" ? "Compass Active" : "Initialize Compass"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:bg-accent/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-6 w-6" />
              Prayer Times
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prayerTimes.status === "loading" && (
                <p className="text-muted-foreground">
                  Getting prayer times for your location...
                </p>
              )}
              {prayerTimes.status === "error" && (
                <p className="text-red-500">
                  {prayerTimes.errorMessage}
                </p>
              )}
              {prayerTimes.status === "ready" && prayerTimes.times && (
                <div className="space-y-4">
                  <PrayerTimeIndicator times={prayerTimes.times} />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Fajr:</span>
                      <span>{prayerTimes.times.fajr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dhuhr:</span>
                      <span>{prayerTimes.times.dhuhr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Asr:</span>
                      <span>{prayerTimes.times.asr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maghrib:</span>
                      <span>{prayerTimes.times.maghrib}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Isha:</span>
                      <span>{prayerTimes.times.isha}</span>
                    </div>
                  </div>
                </div>
              )}
              <Button
                variant="outline"
                className="w-full"
                onClick={getPrayerTimes}
                disabled={prayerTimes.status === "loading"}
              >
                Get Prayer Times
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ReadingLayout>
  );
}