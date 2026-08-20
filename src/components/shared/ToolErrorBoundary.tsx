import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  toolName?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ToolErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ToolErrorBoundary] Caught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) this.props.onReset();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto my-12 p-8 rounded-3xl border border-red-500/30 bg-slate-900/90 backdrop-blur-xl text-center space-y-4 shadow-2xl">
          <div className="h-12 w-12 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-white">
            {this.props.toolName || "Engine"} Encountered a Local Error
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            {this.state.error?.message || "An unexpected error occurred during local memory execution. Your browser session remains safe."}
          </p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
          >
            <RefreshCw className="h-4 w-4" /> Reset Tool Engine
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
