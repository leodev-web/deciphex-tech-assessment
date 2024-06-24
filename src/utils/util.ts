export function capitalizeFirstWord(str: string) {
  if (!str) return str; // Handle empty or null strings
  if (str.toLowerCase() === 'pending') return 'In Progress'; // Handle 'pending' case
  return str.charAt(0).toUpperCase() + str.slice(1);
}
