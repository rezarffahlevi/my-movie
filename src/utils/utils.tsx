export function titleCase(str: string) {
    if (str != '') {
      let strSplit = str?.split(' ');
      if (strSplit[strSplit.length - 1].length <= 4) {
        return capitalize(str);
      }
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    return '';
  }
  
  export function capitalize(str: string) {
    return str.toUpperCase();
  }
  
  export function currencyFormat(number: number, currency?: string | undefined) {
    return `${currency || 'Rp'}${numberFormat(number)}`;
  }
  
  export function numberFormat(number: number) {
    return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
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
  
  export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number,
  ): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }