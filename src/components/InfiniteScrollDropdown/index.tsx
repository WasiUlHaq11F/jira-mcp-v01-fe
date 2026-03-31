import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, ChevronDown, Loader2, X, AlertCircle } from 'lucide-react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useDebounce } from '@/hooks/useDebounce';
import { AxiosResponse } from 'axios';

export interface InfiniteScrollOption {
  value: string | number;
  label: string;
}

interface InfiniteScrollDropdownProps {
  fetchData: (
    page: number,
    limit: number,
    search?: string
  ) => Promise<AxiosResponse<InfiniteScrollOption[], any>>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  errorMessage?: string;
  initialOption?: InfiniteScrollOption;
  minSearchLength?: number;
  pageSize?: number;
}

export const InfiniteScrollDropdown: React.FC<InfiniteScrollDropdownProps> = ({
  fetchData,
  value,
  onChange,
  placeholder = 'Select option...',
  label,
  searchPlaceholder = 'Search...',
  disabled = false,
  clearable = false,
  errorMessage,
  initialOption,
  minSearchLength = 0,
  pageSize = 20,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const scrollAreaRootRef = useRef<HTMLDivElement>(null);
  const [viewportEl, setViewportEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setViewportEl(null);
      return;
    }

    const id = requestAnimationFrame(() => {
      const root = scrollAreaRootRef.current;
      if (!root) return;
      const vp = root.querySelector<HTMLElement>(
        '[data-radix-scroll-area-viewport]'
      );
      setViewportEl(vp || null);
    });

    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  const scrollContainerRef = useMemo(
    () => ({ current: viewportEl } as React.RefObject<HTMLElement | null>),
    [viewportEl]
  );

  const effectiveSearch = debouncedSearchTerm.length >= minSearchLength ? debouncedSearchTerm : '';

  const searchAwareFetch = useCallback(
    (page: number, limit: number) => fetchData(page, limit, effectiveSearch),
    [fetchData, effectiveSearch]
  );

  const meetsSearchRequirement = minSearchLength === 0 || debouncedSearchTerm.length >= minSearchLength;

  const { data, loading, hasMore, error, reset } = useInfiniteScroll<InfiniteScrollOption>({
    fetchData: searchAwareFetch,
    initialPage: 0,
    limit: pageSize,
    scrollContainer: scrollContainerRef,
    threshold: 100,
    enabled: !!viewportEl && meetsSearchRequirement,
  });

  useEffect(() => {
    reset();
  }, [effectiveSearch, reset]);

  const displayData = useMemo(() => {
    if (!initialOption || data.some(opt => opt.value.toString() === initialOption.value.toString())) {
      return data;
    }
    return [initialOption, ...data];
  }, [data, initialOption]);

  const selectedOption = displayData.find(option => option.value.toString() === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue.toString());
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  const hasValue = value && value !== '';

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={label || placeholder}
            className="w-full justify-between text-left font-normal"
            disabled={disabled}
          >
            <span className="truncate">{displayText}</span>
            <div className="flex items-center gap-1">
              {clearable && hasValue && !disabled && (
                <X
                  className="h-4 w-4 opacity-50 hover:opacity-100"
                  onClick={handleClear}
                />
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-80 p-0" align="start">
          {/* Search */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <ScrollArea className="h-60" ref={scrollAreaRootRef}>
            <div className="p-1" role="listbox">
              {error ? (
                <div className="p-3 text-sm text-destructive text-center flex flex-col items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>{errorMessage || error.message || 'Failed to load options'}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => reset()}
                    className="mt-2"
                  >
                    Try Again
                  </Button>
                </div>
              ) : !meetsSearchRequirement && displayData.length === 0 ? (
                <div className="p-3 text-sm text-muted-foreground text-center">
                  Type at least {minSearchLength} characters to search
                </div>
              ) : displayData.length === 0 && !loading ? (
                <div className="p-3 text-sm text-muted-foreground text-center">
                  No options found
                </div>
              ) : (
                <>
                  {displayData.map(option => (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={option.value.toString() === value}
                      tabIndex={0}
                      className="flex items-center p-2 hover:bg-accent cursor-pointer rounded-sm focus:bg-accent focus:outline-none"
                      onClick={() => handleSelect(option.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelect(option.value);
                        }
                      }}
                    >
                      <span className="text-sm">{option.label}</span>
                    </div>
                  ))}

                  {loading && hasMore && (
                    <div className="flex items-center justify-center p-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}

                  {!hasMore && displayData.length > 0 && (
                    <div className="p-3 text-xs text-muted-foreground text-center">
                      All options loaded
                    </div>
                  )}
                </>
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};
