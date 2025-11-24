"use client";

import Callout from "./callout";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const ProseH2 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className="mt-12 scroll-m-20 font-heading text-3xl font-semibold text-white"
    {...props}
  />
);

const ProseP = (props: HTMLAttributes<HTMLParagraphElement>) => (
  <p className="mt-4 text-neutral-200" {...props} />
);

export const mdxComponents = {
  h2: ProseH2,
  p: ProseP,
  Callout,
  img: (props: React.ComponentProps<typeof Image>) => (
    <Image
      className={cn("rounded-3xl border border-white/10", props.className)}
      alt={props.alt ?? ""}
      {...props}
    />
  ),
};

