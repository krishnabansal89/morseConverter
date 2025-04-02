// components/breadcrumb.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { useMemo } from "react";

interface BreadcrumbProps {
  homeElement?: React.ReactNode;
  separator?: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeItemClasses?: string;
  inactiveItemClasses?: string;
  // Custom labels for path segments (e.g., { "blog": "Our Blog", "contact": "Get in Touch" })
  customLabels?: Record<string, string>;
  // Paths to be excluded from breadcrumbs (e.g., ["admin", "dashboard"])
  excludePaths?: string[];
  // Flag to transform URL segments to title case
  transformLabel?: boolean;
}

const defaultProps = {
  homeElement: <Home size={16} />,
  separator: <ChevronRight size={16} className="mx-2 text-gray-400" />,
  containerClasses: "flex py-4 text-sm",
  listClasses: "flex items-center",
  activeItemClasses: "text-[#456359] font-medium",
  inactiveItemClasses: "text-gray-500 hover:text-[#324740] transition-colors",
  customLabels: {},
  excludePaths: [],
  transformLabel: true,
};

// Helper function to convert slug to title case
const toTitleCase = (str: string): string => {
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function Breadcrumb(props: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Merge default props and user props
  const {
    homeElement,
    separator,
    containerClasses,
    listClasses,
    activeItemClasses,
    inactiveItemClasses,
    customLabels,
    excludePaths,
    transformLabel,
  } = { ...defaultProps, ...props };

  // Generate breadcrumb items based on the current path
  const breadcrumbs = useMemo(() => {
    // Handle home page
    if (pathname === "/") {
      return [{ href: "/", label: "Home", isActive: true }];
    }

    // Split the path into segments
    const segments = pathname
      .split("/")
      .filter((segment) => segment !== "");
      
    // Filter out excluded paths
    const filteredSegments = segments.filter(
      (segment) => !excludePaths?.includes(segment)
    );

    // Build breadcrumb items with proper paths and labels
    return [
      { href: "/", label: "Home", isActive: false },
      ...filteredSegments.map((segment, index) => {
        // Build the href for this breadcrumb item
        const href = `/${filteredSegments.slice(0, index + 1).join("/")}`;
        
        // Determine if this is the last (active) item
        const isActive = index === filteredSegments.length - 1;
        
        // Get the display label for this segment
        let label = customLabels?.[segment] || segment;
        
        // Transform label to title case if requested
        if (transformLabel && !customLabels?.[segment]) {
          label = toTitleCase(label);
        }
        
        return { href, label, isActive };
      }),
    ];
  }, [pathname, customLabels, excludePaths, transformLabel]);

  return (
    <nav aria-label="Breadcrumb" className={containerClasses}>
      <ol className={listClasses}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && separator}
            
            {breadcrumb.isActive ? (
              <span className={activeItemClasses}>
                {index === 0 ? homeElement : breadcrumb.label}
              </span>
            ) : (
              <Link
                href={breadcrumb.href}
                className={inactiveItemClasses}
              >
                {index === 0 ? homeElement : breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
