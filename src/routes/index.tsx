import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-gym.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IronForge Gym — Join Today" },
      {
        name: "description",
        content:
          "IronForge Gym: strength training, expert coaching and 24/7 access. Register online in under a minute.",
      },
      { property: "og:title", content: "IronForge Gym — Join Today" },
      {
        property: "og:description",
        content:
          "Strength training, expert coaching and 24/7 access. Register online in under a minute.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    price: "₹1,499",
    period: "/month",
    perks: ["Full gym access", "Locker & shower", "1 free trial session"],
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: "₹3,999",
    period: "/3 months",
    perks: ["Full gym access", "Locker & shower", "2 trainer sessions"],
  },
  {
    id: "annual",
    name: "Annual",
    price: "₹12,999",
    period: "/year",
    perks: ["Full gym access", "4 trainer sessions", "Nutrition plan"],
  },
] as const;

type PlanId = (typeof PLANS)[number]["id"];

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <SiteNav />
      <Hero />
      <Features />
      <Pricing />
      <Registration />
      <SiteFooter />
    </div>
  );
}

function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="font-display text-2xl tracking-widest text-primary">
          IRONFORGE
        </a>
        <nav className="hidden gap-6 text-sm font-medium text-muted-foreground sm:flex">
          <a href="#why-us" className="transition-colors hover:text-foreground">
            Why us
          </a>
          <a href="#plans" className="transition-colors hover:text-foreground">
            Plans
          </a>
          <a href="#join" className="transition-colors hover:text-foreground">
            Join
          </a>
        </nav>
        <a
          href="#join"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Join now
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroImg}
        alt="IronForge Gym training floor"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-4 py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Train harder. Get stronger.
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-6xl leading-none tracking-wide sm:text-8xl">
          FORGE YOUR STRONGEST SELF AT IRONFORGE
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Heavy iron, expert coaching and a community that pushes you. Open
          early, open late — registered members train 24/7.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#join"
            className="rounded-md bg-primary px-8 py-4 font-display text-xl tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            REGISTER NOW
          </a>
          <a
            href="#plans"
            className="rounded-md border border-border bg-background/50 px-8 py-4 font-display text-xl tracking-wider transition-colors hover:bg-accent"
          >
            VIEW PLANS
          </a>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  {
    title: "24/7 Access",
    text: "Registered members train any time with secure keycard entry.",
  },
  {
    title: "Expert Coaches",
    text: "Certified trainers on the floor every day to fix your form and plan your progress.",
  },
  {
    title: "Serious Equipment",
    text: "Full free-weight section, racks, platforms and cardio zone — no waiting.",
  },
  {
    title: "Nutrition Support",
    text: "Simple, practical meal guidance built around your goal.",
  },
] as const;

function Features() {
  return (
    <section id="why-us" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="font-display text-4xl tracking-wide sm:text-5xl">
        WHY LIFT WITH US
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-lg border border-border bg-card p-6"
          >
            <h3 className="font-display text-2xl tracking-wide text-primary">
              {f.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="plans" className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="font-display text-4xl tracking-wide sm:text-5xl">
          MEMBERSHIP PLANS
        </h2>
        <p className="mt-3 text-muted-foreground">
          Pick a plan — you choose it again in the registration form below.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className={
                "rounded-lg border bg-card p-8 " +
                (i === 1 ? "border-primary" : "border-border")
              }
            >
              <h3 className="font-display text-3xl tracking-wide">
                {plan.name.toUpperCase()}
              </h3>
              <p className="mt-4">
                <span className="text-4xl font-bold text-primary">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex gap-2">
                    <span className="text-primary">✓</span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const planValues = ["monthly", "quarterly", "annual"] as const;

function Registration() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan, setPlan] = useState<PlanId>("monthly");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = fullName.trim();
    const mail = email.trim();
    const tel = phone.trim();

    if (name.length < 2 || name.length > 80) {
      setErrorMsg("Please enter your full name (2–80 characters).");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) || mail.length > 255) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (!/^[+\d][\d\s-]{6,19}$/.test(tel)) {
      setErrorMsg("Please enter a valid phone number (7–20 digits).");
      setStatus("error");
      return;
    }
    if (!planValues.includes(plan)) {
      setErrorMsg("Please pick a membership plan.");
      setStatus("error");
      return;
    }

    setErrorMsg("");
    setStatus("submitting");
    const { error } = await supabase.from("gym_registrations").insert({
      full_name: name,
      email: mail,
      phone: tel,
      plan,
    });
    if (error) {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <section id="join" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-8 sm:p-10">
        {status === "success" ? (
          <div className="text-center">
            <h2 className="font-display text-4xl tracking-wide text-primary">
              YOU'RE IN!
            </h2>
            <p className="mt-4 text-muted-foreground">
              Thanks, {fullName.trim().split(" ")[0]} — your registration for
              the{" "}
              <span className="font-semibold text-foreground">
                {PLANS.find((p) => p.id === plan)?.name}
              </span>{" "}
              plan is received. We'll call you on {phone.trim()} within 24
              hours to finish your membership.
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-display text-4xl tracking-wide">
              REGISTER NOW
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in your details and we'll get your membership started.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1 block text-sm font-medium"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  maxLength={80}
                  placeholder="Your name"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-sm font-medium"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={20}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                />
              </div>
              <div>
                <label
                  htmlFor="plan"
                  className="mb-1 block text-sm font-medium"
                >
                  Membership plan
                </label>
                <select
                  id="plan"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value as PlanId)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring"
                >
                  {PLANS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.price} {p.period}
                    </option>
                  ))}
                </select>
              </div>
              {status === "error" && errorMsg && (
                <p className="text-sm text-destructive">{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-md bg-primary px-6 py-3 font-display text-xl tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "SENDING…" : "COMPLETE REGISTRATION"}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <p className="font-display text-xl tracking-widest text-primary">
          IRONFORGE
        </p>
        <p>Open daily · Strength · Cardio · Coaching</p>
      </div>
    </footer>
  );
}
