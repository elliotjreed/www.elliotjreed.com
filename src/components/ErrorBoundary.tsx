import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error: error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error", error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <section className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Oh no! An error occurred!
            </h1>
            <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
              Oh no! It looks like something has caused an error! Hopefully the error was logged an I&apos;ll fix it
              shortly!
            </p>
            <div className="prose max-w-none dark:prose-dark">
              <p>If you are interested, this is the error which just ruined your day:</p>
              <pre className="whitespace-pre">
                {this.state.error.name}: {this.state.error.message}
              </pre>
              <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
