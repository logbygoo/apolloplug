import { MAPS_API_KEY } from '../configs/mapsConfig';

// FIX: Extend the Window interface to include the google object for TypeScript.
// This allows using `window.google` without type errors.
declare global {
  interface Window {
    google: any;
    __apolloplugGoogleMapsInit?: () => void;
  }
}

const scriptId = 'googleMapsScript';
let googleMapsPromise: Promise<any> | null = null;

const ensureGoogleMapsLoaded = (): Promise<any> => {
  if (typeof window.google !== 'undefined' && window.google?.maps) {
    return Promise.resolve(window.google);
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    const callbackName = '__apolloplugGoogleMapsInit';
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    window[callbackName] = () => {
      resolve(window.google);
      delete window[callbackName];
    };

    const scriptErrorHandler = () => {
      reject(new Error('Google Maps script failed to load'));
      delete window[callbackName];
    };

    if (existingScript) {
      existingScript.addEventListener('error', scriptErrorHandler, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&v=weekly&loading=async&callback=${callbackName}`;
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    script.addEventListener('error', scriptErrorHandler, { once: true });
    document.body.appendChild(script);
  });

  return googleMapsPromise;
};

const loadRequestedLibraries = async (googleMaps: any, libraries: string) => {
  const uniqueLibraries = Array.from(
    new Set(
      libraries
        .split(',')
        .map((lib) => lib.trim())
        .filter(Boolean),
    ),
  );

  if (!uniqueLibraries.length || typeof googleMaps?.maps?.importLibrary !== 'function') {
    return;
  }

  await Promise.all(uniqueLibraries.map((lib) => googleMaps.maps.importLibrary(lib)));
};

export const loadGoogleMapsScript = (callback: () => void, libraries: string = 'marker,places') => {
  void ensureGoogleMapsLoaded()
    .then(async (googleMaps) => {
      await loadRequestedLibraries(googleMaps, libraries);
      callback();
    })
    .catch(() => {
      // Keep behavior stable for callers that already guard against missing maps.
    });
};

export const loadGoogleMapsScriptAsync = async (libraries: string = 'marker,places') => {
  const googleMaps = await ensureGoogleMapsLoaded();
  await loadRequestedLibraries(googleMaps, libraries);
  return googleMaps;
};

export const removeMapMarker = (marker: any) => {
  if (!marker) return;
  if (typeof marker.setMap === 'function') {
    marker.setMap(null);
    return;
  }
  marker.map = null;
};

export const createCircleMarkerElement = (color: string) => {
  const dot = document.createElement('div');
  dot.style.width = '14px';
  dot.style.height = '14px';
  dot.style.borderRadius = '9999px';
  dot.style.border = '2px solid #ffffff';
  dot.style.background = color;
  dot.style.boxSizing = 'border-box';
  return dot;
};

export const createSvgMarkerElement = (svgMarkup: string) => {
  const wrapper = document.createElement('div');
  wrapper.style.width = '36px';
  wrapper.style.height = '36px';
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.justifyContent = 'center';
  wrapper.innerHTML = svgMarkup.trim();
  return wrapper;
};

export const createAdvancedMarker = (googleMaps: any, options: { map: any; position: any; title: string; content?: HTMLElement }) => {
  const markerApi = googleMaps?.maps?.marker;
  if (markerApi?.AdvancedMarkerElement) {
    return new markerApi.AdvancedMarkerElement(options);
  }

  return new googleMaps.maps.Marker({
    map: options.map,
    position: options.position,
    title: options.title,
  });
};

export const createPinMarker = (googleMaps: any, options: { map: any; position: any; title: string; background: string }) => {
  const markerApi = googleMaps?.maps?.marker;
  if (markerApi?.AdvancedMarkerElement && markerApi?.PinElement) {
    const pin = new markerApi.PinElement({
      background: options.background,
      borderColor: options.background,
      glyphColor: '#ffffff',
    });
    return new markerApi.AdvancedMarkerElement({
      map: options.map,
      position: options.position,
      title: options.title,
      content: pin.element,
    });
  }

  return new googleMaps.maps.Marker({
    position: options.position,
    map: options.map,
    title: options.title,
  });
};
