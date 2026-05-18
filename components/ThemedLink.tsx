import Link from "next/link"
import {ComponentPropsWithoutRef} from 'react'
type Props =  {
  children: React.ReactNode;
  className?: string;
  href: string;
} & ComponentPropsWithoutRef<'a'>
export default function ThemedLink({className, href, children, ...props}: Props) {
  return (
    <Link  href={href} className={`text-link hover:underline ${className}`} {...props}>{children}</Link>
  )
}