import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

const comarcas = [
  "L'Horta Nord", "L'Horta Sud", "La Safor", "La Marina Alta", "El Comtat",
  "L'Alcoià", "La Vall d'Albaida", "La Ribera Alta", "La Canal de Navarrés",
  "El Vinalopó", "La Vega Baixa", "Alt Palància", "L'Alt Millars", "L'Alcalatén",
  "La Plana Alta", "La Plana Baixa", "Els Ports", "El Maestrat", "Alt Maestrat", "El Baix Maestrat"
];

const step1Schema = z.object({
  fullName: z.string().min(3, "El nom complet és requerit"),
  email: z.string().email("Correu electrònic invàlid"),
});

const step2Schema = step1Schema.extend({
  phone: z.string().min(9, "Telèfon invàlid"),
  comarca: z.string().min(1, "Selecciona una comarca"),
});

type FormValues = z.infer<typeof step2Schema>;

function FloatingInput({
  id,
  label,
  type = "text",
  error,
  testId,
  ...rest
}: {
  id: string;
  label: string;
  type?: string;
  error?: string;
  testId?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean((rest.value as string)?.length);
  const lifted = focused || hasValue;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        data-testid={testId}
        className={`
          peer w-full h-16 px-4 pt-5 pb-2 rounded-lg border text-gray-900 text-base bg-gray-50
          outline-none transition-colors
          ${error
            ? "border-[#E30613] focus:border-[#E30613]"
            : "border-gray-200 focus:border-[#111111]"
          }
        `}
        {...rest}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-4 pointer-events-none font-medium transition-all duration-150
          ${lifted
            ? "top-2 text-xs text-gray-500"
            : "top-1/2 -translate-y-1/2 text-base text-gray-400"
          }
          ${focused && !error ? "text-[#111111]" : ""}
          ${error ? "text-[#E30613]" : ""}
        `}
      >
        {label}
      </label>
      {error && (
        <p className="mt-1 text-xs font-medium text-[#E30613]">{error}</p>
      )}
    </div>
  );
}

export function Afiliate() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
    defaultValues: { fullName: "", email: "", phone: "", comarca: "" },
  });

  const values = watch();

  const onNext = async () => {
    const ok = await trigger(["fullName", "email"]);
    if (ok) setStep(2);
  };

  const onSubmit = async (data: FormValues) => {
    console.log("Afiliació enviada:", data);
    setIsSuccess(true);
  };

  return (
    <section id="afiliate" className="py-32 bg-[#111111]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-montserrat font-black text-5xl md:text-6xl text-white mb-6 leading-tight">
              Forma part de la <span className="text-[#E30613]">generació de ferro</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed mb-8">
              No som la generació de cristall que es trenca. Som els que ens emplem de fang, els que no abandonen, els que lideren. Uneix-te a nosaltres.
            </p>
            <div className="hidden lg:block w-24 h-2 bg-[#E30613]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-24 h-24 bg-[#E30613]/10 text-[#E30613] rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <h3 className="font-montserrat font-black text-3xl text-gray-900 mb-4">
                  Benvingut/da a JSPV!
                </h3>
                <p className="text-gray-600 font-medium text-lg">
                  Ens posarem en contacte amb tu aviat.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="flex justify-center gap-2 mb-8">
                  <div className={`w-12 h-2 rounded-full transition-colors ${step >= 1 ? "bg-[#E30613]" : "bg-gray-200"}`} />
                  <div className={`w-12 h-2 rounded-full transition-colors ${step >= 2 ? "bg-[#E30613]" : "bg-gray-200"}`} />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-5"
                      >
                        <FloatingInput
                          id="fullName"
                          label="Nom complet"
                          testId="input-fullname"
                          error={errors.fullName?.message}
                          value={values.fullName}
                          {...register("fullName")}
                        />
                        <FloatingInput
                          id="email"
                          label="Correu electrònic"
                          type="email"
                          testId="input-email"
                          error={errors.email?.message}
                          value={values.email}
                          {...register("email")}
                        />
                        <button
                          type="button"
                          onClick={onNext}
                          data-testid="button-next"
                          className="w-full h-14 rounded-lg bg-[#111111] hover:bg-[#E30613] text-white font-montserrat font-bold text-lg transition-colors"
                        >
                          Continuar
                        </button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-5"
                      >
                        <FloatingInput
                          id="phone"
                          label="Telèfon"
                          type="tel"
                          testId="input-phone"
                          error={errors.phone?.message}
                          value={values.phone}
                          {...register("phone")}
                        />

                        <div className="relative">
                          <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">
                            Comarca
                          </label>
                          <Select
                            onValueChange={(val) => {
                              setValue("comarca", val, { shouldValidate: true });
                            }}
                            defaultValue={values.comarca}
                          >
                            <SelectTrigger
                              className="h-14 bg-gray-50 border-gray-200 text-base text-gray-900 focus:border-[#111111]"
                              data-testid="select-comarca"
                            >
                              <SelectValue placeholder="Selecciona la teua comarca" />
                            </SelectTrigger>
                            <SelectContent>
                              {comarcas.map((c) => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.comarca && (
                            <p className="mt-1 text-xs font-medium text-[#E30613]">
                              {errors.comarca.message}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            data-testid="button-back"
                            className="h-14 w-24 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors"
                          >
                            Tornar
                          </button>
                          <button
                            type="submit"
                            data-testid="button-submit"
                            className="flex-1 h-14 rounded-lg bg-[#E30613] hover:bg-[#c20510] text-white font-montserrat font-bold text-lg transition-colors"
                          >
                            Vull afiliar-me
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
