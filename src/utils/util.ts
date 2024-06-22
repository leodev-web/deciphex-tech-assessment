export function capitalizeFirstWord(str: string) {
  if (str.toLowerCase() === 'pending') return 'In Progress'; // Handle 'pending' case
  if (!str) return str; // Handle empty or null strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}
