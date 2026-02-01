import ReactGA from 'react-ga4';

const MEASUREMENT_ID = process.env.REACT_APP_GA4_MEASUREMENT_ID;

export const initGA = () => {
  if (MEASUREMENT_ID && MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(MEASUREMENT_ID);
    console.log('✅ Google Analytics initialized');
  } else {
    console.log('⚠️ Google Analytics not configured');
  }
};

export const logPageView = (path) => {
  if (MEASUREMENT_ID && MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.send({ 
      hitType: 'pageview', 
      page: path || window.location.pathname + window.location.search 
    });
  }
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
