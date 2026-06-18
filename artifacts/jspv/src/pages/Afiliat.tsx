import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSEO } from "@/lib/seo";
import { COMARQUES } from "@/data/content";
import { useT } from "@/i18n/context";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  comarca: string;
  consent: true;
};

export default function Afiliat() {
  const { t } = useT();

  useSEO({
    path: "/afiliat",
    title: t.seo.afiliat.title,
    description: t.seo.afiliat.description,
  });

  const schema = z.object({
    fullName: z.string().min(3, t.afiliat.errors.nomRequired),
    email: z.string().email(t.afiliat.errors.emailInvalid),
    phone: z.string().min(9, t.afiliat.errors.telefonInvalid),
    comarca: z.string().min(1, t.afiliat.errors.comarcaRequired),
    consent: z.literal(true, {
      errorMap: () => ({ message: t.afiliat.errors.consentRequired }),
    }),
  });

  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: { fullName: "", email: "", phone: "", comarca: "" },
  });

  const comarca = watch("comarca");

  const next = async () => {
    if (await trigger(["fullName", "email"])) setStep(2);
  };

  const onSubmit = (_data: FormValues) => {
    setDone(true);
  };

  const fieldClass = (hasError?: unknown) =>
    `w-full h-12 px-4 rounded-md border bg-white text-foreground text-base outline-none transition-colors ${
      hasError ? "border-primary" : "border-input focus:border-foreground"
    }`;

  return (
    <Layout crumbs={[{ label: t.afiliat.crumb }]}>
      <section className="bg-white">
        <div className="container-page py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <Reveal>
              <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-primary mb-3">
                {t.afiliat.eyebrow}
              </p>
              <h1 className="font-display font-extrabold text-foreground text-4xl sm:text-5xl leading-[1.05]">
                {t.afiliat.title}{" "}
                <span className="text-primary">{t.afiliat.titleHighlight}</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                {t.afiliat.desc}
              </p>
              <span className="hidden lg:block w-24 h-1.5 bg-primary mt-8" aria-hidden="true" />
            </Reveal>

            <Reveal delay={120}>
              <div className="bg-[hsl(var(--surface))] border border-border rounded-xl p-7 md:p-8">
                {done ? (
                  <div className="text-center py-10" role="status">
                    <span className="mx-auto mb-5 w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <CheckCircle2 size={36} aria-hidden="true" />
                    </span>
                    <h2 className="font-display font-extrabold text-2xl text-foreground">
                      {t.afiliat.solicitudRebuda}
                    </h2>
                    <p className="mt-3 text-muted-foreground">{t.afiliat.gracies}</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 mb-7" aria-hidden="true">
                      <span className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-border"}`} />
                      <span className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-border"}`} />
                    </div>
                    <p className="font-display font-semibold text-sm text-muted-foreground mb-5">
                      {t.afiliat.pas} {step} {t.afiliat.de} 2
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                      {step === 1 && (
                        <>
                          <div>
                            <label htmlFor="fullName" className="block font-display font-semibold text-sm text-foreground mb-1.5">
                              {t.afiliat.nomComplet}
                            </label>
                            <input
                              id="fullName"
                              type="text"
                              data-testid="input-fullname"
                              aria-invalid={!!errors.fullName}
                              className={fieldClass(errors.fullName)}
                              {...register("fullName")}
                            />
                            {errors.fullName && (
                              <p className="mt-1.5 text-sm text-primary">{errors.fullName.message}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="email" className="block font-display font-semibold text-sm text-foreground mb-1.5">
                              {t.afiliat.correuElectronic}
                            </label>
                            <input
                              id="email"
                              type="email"
                              data-testid="input-email"
                              aria-invalid={!!errors.email}
                              className={fieldClass(errors.email)}
                              {...register("email")}
                            />
                            {errors.email && (
                              <p className="mt-1.5 text-sm text-primary">{errors.email.message}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={next}
                            data-testid="button-next"
                            className="w-full h-12 rounded-md bg-foreground text-white font-display font-bold hover:bg-primary transition-colors"
                          >
                            {t.afiliat.continuar}
                          </button>
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <div>
                            <label htmlFor="phone" className="block font-display font-semibold text-sm text-foreground mb-1.5">
                              {t.afiliat.telefon}
                            </label>
                            <input
                              id="phone"
                              type="tel"
                              data-testid="input-phone"
                              aria-invalid={!!errors.phone}
                              className={fieldClass(errors.phone)}
                              {...register("phone")}
                            />
                            {errors.phone && (
                              <p className="mt-1.5 text-sm text-primary">{errors.phone.message}</p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="comarca" className="block font-display font-semibold text-sm text-foreground mb-1.5">
                              {t.afiliat.comarca}
                            </label>
                            <Select
                              value={comarca || undefined}
                              onValueChange={(v) => setValue("comarca", v, { shouldValidate: true })}
                            >
                              <SelectTrigger id="comarca" className="h-12 bg-white" data-testid="select-comarca" aria-invalid={!!errors.comarca}>
                                <SelectValue placeholder={t.afiliat.selecciona} />
                              </SelectTrigger>
                              <SelectContent className="max-h-72">
                                {COMARQUES.map((c) => (
                                  <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.comarca && (
                              <p className="mt-1.5 text-sm text-primary">{errors.comarca.message}</p>
                            )}
                          </div>
                          <div className="flex items-start gap-3">
                            <input
                              id="consent"
                              type="checkbox"
                              data-testid="input-consent"
                              className="mt-1 w-4 h-4 accent-[hsl(var(--primary))]"
                              {...register("consent")}
                            />
                            <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                              {t.afiliat.consent}
                            </label>
                          </div>
                          {errors.consent && (
                            <p className="-mt-2 text-sm text-primary">{errors.consent.message as string}</p>
                          )}
                          <div className="flex gap-3">
                            <button
                              type="button"
                              onClick={() => setStep(1)}
                              data-testid="button-back"
                              className="h-12 px-5 rounded-md border border-input text-foreground font-display font-semibold hover:bg-white transition-colors"
                            >
                              {t.afiliat.tornar}
                            </button>
                            <button
                              type="submit"
                              data-testid="button-submit"
                              className="flex-1 h-12 rounded-md bg-primary text-primary-foreground font-display font-bold hover:bg-primary/90 transition-colors"
                            >
                              {t.afiliat.vullAfiliar}
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
