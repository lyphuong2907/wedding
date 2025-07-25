export default function useEmitter() {
  const hooks = useNuxtApp().hooks;

  return {
    emit: hooks.callHook,
    on: hooks.hook,
  };
}
