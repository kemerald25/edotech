"use client";

import { useEffect, useRef, useState } from "react";

type HubspotFormState = "loading" | "ready" | "error" | "missing";

type HubspotWindow = {
  forms: {
    create: (options: {
      portalId: string;
      formId: string;
      target: string;
      region?: string;
      onFormReady?: () => void;
      onFormSubmitted?: () => void;
    }) => void;
  };
};

declare global {
  interface Window {
    hbspt?: HubspotWindow;
  }
}

export function HubspotForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;
  const hasConfig = Boolean(portalId && formId);
  const [state, setState] = useState<HubspotFormState>(
    hasConfig ? "loading" : "missing",
  );

  useEffect(() => {
    if (!hasConfig || !portalId || !formId) {
      return;
    }

    const scriptUrl = "https://js.hsforms.net/forms/embed/v2.js";

    function renderForm() {
      if (!window.hbspt) return;
      window.hbspt.forms.create({
        portalId,
        formId,
        target: "#hubspot-form",
        region: "na1",
        onFormReady: () => setState("ready"),
        onFormSubmitted: () => {
          setTimeout(() => {
            containerRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 200);
        },
      });
    }

    if (window.hbspt) {
      renderForm();
      return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.defer = true;
    script.onload = renderForm;
    script.onerror = () => setState("error");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [hasConfig, portalId, formId]);

  if (state === "missing") {
    return (
      <div className="rounded-3xl border border-dashed border-secondary/40 p-6 text-sm text-secondary">
        Add NEXT_PUBLIC_HUBSPOT_PORTAL_ID and NEXT_PUBLIC_HUBSPOT_FORM_ID to use
        the embedded form.
      </div>
    );
  }

  return (
    <div>
      {state === "loading" && (
        <div className="mb-4 animate-pulse rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-neutral-400">
          Preparing secure HubSpot form…
        </div>
      )}
      {state === "error" && (
        <div className="mb-4 rounded-3xl border border-red-400/40 bg-red-400/10 p-6 text-sm text-red-200">
          We couldn’t load the HubSpot form. Please reload or email join@edotech.community.
        </div>
      )}
      <div id="hubspot-form" ref={containerRef} />
    </div>
  );
}

