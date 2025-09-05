import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc"; // import UTC plugin

dayjs.extend(relativeTime);
dayjs.extend(utc);

export const formatPostDate = (dateString: string) => {
  // Convert UTC timestamp from Supabase to local time
  const date = dayjs.utc(dateString).local();
  const now = dayjs();

  if (now.diff(date, "day") < 1) {
    return date.fromNow(); // shows "just now" for recent posts
  } else {
    return date.format("MMM D, YYYY"); // fallback date
  }
};
