import { ParallaxProvider } from "react-scroll-parallax";
import React, { Suspense, useState, useEffect } from "react";
import Loading from "./components/Loading";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import routes from "./routes";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center p-8">
            <h1 className="text-3xl mb-4">Something went wrong</h1>
            <button
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Timeout wrapper to prevent infinite loading
const LoadingWithTimeout = () => {
  const [timeout, setTimeout] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTimeout(true);
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timer);
  }, []);

  if (timeout) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center p-8">
          <h1 className="text-3xl mb-4">
            Loading is taking longer than expected
          </h1>
          <p className="mb-4">
            There might be an issue loading the application.
          </p>
          <button
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }

  return <Loading />;
};

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingWithTimeout />}>
          <Routes>
            {routes.map(({ path, element, meta }, idx) => {
              const wrappedElement = meta?.RequireAuth ? (
                <RequireAuth>{element}</RequireAuth>
              ) : (
                element
              );
              return <Route key={idx} path={path} element={wrappedElement} />;
            })}
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
