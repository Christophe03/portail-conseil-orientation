// Configuration Firebase Analytics pour Conseil d'Orientation Mali
import { 
  logEvent, 
  setUserId, 
  setUserProperties, 
  setCurrentScreen,
  Analytics
} from 'firebase/analytics';
import { analytics } from './firebase';

// Types pour les événements Analytics
export interface AnalyticsEvent {
  name: string;
  parameters?: { [key: string]: any };
}

export interface UserProperties {
  user_type?: 'student' | 'parent' | 'teacher' | 'counselor';
  education_level?: 'high_school' | 'university' | 'graduate' | 'professional';
  country?: string;
  language?: string;
  app_version?: string;
  device_type?: 'mobile' | 'tablet' | 'desktop';
}

// Événements personnalisés
export const ANALYTICS_EVENTS = {
  // Événements d'authentification
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  USER_PROFILE_UPDATE: 'user_profile_update',
  
  // Événements de navigation
  PAGE_VIEW: 'page_view',
  SECTION_VIEW: 'section_view',
  FEATURE_ACCESS: 'feature_access',
  
  // Événements de recherche
  SEARCH_SCHOLARSHIPS: 'search_scholarships',
  SEARCH_CAREERS: 'search_careers',
  SEARCH_INSTITUTIONS: 'search_institutions',
  FILTER_APPLIED: 'filter_applied',
  
  // Événements d'interaction
  SCHOLARSHIP_VIEW: 'scholarship_view',
  SCHOLARSHIP_SAVE: 'scholarship_save',
  SCHOLARSHIP_SHARE: 'scholarship_share',
  SCHOLARSHIP_APPLY: 'scholarship_apply',
  
  CAREER_VIEW: 'career_view',
  CAREER_SAVE: 'career_save',
  CAREER_SHARE: 'career_share',
  
  // Événements de téléchargement
  APP_DOWNLOAD: 'app_download',
  APP_INSTALL: 'app_install',
  
  // Événements de support
  CONTACT_SUPPORT: 'contact_support',
  FEEDBACK_SUBMIT: 'feedback_submit',
  FAQ_VIEW: 'faq_view',
  
  // Événements d'engagement
  TIME_ON_PAGE: 'time_on_page',
  SCROLL_DEPTH: 'scroll_depth',
  BUTTON_CLICK: 'button_click',
  FORM_SUBMIT: 'form_submit',
  
  // Événements d'erreur
  ERROR_OCCURRED: 'error_occurred',
  API_ERROR: 'api_error',
  
  // Événements de performance
  PAGE_LOAD_TIME: 'page_load_time',
  API_RESPONSE_TIME: 'api_response_time'
} as const;

// Fonction pour enregistrer un événement
export const trackEvent = (eventName: string, parameters?: { [key: string]: any }): void => {
  if (!analytics) {
    console.warn('Firebase Analytics non initialisé');
    return;
  }
  
  try {
    logEvent(analytics, eventName, parameters);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'événement:', error);
  }
};

// Fonction pour définir l'ID utilisateur
export const setAnalyticsUserId = (userId: string): void => {
  if (!analytics) {
    console.warn('Firebase Analytics non initialisé');
    return;
  }
  
  try {
    setUserId(analytics, userId);
  } catch (error) {
    console.error('Erreur lors de la définition de l\'ID utilisateur:', error);
  }
};

// Fonction pour définir les propriétés utilisateur
export const setAnalyticsUserProperties = (properties: UserProperties): void => {
  if (!analytics) {
    console.warn('Firebase Analytics non initialisé');
    return;
  }
  
  try {
    setUserProperties(analytics, properties);
  } catch (error) {
    console.error('Erreur lors de la définition des propriétés utilisateur:', error);
  }
};

// Fonction pour définir l'écran actuel
export const setAnalyticsScreen = (screenName: string): void => {
  if (!analytics) {
    console.warn('Firebase Analytics non initialisé');
    return;
  }
  
  try {
    setCurrentScreen(analytics, screenName);
  } catch (error) {
    console.error('Erreur lors de la définition de l\'écran:', error);
  }
};

// Fonctions spécifiques pour les événements métier
export const trackUserSignup = (method: string, userId: string): void => {
  trackEvent(ANALYTICS_EVENTS.USER_SIGNUP, {
    method,
    user_id: userId,
    timestamp: Date.now()
  });
};

export const trackUserLogin = (method: string, userId: string): void => {
  trackEvent(ANALYTICS_EVENTS.USER_LOGIN, {
    method,
    user_id: userId,
    timestamp: Date.now()
  });
};

export const trackPageView = (pageName: string, pageTitle: string): void => {
  trackEvent(ANALYTICS_EVENTS.PAGE_VIEW, {
    page_name: pageName,
    page_title: pageTitle,
    timestamp: Date.now()
  });
};

export const trackSearch = (searchType: string, query: string, resultsCount: number): void => {
  const eventName = searchType === 'scholarships' 
    ? ANALYTICS_EVENTS.SEARCH_SCHOLARSHIPS
    : searchType === 'careers'
    ? ANALYTICS_EVENTS.SEARCH_CAREERS
    : ANALYTICS_EVENTS.SEARCH_INSTITUTIONS;
    
  trackEvent(eventName, {
    search_type: searchType,
    query,
    results_count: resultsCount,
    timestamp: Date.now()
  });
};

export const trackScholarshipView = (scholarshipId: string, scholarshipTitle: string): void => {
  trackEvent(ANALYTICS_EVENTS.SCHOLARSHIP_VIEW, {
    scholarship_id: scholarshipId,
    scholarship_title: scholarshipTitle,
    timestamp: Date.now()
  });
};

export const trackScholarshipSave = (scholarshipId: string, action: 'save' | 'unsave'): void => {
  trackEvent(ANALYTICS_EVENTS.SCHOLARSHIP_SAVE, {
    scholarship_id: scholarshipId,
    action,
    timestamp: Date.now()
  });
};

export const trackScholarshipApply = (scholarshipId: string, applicationMethod: string): void => {
  trackEvent(ANALYTICS_EVENTS.SCHOLARSHIP_APPLY, {
    scholarship_id: scholarshipId,
    application_method: applicationMethod,
    timestamp: Date.now()
  });
};

export const trackCareerView = (careerId: string, careerTitle: string): void => {
  trackEvent(ANALYTICS_EVENTS.CAREER_VIEW, {
    career_id: careerId,
    career_title: careerTitle,
    timestamp: Date.now()
  });
};

export const trackAppDownload = (platform: 'android' | 'ios', source: string): void => {
  trackEvent(ANALYTICS_EVENTS.APP_DOWNLOAD, {
    platform,
    source,
    timestamp: Date.now()
  });
};

export const trackContactSupport = (method: string, topic: string): void => {
  trackEvent(ANALYTICS_EVENTS.CONTACT_SUPPORT, {
    method,
    topic,
    timestamp: Date.now()
  });
};

export const trackFeedback = (type: string, rating: number, comment?: string): void => {
  trackEvent(ANALYTICS_EVENTS.FEEDBACK_SUBMIT, {
    feedback_type: type,
    rating,
    has_comment: !!comment,
    timestamp: Date.now()
  });
};

export const trackError = (errorType: string, errorMessage: string, page: string): void => {
  trackEvent(ANALYTICS_EVENTS.ERROR_OCCURRED, {
    error_type: errorType,
    error_message: errorMessage,
    page,
    timestamp: Date.now()
  });
};

export const trackPerformance = (metric: string, value: number, unit: string): void => {
  const eventName = metric === 'page_load_time' 
    ? ANALYTICS_EVENTS.PAGE_LOAD_TIME
    : ANALYTICS_EVENTS.API_RESPONSE_TIME;
    
  trackEvent(eventName, {
    metric,
    value,
    unit,
    timestamp: Date.now()
  });
};

// Fonction pour mesurer le temps passé sur une page
export const trackTimeOnPage = (pageName: string, timeSpent: number): void => {
  trackEvent(ANALYTICS_EVENTS.TIME_ON_PAGE, {
    page_name: pageName,
    time_spent: timeSpent,
    timestamp: Date.now()
  });
};

// Fonction pour mesurer la profondeur de scroll
export const trackScrollDepth = (pageName: string, depth: number): void => {
  trackEvent(ANALYTICS_EVENTS.SCROLL_DEPTH, {
    page_name: pageName,
    scroll_depth: depth,
    timestamp: Date.now()
  });
};

// Fonction pour enregistrer un clic sur un bouton
export const trackButtonClick = (buttonName: string, page: string, section?: string): void => {
  trackEvent(ANALYTICS_EVENTS.BUTTON_CLICK, {
    button_name: buttonName,
    page,
    section,
    timestamp: Date.now()
  });
};

// Fonction pour enregistrer la soumission d'un formulaire
export const trackFormSubmit = (formName: string, success: boolean, fields?: string[]): void => {
  trackEvent(ANALYTICS_EVENTS.FORM_SUBMIT, {
    form_name: formName,
    success,
    fields_count: fields?.length || 0,
    timestamp: Date.now()
  });
};

// Hook pour mesurer automatiquement le temps sur la page
export const usePageTimeTracking = (pageName: string) => {
  if (typeof window === 'undefined') return;
  
  const startTime = Date.now();
  
  const handleBeforeUnload = () => {
    const timeSpent = Date.now() - startTime;
    trackTimeOnPage(pageName, timeSpent);
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
  
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};

// Hook pour mesurer automatiquement la profondeur de scroll
export const useScrollTracking = (pageName: string) => {
  if (typeof window === 'undefined') return;
  
  let maxScrollDepth = 0;
  
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollDepth = Math.round((scrollTop / documentHeight) * 100);
    
    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;
      
      // Enregistrer à certains seuils
      if (scrollDepth >= 25 && scrollDepth < 50) {
        trackScrollDepth(pageName, 25);
      } else if (scrollDepth >= 50 && scrollDepth < 75) {
        trackScrollDepth(pageName, 50);
      } else if (scrollDepth >= 75 && scrollDepth < 90) {
        trackScrollDepth(pageName, 75);
      } else if (scrollDepth >= 90) {
        trackScrollDepth(pageName, 90);
      }
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};
