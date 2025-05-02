
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AppSettings {
  darkMode: boolean;
  locale: string;
  theme?: {
    primaryColor?: string;
    fontSize?: 'small' | 'medium' | 'large';
    compactMode?: boolean;
  };
  notifications?: {
    email: boolean;
    push: boolean;
    sound: boolean;
  };
  privacy?: {
    shareData: boolean;
    cookiesConsent: boolean;
  };
  // Add other settings here
}

interface AppSettingsContextType {
  settings: AppSettings;
  updateSetting: (key: string, value: any) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  updateNestedSetting: (section: string, key: string, value: any) => void;
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
  // Default values for other settings
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

  // Fix the updateNestedSetting function with proper typing
  const updateNestedSetting = (section: string, key: string, value: any) => {
    setSettings((prevSettings) => {
      // Create a copy of the current settings
      const updatedSettings = { ...prevSettings };
      
      // Safely handle the nested section
      const sectionData = updatedSettings[section as keyof AppSettings] as Record<string, any>;
      
      // If the section exists, update it
      if (sectionData) {
        // Create a new object for the section to avoid direct mutation
        updatedSettings[section as keyof AppSettings] = {
          ...sectionData,
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
