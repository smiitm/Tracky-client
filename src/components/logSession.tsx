import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, isAfter, isBefore } from "date-fns";
import { useSession } from "../context/SessionContext";
import { toast } from "sonner"
import { NewRoutine } from "@/components/newRoutine"

export function LogSession() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<number | null>(null); // Minutes since midnight
  const [endTime, setEndTime] = useState<number | null>(null); // Minutes since midnight
  const [duration, setDuration] = useState<string | null>(null);
  const [startTimeInput, setStartTimeInput] = useState<string>(""); // Raw input for start time
  const [endTimeInput, setEndTimeInput] = useState<string>(""); // Raw input for end time
  const [error, setError] = useState<string | null>(null); // Validation errors

  const timeToMinutes = (time: string): number | null => {
    const match = time.match(/^(\d{2}):(\d{2})$/); // Validate HH:MM format
    if (!match) return null;
    const [_, hours, minutes] = match.map(Number);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
    return hours * 60 + minutes;
  };

  const isDateValid = (date: Date): boolean => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    return !isAfter(date, today) && !isBefore(date, oneWeekAgo);
  };

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

  const handleDateChange = (date: Date | undefined) => {
    if (!date || !isDateValid(date)) {
      setSelectedDate(null);
      setError("Date must be within the last week and cannot be in the future.");
    } else {
      setSelectedDate(date);
      setError(null); // Reset error if date is valid
    }
  };

  const { session } = useSession();

  // Handle form submission
  const handleSubmit = async () => {

    if (!session || !session.user) {
      console.error("User is not authenticated.");
      setError("User is not authenticated. Please log in.");
      return;
    }

    const userId = session.user.id;

    // Ensure all fields are valid before proceeding
    if (!userId || !startTime || !endTime || !selectedDate) {
      console.error("Missing required fields.");
      setError("All fields must be filled out correctly.");
      return;
    }
    console.log({ selectedDate, startTime, endTime, error });
    const sessionData = {
      userId: userId,
      routineId: 1, // Replace with dynamic value later
      startTime: startTime,
      endTime: endTime,
      duration: (endTime! - startTime!),
      sessionDate: selectedDate,
    };

    try {
      console.log("Submitting session data:", sessionData); // Log data before the request
      const response = await fetch("http://localhost:5000/api/sessions/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Session logged successfully")
        console.log("Session logged successfully:", result);
        setError(null); // Clear any previous errors
      } else {
        toast.error("Failed to log session:", result.error)
        console.error("Failed to log session:", result.error);
        setError(result.error || "Failed to log session.");
      }
    } catch (error) {
      console.error("Error logging session:", error);
      setError("An error occurred while logging the session.");
    }
  };

  return (
    <>
      <div className="w-full mx-8">
        <h2 className="text-lg font-medium">Log a new session for a routine.</h2>
        <form>
          <div className="grid grid-cols-2 pt-4 space-x-4">
            <div className="grid grid-cols-2 space-x-4">
              {/* Routine Picker */}
              {/* This needs to be a seprate comp */}
              <div className="flex flex-col space-y-1.5">
                <Label className="text-muted-foreground px-1">Routine</Label>
                <Select>
                  <SelectTrigger id="routine">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    <SelectItem value="new"><NewRoutine/></SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Picker */}
              <div className="">
                <Label className="block text-sm font-medium text-muted-foreground px-1">Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full">
                      {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Pick a date"}
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
            <div className="grid grid-cols-2 space-x-4">
              <div>
                <Label className="block text-sm font-medium text-muted-foreground px-1">Start Time</Label>
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
                <Label className="block text-sm font-medium text-muted-foreground px-1">End Time</Label>
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


          <div className="flex justify-between space-x-8 pt-4">
            <div className="text-muted-foreground text-sm">
              <p >Session duration:</p>
              {error && <p>{error}</p>}
              {duration && <p>{duration}</p>}
            </div>

            <Button
              disabled={
                !selectedDate || startTime === null || endTime === null || error !== null
              }
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
