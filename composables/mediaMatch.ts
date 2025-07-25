export function useMatchMedia() {
    const queries = ref({});
  
    function add(query: string, callback: () => void) {
      const mediaQuery = window.matchMedia(query);
      const handler = () => {
        if (mediaQuery.matches) {
          callback();
        }
      };
  
      // Run handler immediately if the query matches
      handler();
  
      // Add event listener for changes
      mediaQuery.addEventListener('change', handler);
      queries.value[query] = { mediaQuery, handler };
    }
  
    function kill() {
      Object.values(queries.value).forEach(({ mediaQuery, handler }: { mediaQuery: MediaQueryList; handler: () => void }) => {
        mediaQuery.removeEventListener('change', handler);
      });
      queries.value = {};
    }
  
    onUnmounted(kill);
  
    return { add, kill };
  }