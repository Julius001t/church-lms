import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  duration: number;
  onTimeUp: () => void;
}

export default function Timer({
  duration,
  onTimeUp,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(
    duration * 60
  );

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = window.setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;

  const isWarning = timeLeft <= 60;

  return (
    <div
      className={`flex items-center gap-2 rounded-xl border px-4 py-3 ${
        isWarning
          ? "border-red-200 bg-red-50 text-red-600"
          : "border-gray-200 bg-white text-gray-700"
      }`}
    >
      <Clock size={20} />

      <div>
        <p className="text-xs text-gray-500">
          Time remaining
        </p>

        <p className="font-bold">
          {formattedTime}
        </p>
      </div>
    </div>
  );
}