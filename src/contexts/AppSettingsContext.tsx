
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeSettings {
  primaryColor?: string;
  fontSize?: 'small' | 'medium' | 'large';
  compactMode?: boolean;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sound: boolean;
}

interface PrivacySettings {
  shareData: boolean;
  cookiesConsent: boolean;
}

interface AppSettings {
  darkMode: boolean;
  locale: string;
  theme?: ThemeSettings;
  notifications?: NotificationSettings;
  privacy?: PrivacySettings;
}

interface AppSettingsContextType {
  settings: AppSettings;
  updateSetting: (key: string, value: any) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  updateNestedSetting: (section: keyof AppSettings, key: string, value: any) => void;
  toggleDarkMode: () => void;
}

const defaultSettings: AppSettings = {
  darkMode: false,
  locale: 'fr-FR',
  theme: {
    primaryColor: 'green',
    fontSize: 'medium',
    compactMode: false,
  },
  notifications: {
    email: true,
    push: true,
    sound: true,
  },
  privacy: {
    shareData: false,
    cookiesConsent: true,
  },
};

const AppSettingsContext = createContext<AppSettingsContextType>({
  settings: defaultSettings,
  updateSetting: () => {},
  updateSettings: () => {},
  updateNestedSetting: () => {},
  toggleDarkMode: () => {},
});

export const useAppSettings = () => useContext(AppSettingsContext);

interface AppSettingsProviderProps {
  children: ReactNode;
}

export const AppSettingsProvider: React.FC<AppSettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    // Retrieve settings from localStorage if available
    const savedSettings = localStorage.getItem('app-settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
    
    // Apply dark mode based on settings
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  const updateSetting = (key: string, value: any) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value,
    }));
  };
  
  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  const updateNestedSetting = (section: keyof AppSettings, key: string, value: any) => {
    setSettings((prevSettings) => {
      // Create a copy of the current settings
      const updatedSettings = { ...prevSettings };
      
      // Fix: Type-safe handling of nested settings with required properties
      if (section === 'theme') {
        updatedSettings.theme = {
          ...(prevSettings.theme || {}),
          [key]: value
        };
      } else if (section === 'notifications') {
        // Ensure all required properties are present
        updatedSettings.notifications = {
          email: prevSettings.notifications?.email ?? true,
          push: prevSettings.notifications?.push ?? true,
          sound: prevSettings.notifications?.sound ?? true,
          ...(prevSettings.notifications || {}),
          [key]: value
        };
      } else if (section === 'privacy') {
        // Ensure all required properties are present
        updatedSettings.privacy = {
          shareData: prevSettings.privacy?.shareData ?? false,
          cookiesConsent: prevSettings.privacy?.cookiesConsent ?? true,
          ...(prevSettings.privacy || {}),
          [key]: value
        };
      }
      
      return updatedSettings;
    });
  };
  
  const toggleDarkMode = () => {
    updateSetting('darkMode', !settings.darkMode);
  };

  return (
    <AppSettingsContext.Provider value={{ 
      settings, 
      updateSetting, 
      updateSettings,
      updateNestedSetting,
      toggleDarkMode
    }}>
      {children}
    </AppSettingsContext.Provider>
  );
};
