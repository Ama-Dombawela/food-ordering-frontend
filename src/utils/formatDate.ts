// Produces readable dates such as "January 15, 2025".
export const formatDate = (date: string | Date): string => {
  const dateValue = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateValue);
};