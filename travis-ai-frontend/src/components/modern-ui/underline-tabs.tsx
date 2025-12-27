"use client";

import type React from "react";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/modern-ui/button";

interface Tab {
  id: string;
  label: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
}

interface UnderlineTabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  className?: string;
}

const TabContent = memo(
  ({ content, isActive }: { content: React.ReactNode; isActive: boolean }) =>
    isActive ? <div role="tabpanel">{content}</div> : null
);
TabContent.displayName = "TabContent";

export function UnderlineTabs({
  tabs,
  defaultTabId,
  className,
}: UnderlineTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId ?? tabs[0]?.id ?? "");
  const [visibleTabs, setVisibleTabs] = useState<Tab[]>(tabs);
  const [overflowTabs, setOverflowTabs] = useState<Tab[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [underline, setUnderline] = useState({ x: 0, width: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabWidths = useRef<Record<string, number>>({});
  const resizeObserver = useRef<ResizeObserver | null>(null);

  /* ---------------------------------- utils --------------------------------- */

  const isTabVisible = (id: string) => visibleTabs.some((t) => t.id === id);

  const updateUnderline = (id: string) => {
    const el = tabRefs.current[id];
    if (!el || !containerRef.current) return;

    setUnderline({
      x: el.offsetLeft,
      width: el.offsetWidth,
    });
  };

  /* --------------------------- measure tab widths --------------------------- */

  useLayoutEffect(() => {
    tabs.forEach((tab) => {
      const el = tabRefs.current[tab.id];
      if (el) tabWidths.current[tab.id] = el.offsetWidth;
    });
  }, [tabs]);

  /* ----------------------- calculate visible / overflow ---------------------- */

  const calculateTabs = (priorityId?: string) => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const dropdownWidth = 48;

    let remaining = containerWidth;
    const ordered = priorityId
      ? [
          tabs.find((t) => t.id === priorityId)!,
          ...tabs.filter((t) => t.id !== priorityId),
        ]
      : tabs;

    const visible = new Set<string>();

    for (const tab of ordered) {
      const width = tabWidths.current[tab.id] ?? 0;
      const needsDropdown = ordered.length - visible.size > 1;

      const usableWidth = needsDropdown ? remaining - dropdownWidth : remaining;

      if (usableWidth >= width) {
        visible.add(tab.id);
        remaining -= width;
      } else {
        break;
      }
    }

    setVisibleTabs(tabs.filter((t) => visible.has(t.id)));
    setOverflowTabs(tabs.filter((t) => !visible.has(t.id)));
  };

  /* ------------------------------ resize logic ------------------------------ */

  useEffect(() => {
    if (!containerRef.current) return;

    resizeObserver.current = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        calculateTabs(activeTab);
        if (isTabVisible(activeTab)) updateUnderline(activeTab);
      });
    });

    resizeObserver.current.observe(containerRef.current);
    return () => resizeObserver.current?.disconnect();
  }, [activeTab, tabs]);

  /* ------------------------------ active change ----------------------------- */

  useLayoutEffect(() => {
    if (isTabVisible(activeTab)) updateUnderline(activeTab);
  }, [activeTab, visibleTabs]);

  const onTabClick = (id: string) => {
    setActiveTab(id);
    setDropdownOpen(false);
    if (overflowTabs.some((t) => t.id === id)) {
      calculateTabs(id);
    }
  };

  /* ---------------------------------- render -------------------------------- */

  return (
    <div className={cn("w-full relative", className)}>
      <div
        ref={containerRef}
        role="tablist"
        className="relative border-b flex items-center"
      >
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[tab.id] = el;
            }}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onTabClick(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}

        {overflowTabs.length > 0 && (
          <div className="ml-auto relative">
            <Button
              variant="ghost"
              size="sm"
              className="h-10 w-10"
              onClick={() => setDropdownOpen((v) => !v)}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-md border bg-background shadow-lg z-50">
                {overflowTabs.map((tab) => (
                  <div
                    key={tab.id}
                    onClick={() => onTabClick(tab.id)}
                    className={cn(
                      "px-4 py-2 text-sm cursor-pointer hover:bg-muted rounded-md flex justify-between",
                      activeTab === tab.id && "bg-muted font-medium"
                    )}
                  >
                    {tab.label}
                    {tab.icon}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {isTabVisible(activeTab) && (
          <div
            className="absolute bottom-0 h-0.5 bg-primary transition-all"
            style={{
              transform: `translateX(${underline.x}px)`,
              width: underline.width,
            }}
          />
        )}
      </div>

      <div className="mt-4">
        {tabs.map((tab) => (
          <TabContent
            key={tab.id}
            content={tab.content}
            isActive={activeTab === tab.id}
          />
        ))}
      </div>
    </div>
  );
}
