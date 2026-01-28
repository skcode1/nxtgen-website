import React, { useCallback, useMemo, useRef, useState } from "react";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  headerMode?: "fixed" | "static";
  headerClassName?: string;
  toggleClassName?: string;
  topOffsetPx?: number;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = "#fff",
  openMenuButtonColor = "#fff",
  accentColor = "#8B5CF6",
  headerMode = "fixed",
  headerClassName,
  toggleClassName,
  topOffsetPx = 0,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const isStaticHeader = headerMode === "static";

  const handleLinkClick = useCallback(
    (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (href.startsWith("#")) {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
      setOpen(false);
      onMenuClose?.();
    },
    [onMenuClose]
  );

  const handleToggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      if (next) onMenuOpen?.();
      else onMenuClose?.();
      return next;
    });
  }, [onMenuClose, onMenuOpen]);

  const overlayStyle = useMemo(
    () =>
      isStaticHeader
        ? {
            top: topOffsetPx,
            height: `calc(100dvh - ${topOffsetPx}px)`,
          }
        : { top: 0, height: "100dvh" },
    [isStaticHeader, topOffsetPx]
  );

  const panelStyle = useMemo(
    () =>
      isStaticHeader
        ? {
            top: topOffsetPx,
            height: `calc(100dvh - ${topOffsetPx}px)`,
          }
        : { top: 0, height: "100dvh" },
    [isStaticHeader, topOffsetPx]
  );

  const slideTransform = useMemo(() => {
    if (!isStaticHeader) return undefined;
    if (open) return "translate3d(0,0,0)";
    return position === "left" ? "translate3d(-100%,0,0)" : "translate3d(100%,0,0)";
  }, [isStaticHeader, open, position]);

  return (
    <div
      className={`sm-scope z-50 ${
        isStaticHeader ? "relative" : "fixed top-0 left-0 pointer-events-none"
      } ${className || ""}`}
      style={isStaticHeader ? undefined : { width: "auto", height: "auto", overflow: "visible", maxWidth: "100%" }}
    >
      <div
        className="staggered-menu-wrapper pointer-events-none relative z-40"
        data-position={position}
        data-open={open || undefined}
        style={accentColor ? ({ ["--sm-accent" as any]: accentColor } as React.CSSProperties) : undefined}
      >
        {/* Overlay */}
        {open && (
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => {
              setOpen(false);
              onMenuClose?.();
            }}
            className="fixed left-0 right-0 bottom-0 z-[60] bg-black/40"
            style={overlayStyle}
          />
        )}

        {/* Header / Toggle */}
        <header
          className={`staggered-menu-header ${
            headerMode === "static" ? "relative" : open ? "absolute top-0 right-0" : "fixed top-0 right-0"
          } ${headerClassName || (headerMode === "static" ? "p-0" : "p-4 sm:p-[2em]")} bg-transparent pointer-events-none z-[75]`}
          aria-label="Main navigation header"
        >
          <button
            ref={toggleBtnRef}
            className={
              toggleClassName ||
              `sm-toggle sm-toggle-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold leading-none pointer-events-auto outline-none focus:outline-none ${
                open ? "text-black bg-white" : "text-white bg-white/10"
              }`
            }
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={handleToggle}
            type="button"
            style={{
              color: open ? openMenuButtonColor : menuButtonColor,
            }}
          >
            <span className="sm-toggle-line">{open ? "Close" : "Menu"}</span>
            <span className="sm-icon relative w-4 h-4 shrink-0 inline-flex items-center justify-center">
              <span
                className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2"
                style={{ transform: "translate(-50%,-50%) rotate(0deg)" }}
              />
              <span
                className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2"
                style={{ transform: "translate(-50%,-50%) rotate(90deg)" }}
              />
            </span>
          </button>
        </header>

        {/* Panel */}
        <aside
          id="staggered-menu-panel"
          className={`staggered-menu-panel fixed top-0 h-full bg-white flex flex-col left-0 right-0 w-screen z-[70] sm:left-auto sm:right-0 sm:w-[min(420px,90vw)] ${
            headerMode === "static"
              ? "p-[1.25rem_1.25rem_1.25rem_1.25rem] sm:p-[6em_2em_2em_2em]"
              : "p-[6em_2em_2em_2em]"
          } overflow-y-auto backdrop-blur-[12px] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-auto`}
          style={{
            WebkitBackdropFilter: "blur(12px)",
            ...panelStyle,
            transform: slideTransform,
          }}
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-1.5 sm:gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {(items && items.length ? items : [{ label: "No items", ariaLabel: "No items", link: "#" }]).map(
                (it, idx) => (
                  <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                    <a
                      className="sm-panel-item relative text-black font-semibold text-[2.25rem] sm:text-[3.5rem] cursor-pointer leading-[0.95] tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]"
                      href={it.link}
                      onClick={(e) => handleLinkClick(it.link, e)}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                    >
                      <span className="sm-panel-itemLabel inline-block">{it.label}</span>
                    </a>
                    {displayItemNumbering && (
                      <span className="absolute -right-4 top-1 text-sm text-[var(--sm-accent,#8B5CF6)] opacity-80">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    )}
                  </li>
                )
              )}
            </ul>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div className="sm-socials mt-auto pt-8 flex flex-col gap-3" aria-label="Social links">
                <h3 className="sm-socials-title m-0 text-base font-medium [color:var(--sm-accent,#8B5CF6)]">Socials</h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link text-[1.1rem] font-medium text-[#111] no-underline relative inline-block py-[2px] transition-[color,opacity] duration-300 ease-linear"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
.sm-scope .staggered-menu-wrapper { position: relative; z-index: 40; pointer-events: none; }
.sm-scope .staggered-menu-header { background: transparent; pointer-events: none; z-index: 75; }
.sm-scope .staggered-menu-header > * { pointer-events: auto; }
.sm-scope .sm-toggle { color: #e9e9ef; font-weight: 600; line-height: 1; }
.sm-scope .sm-toggle-glass { transition: background 0.25s ease, border-color 0.25s ease; }
.sm-scope .sm-toggle:focus-visible { outline: none; }
.sm-scope .sm-icon-line { background: currentColor; }
.sm-scope .staggered-menu-panel { opacity: 0; visibility: hidden; pointer-events: none; }
.sm-scope [data-open] .staggered-menu-panel { opacity: 1; visibility: visible; pointer-events: auto; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #8B5CF6); }
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #8B5CF6); }
.sm-scope .sm-prelayers { opacity: 0; visibility: hidden; }
.sm-scope [data-open] .sm-prelayers { opacity: 1; visibility: visible; }
@media (max-width: 640px) {
  .sm-scope .staggered-menu-panel { width: 100vw; left: 0; right: 0; }
}
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
