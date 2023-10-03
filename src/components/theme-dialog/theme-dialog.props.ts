import { Theme } from '../../shared/models/theme';
import { DialogProps } from '../shared/dialog/dialog.props';

export interface ThemeDialogProps extends DialogProps {
  theme: Theme;

  setTheme: () => void;
  setThemeMain: (color: string) => void;
  setThemeText: (color: string) => void;
  setThemeBackground: (color: string) => void;
  resetTheme: () => void;
}
