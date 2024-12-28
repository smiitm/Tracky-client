import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { format, isAfter, isBefore } from "date-fns";

export function LogSession() {
  // State to store date, start time, end time, and duration
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<number | null>(null); // Minutes since midnight
  const [endTime, setEndTime] = useState<number | null>(null); // Minutes since midnight
  const [duration, setDuration] = useState<string | null>(null);
  const [startTimeInput, setStartTimeInput] = useState<string>(""); // Raw input for start time
  const [endTimeInput, setEndTimeInput] = useState<string>(""); // Raw input for end time
  const [error, setError] = useState<string | null>(null); // Validation errors

  // Utility: Convert HH:MM to minutes since midnight
  const timeToMinutes = (time: string): number | null => {
    const match = time.match(/^(\d{2}):(\d{2})$/); // Validate HH:MM format
    if (!match) return null;
    const [_, hours, minutes] = match.map(Number);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
    return hours * 60 + minutes;
  };

  // Utility: Validate the selected date
  const isDateValid = (date: Date): boolean => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    return !isAfter(date, today) && !isBefore(date, oneWeekAgo);
  };

  // Handle duration and validations whenever inputs change
  useEffect(() => {
    if (startTime !== null && endTime !== null) {
      const minutes = endTime - startTime;

      if (minutes >= 15) {
        setDuration(`${Math.floor(minutes / 60)} hrs ${minutes % 60} mins`);
        setError(null); // Reset error if duration is valid
      } else {
        setDuration(null);
        setError("Duration must be at least 15 minutes.");
      }
    }
  }, [startTime, endTime]);

  // Handle input validation for start and end times
  const handleStartTimeChange = (value: string) => {
    setStartTimeInput(value);
    const minutes = timeToMinutes(value);
    setStartTime(minutes);
  };

  const handleEndTimeChange = (value: string) => {
    setEndTimeInput(value);
    const minutes = timeToMinutes(value);
    setEndTime(minutes);
  };

  // Handle date selection and validation
  const handleDateChange = (date: Date | undefined) => {
    if (!date || !isDateValid(date)) {
      setSelectedDate(null);
      setError("Date must be within the last week and cannot be in the future.");
    } else {
      setSelectedDate(date);
      setError(null); // Reset error if date is valid
    }
  };

  return (
    <Card>
      <form>
        <CardHeader>
          <CardTitle>Log Session</CardTitle>
          <CardDescription>Log a new session for a routine.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" w-full items-center gap-4 space-y-4">
            <div className="flex space-x-4">
              {/* Routine Picker */}
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label htmlFor="framework">Routine</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Picker */}
              <div className="w-1/2">
                <label className="block text-sm font-medium">Select Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {selectedDate ? format(selectedDate, "dd-MM-yyyy") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate || undefined}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {selectedDate === null && (
                  <p className="text-xs text-red-500">
                    {error || "Date must be within the last 7 days."}
                  </p>
                )}
              </div>
            </div>

            {/* Time Picker */}
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium">Start Time</label>
                <Input
                  type="text"
                  placeholder="HH:MM"
                  value={startTimeInput}
                  onChange={(e) => handleStartTimeChange(e.target.value)}
                  className={startTime === null && startTimeInput ? "border-red-500" : ""}
                />
                {startTime === null && startTimeInput && (
                  <p className="text-xs text-red-500">Invalid time format. Use HH:MM.</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium">End Time</label>
                <Input
                  type="text"
                  placeholder="HH:MM"
                  value={endTimeInput}
                  onChange={(e) => handleEndTimeChange(e.target.value)}
                  className={endTime === null && endTimeInput ? "border-red-500" : ""}
                />
                {endTime === null && endTimeInput && (
                  <p className="text-xs text-red-500">Invalid time format. Use HH:MM.</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between space-x-8">
          <div>
            <CardDescription>Session duration:</CardDescription>
            {error && <CardDescription>{error}</CardDescription>}
            {duration && <CardDescription>{duration}</CardDescription>}
          </div>
          <Button
            disabled={
              !selectedDate || startTime === null || endTime === null || error !== null
            }
          >
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
