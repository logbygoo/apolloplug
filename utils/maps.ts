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

const createOverlayMarker = (
  googleMaps: any,
  options: { map: any; position: any; title: string; content?: HTMLElement },
) => {
  class LegacyOverlayMarker extends googleMaps.maps.OverlayView {
    private mapInstance: any;
    private positionValue: any;
    private titleValue: string;
    private node: HTMLDivElement | null;
    private contentValue: HTMLElement;

    constructor(initOptions: { map: any; position: any; title: string; content?: HTMLElement }) {
      super();
      this.mapInstance = initOptions.map;
      this.positionValue = initOptions.position;
      this.titleValue = initOptions.title;
      this.node = null;
      this.contentValue = initOptions.content ?? createCircleMarkerElement('#111827');
      this.setMap(this.mapInstance);
    }

    onAdd() {
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.transform = 'translate(-50%, -100%)';
      div.style.cursor = 'pointer';
      div.setAttribute('title', this.titleValue);
      div.setAttribute('aria-label', this.titleValue);
      div.appendChild(this.contentValue);
      this.node = div;
      this.getPanes()?.overlayMouseTarget?.appendChild(div);
    }

    draw() {
      if (!this.node) return;
      const projection = this.getProjection();
      if (!projection) return;
      const latLng =
        this.positionValue instanceof googleMaps.maps.LatLng
          ? this.positionValue
          : new googleMaps.maps.LatLng(this.positionValue);
      const point = projection.fromLatLngToDivPixel(latLng);
      if (!point) return;
      this.node.style.left = `${point.x}px`;
      this.node.style.top = `${point.y}px`;
    }

    onRemove() {
      this.node?.remove();
      this.node = null;
    }

    setPosition(nextPosition: any) {
      this.positionValue = nextPosition;
      this.draw();
    }
  }

  return new LegacyOverlayMarker(options);
};

export const createAdvancedMarker = (googleMaps: any, options: { map: any; position: any; title: string; content?: HTMLElement }) => {
  const markerApi = googleMaps?.maps?.marker;
  const mapId = options?.map?.get?.('mapId');
  if (markerApi?.AdvancedMarkerElement && mapId) {
    return new markerApi.AdvancedMarkerElement(options);
  }
  return createOverlayMarker(googleMaps, options);
};

export const createPinMarker = (googleMaps: any, options: { map: any; position: any; title: string; background: string }) => {
  const markerApi = googleMaps?.maps?.marker;
  const mapId = options?.map?.get?.('mapId');
  if (markerApi?.AdvancedMarkerElement && markerApi?.PinElement && mapId) {
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
  return createOverlayMarker(googleMaps, {
    map: options.map,
    position: options.position,
    title: options.title,
    content: createCircleMarkerElement(options.background),
  });
};
