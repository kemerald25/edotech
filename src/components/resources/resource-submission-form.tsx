"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = ["Docs", "Data", "Tutorial", "Tool"];

type FormState = "idle" | "success";

export function ResourceSubmissionForm() {
  const [state, setState] = useState<FormState>("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("success");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-[32px] border border-white/10 bg-white/5 p-6"
    >
      <div>
        <label className="text-sm text-neutral-300">Your name</label>
        <input
          name="name"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none"
          placeholder="Adaeze Uwa"
        />
      </div>
      <div>
        <label className="text-sm text-neutral-300">Email</label>
        <input
          type="email"
          name="email"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label className="text-sm text-neutral-300">Resource title</label>
        <input
          name="title"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none"
          placeholder="Paty Playbook"
        />
      </div>
      <div>
        <label className="text-sm text-neutral-300">Link</label>
        <input
          type="url"
          name="link"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none"
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="text-sm text-neutral-300">Category</label>
        <select
          name="category"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus-visible:outline-none"
        >
          {categories.map((category) => (
            <option key={category} value={category} className="bg-background">
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm text-neutral-300">Description</label>
        <textarea
          name="description"
          rows={4}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus-visible:outline-none"
          placeholder="What should the community know about this resource?"
        />
      </div>
      <label className="flex items-start gap-3 text-sm text-neutral-300">
        <input type="checkbox" required className="mt-1" />
        <span>
          I confirm this resource follows the community guidelines and agree to the
          <a href="/privacy" className="ml-1 text-secondary underline">
            privacy policy
          </a>
          .
        </span>
      </label>
      <Button type="submit" className="w-full">
        Submit resource
      </Button>
      {state === "success" && (
        <p className="text-center text-sm text-secondary">
          Thanks! A curator will review your submission within 48 hours.
        </p>
      )}
    </form>
  );
}


