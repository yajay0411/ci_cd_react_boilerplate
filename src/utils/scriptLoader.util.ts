const loadedScripts: Record<string, Promise<void> | undefined> = {};

export const loadScript = (src: string, id?: string): Promise<void> => {
  if (loadedScripts[src]) {
    return loadedScripts[src]!; // return cached promise
  }

  loadedScripts[src] = new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    if (id) script.id = id;
    script.async = true;

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));

    document.body.appendChild(script);
  });

  return loadedScripts[src];
};

export const removeScript = (srcOrId: string): void => {
  const script =
    document.querySelector<HTMLScriptElement>(`script[src="${srcOrId}"]`) ||
    document.getElementById(srcOrId);

  if (script) {
    script.remove();
    delete loadedScripts[srcOrId];
  }
};
