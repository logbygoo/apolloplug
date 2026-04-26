import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE_LOGO_URL, SITE_ORIGIN } from '../configs/site';
import { loadGoogleMapsScript } from '../utils/maps';
import Seo from '../components/Seo';
import { SEO_CONFIG } from '../configs/seoConfig';
import './dash/dash.css';

type MapsMap = {
  panTo: (p: { lat: number; lng: number }) => void;
  setHeading: (h: number) => void;
};

type MapsMarker = { setPosition: (p: { lat: number; lng: number }) => void };

type GeoState = {
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  altitude: number | null;
  heading: number | null;
  speedKmh: number | null;
  t: number | null;
  error: string | null;
};

type MotionState = {
  accX: number | null;
  accY: number | null;
  accZ: number | null;
  gaccX: number | null;
  gaccY: number | null;
  gaccZ: number | null;
  rotA: number | null;
  rotB: number | null;
  rotG: number | null;
};

type OriState = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
  absolute: boolean | null;
};

type BatteryState = { level: number | null; charging: boolean | null };
type NetworkState = {
  type: string;
  downlink: number | null;
  rtt: number | null;
  saveData: boolean | null;
};

function formatN(n: number | null, d = 2): string {
  if (n === null || Number.isNaN(n)) return '—';
  return n.toFixed(d);
}

function formatNInt(n: number | null): string {
  if (n === null || Number.isNaN(n)) return '—';
  return String(Math.round(n));
}

const DashPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<MapsMap | null>(null);
  const markerRef = useRef<MapsMarker | null>(null);

  const [geo, setGeo] = useState<GeoState>({
    lat: null,
    lng: null,
    accuracy: null,
    altitude: null,
    heading: null,
    speedKmh: null,
    t: null,
    error: null,
  });
  const [motion, setMotion] = useState<MotionState>({
    accX: null,
    accY: null,
    accZ: null,
    gaccX: null,
    gaccY: null,
    gaccZ: null,
    rotA: null,
    rotB: null,
    rotG: null,
  });
  const [ori, setOri] = useState<OriState>({ alpha: null, beta: null, gamma: null, absolute: null });
  const [battery, setBattery] = useState<BatteryState>({ level: null, charging: null });
  const [net, setNet] = useState<NetworkState>({ type: '—', downlink: null, rtt: null, saveData: null });
  const [memMb, setMemMb] = useState<number | null>(null);
  const [sensorsBlock, setSensorsBlock] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const orientationHandlerRef = useRef<((e: DeviceOrientationEvent) => void) | null>(null);
  const motionHandlerRef = useRef<((e: DeviceMotionEvent) => void) | null>(null);

  const applyPositionFix = useCallback((pos: GeolocationPosition) => {
    const c = pos.coords;
    const speedKmh = c.speed != null && !Number.isNaN(c.speed) ? c.speed * 3.6 : null;
    setGeo({
      lat: c.latitude,
      lng: c.longitude,
      accuracy: c.accuracy,
      altitude: c.altitude,
      heading: c.heading,
      speedKmh,
      t: pos.timestamp,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setGeo((g) => ({ ...g, error: 'Brak Geolocation w tej przeglądarce' }));
      return;
    }
    const opt: PositionOptions = { enableHighAccuracy: true, maximumAge: 2000, timeout: 15000 };
    watchIdRef.current = navigator.geolocation.watchPosition(applyPositionFix, (err) => {
      setGeo((g) => ({
        ...g,
        error: err.message === 'User denied Geolocation' ? 'Odmowa dostępu do lokalizacji' : err.message,
      }));
    }, opt);
    return () => {
      if (watchIdRef.current != null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, [applyPositionFix]);

  const detachSensorListeners = useCallback(() => {
    if (orientationHandlerRef.current) {
      window.removeEventListener('deviceorientation', orientationHandlerRef.current, true);
      orientationHandlerRef.current = null;
    }
    if (motionHandlerRef.current) {
      window.removeEventListener('devicemotion', motionHandlerRef.current, true);
      motionHandlerRef.current = null;
    }
  }, []);

  const attachSensorListeners = useCallback(() => {
    detachSensorListeners();
    const oHandler = (e: DeviceOrientationEvent) => {
      setOri({
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.gamma,
        absolute: e.absolute ?? null,
      });
    };
    const mHandler = (e: DeviceMotionEvent) => {
      const a = e.acceleration;
      const ag = e.accelerationIncludingGravity;
      const r = e.rotationRate;
      setMotion({
        accX: a?.x ?? null,
        accY: a?.y ?? null,
        accZ: a?.z ?? null,
        gaccX: ag?.x ?? null,
        gaccY: ag?.y ?? null,
        gaccZ: ag?.z ?? null,
        rotA: r?.alpha ?? null,
        rotB: r?.beta ?? null,
        rotG: r?.gamma ?? null,
      });
    };
    orientationHandlerRef.current = oHandler;
    motionHandlerRef.current = mHandler;
    window.addEventListener('deviceorientation', oHandler, true);
    window.addEventListener('devicemotion', mHandler, true);
  }, [detachSensorListeners]);

  /** iOS 13+ Safari: tylko po geście użytkownika */
  const requestSensorPermission = useCallback(async () => {
    setSensorsBlock(null);
    type DOExt = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<'granted' | 'denied'> };
    const doReq = (DeviceOrientationEvent as DOExt).requestPermission;
    if (typeof doReq === 'function') {
      try {
        const r = await doReq();
        if (r !== 'granted') {
          setSensorsBlock('Czujniki: odmowa (iOS/Safari)');
          return;
        }
      } catch {
        setSensorsBlock('Czujniki: błąd uprawnień');
        return;
      }
    }
    const dmReq = (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<'granted' | 'denied'> })
      .requestPermission;
    if (typeof dmReq === 'function') {
      try {
        const r2 = await dmReq();
        if (r2 !== 'granted') {
          setSensorsBlock('Ruch: odmowa (iOS/Safari)');
          return;
        }
      } catch {
        setSensorsBlock('Czujniki: błąd (motion)');
        return;
      }
    }
    attachSensorListeners();
  }, [attachSensorListeners]);

  /** Android / desktop: orientacja i motion bez dodatkowego uprawnienia */
  useEffect(() => {
    const needIOSClick =
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> })
        .requestPermission === 'function';
    if (needIOSClick) return;
    attachSensorListeners();
  }, [attachSensorListeners]);

  useEffect(() => () => detachSensorListeners(), [detachSensorListeners]);

  useEffect(() => {
    if (!navigator.getBattery) return;
    let b: { removeEventListener: typeof EventTarget.prototype.removeEventListener; level: number; charging: boolean } | null =
      null;
    const u = () => {
      if (b) setBattery({ level: b.level, charging: b.charging });
    };
    const run = async () => {
      try {
        b = await navigator.getBattery!();
        setBattery({ level: b.level, charging: b.charging });
        b.addEventListener('levelchange', u);
        b.addEventListener('chargingchange', u);
      } catch {
        /* */
      }
    };
    void run();
    return () => {
      if (b) {
        b.removeEventListener('levelchange', u);
        b.removeEventListener('chargingchange', u);
      }
    };
  }, []);

  const syncConnection = useCallback(() => {
    const c = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (!c) {
      setNet({ type: 'n/d', downlink: null, rtt: null, saveData: null });
      return;
    }
    setNet({
      type: c.effectiveType ?? c.type ?? '—',
      downlink: c.downlink ?? null,
      rtt: c.rtt ?? null,
      saveData: c.saveData ?? null,
    });
  }, []);

  useEffect(() => {
    syncConnection();
    const c = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    c?.addEventListener?.('change', syncConnection);
    return () => c?.removeEventListener?.('change', syncConnection);
  }, [syncConnection]);

  useEffect(() => {
    const p = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory;
    if (p) setMemMb(p.usedJSHeapSize / (1024 * 1024));
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dash-no-scroll');
    document.body.classList.add('dash-no-scroll');
    let m = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const created = !m;
    if (!m) {
      m = document.createElement('meta');
      m.setAttribute('name', 'robots');
      document.head.appendChild(m);
    }
    const prevR = m.getAttribute('content');
    m.setAttribute('content', 'noindex, nofollow');
    return () => {
      document.documentElement.classList.remove('dash-no-scroll');
      document.body.classList.remove('dash-no-scroll');
      if (created) m?.remove();
      else if (prevR !== null) m?.setAttribute('content', prevR);
      else m?.removeAttribute('content');
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    loadGoogleMapsScript(() => {
      if (!mapRef.current) return;
      const el = mapRef.current;
      if (typeof window.google === 'undefined' || !window.google?.maps) {
        setMapError('Nie udało się załadować Map Google');
        return;
      }
      const g = window.google;
      const start = { lat: 52.2297, lng: 21.0122 };
      const map = new g.maps.Map(el, {
        center: start,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#304a7d' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1626' }] },
        ],
      });
      const marker = new g.maps.Marker({
        position: start,
        map,
        title: 'Pozycja',
      });
      mapInstanceRef.current = map;
      markerRef.current = marker;
      setMapReady(true);
      requestAnimationFrame(() => {
        g.maps.event.trigger(map, 'resize');
      });
    }, 'marker,geometry');
  }, []);

  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !markerRef.current) return;
    if (geo.lat == null || geo.lng == null) return;
    const pos = { lat: geo.lat, lng: geo.lng };
    markerRef.current.setPosition(pos);
    const map = mapInstanceRef.current;
    map.panTo(pos);
    if (geo.heading != null && !Number.isNaN(geo.heading) && typeof map.setHeading === 'function') {
      map.setHeading(geo.heading);
    }
  }, [mapReady, geo.lat, geo.lng, geo.heading, geo.t]);

  const canReqSensors =
    typeof window.DeviceOrientationEvent !== 'undefined' &&
    typeof (window.DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> })
      .requestPermission === 'function';

  return (
    <div className="dash-shell fixed inset-0 z-[100] flex flex-col overflow-hidden">
      <Seo {...SEO_CONFIG['/dash']} />
      <header className="dash-header">
        <a className="dash-logo-link" href={SITE_ORIGIN} target="_blank" rel="noreferrer">
          <img src={SITE_LOGO_URL} alt="Apollo" className="dash-logo-img" width={160} height={40} />
        </a>
        <div className="dash-header-actions">
          <button type="button" className="dash-btn dash-btn--ghost" onClick={requestSensorPermission}>
            {canReqSensors ? 'Czujniki (iOS)' : 'Czujniki'}
          </button>
          <Link to="/" className="dash-btn">
            Strona główna
          </Link>
        </div>
      </header>

      <div className="dash-body min-h-0 flex-1">
        <div className="dash-panels">
          {sensorsBlock && <p className="dash-hint" style={{ color: '#f87171' }}>{sensorsBlock}</p>}
          <div className="dash-panels-grid">
            <div className="dash-card dash-panels-speed dash-card--speed">
              <div className="dash-k">Prędkość (GPS)</div>
              <div>
                <span className="dash-speed-val">{formatNInt(geo.speedKmh)}</span>
                <span className="dash-speed-unit">km/h</span>
              </div>
            </div>
            <div className="dash-card">
              <div className="dash-k">Kierunek</div>
              <div className="dash-v">
                {geo.heading != null && !Number.isNaN(geo.heading) ? `${formatN(geo.heading, 0)}°` : '—'}
              </div>
            </div>
            <div className="dash-card">
              <div className="dash-k">Dokładn. GPS</div>
              <div className="dash-v">
                {geo.accuracy != null ? `${formatN(geo.accuracy, 0)} m` : '—'}
              </div>
            </div>
            <div className="dash-card">
              <div className="dash-k">Szer. geogr.</div>
              <div className="dash-v dash-v--sm">{geo.lat != null ? formatN(geo.lat, 5) : '—'}</div>
            </div>
            <div className="dash-card">
              <div className="dash-k">Dł. geogr.</div>
              <div className="dash-v dash-v--sm">{geo.lng != null ? formatN(geo.lng, 5) : '—'}</div>
            </div>
            <div className="dash-card">
              <div className="dash-k">Wysokość</div>
              <div className="dash-v">
                {geo.altitude != null && !Number.isNaN(geo.altitude) ? `${formatN(geo.altitude, 1)} m` : '—'}
              </div>
            </div>
            <div className="dash-card">
              <div className="dash-k">Bateria (urządzenie)</div>
              <div className="dash-v">
                {battery.level != null
                  ? `${(battery.level * 100).toFixed(0)}%${battery.charging ? ' · ładowanie' : ''}`
                  : '—'}
              </div>
            </div>
            <div className="dash-card">
              <div className="dash-k">Sieć</div>
              <div className="dash-v dash-v--sm">
                {net.type}
                {net.downlink != null ? ` · ${formatN(net.downlink, 1)} Mb/s` : ''}
                {net.rtt != null ? ` · RTT ${net.rtt} ms` : ''}
              </div>
            </div>
            <div className="dash-card">
              <div className="dash-k">Orientacja α β γ</div>
              <div className="dash-v dash-v--sm">
                {formatN(ori.alpha, 0)}° {formatN(ori.beta, 0)}° {formatN(ori.gamma, 0)}°
              </div>
            </div>
            <div className="dash-card">
              <div className="dash-k">Obrót (°/s)</div>
              <div className="dash-v dash-v--sm">
                {formatN(motion.rotA, 1)} {formatN(motion.rotB, 1)} {formatN(motion.rotG, 1)}
              </div>
            </div>
            <div className="dash-card">
              <div className="dash-k">Przemieszcz. m/s²</div>
              <div className="dash-v dash-v--sm">
                {formatN(motion.gaccX, 2)} {formatN(motion.gaccY, 2)} {formatN(motion.gaccZ, 2)}
              </div>
            </div>
            <div className="dash-card">
              <div className="dash-k">Pamięć JS (ok.)</div>
              <div className="dash-v">{memMb != null ? `${formatN(memMb, 1)} MB` : '—'}</div>
            </div>
            <div className="dash-card">
              <div className="dash-k">Błąd lokalizacji</div>
              <div className="dash-v dash-v--sm" style={{ color: geo.error ? '#f87171' : 'inherit' }}>
                {geo.error ?? '—'}
              </div>
            </div>
          </div>
          <p className="dash-hint">
            GPS, sieć, bateria: automatycznie. Czujniki ruchu/orientacja: stuknij „Czujniki” (wymagane na
            iOS). Dane zależą od przeglądarki w pojeździe.
          </p>
        </div>

        <div className="dash-map-wrap min-h-0 flex-1">
          {mapError && <div className="dash-map-placeholder">{mapError}</div>}
          <div ref={mapRef} className="dash-map" role="application" aria-label="Mapa" />
        </div>
      </div>
    </div>
  );
};

export default DashPage;
