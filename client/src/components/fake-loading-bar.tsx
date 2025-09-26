import { useEffect, useState } from "react";

export function FakeLoadingBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50" data-testid="fake-loading-bar">
      <div className="loading-bar h-full" data-testid="fake-loading-bar-progress"></div>
    </div>
  );
}
