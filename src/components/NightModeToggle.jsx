import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import PropTypes from 'prop-types';

const NightModeToggle = ({ onToggle }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  NightModeToggle.propTypes = {
    onToggle: PropTypes.func.isRequired,
  };
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    setIsDarkMode(darkModeMediaQuery.matches);
    darkModeMediaQuery.addEventListener('change', (e) => {
      setIsDarkMode(e.matches);
      onToggle(e.matches);
    });
    return () =>
      darkModeMediaQuery.removeEventListener('change', (e) => {
        setIsDarkMode(e.matches);
        onToggle(e.matches);
      });
  }, [onToggle]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    onToggle(!isDarkMode);
  };

  return (
    <button
      onClick={handleToggle}
      className="rounded-full p-2 bg-none border-none cursor-pointer transform transition-transform hover:scale-110"
    >
      {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
    </button>
  );
};

export default NightModeToggle;
