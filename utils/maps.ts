import { MAPS_API_KEY } from '../configs/mapsConfig';

// FIX: Extend the Window interface to include the google object for TypeScript.
// This allows using `window.google` without type errors.
declare global {
  interface Window {
    google: any;
  }
}

export const loadGoogleMapsScript = (callback: () => void, libraries: string = 'marker,places') => {
  const scriptId = 'googleMapsScript';
  
  // If the script is already loaded, just run the callback.
  if (typeof window.google !== 'undefined' && window.google.maps) {
    callback();
    return;
  }
  
  const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
  
  const scriptLoadHandler = () => {
    callback();
  };

  if (!existingScript) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=${libraries}`;
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.addEventListener('load', scriptLoadHandler);
  } else {
     // If the script exists, it's either loading or has already loaded.
     // Add an event listener. If it's already loaded, the check at the top handles it.
     // If it's currently loading, our handler will be called when it's done.
     existingScript.addEventListener('load', scriptLoadHandler);
  }
};
