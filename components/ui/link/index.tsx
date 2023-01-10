import Link from "next/link"
import React, { FunctionComponent, ReactElement } from "react"
import { useRouter } from "next/router"

type LinkProps = {
  href: string;
  children: ReactElement;
  activeClass: string;
  className: string;
}

const ActiveLink: FunctionComponent<LinkProps> = ({children, activeClass = "", ...props}) => {
  const { pathname } = useRouter()
  let className = children!.props.className || ""
  let _defaultClass = `${className} text-gray-100`

  if (pathname === props.href) {
    className = `${className} text-indigo-400 ${activeClass}`
  } else {
    className = _defaultClass;
  }

  return (
    <Link {...props}>
      {
        React.cloneElement(children, {className})
      }
    </Link>
  )
}

export default ActiveLink;