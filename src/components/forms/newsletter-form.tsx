"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitted");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 md:flex-row"
    >
      <input
        type="email"
        required
        placeholder="Email address"
        className="flex-1 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none"
      />
      <Button type="submit" variant="secondary">
        Join newsletter
      </Button>
      {status === "submitted" && (
        <p className="text-xs text-neutral-400">
          Thanks! Look out for the next dispatch.
        </p>
      )}
    </form>
  );
}

