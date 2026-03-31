import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Minimize2 } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { AVAILABLE_LANGUAGES } from '@/config/app';
import { useHeaderActions } from '../hooks/useHeaderActions';
import { AppArea } from '@/config/areas/areaConfig';

interface HeaderActionsProps {
  iconClasses: string;
  showCompactToggle?: boolean;
  showLanguageSwitcher?: boolean;
  layoutType: AppArea;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  iconClasses,
  showCompactToggle,
  showLanguageSwitcher,
  layoutType
}) => {
  const { handleThemeToggle, handleCompactToggle } = useHeaderActions();

  const shouldShowLanguageSwitcher = showLanguageSwitcher && (
    layoutType === 'default' || (layoutType === 'admin' && AVAILABLE_LANGUAGES.length > 1)
  );

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={handleThemeToggle}>
        <Moon className={iconClasses} />
      </Button>

      {showCompactToggle && (
        <Button variant="ghost" size="sm" onClick={handleCompactToggle}>
          <Minimize2 className={iconClasses} />
        </Button>
      )}

      {shouldShowLanguageSwitcher && <LanguageSwitcher />}
    </div>
  );
};