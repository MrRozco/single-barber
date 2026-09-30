import type { AnchorHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight } from "./icons";
import { cx } from "../lib/cx";

type SmartLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Internal paths ("/about", "/#book") use client-side routing; hashes and external URLs stay plain anchors. */
export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)} {...rest}>
      {children}
    </a>
  );
}

export type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit";
  block?: boolean;
  arrow?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  block,
  arrow,
  disabled,
  ariaLabel,
  className,
}: ButtonProps) {
  const cls = cx("sl-btn", `sl-btn-${variant}`, size !== "md" && `sl-btn-${size}`, block && "sl-btn-block", className);
  const content = (
    <>
      {children}
      {arrow && <ArrowRight />}
    </>
  );
  if (href) {
    return (
      <SmartLink href={href} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {content}
      </SmartLink>
    );
  }
  return (
    <button className={cls} type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {content}
    </button>
  );
}

export function Stars({ value = 5 }: { value?: number }) {
  return (
    <span className="sl-stars" role="img" aria-label={`${value} out of 5 stars`}>
      {"★★★★★".slice(0, Math.round(value))}
    </span>
  );
}
