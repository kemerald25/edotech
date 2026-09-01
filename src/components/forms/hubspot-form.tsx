"use client";

import { useEffect, useRef, useState } from "react";

type HubspotFormState = "loading" | "ready" | "error";

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

interface HubspotFormProps {
  portalId?: string;
  formId?: string;
  region?: string;
}

export function HubspotForm({
  portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || "27244747",
  formId = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || "5c746a65-8833-4de3-beec-03dce910dacf",
  region = process.env.NEXT_PUBLIC_HUBSPOT_REGION || "eu1",
}: HubspotFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<HubspotFormState>("loading");

  useEffect(() => {
    const scriptUrl =
      region === "eu1"
        ? "https://js-eu1.hsforms.net/forms/embed/v2.js"
        : "https://js.hsforms.net/forms/embed/v2.js";

    function renderForm() {
      if (!window.hbspt) return;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      window.hbspt.forms.create({
        portalId,
        formId,
        region,
        target: "#hubspot-form",
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

    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", renderForm);
      return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.charset = "utf-8";
    script.async = true;
    script.defer = true;
    script.onload = renderForm;
    script.onerror = () => setState("error");
    document.head.appendChild(script);
  }, [portalId, formId, region]);

  return (
    <div className="w-full">
      {state === "loading" && (
        <div className="flex items-center justify-center p-8 rounded-2xl border border-white/10 bg-white/5 text-sm text-neutral-400 animate-pulse">
          Loading registration form…
        </div>
      )}
      {state === "error" && (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-sm text-red-200 text-center">
          We couldn’t load the registration form. Please refresh the page or email{" "}
          <a href="mailto:join@edotech.community" className="underline font-medium text-white">
            join@edotech.community
          </a>.
        </div>
      )}
      <div id="hubspot-form" ref={containerRef} className="hs-form-wrapper min-h-[250px]" />
    </div>
  );
}


