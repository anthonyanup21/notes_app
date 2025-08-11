export const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",   // e.g., Jan
    day: "numeric",   // e.g., 9
    year: "numeric"   // e.g., 2025
  });
};
