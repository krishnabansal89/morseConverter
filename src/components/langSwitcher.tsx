"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDownIcon, Globe } from 'lucide-react';

interface LanguageMapping {
    [key: string]: {
        name: string;
        nativeName: string;
        flag: string;
    };
}

const languageMappings: LanguageMapping = {
    en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
    vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
    it: { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
    fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
    es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
    pt: { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
    ru: { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
    tr: { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
};

interface LangSwitcherProps {
    showOnAllPages?: boolean;
    className?: string;
    variant?: 'compact' | 'full';
}

export default function LangSwitcher({ 
    showOnAllPages = false, 
    className = '',
    variant = 'full'
}: LangSwitcherProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Extract language from pathname with better validation
    const extractLanguageFromPath = useCallback((path: string): string => {
        const segments = path.split('/').filter(Boolean);
        const potentialLang = segments[0];
        
        if (potentialLang && languageMappings[potentialLang]) {
            return potentialLang;
        }
        return 'en'; // Default fallback
    }, []);

    // Handle language change with proper navigation
    const handleLanguageChange = useCallback(async (lang: string) => {
        if (lang === currentLanguage) {
            setIsOpen(false);
            return;
        }

        setIsLoading(true);
        setCurrentLanguage(lang);
        setIsOpen(false);

        try {
            // Get current path without language prefix
            const pathSegments = pathname.split('/').filter(Boolean);
            const currentLang = languageMappings[pathSegments[0]] ? pathSegments[0] : null;
            
            let newPath;
            if (lang === 'en') {
                // Remove language prefix if switching to English
                pathSegments.shift();
                newPath = `/${pathSegments.join('/')}`;
            } else {
            if (currentLang) {
                // Replace existing language
                pathSegments[0] = lang;
                newPath = `/${pathSegments.join('/')}`;
            } else {
                // Add language prefix
                newPath = `/${lang}${pathname}`;
            }
            }
            // Use Next.js router for better navigation
            router.push(newPath);
        } catch (error) {
            console.error('Language switch error:', error);
            // Fallback to window.location
            window.location.href = `/${lang}${pathname.replace(/^\/[a-z]{2}/, '')}`;
        } finally {
            setIsLoading(false);
        }
    }, [currentLanguage, pathname, router]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
        } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setIsOpen(!isOpen);
        }
    }, [isOpen]);

    // Update current language when pathname changes
    useEffect(() => {
        const detectedLang = extractLanguageFromPath(pathname);
        setCurrentLanguage(detectedLang);
    }, [pathname, extractLanguageFromPath]);

    // Determine if component should render
    const shouldRender = showOnAllPages || pathname.length < 4;

    if (!shouldRender) {
        return null;
    }

    const currentLangData = languageMappings[currentLanguage];

    return (
        <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className={`
                    flex items-center justify-between gap-2 px-4 py-2 
                    text-white font-medium rounded-lg border border-white/20
                    hover:bg-white/10 focus:outline-none focus:ring-2 
                    focus:ring-white/50 transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${isOpen ? 'bg-white/10' : ''}
                `}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label="Select language"
            >
                <div className="flex items-center gap-2">
                    {variant === 'compact' ? (
                        <Globe className="w-4 h-4" />
                    ) : (
                        <>
                            <span className="text-lg" role="img" aria-label={`${currentLangData.name} flag`}>
                                {currentLangData.flag}
                            </span>
                            <span className="hidden sm:inline">
                                {currentLangData.nativeName}
                            </span>
                            <span className="sm:hidden">
                                {currentLanguage.toUpperCase()}
                            </span>
                        </>
                    )}
                </div>
                <ChevronDownIcon 
                    className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`} 
                />
            </button>

            {isOpen && (
                <div className={`
                    absolute bottom-full mb-2 right-0 w-56 
                    bg-white rounded-lg shadow-lg border border-gray-200 
                    z-50 overflow-hidden
                `}>
                    <div className="py-1 max-h-64 overflow-y-auto">
                        {Object.entries(languageMappings).map(([lang, data]) => (
                            <button
                                key={lang}
                                onClick={() => handleLanguageChange(lang)}
                                className={`
                                    flex items-center gap-3 w-full px-4 py-3 text-left
                                    hover:bg-gray-50 transition-colors duration-150
                                    ${currentLanguage === lang ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}
                                `}
                                role="option"
                                aria-selected={currentLanguage === lang}
                            >
                                <span className="text-lg" role="img" aria-label={`${data.name} flag`}>
                                    {data.flag}
                                </span>
                                <div className="flex flex-col">
                                    <span className="font-medium">{data.name}</span>
                                    <span className="text-sm text-gray-500">{data.nativeName}</span>
                                </div>
                                {currentLanguage === lang && (
                                    <span className="ml-auto text-blue-600">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
}
