declare global {
    interface Window {
        _paq?: Array<unknown[]>;
    }
}
export declare function initAnalytics(): void;
export declare function trackEvent(category: string, action: string, name: string, value?: string): void;
export declare function trackGoal(goalId: number): void;
//# sourceMappingURL=analytics.d.ts.map