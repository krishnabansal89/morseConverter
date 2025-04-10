// components/breadcrumb.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { useMemo, useEffect } from "react";
import Script from "next/script";

interface BreadcrumbProps {
  homeElement?: React.ReactNode;
  separator?: React.ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeItemClasses?: string;
  inactiveItemClasses?: string;
  customLabels?: Record<string, string>;
  excludePaths?: string[];
  transformLabel?: boolean;
  domain?: string; // Add domain prop for absolute URLs
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
  domain: typeof window !== 'undefined' ? window.location.origin : '',
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
    domain,
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

  // Generate JSON-LD schema
  const jsonLdSchema = useMemo(() => {
    const baseDomain = domain || '';
    
    const schemaData = {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": index === 0 ? "Home" : breadcrumb.label,
        "item": `${baseDomain}${breadcrumb.href}`
      }))
    };
    
    return JSON.stringify(schemaData);
  }, [breadcrumbs, domain]);

  // Add JSON-LD schema to the document head
  useEffect(() => {
    // Remove any existing breadcrumb schema
    const existingSchema = document.querySelector('script[data-breadcrumb-schema]');
    if (existingSchema) {
      existingSchema.remove();
    }
    
    // Create and append the new schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = jsonLdSchema;
    script.setAttribute('data-breadcrumb-schema', '');
    document.head.appendChild(script);
    
    // Cleanup on unmount
    return () => {
      const schemaToRemove = document.querySelector('script[data-breadcrumb-schema]');
      if (schemaToRemove) {
        schemaToRemove.remove();
      }
    };
  }, [jsonLdSchema]);

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
