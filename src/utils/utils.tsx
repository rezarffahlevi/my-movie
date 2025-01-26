 
  export function capitalize(str: string) {
    return str.toUpperCase();
  }
  
  export function currencyFormat(number: number, currency?: string | undefined) {
    return `${currency || 'Rp'}${numberFormat(number)}`;
  }
  
  export function numberFormat(number: number, separator = '.'): string {
    return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator}`);
  }
  export function objectToQueryParams(
    params?: Record<string, any> | undefined,
  ): string {
    if (params)
      return (
        `?` +
        Object.entries(params)
          .filter(([_, value]) => value !== undefined && value !== null) // Skip undefined or null values
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
          )
          .join('&')
      );
    else return '';
  }
  
  export const minutesToHours = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60); // Get the number of full hours
    const minutes = totalMinutes % 60;         // Get the remaining minutes
    return `${hours}h ${minutes}m`;            // Format as "Xh Ym"
  };
  