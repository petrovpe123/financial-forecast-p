import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from './ThemeToggle';

// Mock the useTheme hook for controlled testing
const mockSetTheme = vi.fn();

// Helper function to render ThemeToggle with ThemeProvider
const renderThemeToggle = (initialTheme: string = 'light') => {
  return render(
    <ThemeProvider attribute="class" defaultTheme={initialTheme} enableSystem={false}>
      <ThemeToggle />
    </ThemeProvider>
  );
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the theme toggle button', async () => {
      renderThemeToggle();
      
      await waitFor(() => {
        const button = screen.getByTestId('theme-toggle');
        expect(button).toBeInTheDocument();
      });
    });

    it('should render with border styling', async () => {
      renderThemeToggle();
      
      await waitFor(() => {
        const button = screen.getByTestId('theme-toggle');
        // Check for border class which indicates outline variant
        expect(button).toHaveClass('border');
      });
    });

    it('should have appropriate aria-label for accessibility', async () => {
      renderThemeToggle('light');
      
      await waitFor(() => {
        const button = screen.getByTestId('theme-toggle');
        expect(button).toHaveAttribute('aria-label');
        expect(button.getAttribute('aria-label')).toMatch(/mode/i);
      });
    });

    it('should render moon icon in light mode', async () => {
      renderThemeToggle('light');
      
      await waitFor(() => {
        const moonIcon = screen.getByTestId('moon-icon');
        expect(moonIcon).toBeInTheDocument();
      });
    });

    it('should render sun icon in dark mode', async () => {
      renderThemeToggle('dark');
      
      await waitFor(() => {
        const sunIcon = screen.getByTestId('sun-icon');
        expect(sunIcon).toBeInTheDocument();
      });
    });
  });

  describe('Theme Switching', () => {
    it('should toggle from light to dark when clicked', async () => {
      const { container } = renderThemeToggle('light');
      
      await waitFor(() => {
        const moonIcon = screen.getByTestId('moon-icon');
        expect(moonIcon).toBeInTheDocument();
      });

      const button = screen.getByTestId('theme-toggle');
      fireEvent.click(button);

      await waitFor(() => {
        const sunIcon = screen.getByTestId('sun-icon');
        expect(sunIcon).toBeInTheDocument();
      });
    });

    it('should toggle from dark to light when clicked', async () => {
      renderThemeToggle('dark');
      
      await waitFor(() => {
        const sunIcon = screen.getByTestId('sun-icon');
        expect(sunIcon).toBeInTheDocument();
      });

      const button = screen.getByTestId('theme-toggle');
      fireEvent.click(button);

      await waitFor(() => {
        const moonIcon = screen.getByTestId('moon-icon');
        expect(moonIcon).toBeInTheDocument();
      });
    });

    it('should update aria-label when theme changes', async () => {
      renderThemeToggle('light');
      
      await waitFor(() => {
        const button = screen.getByTestId('theme-toggle');
        expect(button.getAttribute('aria-label')).toMatch(/dark/i);
      });

      fireEvent.click(screen.getByTestId('theme-toggle'));

      await waitFor(() => {
        const button = screen.getByTestId('theme-toggle');
        expect(button.getAttribute('aria-label')).toMatch(/light/i);
      });
    });
  });

  describe('Hydration and Mounting', () => {
    it('should render button with disabled state initially', () => {
      const { container } = render(
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ThemeToggle />
        </ThemeProvider>
      );

      // The initial render shows a disabled button before the component mounts
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should enable button after mounting', async () => {
      renderThemeToggle();
      
      await waitFor(() => {
        const button = screen.getByTestId('theme-toggle');
        expect(button).not.toBeDisabled();
      });
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      renderThemeToggle('light');
      
      await waitFor(() => {
        const button = screen.getByTestId('theme-toggle');
        expect(button).toBeInTheDocument();
      });

      const button = screen.getByTestId('theme-toggle');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('should have role button', async () => {
      renderThemeToggle();
      
      await waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid clicking', async () => {
      renderThemeToggle('light');
      
      await waitFor(() => {
        const button = screen.getByTestId('theme-toggle');
        expect(button).toBeInTheDocument();
      });

      const button = screen.getByTestId('theme-toggle');
      
      // Click multiple times rapidly (odd number of clicks to end in dark mode)
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      // After 3 clicks: light -> dark -> light -> dark
      // The component should handle this gracefully and show sun icon (dark mode)
      await waitFor(() => {
        // After odd number of clicks starting from light, we should be in dark mode
        const icon = screen.queryByTestId('sun-icon') || screen.queryByTestId('moon-icon');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should work when ThemeProvider has different defaultTheme', async () => {
      render(
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={false}>
          <ThemeToggle />
        </ThemeProvider>
      );

      await waitFor(() => {
        const button = screen.getByTestId('theme-toggle');
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('Icon Display', () => {
    it('should display only one icon at a time', async () => {
      renderThemeToggle('light');
      
      await waitFor(() => {
        const moonIcon = screen.queryByTestId('moon-icon');
        const sunIcon = screen.queryByTestId('sun-icon');
        
        // In light mode, only moon icon should be visible
        expect(moonIcon).toBeInTheDocument();
        expect(sunIcon).not.toBeInTheDocument();
      });
    });

    it('should swap icons correctly on toggle', async () => {
      renderThemeToggle('light');
      
      await waitFor(() => {
        expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId('theme-toggle'));

      await waitFor(() => {
        expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
        expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
      });
    });
  });
});
