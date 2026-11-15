export const themeScript =
  'try{var t=JSON.parse(localStorage.getItem("theme"));if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}';

export const themeScriptHash = async (): Promise<string> => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(themeScript));
  const binary = String.fromCharCode(...new Uint8Array(digest));

  return `'sha256-${btoa(binary)}'`;
};
