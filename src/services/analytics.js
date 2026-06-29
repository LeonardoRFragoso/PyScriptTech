import ReactGA from 'react-ga4';

const MEASUREMENT_ID = process.env.REACT_APP_GA4_MEASUREMENT_ID;

// Push to Google Tag Manager dataLayer
const pushToDataLayer = (event, params = {}) => {
  if (window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
};

// Push to Microsoft Clarity
const pushToClarity = (event, params = {}) => {
  if (window.clarity) {
    window.clarity('event', event, params);
  }
};

export const initGA = () => {
  if (MEASUREMENT_ID && MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(MEASUREMENT_ID);
    console.log('✅ Google Analytics initialized');
  }
};

export const logPageView = (path) => {
  const pagePath = path || window.location.pathname + window.location.search;
  if (MEASUREMENT_ID && MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.send({ 
      hitType: 'pageview', 
      page: pagePath 
    });
  }
  pushToDataLayer('page_view', { page_path: pagePath, page_title: document.title });
  pushToClarity('page_view', { page_path: pagePath });
};

export const logEvent = (category, action, label, value) => {
  if (MEASUREMENT_ID && MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
  pushToDataLayer('custom_event', { event_category: category, event_action: action, event_label: label, value });
  pushToClarity('custom_event', { event_category: category, event_action: action, event_label: label });
};

export const logButtonClick = (buttonName, location) => {
  logEvent('Button', 'Click', `${buttonName} - ${location}`);
};

export const logFormSubmit = (formName, success = true) => {
  logEvent('Form', success ? 'Submit Success' : 'Submit Error', formName);
};

export const logFormStart = (formName) => {
  logEvent('Form', 'Start', formName);
};

export const logCTAClick = (ctaName) => {
  logEvent('CTA', 'Click', ctaName);
};

export const logNavigation = (from, to) => {
  logEvent('Navigation', 'Navigate', `${from} -> ${to}`);
};

export const logSearch = (searchTerm) => {
  logEvent('Search', 'Query', searchTerm);
};

export const logDownload = (fileName) => {
  logEvent('Download', 'File', fileName);
};

export const logExternalLink = (url) => {
  logEvent('External Link', 'Click', url);
};

export const logSocialClick = (platform) => {
  logEvent('Social', 'Click', platform);
};

export const logWhatsAppClick = () => {
  logEvent('WhatsApp', 'Click', 'Floating Button');
};

export const logNewsletterSignup = (email) => {
  logEvent('Newsletter', 'Signup', email ? 'With Email' : 'Anonymous');
};

export const logProjectView = (projectName) => {
  logEvent('Project', 'View', projectName);
};

export const logServiceInterest = (serviceName) => {
  logEvent('Service', 'Interest', serviceName);
};

export const setUserProperties = (properties) => {
  if (MEASUREMENT_ID && MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.set(properties);
  }
};

export const logTiming = (category, variable, value, label) => {
  if (MEASUREMENT_ID && MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.event({
      category: 'Timing',
      action: category,
      label: `${variable}: ${label}`,
      value: Math.round(value),
    });
  }
};
